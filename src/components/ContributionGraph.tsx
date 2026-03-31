"use client";

import { useState } from "react";

interface Skill {
  name: string;
  level: number; // 1-5
  label: string;
}

const skills: Skill[] = [
  { name: "Java 17+", level: 5, label: "expert" },
  { name: "Spring Boot", level: 5, label: "expert" },
  { name: "Hibernate", level: 4, label: "advanced" },
  { name: "Microservices", level: 4, label: "advanced" },
  { name: "Docker", level: 4, label: "advanced" },
  { name: "REST APIs", level: 4, label: "advanced" },
  { name: "Kubernetes", level: 3, label: "intermediate" },
  { name: "AWS", level: 3, label: "intermediate" },
  { name: "React.js", level: 3, label: "intermediate" },
  { name: "PostgreSQL", level: 4, label: "advanced" },
  { name: "Oracle", level: 3, label: "intermediate" },
  { name: "CI/CD", level: 3, label: "intermediate" },
  { name: "Git", level: 4, label: "advanced" },
  { name: "FSM", level: 4, label: "advanced" },
];

const TOTAL_SQUARES = 10;

const GREEN_SHADES = [
  "#0e4429", // darkest
  "#006d32",
  "#26a641",
  "#39d353", // brightest
];

const EMPTY_COLOR = "#161b22";

function getSquareColors(level: number): string[] {
  const filledCount = level * 2; // level 5 = 10, level 4 = 8, level 3 = 6, level 2 = 4
  const colors: string[] = [];

  for (let i = 0; i < TOTAL_SQUARES; i++) {
    if (i >= filledCount) {
      colors.push(EMPTY_COLOR);
    } else {
      // Distribute filled squares across the 4 green shades, gradient left to right
      const shadeIndex = Math.min(
        Math.floor((i / filledCount) * GREEN_SHADES.length),
        GREEN_SHADES.length - 1
      );
      colors.push(GREEN_SHADES[shadeIndex]);
    }
  }

  return colors;
}

export default function ContributionGraph() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div
      className="w-full rounded-lg border overflow-hidden backdrop-blur-md"
      style={{ backgroundColor: "rgba(13, 17, 23, 0.8)", borderColor: "#30363d" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "#30363d" }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "#c9d1d9" }}
        >
          Tech Proficiency
        </span>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#8b949e" }}>
          <span>Less</span>
          {[EMPTY_COLOR, ...GREEN_SHADES].map((color, i) => (
            <span
              key={i}
              className="inline-block rounded-sm"
              style={{
                width: 10,
                height: 10,
                backgroundColor: color,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Skill rows */}
      <div className="px-4 py-3 flex flex-col gap-1.5">
        {skills.map((skill, rowIndex) => {
          const squareColors = getSquareColors(skill.level);
          const isHovered = hoveredRow === rowIndex;

          return (
            <div
              key={skill.name}
              className="flex items-center gap-3 py-0.5 rounded transition-colors duration-150"
              style={{
                backgroundColor: isHovered ? "rgba(48, 54, 61, 0.4)" : "transparent",
              }}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Tech name */}
              <span
                className="font-mono text-xs shrink-0 text-right"
                style={{ color: "#8b949e", width: 120 }}
              >
                {skill.name}
              </span>

              {/* Squares */}
              <div className="flex items-center gap-[3px]">
                {squareColors.map((color, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-sm transition-[filter] duration-150"
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: color,
                      filter: isHovered && color !== EMPTY_COLOR
                        ? "brightness(1.25)"
                        : "brightness(1)",
                    }}
                  />
                ))}
              </div>

              {/* Level label */}
              <span
                className="text-xs shrink-0"
                style={{ color: "#8b949e" }}
              >
                {skill.level}/5 &middot; {skill.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
