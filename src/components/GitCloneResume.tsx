"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "idle" | "cloning" | "progress" | "done";

export default function GitCloneResume() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const handleClick = () => {
    if (phase !== "idle") return;

    // Trigger actual download
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Subrat_Resume.pdf";
    a.click();

    // Start animation sequence
    setPhase("cloning");

    timerRef.current = setTimeout(() => {
      setPhase("progress");
      setProgress(0);

      const duration = 1500;
      const start = performance.now();

      const animate = (now: number) => {
        const elapsed = now - start;
        const pct = Math.min(elapsed / duration, 1);
        setProgress(Math.round(pct * 100));

        if (pct < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setPhase("done");
          timerRef.current = setTimeout(() => {
            setPhase("idle");
            setProgress(0);
          }, 2000);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 600);
  };

  const barWidth = 20;
  const filled = Math.round((progress / 100) * barWidth);
  const progressBar =
    "█".repeat(filled) + "░".repeat(barWidth - filled);

  return (
    <div className="w-full max-w-xl mx-auto font-mono text-sm">
      {/* Terminal window */}
      <div
        className="rounded-lg border overflow-hidden cursor-pointer select-none"
        style={{
          backgroundColor: "#0d1117",
          borderColor: "#30363d",
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        aria-label="Download resume"
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f85149" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#d29922" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#3fb950" }} />
          <span className="ml-2 text-xs" style={{ color: "#8b949e" }}>
            terminal
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-4 py-3 leading-relaxed">
          {/* Command line */}
          <div className="flex flex-wrap">
            <span style={{ color: "#8b949e" }}>$&nbsp;</span>
            <span style={{ color: "#e6edf3" }}>git&nbsp;</span>
            <span style={{ color: "#3fb950" }}>clone&nbsp;</span>
            <span style={{ color: "#539bf5" }}>https://subrat.tech/resume.pdf</span>
            {phase === "idle" && (
              <span
                className="inline-block w-2 h-4 ml-0.5 align-middle animate-cursor-blink"
                style={{ backgroundColor: "#e6edf3" }}
              />
            )}
          </div>

          {/* Cloning message */}
          {(phase === "cloning" || phase === "progress" || phase === "done") && (
            <div className="mt-1" style={{ color: "#8b949e" }}>
              Cloning into &apos;resume.pdf&apos;...
            </div>
          )}

          {/* Progress bar */}
          {(phase === "progress" || phase === "done") && (
            <div className="mt-1" style={{ color: "#3fb950" }}>
              <span>Receiving objects: </span>
              <span style={{ color: "#e6edf3" }}>{progress}%</span>
              <span className="ml-2" style={{ color: "#30363d" }}>
                {progressBar}
              </span>
            </div>
          )}

          {/* Done */}
          {phase === "done" && (
            <div className="mt-1" style={{ color: "#3fb950" }}>
              Done.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
