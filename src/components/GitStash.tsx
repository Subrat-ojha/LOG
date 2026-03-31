"use client";

import { useState } from "react";

interface StashEntry {
  index: number;
  branch: string;
  message: string;
  details: string[];
}

const stashEntries: StashEntry[] = [
  {
    index: 0,
    branch: "main",
    message: "Learning Rust for systems programming",
    details: [
      "+ ownership model and borrow checker",
      "+ building CLI tools with clap",
      "+ async runtime with tokio",
    ],
  },
  {
    index: 1,
    branch: "main",
    message: "Exploring Go concurrency patterns",
    details: [
      "+ goroutines and channels",
      "+ building microservices with Go",
      "+ comparing with Java virtual threads",
    ],
  },
  {
    index: 2,
    branch: "main",
    message: "Kafka event streaming architecture",
    details: [
      "+ event sourcing patterns",
      "+ consumer groups and partitioning",
      "+ integrating with Spring Boot",
    ],
  },
  {
    index: 3,
    branch: "main",
    message: "System design & distributed systems",
    details: [
      "+ CAP theorem and consistency models",
      "+ designing for fault tolerance",
      "+ load balancing strategies",
    ],
  },
];

export default function GitStash() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div
      className="rounded-md border overflow-hidden font-mono text-xs"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
            <path d="M6.5 0.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V1A.75.75 0 0 1 6.5.25Zm4.75.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM1.5 3.75A1.75 1.75 0 0 1 3.25 2h9.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 0 1 12.75 8h-9.5A1.75 1.75 0 0 1 1.5 6.25ZM3.25 3.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25ZM1.5 10.25A1.75 1.75 0 0 1 3.25 8.5h9.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 0 1 12.75 14.5h-9.5A1.75 1.75 0 0 1 1.5 12.75Zm1.75-.25a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25Z" />
          </svg>
          <span style={{ color: "#e6edf3" }}>git stash list</span>
        </div>
        <span style={{ color: "#8b949e" }}>{stashEntries.length} stashed</span>
      </div>

      {/* Stash entries */}
      <div>
        {stashEntries.map((entry) => {
          const isOpen = expanded.has(entry.index);
          return (
            <div
              key={entry.index}
              className="border-b last:border-b-0"
              style={{ borderColor: "#30363d" }}
            >
              <button
                onClick={() => toggle(entry.index)}
                className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#161b22] transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="#8b949e"
                  className="shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
                <span style={{ color: "#e3b341" }}>stash@{`{${entry.index}}`}</span>
                <span style={{ color: "#8b949e" }}>: WIP on {entry.branch}:</span>
                <span style={{ color: "#e6edf3" }} className="truncate">{entry.message}</span>
              </button>

              {isOpen && (
                <div
                  className="px-3 pb-2 ml-6 border-l-2"
                  style={{ borderColor: "#30363d" }}
                >
                  {entry.details.map((line, i) => (
                    <div key={i} className="py-0.5" style={{ color: "#3fb950" }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
