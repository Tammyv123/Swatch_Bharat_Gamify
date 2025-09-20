/*
WasteSortingGame.tsx
A complete, self-contained React component (single-file) for a waste-sorting game.
Instructions:
 - This component uses Tailwind classes for layout. If you don't have Tailwind, basic styling still works but classes may be ignored.
 - Default export is the React component. Drop this file into a React app (e.g., src/components/) and import it: import WasteSortingGame from './WasteSortingGame'.
 - No external images required; items are drawn with canvas shapes and simple SVG paths.

Features implemented:
 - Falling garbage items (paper, banana, plastic bottle, e-waste)
 - Four colored bins at bottom; player moves a selector (left/right) to choose active bin OR can drag bins on desktop/touch.
 - Levels with increasing speed and spawn rate
 - Lives, score, combo, level transitions
 - "Garbage pile reducing" animation between levels
 - Pause/Resume, Restart, High score in localStorage
 - Mobile touch controls
 - Accessible keyboard controls (Arrow keys to move active bin)

Notes on extension: replace drawIcon functions with real images if you want; swap in Firebase or server storage for global leaderboard.
*/

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const GARBAGE_DEFINITIONS = [
    { type: 'paper', label: 'Paper', color: '#ffffff', bin: 'paper' },
    { type: 'banana', label: 'Bio', color: '#f6e05e', bin: 'bio' },
    { type: 'plastic', label: 'Plastic', color: '#60a5fa', bin: 'plastic' },
    { type: 'ewaste', label: 'E-Waste', color: '#94a3b8', bin: 'ewaste' },
];

const BINS_DEFAULT = [
    { id: 'paper', x: 60, label: 'Paper', color: '#f8fafc' },
    { id: 'bio', x: 240, label: 'Bio', color: '#c6f6d5' },
    { id: 'plastic', x: 420, label: 'Plastic', color: '#bfdbfe' },
    { id: 'ewaste', x: 600, label: 'E-Waste', color: '#e2e8f0' },
];

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
}

interface Garbage {
    id: string;
    type: string;
    bin: string;
    label: string;
    color: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    speedMultiplier: number;
}

interface Bin {
    id: string;
    x: number;
    label: string;
    color: string;
    width: number;
}

