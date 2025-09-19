import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import introVideo from "@/assets/into.mp4";



// LocalStorage Hook
const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

// Dummy training data
const trainingLevels = [
  {
    id: 1,
    title: "Waste Management Basics",
    description: "Learn the fundamentals of waste segregation and recycling.",
    video: introVideo,
  },
  {
    id: 2,
    title: "Advanced Waste Management",
    description: "Dive deeper into composting, e-waste handling, and policies.",
    video: introVideo,
  },
  {
    id: 3,
    title: "Community Awareness",
    description: "How to involve communities in sustainable waste practices.",
    video: introVideo,
  },
];

const Learning = () => {
  const [introWatched, setIntroWatched] = useLocalStorage("introVideoWatched", false);
  const [showIntro, setShowIntro] = useState(false);

  // Show intro popup only if not watched
  useEffect(() => {
    if (!introWatched) {
      setShowIntro(true);
    }
  }, [introWatched]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Hub 📚</h1>

      {/* Intro Video Popup */}
      <Dialog open={showIntro} onOpenChange={setShowIntro}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Welcome to Learning Hub 🎥</DialogTitle>
          </DialogHeader>

          <div className="aspect-video mb-4">
            <video controls className="w-full h-full rounded-lg">
              <source src={introVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={introWatched}
                onCheckedChange={(val) => setIntroWatched(val)}
              />
              <label className="text-sm">Already Watched</label>
            </div>
            <Button onClick={() => setShowIntro(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Training Levels */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainingLevels.map((level) => (
          <div
            key={level.id}
            className="border rounded-lg shadow-md p-4 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{level.title}</h2>
            <p className="text-sm mb-4">{level.description}</p>

            {/* Course Video */}
            <div className="aspect-video mb-3">
              <video controls className="w-full h-full rounded-lg">
                <source src={level.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <Button variant="secondary">Start Module</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
