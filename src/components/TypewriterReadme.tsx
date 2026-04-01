"use client";

import { useState, useEffect, useRef } from "react";

interface ReadmeLine {
  text: string;
  style?: "h1" | "h2" | "badge" | "text" | "code" | "list" | "blank";
}

const lines: ReadmeLine[] = [
  { text: "# Hi, I'm Subrat Ojha", style: "h1" },
  { text: "", style: "blank" },
  { text: "Java Developer | Spring Boot | Microservices", style: "badge" },
  { text: "", style: "blank" },
  { text: "## About", style: "h2" },
  { text: "Java developer at IbaseIt Inc. building backend systems", style: "text" },
  { text: "with finite state machine frameworks.", style: "text" },
  { text: "", style: "blank" },
  { text: "## Currently working on", style: "h2" },
  { text: "- FSM-based workflow engines", style: "list" },
  { text: "- Gratis (microservices app)", style: "list" },
  { text: "- This portfolio", style: "list" },
  { text: "", style: "blank" },
  { text: "## Stats", style: "h2" },
  { text: "1+ years exp  |  20+ projects  |  daily commits", style: "code" },
  { text: "", style: "blank" },
  { text: "## Connect", style: "h2" },
  { text: "iamsubratojha@gmail.com", style: "code" },
];

function renderLine(line: ReadmeLine) {
  switch (line.style) {
    case "h1":
      return (
        <div className="text-lg sm:text-xl font-bold pb-1 mb-1 border-b border-[#21262d]" style={{ color: "#e6edf3" }}>
          {line.text.replace("# ", "")}
        </div>
      );
    case "h2":
      return (
        <div className="text-sm font-bold pt-2 pb-1 border-b border-[#21262d]" style={{ color: "#e6edf3" }}>
          {line.text.replace("## ", "")}
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-1.5 py-1">
          {line.text.split(" | ").map((badge) => (
            <span
              key={badge}
              className="inline-block rounded-sm px-2 py-0.5 text-[11px] font-mono"
              style={{
                backgroundColor: "#21262d",
                color: "#c9d1d9",
                border: "1px solid #30363d",
              }}
            >
              {badge.trim()}
            </span>
          ))}
        </div>
      );
    case "code":
      return (
        <div
          className="font-mono text-xs rounded px-2 py-1 my-0.5"
          style={{ backgroundColor: "#161b22", color: "#e3b341", border: "1px solid #21262d" }}
        >
          {line.text}
        </div>
      );
    case "list":
      return (
        <div className="text-sm pl-2" style={{ color: "#c9d1d9" }}>
          <span style={{ color: "#8b949e" }}>- </span>{line.text.replace("- ", "")}
        </div>
      );
    case "blank":
      return <div className="h-2" />;
    default:
      return <div className="text-sm" style={{ color: "#c9d1d9" }}>{line.text}</div>;
  }
}

export default function TypewriterReadme() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= lines.length) clearInterval(interval);
          }, 120);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header — like GitHub README preview */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
          <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
        </svg>
        <span className="text-xs font-semibold" style={{ color: "#c9d1d9" }}>
          README.md
        </span>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 py-4">
        {lines.slice(0, hasAnimated ? visibleLines : lines.length).map((line, i) => (
          <div
            key={i}
            className="transition-opacity duration-200"
            style={{ opacity: 1 }}
          >
            {renderLine(line)}
          </div>
        ))}
        {/* Blinking cursor at end */}
        {hasAnimated && visibleLines < lines.length && (
          <span className="animate-cursor-blink inline-block w-1.5 h-4 ml-0.5" style={{ backgroundColor: "#3fb950" }} />
        )}
      </div>
    </div>
  );
}
