"use client";

import { useState } from "react";

const LABELS = [
  { name: "Java", color: "#f0883e" },
  { name: "Spring Boot", color: "#3fb950" },
  { name: "Microservices", color: "#a371f7" },
  { name: "Docker", color: "#388bfd" },
  { name: "AWS", color: "#ffa657" },
  { name: "React", color: "#38bdf8" },
  { name: "Kubernetes", color: "#326ce5" },
  { name: "Hibernate", color: "#59666c" },
];

const ABOUT_JSON = `{
  "name": "Subrat Ojha",
  "role": "Java Developer",
  "company": "IbaseIt Inc.",
  "location": "India",
  "focus": [
    "Backend systems",
    "Finite state machine frameworks",
    "Complex state transitions & workflow logic"
  ],
  "stack": {
    "backend": ["Java", "Spring Boot", "Hibernate"],
    "infra": ["Docker", "Kubernetes", "AWS"],
    "frontend": "React (when needed)"
  },
  "education": {
    "degree": "MCA",
    "college": "Krupajal Engineering College",
    "years": "2022–2024"
  },
  "experience": "1+ years at IbaseIt + 1.5 years freelancing",
  "interests": [
    "Solving hard problems",
    "Writing on Medium",
    "Shipping side projects"
  ],
  "links": {
    "github": "github.com/Subrat-ojha",
    "medium": "medium.com/@subratojha",
    "email": "iamsubratojha@gmail.com"
  }
}`;

// Syntax highlight JSON
function highlightJSON(json: string) {
  return json.split("\n").map((line, i) => {
    const highlighted = line
      // Keys
      .replace(
        /"([^"]+)"(?=\s*:)/g,
        '<span style="color:#79c0ff">"$1"</span>'
      )
      // String values
      .replace(
        /:\s*"([^"]+)"/g,
        ': <span style="color:#a5d6ff">"$1"</span>'
      )
      // Array string values (not keys)
      .replace(
        /^\s*"([^"]+)"(,?)$/gm,
        (match) => {
          // Only apply if it doesn't contain a colon (not a key-value pair)
          if (match.includes(":")) return match;
          return match.replace(
            /"([^"]+)"/,
            '<span style="color:#a5d6ff">"$1"</span>'
          );
        }
      )
      // Brackets and braces
      .replace(/([{}[\]])/g, '<span style="color:#8b949e">$1</span>');

    return (
      <div key={i} className="flex">
        <span
          className="select-none text-right pr-4 shrink-0"
          style={{ color: "#484f58", width: "3ch" }}
        >
          {i + 1}
        </span>
        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    );
  });
}

