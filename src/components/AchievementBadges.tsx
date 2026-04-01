"use client";

import { useState } from "react";

interface Badge {
  id: string;
  name: string;
  description: string;
  color: string;
  level?: number;
  icon: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (simple hand-drawn shapes, 24x24 viewBox)        */
/* ------------------------------------------------------------------ */

function RocketIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 7 7 7 13l5 5 5-5c0-6-5-11-5-11z" />
      <path d="M12 18v4" />
      <path d="M7 13l-3 2 2 3" />
      <path d="M17 13l3 2-2 3" />
      <circle cx="12" cy="10" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

function CommitIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <circle cx="6" cy="6" r="1" fill={color} stroke="none" />
      <circle cx="18" cy="6" r="1" fill={color} stroke="none" />
      <circle cx="6" cy="18" r="1" fill={color} stroke="none" />
      <circle cx="18" cy="18" r="1" fill={color} stroke="none" />
    </svg>
  );
}

function MoonBugIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12.5A8.5 8.5 0 0111.5 4a6.5 6.5 0 108.5 8.5z" />
      <circle cx="15" cy="15" r="3" />
      <line x1="13.5" y1="13.5" x2="12" y2="12" />
      <line x1="16.5" y1="13.5" x2="18" y2="12" />
      <line x1="13.5" y1="16.5" x2="12" y2="18" />
      <line x1="16.5" y1="16.5" x2="18" y2="18" />
    </svg>
  );
}

function PullRequestIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="5" r="2.5" />
      <circle cx="7" cy="19" r="2.5" />
      <circle cx="17" cy="19" r="2.5" />
      <line x1="7" y1="7.5" x2="7" y2="16.5" />
      <path d="M17 16.5V10a3 3 0 00-3-3h-2" />
      <polyline points="14 5 12 7 14 9" />
    </svg>
  );
}

function NetworkIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5" r="1.5" />
      <circle cx="19" cy="5" r="1.5" />
      <circle cx="5" cy="19" r="1.5" />
      <circle cx="19" cy="19" r="1.5" />
      <line x1="10" y1="10.5" x2="6.2" y2="6.5" />
      <line x1="14" y1="10.5" x2="17.8" y2="6.5" />
      <line x1="10" y1="13.5" x2="6.2" y2="17.5" />
      <line x1="14" y1="13.5" x2="17.8" y2="17.5" />
    </svg>
  );
}

function StackIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,7 12,12 2,7" />
      <polyline points="2,12 12,17 22,12" />
      <polyline points="2,17 12,22 22,17" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge data                                                         */
/* ------------------------------------------------------------------ */

const BADGES: Badge[] = [
  {
    id: "first-deploy",
    name: "First Deploy",
    description: "Shipped first production app",
    color: "#3fb950",
    icon: <RocketIcon color="#3fb950" />,
  },
  {
    id: "100-commits",
    name: "100+ Commits",
    description: "Consistent contributor",
    color: "#539bf5",
    level: 3,
    icon: <CommitIcon color="#539bf5" />,
  },
  {
    id: "3am-debugger",
    name: "3AM Debugger",
    description: "Fixed production at 3AM",
    color: "#8957e5",
    icon: <MoonBugIcon color="#8957e5" />,
  },
  {
    id: "pull-shark",
    name: "Pull Shark",
    description: "50+ PRs merged",
    color: "#f0883e",
    level: 2,
    icon: <PullRequestIcon color="#f0883e" />,
  },
  {
    id: "microservice-architect",
    name: "Microservice Architect",
    description: "Built 5+ microservices",
    color: "#e3b341",
    icon: <NetworkIcon color="#e3b341" />,
  },
  {
    id: "full-stack",
    name: "Full Stack",
    description: "Frontend + Backend + DevOps",
    color: "#f85149",
    icon: <StackIcon color="#f85149" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Hexagon badge shape (SVG clip-path style)                          */
/* ------------------------------------------------------------------ */

function HexBadge({ badge }: { badge: Badge }) {
  const [hovered, setHovered] = useState(false);

  const glowOpacity = hovered ? 0.45 : 0.2;
  const ringOpacity = hovered ? 0.7 : 0.35;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-3 rounded-lg border border-[#30363d] p-5 backdrop-blur-sm transition-all duration-300"
      style={{
        background: "rgba(13, 17, 23, 0.80)",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        boxShadow: hovered
          ? `0 0 24px 2px ${badge.color}33, 0 0 48px 4px ${badge.color}1a`
          : "none",
      }}
    >
      {/* Hexagonal badge icon */}
      <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
        {/* Glow layer */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${badge.color} 0%, transparent 70%)`,
            opacity: glowOpacity,
            filter: "blur(8px)",
          }}
        />

        {/* Hexagon ring */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: ringOpacity }}
        >
          <polygon
            points="28,2 50,15 50,41 28,54 6,41 6,15"
            fill="none"
            stroke={badge.color}
            strokeWidth="1.5"
          />
        </svg>

        {/* Hex filled background */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="absolute inset-0"
        >
          <polygon
            points="28,2 50,15 50,41 28,54 6,41 6,15"
            fill={badge.color}
            fillOpacity="0.08"
          />
        </svg>

        {/* Icon centered */}
        <div className="relative z-10">
          {badge.icon}
        </div>
      </div>

      {/* Level indicator */}
      {badge.level && (
        <span
          className="absolute top-3 right-3 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold"
          style={{
            color: badge.color,
            background: `${badge.color}1a`,
            border: `1px solid ${badge.color}33`,
          }}
        >
          x{badge.level}
        </span>
      )}

      {/* Badge name */}
      <span
        className="font-mono text-sm font-bold leading-tight text-center"
        style={{ color: "#e6edf3" }}
      >
        {badge.name}
      </span>

      {/* Description */}
      <span
        className="text-center text-xs leading-snug"
        style={{ color: "#8b949e" }}
      >
        {badge.description}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function AchievementBadges() {
  return (
    <section className="w-full py-12">
      {/* Section heading */}
      <div className="mb-8 flex items-center gap-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8b949e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="10,1 13,7 19,7 14,11.5 16,18 10,14 4,18 6,11.5 1,7 7,7" />
        </svg>
        <h2 className="font-mono text-base font-semibold" style={{ color: "#e6edf3" }}>
          Achievements
        </h2>
        <span className="rounded-full px-2 py-0.5 font-mono text-xs" style={{ color: "#8b949e", background: "rgba(110,118,129,0.1)", border: "1px solid #30363d" }}>
          {BADGES.length}
        </span>
      </div>

      {/* Badge grid: 2 cols mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {BADGES.map((badge) => (
          <HexBadge key={badge.id} badge={badge} />
        ))}
      </div>
    </section>
  );
}
