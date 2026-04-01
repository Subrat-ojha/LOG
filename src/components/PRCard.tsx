"use client";

import { useState, useEffect } from "react";

interface PRCardProps {
  number: number;
  title: string;
  desc: string;
  status: "open" | "merged" | "draft";
  tags: string[];
  additions?: number;
  deletions?: number;
  url?: string;
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Java 17+":         { bg: "rgba(219, 124,  38, 0.16)", text: "#f0883e" },
  Java:               { bg: "rgba(219, 124,  38, 0.16)", text: "#f0883e" },
  "Spring Boot":      { bg: "rgba( 63, 185,  80, 0.16)", text: "#3fb950" },
  "Spring Data JPA":  { bg: "rgba( 63, 185,  80, 0.16)", text: "#3fb950" },
  Docker:             { bg: "rgba( 56, 132, 244, 0.16)", text: "#388bfd" },
  AWS:                { bg: "rgba(255, 166,  87, 0.16)", text: "#ffa657" },
  Oracle:             { bg: "rgba(248,  81,  73, 0.16)", text: "#f85149" },
  Multithreading:     { bg: "rgba(163, 113, 247, 0.16)", text: "#a371f7" },
  Sockets:            { bg: "rgba(137, 87,  229, 0.16)", text: "#8957e5" },
  "React.js":         { bg: "rgba( 56, 189, 248, 0.16)", text: "#38bdf8" },
  PostgreSQL:         { bg: "rgba( 56, 132, 244, 0.16)", text: "#388bfd" },
};

const FALLBACK_COLORS = [
  { bg: "rgba(139, 148, 158, 0.16)", text: "#8b949e" },
];

function getTagColor(tag: string) {
  return TAG_COLORS[tag] ?? FALLBACK_COLORS[0];
}

function PRIcon({ status }: { status: PRCardProps["status"] }) {
  if (status === "merged") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#8957e5" className="shrink-0 mt-0.5">
        <path d="M5 3.254V3.25v.005a.75.75 0 1 1 0-.005v.004zm.45 1.9a2.25 2.25 0 1 0-1.95.218v5.256a2.25 2.25 0 1 0 1.5 0V7.124A5.5 5.5 0 0 0 9.5 9h.5a2.25 2.25 0 1 0 0-1.5h-.5A4 4 0 0 1 5.45 5.154zM4.25 13.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm6.5-5.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
      </svg>
    );
  }
  if (status === "draft") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e" className="shrink-0 mt-0.5">
        <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L3.463 11.098l-.585 2.047 2.048-.586 8.61-8.61a.25.25 0 0 0 0-.354L12.427 2.487Z" />
      </svg>
    );
  }
  // open
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#3fb950" className="shrink-0 mt-0.5">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

