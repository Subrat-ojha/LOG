"use client";

import { useState } from "react";

interface Skill {
  name: string;
  level: number; // 1-5
  label: string;
}

interface SkillCategory {
  name: string;
  icon: string; // folder path character
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "lang/",
    skills: [
      { name: "Java 17+", level: 5, label: "expert" },
      { name: "SQL", level: 4, label: "advanced" },
      { name: "JavaScript", level: 3, label: "intermediate" },
    ],
  },
  {
    name: "Frameworks",
    icon: "frameworks/",
    skills: [
      { name: "Spring Boot", level: 5, label: "expert" },
      { name: "Hibernate", level: 4, label: "advanced" },
      { name: "React.js", level: 3, label: "intermediate" },
      { name: "REST APIs", level: 4, label: "advanced" },
    ],
  },
  {
    name: "Architecture",
    icon: "arch/",
    skills: [
      { name: "Microservices", level: 4, label: "advanced" },
      { name: "FSM", level: 4, label: "advanced" },
    ],
  },
  {
    name: "DevOps",
    icon: "devops/",
    skills: [
      { name: "Docker", level: 4, label: "advanced" },
      { name: "Kubernetes", level: 3, label: "intermediate" },
      { name: "AWS", level: 3, label: "intermediate" },
      { name: "CI/CD", level: 3, label: "intermediate" },
      { name: "Git", level: 4, label: "advanced" },
    ],
  },
  {
    name: "Databases",
    icon: "db/",
    skills: [
      { name: "PostgreSQL", level: 4, label: "advanced" },
      { name: "Oracle", level: 3, label: "intermediate" },
    ],
  },
];

// Language bar data — approximate time/usage split
const langBar = [
  { name: "Java", pct: 48, color: "#b07219" },
  { name: "SQL", pct: 18, color: "#e38c00" },
  { name: "JavaScript", pct: 12, color: "#f1e05a" },
  { name: "YAML/Config", pct: 10, color: "#cb171e" },
  { name: "Shell", pct: 7, color: "#89e051" },
  { name: "Other", pct: 5, color: "#8b949e" },
];

const TOTAL_SQUARES = 10;

