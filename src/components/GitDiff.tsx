"use client";

import { useState, useEffect, useRef } from "react";

type LineType = "add" | "remove" | "context";

interface DiffLine {
  type: LineType;
  content: string;
  annotation?: string;
}

const diffLines: DiffLine[] = [
  { type: "context", content: "  name: \"Subrat Ojha\"" },
  { type: "context", content: "  location: \"India\"" },
  { type: "context", content: "" },
  { type: "remove", content: "  role: \"Freelance Developer\"", annotation: "Previous role — freelanced from Feb 2023 to Sep 2024" },
  { type: "remove", content: "  type: \"Part-Time\"" },
  { type: "remove", content: "  focus: \"Client projects\"" },
  { type: "add", content: "  role: \"Java Developer @ IbaseIt Inc.\"", annotation: "Current position since Oct 2024" },
  { type: "add", content: "  type: \"Full-Time\"" },
  { type: "add", content: "  focus: \"Enterprise backend systems & microservices\"", annotation: "Building FSM-based workflow engines" },
  { type: "add", content: "  architecture: \"FSM-based workflow engine\"", annotation: "Finite State Machine framework for complex state transitions" },
  { type: "context", content: "" },
  { type: "add", content: "  about: |" },
  { type: "add", content: "    Java developer who builds backend systems with" },
  { type: "add", content: "    state machine frameworks. Day-to-day I work with" },
  { type: "add", content: "    Spring Boot, Hibernate, and microservices —" },
  { type: "add", content: "    containerized with Docker, deployed on AWS." },
  { type: "add", content: "    Did my MCA from Krupajal Engineering College." },
  { type: "context", content: "" },
  { type: "context", content: "  stack:" },
  { type: "context", content: "    - Java" },
  { type: "context", content: "    - Spring Boot" },
  { type: "remove", content: "    - React.js" },
  { type: "remove", content: "    - REST APIs" },
  { type: "add", content: "    - Hibernate", annotation: "ORM for database operations" },
  { type: "add", content: "    - Microservices" },
  { type: "add", content: "    - Docker", annotation: "Containerization for all services" },
  { type: "add", content: "    - Kubernetes", annotation: "Orchestration at scale" },
  { type: "add", content: "    - AWS", annotation: "Cloud infrastructure" },
  { type: "add", content: "    - CI/CD" },
  { type: "context", content: "" },
  { type: "remove", content: "  projects_completed: 5" },
  { type: "remove", content: "  experience: \"< 1 year\"" },
  { type: "remove", content: "  deployment: \"Manual\"" },
  { type: "remove", content: "  databases: [\"PostgreSQL\"]" },
  { type: "add", content: "  projects_completed: 20+", annotation: "Grown 4x in project count" },
  { type: "add", content: "  experience: \"1+ years\"" },
  { type: "add", content: "  deployment: \"CI/CD pipelines\"", annotation: "Automated deployment workflows" },
  { type: "add", content: "  databases: [\"Oracle\", \"PostgreSQL\"]" },
  { type: "context", content: "" },
  { type: "add", content: "  currently_building: \"Gratis\"", annotation: "Active side project — full-stack microservices app" },
  { type: "add", content: "  status: \"Shipping code daily\"" },
];

function getPrefix(type: LineType) {
  if (type === "add") return "+";
  if (type === "remove") return "-";
  return " ";
}

export default function GitDiff() {
  const [tooltipLine, setTooltipLine] = useState<number | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= diffLines.length) clearInterval(interval);
          }, 40);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  let addNum = 0;
  let removeNum = 0;

  const additions = diffLines.filter((l) => l.type === "add").length;
  const deletions = diffLines.filter((l) => l.type === "remove").length;

  return (
    <div ref={containerRef} className="rounded-md border border-[#30363d] overflow-hidden font-mono text-xs glass">
      {/* File header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
        <span className="text-[13px] text-[#e6edf3]">developer.yml</span>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[#3fb950]">+{additions}</span>
          <span className="text-[#f85149]">-{deletions}</span>
        </div>
      </div>

      {/* Hunk header */}
      <div className="px-3 py-1 bg-[#161b22]/60 text-[#539bf5] border-b border-[#30363d] text-[11px]">
        @@ -1,{diffLines.length} +1,{diffLines.length} @@ # career evolution
      </div>

      {/* Lines */}
      <div className="bg-[#0d1117]/80 overflow-x-auto">
        {diffLines.slice(0, hasAnimated ? visibleLines : diffLines.length).map((line, i) => {
          let leftNum = "";
          let rightNum = "";

          if (line.type === "remove") {
            removeNum++;
            leftNum = String(removeNum);
          } else if (line.type === "add") {
            addNum++;
            rightNum = String(addNum);
          } else {
            removeNum++;
            addNum++;
            leftNum = String(removeNum);
            rightNum = String(addNum);
          }

          const bg =
            line.type === "add"
              ? "bg-[#12261e]"
              : line.type === "remove"
              ? "bg-[#2d1215]"
              : "";

          const text =
            line.type === "add"
              ? "text-[#3fb950]"
              : line.type === "remove"
              ? "text-[#f85149]"
              : "text-[#8b949e]";

          const numColor =
            line.type === "add"
              ? "text-[#2ea043]/40"
              : line.type === "remove"
              ? "text-[#f85149]/40"
              : "text-[#484f58]/60";

          return (
            <div
              key={i}
              className={`relative flex items-start ${bg} hover:brightness-125 transition-all duration-100 group`}
            >
              {/* Annotation button */}
              {line.annotation && (
                <button
                  className="absolute left-0 top-0 w-5 h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{ color: "#539bf5" }}
                  onMouseEnter={() => setTooltipLine(i)}
                  onMouseLeave={() => setTooltipLine(null)}
                  onClick={() => setTooltipLine(tooltipLine === i ? null : i)}
                  aria-label="Show annotation"
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4Z" />
                  </svg>
                </button>
              )}

              {/* Tooltip */}
              {tooltipLine === i && line.annotation && (
                <div
                  className="absolute left-6 top-0 z-20 px-3 py-1.5 rounded-md border text-xs whitespace-normal"
                  style={{
                    backgroundColor: "#1c2128",
                    borderColor: "#30363d",
                    color: "#c9d1d9",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    maxWidth: 250,
                  }}
                >
                  <div
                    className="absolute -left-1 top-1.5 w-2 h-2 rotate-45 border-l border-b"
                    style={{ backgroundColor: "#1c2128", borderColor: "#30363d" }}
                  />
                  {line.annotation}
                </div>
              )}

              <span className={`select-none w-8 text-right pr-1 shrink-0 ${numColor}`}>{leftNum}</span>
              <span className={`select-none w-8 text-right pr-2 shrink-0 ${numColor}`}>{rightNum}</span>
              <span className={`select-none w-4 shrink-0 ${text}`}>{getPrefix(line.type)}</span>
              <span className={`${text} whitespace-pre`}>{line.content}</span>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-t border-[#30363d]">
        <span className="text-[#8b949e] text-[11px]">{diffLines.length} lines changed</span>
        <div className="flex gap-[2px] ml-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-[8px] h-[8px] rounded-[2px] ${
                i < Math.round((additions / (additions + deletions)) * 5)
                  ? "bg-[#3fb950]"
                  : "bg-[#f85149]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
