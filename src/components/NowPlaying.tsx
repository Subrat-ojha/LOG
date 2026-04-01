"use client";

import { useState, useEffect } from "react";

const statuses = [
  { branch: "coding-mode", status: "Writing Spring Boot microservices", modified: ["FeatureService.java", "WorkflowEngine.java"] },
  { branch: "deep-focus", status: "Debugging production issues", modified: ["LogAnalyzer.java", "HealthCheck.java"] },
  { branch: "learning", status: "Exploring new technologies", modified: ["rust-notes.md", "go-concurrency.md"] },
  { branch: "building", status: "Working on side projects", modified: ["gratis/api-gateway", "gratis/user-service"] },
  { branch: "caffeinated", status: "Fueled by coffee, shipping features", modified: ["README.md", "CHANGELOG.md"] },
];

export default function NowPlaying() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % statuses.length);
        setFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = statuses[index];

  return (
    <div
      className="rounded-lg border overflow-hidden font-mono text-xs"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#3fb950" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#3fb950" }} />
        </span>
        <span style={{ color: "#c9d1d9" }}>git status</span>
        <span className="ml-auto text-[10px]" style={{ color: "#484f58" }}>live</span>
      </div>

      {/* Status output */}
      <div
        className="px-3 sm:px-4 py-3 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div>
          <span style={{ color: "#8b949e" }}>On branch </span>
          <span style={{ color: "#3fb950" }}>{current.branch}</span>
        </div>
        <div className="mt-1">
          <span style={{ color: "#8b949e" }}>Your branch is </span>
          <span style={{ color: "#e6edf3" }}>up to date</span>
          <span style={{ color: "#8b949e" }}> with &apos;</span>
          <span style={{ color: "#539bf5" }}>origin/{current.branch}</span>
          <span style={{ color: "#8b949e" }}>&apos;.</span>
        </div>

        <div className="mt-3">
          <span style={{ color: "#e6edf3" }}>Currently: </span>
          <span style={{ color: "#e3b341" }}>{current.status}</span>
        </div>

        <div className="mt-3">
          <span style={{ color: "#8b949e" }}>Changes not staged for commit:</span>
        </div>
        <div className="mt-1">
          {current.modified.map((file) => (
            <div key={file}>
              <span style={{ color: "#8b949e" }}>{"        "}</span>
              <span style={{ color: "#f85149" }}>modified:   </span>
              <span style={{ color: "#e6edf3" }}>{file}</span>
            </div>
          ))}
        </div>

        <div className="mt-3" style={{ color: "#484f58" }}>
          no changes added to commit (use &quot;git add&quot; to stage)
        </div>
      </div>
    </div>
  );
}
