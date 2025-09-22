import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

const PENDING_KEY = "pendingCoinUpdates_v1";

type PendingItem = {
  uid: string;
  points: number;
  at: number;
};

// Queue mein dalne ka helper (offline case)
function enqueuePending(item: PendingItem) {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    const arr: PendingItem[] = raw ? JSON.parse(raw) : [];
    arr.push(item);
    localStorage.setItem(PENDING_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error("enqueuePending error:", e);
  }
}

// Pending updates ko flush karna (jab network wapas aaye)
export async function flushPendingUpdates(): Promise<void> {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    const arr: PendingItem[] = raw ? JSON.parse(raw) : [];
    if (!arr.length) return;

    const remaining: PendingItem[] = [];
    for (const it of arr) {
      try {
        const userRef = doc(db, "users", it.uid);
        await updateDoc(userRef, { coins: increment(it.points) });
      } catch (err) {
        console.error("flushPendingUpdates - failed for", it, err);
        remaining.push(it);
      }
    }

    if (remaining.length) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(PENDING_KEY);
    }
  } catch (e) {
    console.error("flushPendingUpdates error:", e);
  }
}

// Browser online hote hi flush kare
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    flushPendingUpdates().catch((e) =>
      console.error("flushPendingUpdates threw:", e)
    );
  });
}

/**
 * updateUserCoins
 * Firestore mein coins ko increment karta hai (atomic update).
 * Agar fail ho jaye to update ko localStorage mein queue karta hai.
 */
export async function updateUserCoins(uid: string, points: number): Promise<void> {
  if (!uid) throw new Error("updateUserCoins: missing uid");
  if (typeof points !== "number" || isNaN(points)) throw new Error("updateUserCoins: points must be a number");

  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, { coins: increment(points) });
  } catch (err) {
    console.error("updateUserCoins failed, queued for retry:", err);
    enqueuePending({ uid, points, at: Date.now() });
    throw err; // taaki tum toast ya notice dikha sako
  }
}

export default updateUserCoins;
