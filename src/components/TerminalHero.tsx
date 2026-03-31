"use client";

import { useState, useEffect, useCallback } from "react";

const INFO_LINES = [
  { label: "name", value: "Subrat Ojha" },
  { label: "role", value: "Java Developer @ IbaseIt Inc." },
  { label: "stack", value: "Java 17+, Spring Boot, Hibernate" },
  { label: "infra", value: "Docker, Kubernetes, AWS" },
  { label: "arch", value: "Microservices, FSM frameworks" },
  { label: "xp", value: "1+ yrs · 20+ projects" },
  { label: "edu", value: "MCA, Krupajal Engineering College" },
  { label: "loc", value: "India" },
];

const COMMAND = "neofetch";
const TYPE_SPEED = 60;
const LINE_REVEAL_SPEED = 120;

export default function TerminalHero() {
  const [phase, setPhase] = useState(0); // 0: nothing, 1: prompt, 2: typing cmd, 3: ascii, 4+: revealing lines
  const [typedChars, setTypedChars] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);

  const startTyping = useCallback(() => {
    setPhase(2);
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedChars(charIndex);
      if (charIndex >= COMMAND.length) {
        clearInterval(typeInterval);
        // Show ASCII art
        setTimeout(() => {
          setPhase(3);
          // Start revealing info lines
          let lineIndex = 0;
          const lineInterval = setInterval(() => {
            lineIndex++;
            setRevealedLines(lineIndex);
            if (lineIndex >= INFO_LINES.length) {
              clearInterval(lineInterval);
              setTimeout(() => setPhase(99), 200); // done
            }
          }, LINE_REVEAL_SPEED);
        }, 300);
      }
    }, TYPE_SPEED);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => startTyping(), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [startTyping]);

  return (
    <div
      className="rounded-lg border overflow-hidden font-mono text-[13px] leading-[1.6]"
      style={{ backgroundColor: "#0d1117", borderColor: "#30363d" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b select-none"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <span className="ml-2 text-[11px]" style={{ color: "#484f58" }}>
          subrat@arch — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-3 overflow-x-auto">
        {/* Prompt + typing command */}
        {phase >= 1 && (
          <div>
            <span style={{ color: "#3fb950" }}>subrat@arch</span>
            <span style={{ color: "#8b949e" }}>:</span>
            <span style={{ color: "#539bf5" }}>~</span>
            <span style={{ color: "#8b949e" }}>$ </span>
            <span style={{ color: "#e6edf3" }}>
              {phase === 2 ? COMMAND.slice(0, typedChars) : COMMAND}
            </span>
            {phase === 2 && (
              <span className="animate-cursor-blink" style={{ color: "#3fb950" }}>|</span>
            )}
          </div>
        )}

        {/* Neofetch output */}
        {phase >= 3 && (
          <div className="mt-3 flex gap-6">
            {/* ASCII art */}
            <pre
              className="shrink-0 hidden sm:block"
              style={{ color: "#539bf5", fontSize: "11px", lineHeight: "1.2" }}
            >{`
       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}</pre>

            {/* Info lines - revealed one by one */}
            <div className="min-w-0">
              <div>
                <span style={{ color: "#3fb950" }}>subrat</span>
                <span style={{ color: "#8b949e" }}>@</span>
                <span style={{ color: "#3fb950" }}>dev</span>
              </div>
              <div style={{ color: "#30363d" }}>----------------</div>
              {INFO_LINES.slice(0, revealedLines).map((line, i) => (
                <div
                  key={i}
                  className="stagger-child"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <span style={{ color: "#539bf5" }}>{line.label}</span>
                  <span style={{ color: "#8b949e" }}>: </span>
                  <span style={{ color: "#e6edf3" }}>{line.value}</span>
                </div>
              ))}
              {/* Color blocks - show after all lines */}
              {revealedLines >= INFO_LINES.length && (
                <div className="mt-2 flex gap-[6px]">
                  {["#0d1117","#f85149","#3fb950","#e3b341","#539bf5","#8957e5","#58a6ff","#e6edf3"].map((c) => (
                    <span
                      key={c}
                      className="inline-block w-3 h-3 rounded-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Idle prompt */}
        {phase >= 99 && (
          <div className="mt-3">
            <span style={{ color: "#3fb950" }}>subrat@arch</span>
            <span style={{ color: "#8b949e" }}>:</span>
            <span style={{ color: "#539bf5" }}>~</span>
            <span style={{ color: "#8b949e" }}>$ </span>
            <span className="animate-cursor-blink" style={{ color: "#3fb950" }}>|</span>
          </div>
        )}
      </div>
    </div>
  );
}
