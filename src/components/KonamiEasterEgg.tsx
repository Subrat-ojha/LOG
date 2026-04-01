"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{};<>=()";

interface Drop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  chars: string;
}

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);

  const trigger = useCallback(() => {
    setActive(true);
    const newDrops: Drop[] = [];
    const cols = Math.floor(window.innerWidth / 18);
    let id = 0;

    for (let c = 0; c < cols; c++) {
      const charCount = 8 + Math.floor(Math.random() * 16);
      let chars = "";
      for (let i = 0; i < charCount; i++) {
        chars += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      newDrops.push({
        id: id++,
        x: c * 18,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 2,
        chars,
      });
    }
    setDrops(newDrops);
    setTimeout(() => setActive(false), 5000);
  }, []);

  useEffect(() => {
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          trigger();
          index = 0;
        }
      } else {
        index = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trigger]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
    >
      {/* Matrix rain columns */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 font-mono text-sm leading-tight"
          style={{
            left: drop.x,
            color: "#3fb950",
            animation: `matrixFall ${drop.duration}s linear ${drop.delay}s both`,
            whiteSpace: "pre",
            writingMode: "vertical-rl",
            textOrientation: "upright",
            opacity: 0,
          }}
        >
          {drop.chars.split("").map((ch, i) => (
            <span
              key={i}
              style={{
                opacity: i === 0 ? 1 : 0.15 + (i / drop.chars.length) * 0.6,
                color: i === drop.chars.length - 1 ? "#e6edf3" : undefined,
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      ))}

      {/* Center text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "fadeInScale 0.5s 1s ease-out both" }}
      >
        <div className="text-center font-mono">
          <div className="text-2xl sm:text-4xl font-bold" style={{ color: "#3fb950" }}>
            ACCESS GRANTED
          </div>
          <div className="text-sm mt-2" style={{ color: "#8b949e" }}>
            You found the easter egg. You're hired.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100%); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
