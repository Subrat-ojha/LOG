"use client";

import { useState, useCallback } from "react";

type Resolution = "work" | "life" | "both" | null;

interface ConflictLine {
  text: string;
  section: "marker" | "work" | "life" | "merged";
}

const workLines = [
  '  focus: "shipping features"',
  '  fuel: "coffee"',
  '  hours: "9-to-whenever-it-works"',
  '  hobby: "debugging production"',
];

const lifeLines = [
  '  focus: "touching grass"',
  '  fuel: "sleep"',
  '  hours: "reasonable"',
  '  hobby: "not looking at screens"',
];

const mergedLines = [
  '  focus: "shipping features (and occasionally touching grass)"',
  '  fuel: "coffee + adequate sleep"',
  '  hours: "flexible"',
  '  hobby: "debugging production, then going outside"',
];

function buildConflictLines(): ConflictLine[] {
  return [
    { text: "<<<<<<< HEAD (work)", section: "marker" },
    ...workLines.map((t) => ({ text: t, section: "work" as const })),
    { text: "=======", section: "marker" },
    ...lifeLines.map((t) => ({ text: t, section: "life" as const })),
    { text: ">>>>>>> life", section: "marker" },
  ];
}

function buildResolvedLines(resolution: "work" | "life" | "both"): ConflictLine[] {
  if (resolution === "work") {
    return workLines.map((t) => ({ text: t, section: "work" as const }));
  }
  if (resolution === "life") {
    return lifeLines.map((t) => ({ text: t, section: "life" as const }));
  }
  return mergedLines.map((t) => ({ text: t, section: "merged" as const }));
}

export default function MergeConflict() {
  const [resolution, setResolution] = useState<Resolution>(null);
  const [animating, setAnimating] = useState(false);

  const resolve = useCallback((choice: "work" | "life" | "both") => {
    setAnimating(true);
    setTimeout(() => {
      setResolution(choice);
      setAnimating(false);
    }, 400);
  }, []);

  const reset = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setResolution(null);
      setAnimating(false);
    }, 400);
  }, []);

  const lines = resolution ? buildResolvedLines(resolution) : buildConflictLines();

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm rounded-md overflow-hidden border border-[#30363d] bg-[#0d1117]">
      {/* File header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-[#e6edf3]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            fill="#d29922"
          />
          <path
            d="M8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
            fill="#d29922"
          />
        </svg>
        <span className="text-[#e6edf3] text-xs">life-balance.yml</span>
        {!resolution && (
          <span className="ml-auto text-[#d29922] text-xs">1 conflict</span>
        )}
        {resolution && (
          <span className="ml-auto text-[#3fb950] text-xs">resolved</span>
        )}
      </div>

      {/* Code content */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => {
              const lineNum = i + 1;

              let rowBg = "transparent";
              let textColor = "#e6edf3";

              if (line.section === "marker") {
                textColor = "#f85149";
              } else if (line.section === "work") {
                rowBg = "rgba(56,139,253,0.08)";
              } else if (line.section === "life") {
                rowBg = "rgba(63,185,80,0.08)";
              } else if (line.section === "merged") {
                rowBg = "rgba(63,185,80,0.05)";
              }

              return (
                <tr key={`${resolution}-${i}`} style={{ background: rowBg }}>
                  <td
                    className="select-none text-right pr-3 pl-3 py-0.5 text-[#484f58] text-xs align-top border-r border-[#30363d] w-[1%] whitespace-nowrap"
                    aria-hidden="true"
                  >
                    {lineNum}
                  </td>
                  <td className="pl-4 pr-4 py-0.5 whitespace-pre" style={{ color: textColor }}>
                    {line.section === "marker" ? (
                      <span className="font-bold">
                        {renderMarker(line.text)}
                      </span>
                    ) : (
                      line.text
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer / actions */}
      <div className="border-t border-[#30363d] px-4 py-3 bg-[#161b22]">
        {!resolution ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={animating}
              onClick={() => resolve("work")}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#539bf5]/40 text-[#539bf5] bg-transparent hover:bg-[#539bf5]/10 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Accept Current (work)
            </button>
            <button
              type="button"
              disabled={animating}
              onClick={() => resolve("life")}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#3fb950]/40 text-[#3fb950] bg-transparent hover:bg-[#3fb950]/10 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Accept Incoming (life)
            </button>
            <button
              type="button"
              disabled={animating}
              onClick={() => resolve("both")}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#238636] text-[#ffffff] border border-[#238636] hover:bg-[#2ea043] transition-colors disabled:opacity-50 cursor-pointer"
            >
              Accept Both
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-[#3fb950] text-xs">
              Conflict resolved. 1 file changed.
            </span>
            <button
              type="button"
              disabled={animating}
              onClick={reset}
              className="text-xs text-[#539bf5] hover:underline cursor-pointer bg-transparent border-none p-0 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function renderMarker(text: string) {
  if (text.startsWith("<<<<<<<")) {
    const label = text.replace("<<<<<<< ", "");
    return (
      <>
        {"<<<<<<< "}
        <span style={{ color: "#539bf5" }}>{label}</span>
      </>
    );
  }
  if (text.startsWith(">>>>>>>")) {
    const label = text.replace(">>>>>>> ", "");
    return (
      <>
        {">>>>>>> "}
        <span style={{ color: "#3fb950" }}>{label}</span>
      </>
    );
  }
  return text;
}
