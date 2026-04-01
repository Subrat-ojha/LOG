"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { sections, type SectionEntry } from "@/lib/sectionRegistry";

function SectionIcon({ type }: { type: SectionEntry["icon"] }) {
  const colors: Record<string, string> = {
    file: "#8b949e",
    folder: "#54aeff",
    diff: "#3fb950",
    graph: "#e3b341",
    log: "#e3b341",
    md: "#8b949e",
  };
  const c = colors[type] || "#8b949e";

  if (type === "folder") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill={c}>
        <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.465 0 .909.184 1.237.513l.987.987h6.776A1.75 1.75 0 0 1 16 4.25v7.5A1.75 1.75 0 0 1 14.25 13.5H1.75A1.75 1.75 0 0 1 0 11.75V2.75c0-.465.184-.909.513-1.237Z" />
      </svg>
    );
  }
  if (type === "diff") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill={c}>
        <path d="M8.75 1.75V5H12a.75.75 0 0 1 0 1.5H8.75v3.25a.75.75 0 0 1-1.5 0V6.5H4a.75.75 0 0 1 0-1.5h3.25V1.75a.75.75 0 0 1 1.5 0ZM4 13h8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5Z" />
      </svg>
    );
  }
  // Default: file/md/graph/log
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill={c}>
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}

function fuzzyMatch(query: string, text: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? sections.filter(
        (s) => fuzzyMatch(query, s.label) || fuzzyMatch(query, s.filename)
      )
    : sections;

  const navigate = useCallback(
    (section: SectionEntry) => {
      setOpen(false);
      setQuery("");
      setSelectedIndex(0);
      const el = document.getElementById(section.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  // Reset selection when filter results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.children;
    if (items[selectedIndex]) {
      (items[selectedIndex] as HTMLElement).scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[selectedIndex]) {
          navigate(filtered[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
        break;
    }
  }

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "min(20vh, 160px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={() => {
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 16px",
          borderRadius: 12,
          border: "1px solid #30363d",
          backgroundColor: "#0d1117",
          boxShadow: "0 16px 64px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
          fontSize: 14,
          color: "#e6edf3",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: "1px solid #30363d",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0, opacity: 0.5 }}
          >
            <path
              d="M10.68 11.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"
              fill="#8b949e"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a section name to navigate..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "#e6edf3",
              fontSize: 14,
              fontFamily: "inherit",
              caretColor: "#539bf5",
            }}
          />
          <kbd
            style={{
              fontSize: 11,
              padding: "2px 6px",
              borderRadius: 4,
              border: "1px solid #30363d",
              backgroundColor: "#161b22",
              color: "#8b949e",
              lineHeight: "16px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            maxHeight: 320,
            overflowY: "auto",
            padding: "4px 0",
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                color: "#8b949e",
                fontSize: 13,
              }}
            >
              No matching sections found.
            </div>
          ) : (
            filtered.map((section, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={section.id}
                  onClick={() => navigate(section)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "8px 16px",
                    border: "none",
                    borderLeft: isSelected
                      ? "2px solid #539bf5"
                      : "2px solid transparent",
                    backgroundColor: isSelected
                      ? "rgba(56, 139, 253, 0.15)"
                      : "transparent",
                    color: "#e6edf3",
                    fontSize: 14,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.1s",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <SectionIcon type={section.icon} />
                  </span>
                  <span style={{ flex: 1 }}>{section.label}</span>
                  <span
                    style={{
                      color: "#8b949e",
                      fontSize: 12,
                    }}
                  >
                    {section.filename}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hints */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "8px 16px",
            borderTop: "1px solid #30363d",
            color: "#8b949e",
            fontSize: 11,
          }}
        >
          <span>
            <kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> navigate
          </span>
          <span>
            <kbd style={kbdStyle}>↵</kbd> go to section
          </span>
          <span>
            <kbd style={kbdStyle}>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}

const kbdStyle: React.CSSProperties = {
  fontSize: 10,
  padding: "1px 4px",
  borderRadius: 3,
  border: "1px solid #30363d",
  backgroundColor: "#161b22",
  lineHeight: "14px",
};
