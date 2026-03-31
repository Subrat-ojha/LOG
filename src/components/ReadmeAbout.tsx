"use client";

export default function ReadmeAbout() {
  return (
    <div className="rounded-md border border-[#30363d] overflow-hidden">
      {/* File header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <div className="flex items-center gap-2 text-sm font-mono">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
          </svg>
          <span style={{ color: "#e6edf3" }}>README.md</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5" style={{ backgroundColor: "#0d1117" }}>
        <p className="text-[15px] leading-7" style={{ color: "#c9d1d9" }}>
          I&apos;m a java developer at{" "}
          <strong style={{ color: "#e6edf3" }}>IbaseIt Inc.</strong> where I build
          backend systems using{" "}
          <strong style={{ color: "#e6edf3" }}>finite state machine</strong> frameworks
          to manage complex state transitions and workflow logic.
        </p>

        <p className="mt-4 text-[15px] leading-7" style={{ color: "#c9d1d9" }}>
          Day-to-day I work with{" "}
          <strong style={{ color: "#e6edf3" }}>Spring Boot</strong>,{" "}
          <strong style={{ color: "#e6edf3" }}>Hibernate</strong>, and{" "}
          <strong style={{ color: "#e6edf3" }}>microservices</strong> — containerized
          with Docker, orchestrated with Kubernetes, deployed on AWS. I also do
          React on the frontend when needed.
        </p>

        <p className="mt-4 text-[15px] leading-7" style={{ color: "#c9d1d9" }}>
          Before this I freelanced for about a year and a half, building full-stack
          apps with Java and Spring Boot for various clients. I did my MCA from{" "}
          <strong style={{ color: "#e6edf3" }}>Krupajal Engineering College</strong>{" "}
          (2022–2024).
        </p>

        <p className="mt-4 text-[15px] leading-7" style={{ color: "#c9d1d9" }}>
          I like solving hard problems, writing about what I learn on{" "}
          <a
            href="https://medium.com/@subratojha"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#539bf5" }}
            className="hover:underline"
          >
            Medium
          </a>
          , and shipping side projects when I get the time.
        </p>

        <div
          className="mt-5 pt-4 flex items-center gap-4 text-xs font-mono"
          style={{ borderTop: "1px solid #21262d", color: "#8b949e" }}
        >
          <span>1+ yrs experience</span>
          <span style={{ color: "#30363d" }}>/</span>
          <span>20+ projects</span>
          <span style={{ color: "#30363d" }}>/</span>
          <span>India</span>
        </div>
      </div>
    </div>
  );
}