const GREEN_SHADES = [
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const EMPTY_COLOR = "#161b22";

function getSquareColors(level: number): string[] {
  const filledCount = level * 2;
  const colors: string[] = [];

  for (let i = 0; i < TOTAL_SQUARES; i++) {
    if (i >= filledCount) {
      colors.push(EMPTY_COLOR);
    } else {
      const shadeIndex = Math.min(
        Math.floor((i / filledCount) * GREEN_SHADES.length),
        GREEN_SHADES.length - 1
      );
      colors.push(GREEN_SHADES[shadeIndex]);
    }
  }

  return colors;
}

function FolderIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#54aeff" className="shrink-0">
        <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.465 0 .909.184 1.237.513l.987.987h6.776A1.75 1.75 0 0 1 16 4.25v7.5A1.75 1.75 0 0 1 14.25 13.5H1.75A1.75 1.75 0 0 1 0 11.75V2.75c0-.465.184-.909.513-1.237Z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#54aeff" className="shrink-0">
      <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2c-.33-.44-.85-.7-1.4-.7Z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="#8b949e"
      className="shrink-0 transition-transform duration-150"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

export default function ContributionGraph() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Language Bar — GitHub repo style */}
      <div
        className="w-full rounded-lg border overflow-hidden"
        style={{ backgroundColor: "rgba(13, 17, 23, 0.8)", borderColor: "#30363d" }}
      >
        <div
          className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b"
          style={{ borderColor: "#30363d" }}
        >
          <span className="text-xs sm:text-sm font-semibold font-mono" style={{ color: "#c9d1d9" }}>
            Languages
          </span>
        </div>

        <div className="px-3 sm:px-4 py-3">
          {/* The color bar */}
          <div className="flex w-full h-2 rounded-full overflow-hidden gap-[2px]">
            {langBar.map((lang) => (
              <div
                key={lang.name}
                className="h-full rounded-sm transition-opacity duration-150"
                style={{
                  width: `${lang.pct}%`,
                  backgroundColor: lang.color,
                  opacity: hoveredLang && hoveredLang !== lang.name ? 0.3 : 1,
                }}
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {langBar.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-1.5 cursor-default"
                onMouseEnter={() => setHoveredLang(lang.name)}
                onMouseLeave={() => setHoveredLang(null)}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span
                  className="font-mono text-[11px] transition-colors duration-100"
                  style={{
                    color: hoveredLang === lang.name ? "#e6edf3" : "#8b949e",
                  }}
                >
                  {lang.name}
                </span>
                <span className="font-mono text-[11px]" style={{ color: "#484f58" }}>
                  {lang.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Categories — collapsible folder tree */}
      <div
        className="w-full rounded-lg border overflow-hidden backdrop-blur-md"
        style={{ backgroundColor: "rgba(13, 17, 23, 0.8)", borderColor: "#30363d" }}
      >
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-3 sm:px-4 py-2.5 sm:py-3 border-b"
          style={{ borderColor: "#30363d" }}
        >
          <span
            className="text-xs sm:text-sm font-semibold font-mono"
            style={{ color: "#c9d1d9" }}
          >
            Tech Proficiency
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs" style={{ color: "#8b949e" }}>
            <span>Less</span>
            {[EMPTY_COLOR, ...GREEN_SHADES].map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-sm"
                style={{ width: 9, height: 9, backgroundColor: color }}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Categories */}
        <div className="px-1 sm:px-2 py-2">
          {categories.map((cat) => {
            const isCollapsed = collapsed[cat.name] ?? false;

            return (
              <div key={cat.name}>
                {/* Category header — clickable */}
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center gap-1.5 px-2 py-1 rounded transition-colors duration-100 hover:bg-[#1c2128] group"
                >
                  <ChevronIcon open={!isCollapsed} />
                  <FolderIcon open={!isCollapsed} />
                  <span className="font-mono text-xs" style={{ color: "#e6edf3" }}>
                    {cat.icon}
                  </span>
                  <span className="font-mono text-[10px] ml-auto" style={{ color: "#484f58" }}>
                    {cat.skills.length} {cat.skills.length === 1 ? "item" : "items"}
                  </span>
                </button>

                {/* Skills within this category */}
                {!isCollapsed && (
                  <div className="ml-5 pl-3 border-l border-[#21262d]">
                    {cat.skills.map((skill) => {
                      const key = `${cat.name}/${skill.name}`;
                      const squareColors = getSquareColors(skill.level);
                      const isHovered = hoveredRow === key;

                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 sm:gap-3 py-0.5 px-2 rounded transition-colors duration-150"
                          style={{
                            backgroundColor: isHovered ? "rgba(48, 54, 61, 0.4)" : "transparent",
                          }}
                          onMouseEnter={() => setHoveredRow(key)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          {/* File icon */}
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="#8b949e" className="shrink-0">
                            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
                          </svg>

                          {/* Skill name */}
                          <span
                            className="font-mono text-[10px] sm:text-xs shrink-0 text-left"
                            style={{
                              color: isHovered ? "#e6edf3" : "#8b949e",
                              width: "clamp(65px, 18vw, 110px)",
                            }}
                          >
                            {skill.name}
                          </span>

                          {/* Squares */}
                          <div className="flex items-center gap-[2px] sm:gap-[3px]">
                            {squareColors.map((color, i) => (
                              <span
                                key={i}
                                className="inline-block rounded-sm transition-[filter] duration-150 w-2 h-2 sm:w-3 sm:h-3"
                                style={{
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
                            className="text-[10px] sm:text-xs shrink-0 hidden sm:inline"
                            style={{ color: "#484f58" }}
                          >
                            {skill.level}/5
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
