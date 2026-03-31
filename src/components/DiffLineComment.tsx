"use client";

import { useState } from "react";

interface DiffLineCommentProps {
  annotation: string;
  children: React.ReactNode;
}

export default function DiffLineComment({ annotation, children }: DiffLineCommentProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group">
      {/* Blue + button on hover */}
      <button
        className="absolute left-0 top-0 w-5 h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{ color: "#539bf5" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label="Show annotation"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4Z" />
          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2Zm13 1v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />
        </svg>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute left-6 top-0 z-20 px-3 py-1.5 rounded-md border text-xs max-w-[250px] whitespace-normal"
          style={{
            backgroundColor: "#1c2128",
            borderColor: "#30363d",
            color: "#c9d1d9",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Arrow */}
          <div
            className="absolute -left-1 top-2 w-2 h-2 rotate-45 border-l border-b"
            style={{ backgroundColor: "#1c2128", borderColor: "#30363d" }}
          />
          {annotation}
        </div>
      )}

      {children}
    </div>
  );
}
