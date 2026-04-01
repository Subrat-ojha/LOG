"use client";

import { useState, useEffect, useRef } from "react";

interface GraphNode {
  hash: string;
  message: string;
  branch: string;
  type: "commit" | "merge" | "branch";
  date: string;
  col: number; // 0-based column for the graph
  mergeFrom?: number; // column index it merges from
}

const nodes: GraphNode[] = [
  { hash: "d8857ae", message: "Current: Building portfolio", branch: "main", type: "commit", date: "2025", col: 0 },
  { hash: "a3f7b2d", message: "Java Developer @ IbaseIt Inc.", branch: "career", type: "merge", date: "Oct 2024", col: 0, mergeFrom: 1 },
  { hash: "e9c2f1a", message: "Built FSM workflow engines", branch: "career", type: "commit", date: "2025", col: 1 },
  { hash: "7b3d4e5", message: "Shipped 20+ projects", branch: "career", type: "commit", date: "2024", col: 1 },
  { hash: "8e1c4f9", message: "Freelance Developer", branch: "freelance", type: "merge", date: "Sep 2024", col: 0, mergeFrom: 2 },
  { hash: "f2a8c3d", message: "Full-stack client projects", branch: "freelance", type: "commit", date: "2023-2024", col: 2 },
  { hash: "c4d6e7f", message: "React + Spring Boot apps", branch: "freelance", type: "commit", date: "2023", col: 2 },
  { hash: "4d2e8a1", message: "MCA @ Krupajal Engineering", branch: "education", type: "merge", date: "2024", col: 0, mergeFrom: 1 },
  { hash: "b1e3f5a", message: "Learned Microservices & Docker", branch: "education", type: "commit", date: "2023", col: 1 },
  { hash: "9a7c2d4", message: "Started with Java & Spring", branch: "education", type: "commit", date: "2022", col: 1 },
  { hash: "0f1e2d3", message: "git init life", branch: "main", type: "commit", date: "2022", col: 0 },
];

const BRANCH_COLORS: Record<string, string> = {
  main: "#e6edf3",
  career: "#539bf5",
  freelance: "#8957e5",
  education: "#3fb950",
};

const COL_OFFSET = 24;

export default function GitGraph() {
  const [visibleCount, setVisibleCount] = useState(0);
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
            setVisibleCount(i);
            if (i >= nodes.length) clearInterval(interval);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const maxCol = Math.max(...nodes.map((n) => Math.max(n.col, n.mergeFrom ?? 0)));

  return (
    <div
      ref={ref}
      className="rounded-lg border overflow-hidden font-mono text-xs"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
          <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
        </svg>
        <span style={{ color: "#c9d1d9" }}>git log --graph --oneline --all</span>
      </div>

      {/* Graph */}
      <div className="px-4 py-3">
        {nodes.slice(0, hasAnimated ? visibleCount : nodes.length).map((node, i) => {
          const branchColor = BRANCH_COLORS[node.branch] || "#8b949e";
          const graphWidth = (maxCol + 1) * COL_OFFSET + 8;

          return (
            <div
              key={node.hash}
              className="flex items-start gap-0 transition-opacity duration-300"
              style={{
                opacity: 1,
                minHeight: 28,
              }}
            >
              {/* Graph visualization */}
              <div
                className="relative shrink-0"
                style={{ width: graphWidth, height: 28 }}
              >
                {/* Vertical lines for active columns */}
                {Array.from({ length: maxCol + 1 }).map((_, c) => {
                  // Determine if this column has an active branch at this row
                  const isActive = nodes.slice(0, i + 1).some(
                    (n, ni) => ni >= i && (n.col === c || (n.mergeFrom === c))
                  ) || nodes.slice(i).some((n) => n.col === c);

                  if (!isActive) return null;

                  // Find the color for this column
                  const colNode = nodes.find((n, ni) => ni >= i && n.col === c);
                  const lineColor = colNode ? BRANCH_COLORS[colNode.branch] || "#30363d" : "#30363d";

                  return (
                    <div
                      key={c}
                      className="absolute top-0 h-full"
                      style={{
                        left: c * COL_OFFSET + 4,
                        width: 1,
                        backgroundColor: c === node.col || (i < nodes.length - 1) ? lineColor : "transparent",
                        opacity: 0.3,
                      }}
                    />
                  );
                })}

                {/* Merge line */}
                {node.mergeFrom !== undefined && (
                  <svg
                    className="absolute top-0 left-0"
                    width={graphWidth}
                    height={28}
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d={`M ${node.mergeFrom * COL_OFFSET + 4} 0 C ${node.mergeFrom * COL_OFFSET + 4} 14, ${node.col * COL_OFFSET + 4} 14, ${node.col * COL_OFFSET + 4} 14`}
                      fill="none"
                      stroke={BRANCH_COLORS[node.branch] || "#8b949e"}
                      strokeWidth={1.5}
                      opacity={0.5}
                    />
                  </svg>
                )}

                {/* Node dot */}
                <div
                  className="absolute rounded-full"
                  style={{
                    left: node.col * COL_OFFSET,
                    top: 8,
                    width: 9,
                    height: 9,
                    backgroundColor: node.type === "merge" ? "#0d1117" : branchColor,
                    border: `2px solid ${branchColor}`,
                  }}
                />
              </div>

              {/* Commit info */}
              <div className="flex items-baseline gap-2 pt-1 min-w-0">
                <span
                  className="shrink-0"
                  style={{ color: "#e3b341" }}
                >
                  {node.hash.slice(0, 7)}
                </span>
                <span className="truncate" style={{ color: "#e6edf3" }}>
                  {node.message}
                </span>
                <span className="shrink-0 ml-auto text-[10px]" style={{ color: "#484f58" }}>
                  {node.date}
                </span>
              </div>
            </div>
          );
        })}

        {/* Branch legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t" style={{ borderColor: "#21262d" }}>
          {Object.entries(BRANCH_COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span style={{ color: "#8b949e" }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