function StatusBadge({ status }: { status: PRCardProps["status"] }) {
  const styles: Record<typeof status, string> = {
    open: "bg-[#238636] text-white",
    merged: "bg-[#8957e5] text-white",
    draft: "bg-[#30363d] text-[#8b949e]",
  };
  const labels: Record<typeof status, string> = {
    open: "Open",
    merged: "Merged",
    draft: "Draft",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function PRCard({
  number,
  title,
  desc,
  status,
  tags,
  additions = 0,
  deletions = 0,
  url,
}: PRCardProps) {
  const total = additions + deletions;
  const addPct = total > 0 ? (additions / total) * 100 : 50;

  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block rounded-lg border border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md p-4 transition-all duration-200 hover:border-[#539bf5] hover:shadow-[0_0_20px_rgba(83,155,245,0.1)]"
    >
      {/* Top row: icon + number + title + status */}
      <div className="flex items-start gap-3">
        <PRIcon status={status} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm text-[#8b949e]">#{number}</span>
            <span className="text-[#e6edf3] font-bold text-base leading-tight">
              {title}
            </span>
            <StatusBadge status={status} />
          </div>

          {/* Description */}
          <p className="mt-1.5 text-sm text-[#8b949e] leading-relaxed">
            {desc}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => {
              const color = getTagColor(tag);
              return (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: color.bg, color: color.text }}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* File change stats + progress bar */}
          {total > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-xs">
                <span className="text-[#3fb950]">+{formatNumber(additions)}</span>
                {" "}
                <span className="text-[#f85149]">-{formatNumber(deletions)}</span>
              </span>
              <div className="h-1.5 flex-1 max-w-[160px] overflow-hidden rounded-full bg-[#21262d] flex">
                <div
                  className="h-full bg-[#3fb950] transition-all"
                  style={{ width: `${addPct}%` }}
                />
                <div
                  className="h-full bg-[#f85149] transition-all"
                  style={{ width: `${100 - addPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const staticProjects: PRCardProps[] = [
  {
    number: 1,
    title: "Gratis",
    desc: "Full-stack application with microservices architecture",
    status: "open",
    tags: ["Java 17+", "Spring Boot", "Docker", "AWS"],
    additions: 2400,
    deletions: 180,
  },
  {
    number: 2,
    title: "Hospital Management System",
    desc: "Patient & doctor management with appointment scheduling",
    status: "merged",
    tags: ["Spring Boot", "Spring Data JPA", "Oracle"],
    additions: 1850,
    deletions: 320,
  },
  {
    number: 3,
    title: "MultiThreaded Web Server",
    desc: "Concurrent web server with Java threading and socket programming",
    status: "merged",
    tags: ["Java", "Multithreading", "Sockets"],
    additions: 960,
    deletions: 45,
  },
  {
    number: 4,
    title: "InPlace",
    desc: "Location-based service for local events and meetups",
    status: "merged",
    tags: ["Spring Boot", "React.js", "PostgreSQL"],
    additions: 1200,
    deletions: 210,
  },
];

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
}

const LANG_TAG: Record<string, { bg: string; text: string }> = {
  Java: { bg: "rgba(219, 124, 38, 0.16)", text: "#f0883e" },
  JavaScript: { bg: "rgba(241, 224, 90, 0.16)", text: "#f1e05a" },
  TypeScript: { bg: "rgba(49, 120, 198, 0.16)", text: "#3178c6" },
  Python: { bg: "rgba(53, 114, 165, 0.16)", text: "#3572a5" },
  HTML: { bg: "rgba(227, 76, 38, 0.16)", text: "#e34c26" },
  CSS: { bg: "rgba(86, 61, 124, 0.16)", text: "#563d7c" },
};

export default function ProjectPRCards() {
  const [liveRepos, setLiveRepos] = useState<GitHubRepo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/repos")
      .then((r) => r.json())
      .then((data) => {
        if (data.repos?.length > 0) setLiveRepos(data.repos);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Merge: use static as base, overlay live repos that match by name, append new ones
  const staticNames = new Set(staticProjects.map((p) => p.title.toLowerCase()));
  const extraRepos = liveRepos.filter(
    (r) => !staticNames.has(r.name.toLowerCase())
  );

  const dynamicCards: PRCardProps[] = extraRepos.slice(0, 3).map((repo, i) => {
    const tags = [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics.filter((t) => t !== repo.language?.toLowerCase()),
    ].slice(0, 4);

    // Register dynamic language colors
    if (repo.language && !(repo.language in TAG_COLORS) && repo.language in LANG_TAG) {
      TAG_COLORS[repo.language] = LANG_TAG[repo.language];
    }

    return {
      number: staticProjects.length + i + 1,
      title: repo.name,
      desc: repo.description,
      status: "open" as const,
      tags,
      url: repo.url,
    };
  });

  const allProjects = [...staticProjects, ...dynamicCards];

  return (
    <div className="flex flex-col gap-3">
      {allProjects.map((project) => (
        <PRCard key={project.number} {...project} />
      ))}
      {!loaded && (
        <div className="text-xs font-mono text-[#8b949e] animate-pulse">
          Fetching repos from GitHub...
        </div>
      )}
    </div>
  );
}
