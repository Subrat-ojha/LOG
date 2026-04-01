"use client";

import { useActiveSection } from "@/lib/ScrollSectionContext";
import { sections } from "@/lib/sectionRegistry";

export default function StatusBar() {
  const { activeSection } = useActiveSection();

  const currentSection = sections.find((s) => s.id === activeSection);
  const filename = currentSection?.filename ?? "hero.tsx";

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t font-mono text-[11px] select-none"
      style={{
        height: 24,
        backgroundColor: "#161b22",
        borderColor: "#30363d",
        color: "#8b949e",
      }}
    >
      {/* Left side */}
      <div className="flex h-full items-center">
        {/* Branch indicator */}
        <div
          className="flex h-full items-center gap-1 px-2"
          style={{ backgroundColor: "#238636", color: "#ffffff" }}
        >
          {/* Git branch icon */}
          <svg
            width={12}
            height={12}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
          </svg>
          <span>main</span>
        </div>

        {/* Sync icon */}
        <button
          className="flex h-full items-center px-1.5 transition-colors hover:brightness-125"
          style={{ color: "#8b949e" }}
          aria-label="Sync"
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.001 7.001 0 0 1 15 8a.75.75 0 0 1-1.5 0A5.5 5.5 0 0 0 8 2.5zM1.75 8a.75.75 0 0 1 .75.75A5.5 5.5 0 0 0 8 13.5a5.487 5.487 0 0 0 4.131-1.869l-1.204-1.204A.25.25 0 0 1 11.104 10h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.001 7.001 0 0 1 1 8.75.75.75 0 0 1 1.75 8z" />
          </svg>
        </button>

        {/* Error/warning count */}
        <div className="flex h-full items-center gap-1.5 px-2">
          {/* Error icon (circle-x) */}
          <span className="flex items-center gap-0.5">
            <svg
              width={12}
              height={12}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2.343 13.657A8 8 0 1 1 13.657 2.343 8 8 0 0 1 2.343 13.657zM6.03 4.97a.75.75 0 0 0-1.06 1.06L6.94 8 4.97 9.97a.75.75 0 1 0 1.06 1.06L8 9.06l1.97 1.97a.75.75 0 1 0 1.06-1.06L9.06 8l1.97-1.97a.75.75 0 0 0-1.06-1.06L8 6.94 6.03 4.97z" />
            </svg>
            <span>0</span>
          </span>
          {/* Warning icon (triangle) */}
          <span className="flex items-center gap-0.5">
            <svg
              width={12}
              height={12}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575zM8 5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5zm1 6a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
            </svg>
            <span>0</span>
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex h-full items-center">
        {/* Current section filename */}
        <div
          className="flex h-full items-center px-2 transition-colors"
          style={{ borderLeft: "1px solid #30363d" }}
        >
          {filename}
        </div>

        {/* UTF-8 */}
        <div
          className="flex h-full items-center px-2"
          style={{ borderLeft: "1px solid #30363d" }}
        >
          UTF-8
        </div>

        {/* TypeScript JSX */}
        <div
          className="flex h-full items-center px-2"
          style={{ borderLeft: "1px solid #30363d" }}
        >
          TypeScript JSX
        </div>

        {/* Bell / notification icon */}
        <button
          className="flex h-full items-center px-2 transition-colors hover:brightness-125"
          style={{ borderLeft: "1px solid #30363d", color: "#8b949e" }}
          aria-label="Notifications"
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 16a2 2 0 0 0 1.985-1.75H6.015A2 2 0 0 0 8 16zm5.659-3.417A1.747 1.747 0 0 1 12 11.049V7c0-2.525-1.6-4.676-3.855-5.498A1.25 1.25 0 0 0 8 .25a1.25 1.25 0 0 0-.145 1.252C5.6 2.324 4 4.475 4 7v4.049a1.747 1.747 0 0 1-1.659 1.534A.75.75 0 0 0 2 13.5h12a.75.75 0 0 0-.341-.917z" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
