"use client";

import { sections } from "@/lib/sectionRegistry";
import { useActiveSection } from "@/lib/ScrollSectionContext";

function FileIcon({ type }: { type: string }) {
  if (type === "folder") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#54aeff" className="shrink-0">
        <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.465 0 .909.184 1.237.513l.987.987h6.776A1.75 1.75 0 0 1 16 4.25v7.5A1.75 1.75 0 0 1 14.25 13.5H1.75A1.75 1.75 0 0 1 0 11.75V2.75c0-.465.184-.909.513-1.237Z" />
      </svg>
    );
  }
  if (type === "diff") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#3fb950" className="shrink-0">
        <path d="M8.75 1.75V5H12a.75.75 0 0 1 0 1.5H8.75v3.25a.75.75 0 0 1-1.5 0V6.5H4a.75.75 0 0 1 0-1.5h3.25V1.75a.75.75 0 0 1 1.5 0ZM4 13h8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5Z" />
      </svg>
    );
  }
  if (type === "graph" || type === "log") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#e3b341" className="shrink-0">
        <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
      </svg>
    );
  }
  if (type === "md") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e" className="shrink-0">
        <path d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e" className="shrink-0">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}

export default function FileTreeSidebar() {
  const { activeSection } = useActiveSection();

  return (
    <div className="hidden lg:block sticky top-20 h-fit w-48 shrink-0">
      <div
        className="rounded-lg border overflow-hidden font-mono text-xs"
        style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
      >
        {/* Header */}
        <div
          className="px-3 py-2 border-b text-[11px] font-semibold"
          style={{ borderColor: "#30363d", backgroundColor: "#161b22", color: "#e6edf3" }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#8b949e">
              <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.465 0 .909.184 1.237.513l.987.987h6.776A1.75 1.75 0 0 1 16 4.25v7.5A1.75 1.75 0 0 1 14.25 13.5H1.75A1.75 1.75 0 0 1 0 11.75V2.75c0-.465.184-.909.513-1.237Z" />
            </svg>
            src/
          </div>
        </div>

        {/* File entries */}
        <div className="py-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-1 transition-colors duration-150"
                style={{
                  backgroundColor: isActive ? "rgba(56, 139, 253, 0.15)" : "transparent",
                  color: isActive ? "#e6edf3" : "#8b949e",
                  borderLeft: isActive ? "2px solid #539bf5" : "2px solid transparent",
                }}
              >
                <FileIcon type={section.icon} />
                <span className="truncate">{section.filename}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