export default function PullRequestAbout() {
  const [activeTab, setActiveTab] = useState<"conversation" | "files">("conversation");

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* PR Header */}
      <div className="px-4 sm:px-5 py-4 border-b" style={{ borderColor: "#21262d" }}>
        {/* Title row */}
        <div className="flex items-start gap-2 flex-wrap">
          <h3
            className="text-base sm:text-lg font-semibold leading-tight"
            style={{ color: "#e6edf3" }}
          >
            feat: add developer profile
          </h3>
          <span className="font-mono text-sm" style={{ color: "#484f58" }}>
            #42
          </span>
        </div>

        {/* Status + meta */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {/* Open badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#238636] text-white">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
            </svg>
            Open
          </span>

          <span className="text-xs" style={{ color: "#8b949e" }}>
            <strong style={{ color: "#c9d1d9" }}>subrat-ojha</strong> wants to merge into{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#1f2937", color: "#79c0ff" }}
            >
              main
            </code>{" "}
            from{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: "#1f2937", color: "#79c0ff" }}
            >
              feature/about-me
            </code>
          </span>
        </div>

        {/* Labels */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {LABELS.map((label) => (
            <span
              key={label.name}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: `${label.color}1a`,
                color: label.color,
                border: `1px solid ${label.color}33`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b px-4 sm:px-5"
        style={{ borderColor: "#21262d", backgroundColor: "#161b22" }}
      >
        <button
          onClick={() => setActiveTab("conversation")}
          className="relative px-3 py-2.5 text-xs font-medium transition-colors"
          style={{
            color: activeTab === "conversation" ? "#e6edf3" : "#8b949e",
          }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z" />
            </svg>
            Description
          </span>
          {activeTab === "conversation" && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
              style={{ backgroundColor: "#f78166" }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className="relative px-3 py-2.5 text-xs font-medium transition-colors"
          style={{
            color: activeTab === "files" ? "#e6edf3" : "#8b949e",
          }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
            </svg>
            Files changed
            <span
              className="ml-1 inline-flex items-center justify-center rounded-full px-1.5 text-[10px]"
              style={{ backgroundColor: "#30363d", color: "#8b949e" }}
            >
              1
            </span>
          </span>
          {activeTab === "files" && (
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
              style={{ backgroundColor: "#f78166" }}
            />
          )}
        </button>
      </div>

      {/* Content area */}
      <div className="px-4 sm:px-5 py-4">
        {activeTab === "conversation" ? (
          /* Conversation / Description tab */
          <div>
            {/* PR Author comment */}
            <div
              className="rounded-md border overflow-hidden"
              style={{ borderColor: "#30363d" }}
            >
              {/* Comment header */}
              <div
                className="flex items-center gap-2 px-3 py-2 text-xs border-b"
                style={{
                  backgroundColor: "#161b22",
                  borderColor: "#30363d",
                  color: "#8b949e",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: "#238636", color: "#fff" }}
                >
                  S
                </div>
                <strong style={{ color: "#c9d1d9" }}>subrat-ojha</strong>
                <span>commented</span>
              </div>

              {/* Comment body */}
              <div className="px-4 py-3" style={{ backgroundColor: "#0d1117" }}>
                <p className="text-sm leading-relaxed" style={{ color: "#c9d1d9" }}>
                  Java developer at{" "}
                  <strong style={{ color: "#e6edf3" }}>IbaseIt Inc.</strong> building
                  backend systems using{" "}
                  <strong style={{ color: "#e6edf3" }}>finite state machine</strong>{" "}
                  frameworks to manage complex state transitions and workflow logic.
                </p>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#c9d1d9" }}>
                  Day-to-day I work with{" "}
                  <strong style={{ color: "#e6edf3" }}>Spring Boot</strong>,{" "}
                  <strong style={{ color: "#e6edf3" }}>Hibernate</strong>, and{" "}
                  <strong style={{ color: "#e6edf3" }}>microservices</strong> —
                  containerized with Docker, orchestrated with Kubernetes, deployed on
                  AWS. I also do React on the frontend when needed.
                </p>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#c9d1d9" }}>
                  Before this I freelanced for about a year and a half, building
                  full-stack apps for various clients. Did my MCA from{" "}
                  <strong style={{ color: "#e6edf3" }}>
                    Krupajal Engineering College
                  </strong>{" "}
                  (2022–2024).
                </p>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#c9d1d9" }}>
                  I like solving hard problems, writing about what I learn on{" "}
                  <a
                    href="https://medium.com/@subratojha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "#539bf5" }}
                  >
                    Medium
                  </a>
                  , and shipping side projects when I get the time.
                </p>
              </div>
            </div>

            {/* Review approval */}
            <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "#8b949e" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#3fb950">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: "#8957e5", color: "#fff" }}
              >
                R
              </div>
              <span>
                <strong style={{ color: "#c9d1d9" }}>recruiter-bot</strong> approved
                these changes —{" "}
                <span style={{ color: "#3fb950" }}>
                  &quot;LGTM, strong profile. Ready to merge.&quot;
                </span>
              </span>
            </div>

            {/* Stats bar */}
            <div
              className="mt-4 pt-3 flex items-center gap-4 text-xs font-mono"
              style={{ borderTop: "1px solid #21262d", color: "#8b949e" }}
            >
              <span>1+ yrs experience</span>
              <span style={{ color: "#30363d" }}>|</span>
              <span>20+ projects</span>
              <span style={{ color: "#30363d" }}>|</span>
              <span>India</span>
            </div>
          </div>
        ) : (
          /* Files changed tab — code editor */
          <div>
            {/* File header */}
            <div
              className="flex items-center justify-between px-3 py-2 rounded-t-md border border-b-0"
              style={{
                backgroundColor: "#161b22",
                borderColor: "#30363d",
              }}
            >
              <div className="flex items-center gap-2 text-xs">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="#8b949e">
                  <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
                </svg>
                <span style={{ color: "#e6edf3" }}>about.json</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span style={{ color: "#3fb950" }}>+32</span>
                <span style={{ color: "#f85149" }}>-0</span>
              </div>
            </div>

            {/* Code content */}
            <div
              className="rounded-b-md border overflow-x-auto font-mono text-[12px] leading-5 p-3"
              style={{
                backgroundColor: "#0d1117",
                borderColor: "#30363d",
                color: "#c9d1d9",
              }}
            >
              {highlightJSON(ABOUT_JSON)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