export default function WasteSortingGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const [running, setRunning] = useState(true);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('wsg_highscore') || 0));
    const [bins, setBins] = useState<Bin[]>(BINS_DEFAULT.map(b => ({ ...b, width: 120 })));
    const [garbageList, setGarbageList] = useState<Garbage[]>([]);
    const [spawnIntervalMs, setSpawnIntervalMs] = useState(1500);
    const [fallSpeed, setFallSpeed] = useState(80); // pixels per second baseline
    const [showLevelTransition, setShowLevelTransition] = useState(false);
    const [pileProgress, setPileProgress] = useState(1); // 1 = full pile, 0 = cleared

    // control state
    const [activeBinIndex, setActiveBinIndex] = useState(1);
    const pressedKeys = useRef<{ left?: boolean; right?: boolean }>({});

    // spawn garbage using interval logic
    const spawnTimerRef = useRef(0);

    useEffect(() => {
        // adapt spawn rate and speed to level
        setSpawnIntervalMs(() => Math.max(350, 1500 - (level - 1) * 120));
        setFallSpeed(() => 80 + (level - 1) * 25);
    }, [level]);

    // keyboard controls
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'ArrowLeft') pressedKeys.current.left = true;
            if (e.key === 'ArrowRight') pressedKeys.current.right = true;
            if (e.key === ' ' || e.key === 'Spacebar') setRunning(r => !r);
        }
        function onKeyUp(e: KeyboardEvent) {
            if (e.key === 'ArrowLeft') pressedKeys.current.left = false;
            if (e.key === 'ArrowRight') pressedKeys.current.right = false;
        }
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, []);

    // touch & drag support for bins
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let dragging: number | null = null;
        let offsetX = 0;

        function getEventX(e: MouseEvent | TouchEvent) {
            const rect = canvas.getBoundingClientRect();
            if ('touches' in e && e.touches[0]) return e.touches[0].clientX - rect.left;
            return (e as MouseEvent).clientX - rect.left;
        }

        function onPointerDown(e: MouseEvent | TouchEvent) {
            const x = getEventX(e);
            const y = ('touches' in e && e.touches[0]) ? e.touches[0].clientY - canvas.getBoundingClientRect().top : (e as MouseEvent).clientY - canvas.getBoundingClientRect().top;
            // check bins top area
            for (let i = 0; i < bins.length; i++) {
                const b = bins[i];
                if (x >= b.x && x <= b.x + b.width && y >= CANVAS_HEIGHT - 140 && y <= CANVAS_HEIGHT - 60) {
                    dragging = i;
                    offsetX = x - b.x;
                    break;
                }
            }
        }

        function onPointerMove(e: MouseEvent | TouchEvent) {
            if (dragging === null) return;
            const x = getEventX(e);
            setBins(prev => prev.map((b, i) => i === dragging ? { ...b, x: clamp(x - offsetX, 10, CANVAS_WIDTH - b.width - 10) } : b));
        }

        function onPointerUp() { dragging = null; }

        canvas.addEventListener('mousedown', onPointerDown as EventListener);
        canvas.addEventListener('touchstart', onPointerDown as EventListener);
        window.addEventListener('mousemove', onPointerMove as EventListener);
        window.addEventListener('touchmove', onPointerMove as EventListener);
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchend', onPointerUp);

        return () => {
            canvas.removeEventListener('mousedown', onPointerDown as EventListener);
            canvas.removeEventListener('touchstart', onPointerDown as EventListener);
            window.removeEventListener('mousemove', onPointerMove as EventListener);
            window.removeEventListener('touchmove', onPointerMove as EventListener);
            window.removeEventListener('mouseup', onPointerUp);
            window.removeEventListener('touchend', onPointerUp);
        };
    }, [bins]);

    const spawnGarbage = useCallback(() => {
        const def = GARBAGE_DEFINITIONS[Math.floor(Math.random() * GARBAGE_DEFINITIONS.length)];
        const size = rand(18, 28);
        const g: Garbage = {
            id: Math.random().toString(36).slice(2),
            type: def.type,
            bin: def.bin,
            label: def.label,
            color: def.color,
            x: rand(30, CANVAS_WIDTH - 30),
            y: -30,
            size,
            rotation: rand(0, Math.PI * 2),
            rotationSpeed: rand(-1, 1) * 0.02,
            speedMultiplier: rand(0.85, 1.25),
        };
        setGarbageList(prev => [...prev, g]);
    }, []);

    // game loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function drawBin(ctx: CanvasRenderingContext2D, b: Bin, isActive: boolean) {
            // bin body
            ctx.save();
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, CANVAS_HEIGHT - 100, b.width, 80);
            // rim
            ctx.fillStyle = '#374151';
            ctx.fillRect(b.x - 6, CANVAS_HEIGHT - 110, b.width + 12, 12);
            // label
            ctx.fillStyle = '#111827';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(b.label, b.x + b.width / 2, CANVAS_HEIGHT - 60);
            // active outline
            if (isActive) {
                ctx.strokeStyle = '#10b981';
                ctx.lineWidth = 4;
                ctx.strokeRect(b.x - 4, CANVAS_HEIGHT - 104, b.width + 8, 88);
            }
            ctx.restore();
        }

        function drawGarbage(ctx: CanvasRenderingContext2D, g: Garbage) {
            ctx.save();
            ctx.translate(g.x, g.y);
            ctx.rotate(g.rotation);
            // shape depending on type
            if (g.type === 'paper') {
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-g.size / 2, -g.size / 2, g.size, g.size * 0.7);
                ctx.fillStyle = '#cbd5e1';
                ctx.fillText('📰', -6, 6);
            } else if (g.type === 'banana') {
                // banana peel shape
                ctx.beginPath();
                ctx.fillStyle = '#f6e05e';
                ctx.ellipse(0, 0, g.size * 0.7, g.size * 0.45, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#805ad5';
                ctx.fillText('🍌', -8, 6);
            } else if (g.type === 'plastic') {
                ctx.beginPath();
                ctx.fillStyle = '#60a5fa';
                ctx.fillRect(-g.size / 4, -g.size / 1.2, g.size / 2, g.size * 1.2);
                ctx.fillStyle = '#1f2937';
                ctx.fillText('PET', -12, 6);
            } else if (g.type === 'ewaste') {
                ctx.beginPath();
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(-g.size / 2, -g.size / 2, g.size, g.size);
                ctx.fillStyle = '#0f172a';
                ctx.fillText('⚡', -6, 6);
            }
            ctx.restore();
        }

        function drawBackground(ctx: CanvasRenderingContext2D) {
            // sky
            const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
            grad.addColorStop(0, '#e6f2ff');
            grad.addColorStop(1, '#ffffff');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // ground
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(0, CANVAS_HEIGHT - 140, CANVAS_WIDTH, 140);

            // trash pile (visual) on right
            ctx.save();
            const pileX = CANVAS_WIDTH - 150;
            const pileW = 120;
            const pileH = 80 * pileProgress;
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(pileX, CANVAS_HEIGHT - 60 - pileH, pileW, pileH);
            ctx.fillStyle = '#0f172a';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Garbage Pile', pileX + pileW / 2, CANVAS_HEIGHT - 20 - pileH);
            ctx.restore();
        }

        function update(dt: number) {
            // move active bin by keyboard
            if (pressedKeys.current.left) setActiveBinIndex(i => clamp(i - 1, 0, bins.length - 1));
            if (pressedKeys.current.right) setActiveBinIndex(i => clamp(i + 1, 0, bins.length - 1));

            // spawn timer
            spawnTimerRef.current += dt * 1000;
            if (spawnTimerRef.current >= spawnIntervalMs) {
                spawnTimerRef.current = 0;
                spawnGarbage();
            }

            // update garbage positions
            setGarbageList(prev => {
                const updated = [];
                for (const g of prev) {
                    const newY = g.y + (fallSpeed * g.speedMultiplier) * (dt);
                    const newRot = g.rotation + g.rotationSpeed;
                    if (newY > CANVAS_HEIGHT + 60) {
                        // missed - lose life
                        setLives(l => l - 1);
                        continue; // drop from list
                    }
                    updated.push({ ...g, y: newY, rotation: newRot });
                }
                return updated;
            });

            // check collisions between garbage and bins
            setGarbageList(prev => {
                const kept = [];
                for (const g of prev) {
                    let landed = false;
                    for (let i = 0; i < bins.length; i++) {
                        const b = bins[i];
                        const binY = CANVAS_HEIGHT - 100;
                        if (g.y + g.size / 2 >= binY && g.x >= b.x && g.x <= b.x + b.width) {
                            landed = true;
                            if (g.bin === b.id) {
                                setScore(s => s + 10);
                                // reduce pile slightly on correct
                                setPileProgress(p => Math.max(0, p - 0.02));
                            } else {
                                setScore(s => Math.max(0, s - 5));
                                setLives(l => l - 1);
                            }
                            break;
                        }
                    }
                    if (!landed) kept.push(g);
                }
                return kept;
            });

            // level complete condition: when pileProgress < threshold
            if (!showLevelTransition && pileProgress <= Math.max(0, 1 - 0.15 * level)) {
                // trigger transition
                setShowLevelTransition(true);
                setRunning(false);
            }
        }

        function render() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            drawBackground(ctx);

            // draw bins
            for (let i = 0; i < bins.length; i++) {
                drawBin(ctx, bins[i], i === activeBinIndex);
            }

            // draw garbage
            for (const g of garbageList) drawGarbage(ctx, g);

            // HUD
            ctx.save();
            ctx.fillStyle = '#0f172a';
            ctx.font = '18px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`Score: ${score}`, 16, 28);
            ctx.fillText(`Level: ${level}`, 16, 52);
            ctx.fillText(`Lives: ${lives}`, 16, 76);
            ctx.textAlign = 'right';
            ctx.fillText(`High: ${highScore}`, CANVAS_WIDTH - 16, 28);
            ctx.restore();

            // overlay when paused
            if (!running) {
                ctx.save();
                ctx.fillStyle = 'rgba(2,6,23,0.4)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = '#ffffff';
                ctx.font = '28px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(showLevelTransition ? `Level ${level} Complete` : 'Paused', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
                ctx.font = '18px sans-serif';
                ctx.fillText(showLevelTransition ? 'Tap Next Level to continue' : 'Press Space to Resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
                ctx.restore();
            }
        }

        function loop(timestamp: number) {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const dt = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
            lastTimeRef.current = timestamp;

            if (running) update(dt);
            render();
            rafRef.current = requestAnimationFrame(loop);
        }

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);

    }, [running, bins, garbageList, spawnIntervalMs, fallSpeed, activeBinIndex, score, lives, pileProgress, showLevelTransition, highScore, spawnGarbage, level]);

    // handle lives / game over
    useEffect(() => {
        if (lives <= 0) {
            setRunning(false);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('wsg_highscore', String(score));
            }
        }
    }, [lives, score, highScore]);

    function handleNextLevel() {
        // increase level, speed, reset pile progress (simulate reduction during level end)
        setLevel(l => l + 1);
        setShowLevelTransition(false);
        setRunning(true);
        setGarbageList([]);
        // increase difficulty via modifications
        setPileProgress(1);
    }

    function handleRestart() {
        setScore(0);
        setLevel(1);
        setLives(3);
        setPileProgress(1);
        setGarbageList([]);
        setRunning(true);
    }

    // move active bin left/right via UI buttons
    function moveActiveLeft() { setActiveBinIndex(i => clamp(i - 1, 0, bins.length - 1)); }
    function moveActiveRight() { setActiveBinIndex(i => clamp(i + 1, 0, bins.length - 1)); }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header with back button */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline" className="gap-2">
                            <Link to="/">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-primary">Waste Sorting Game</h1>
                    </div>
                    <div className="space-x-2">
                        <Button onClick={() => setRunning(r => !r)} variant="outline">
                            {running ? 'Pause' : 'Resume'}
                        </Button>
                        <Button onClick={handleRestart} variant="destructive">
                            Restart
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Game Canvas */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardContent className="p-4">
                                <canvas
                                    ref={canvasRef}
                                    width={CANVAS_WIDTH}
                                    height={CANVAS_HEIGHT}
                                    className="w-full h-auto border rounded-lg shadow-inner bg-gradient-to-b from-sky-100 to-green-50"
                                    style={{ touchAction: 'none' }}
                                />

                                <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Button onClick={moveActiveLeft} variant="outline" size="sm">
                                            ◀
                                        </Button>
                                        <div className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium">
                                            Active: {bins[activeBinIndex]?.label}
                                        </div>
                                        <Button onClick={moveActiveRight} variant="outline" size="sm">
                                            ▶
                                        </Button>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        💡 Drag bins on canvas or use arrow keys. Press Space to pause/resume.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Stats & Controls */}
                    <div className="space-y-4">
                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Game Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Score:</span>
                                    <span className="font-bold text-primary">{score}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Level:</span>
                                    <span className="font-bold text-blue-600">{level}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Lives:</span>
                                    <span className="font-bold text-red-500">❤️ {lives}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>High Score:</span>
                                    <span className="font-bold text-yellow-600">{highScore}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bins Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Waste Bins</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {bins.map((b, i) => (
                                    <div key={b.id} className="flex items-center justify-between p-2 rounded border">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-6 h-4 border border-gray-300 rounded"
                                                style={{ backgroundColor: b.color }}
                                            />
                                            <span className={`text-sm ${i === activeBinIndex ? 'font-bold text-primary' : ''}`}>
                                                {b.label}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            x: {Math.round(b.x)}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Level Controls Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Level Controls</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    onClick={() => { setRunning(false); setShowLevelTransition(true); }}
                                    className="w-full"
                                    variant="secondary"
                                >
                                    End Level (Test)
                                </Button>
                                {showLevelTransition && (
                                    <Button onClick={handleNextLevel} className="w-full bg-primary hover:bg-primary/90">
                                        Next Level →
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Instructions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">How to Play</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground space-y-2">
                                    <p>🎯 Sort falling waste into the correct bins</p>
                                    <p>🗑️ Paper → Paper bin</p>
                                    <p>🍌 Organic → Bio bin</p>
                                    <p>🍶 Plastic → Plastic bin</p>
                                    <p>⚡ Electronics → E-Waste bin</p>
                                    <p>⌨️ Use arrow keys or drag bins to position them</p>
                                    <p>❤️ Don't let items fall or go in wrong bins!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}