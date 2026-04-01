"use client";

import { useState, useEffect, useMemo } from "react";

interface ContributionDay {
  date: string;
  count: number; // 0-4 level from GitHub
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

function getEventLabel(type: string): string {
  switch (type) {
    case "PushEvent":
      return "Pushed to";
    case "PullRequestEvent":
      return "Opened PR on";
    case "WatchEvent":
      return "Starred";
    case "CreateEvent":
      return "Created branch in";
    case "DeleteEvent":
      return "Deleted branch in";
    case "IssuesEvent":
      return "Opened issue on";
    case "IssueCommentEvent":
      return "Commented on";
    case "ForkEvent":
      return "Forked";
    case "ReleaseEvent":
      return "Released on";
    case "PullRequestReviewEvent":
      return "Reviewed PR on";
    case "PullRequestReviewCommentEvent":
      return "Reviewed PR on";
    default:
      return type.replace("Event", "") + " on";
  }
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const LEVEL_COLORS = [
  "#161b22", // 0 - none
  "#0e4429", // 1
  "#006d32", // 2
  "#26a641", // 3
  "#39d353", // 4
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalYear, setTotalYear] = useState<number | null>(null);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contribRes, eventsRes] = await Promise.all([
          fetch("/api/github"),
          fetch(
            "https://api.github.com/users/Subrat-ojha/events/public?per_page=5&page=1"
          ),
        ]);

        if (contribRes.ok) {
          const data = await contribRes.json();
          setContributions(data.days || []);
          if (data.totalContributions != null) {
            setTotalYear(data.totalContributions);
          }
        }

        if (eventsRes.ok && eventsRes.status !== 403) {
          const evData = await eventsRes.json();
          setEvents(evData);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { grid, totalContributions, monthLabels } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = today.getDay();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));

    // Show ~52 weeks (full year) but cap display at 20 weeks for compact view
    const displayWeeks = 20;
    const totalDays = displayWeeks * 7;
    const startDate = new Date(endOfWeek);
    startDate.setDate(endOfWeek.getDate() - totalDays + 1);

    // Build a lookup from contributions
    const levelMap: Record<string, number> = {};
    for (const day of contributions) {
      levelMap[day.date] = day.count;
    }

    const weeks: { date: string; level: number; dayOfWeek: number }[][] = [];
    const mLabels: { weekIndex: number; label: string }[] = [];
    let total = 0;
    let lastMonth = -1;

    const cursor = new Date(startDate);
    for (let w = 0; w < displayWeeks; w++) {
      const week: { date: string; level: number; dayOfWeek: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = cursor.toISOString().slice(0, 10);
        const dow = cursor.getDay();

        if (d === 0) {
          const month = cursor.getMonth();
          if (month !== lastMonth) {
            mLabels.push({ weekIndex: w, label: MONTH_LABELS[month] });
            lastMonth = month;
          }
        }

        if (cursor <= today) {
          const level = levelMap[dateStr] ?? 0;
          total += level > 0 ? 1 : 0; // count days with contributions
          week.push({ date: dateStr, level, dayOfWeek: dow });
        } else {
          week.push({ date: dateStr, level: -1, dayOfWeek: dow }); // future
        }

        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }

    return { grid: weeks, totalContributions: total, monthLabels: mLabels };
  }, [contributions]);

  const recentEvents = events.slice(0, 3);
  const contribLabel = totalYear != null
    ? `${totalYear.toLocaleString()} contributions in the last year`
    : `${totalContributions} active days in the last 20 weeks`;

  return (
    <div
      className="font-mono rounded-lg border overflow-hidden"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-3 sm:px-4 py-2.5 sm:py-3 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <span className="text-[11px] sm:text-xs" style={{ color: "#c9d1d9" }}>
          {contribLabel}
        </span>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: "#8b949e" }}>
          <span>Less</span>
          {LEVEL_COLORS.map((color) => (
            <div
              key={color}
              className="rounded-[2px]"
              style={{
                width: 10,
                height: 10,
                backgroundColor: color,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 sm:px-4 py-3 overflow-x-auto">
        <div className="flex gap-0">
          {/* Day labels column */}
          <div
            className="flex flex-col text-[10px] pr-2 shrink-0"
            style={{ color: "#8b949e", gap: 3 }}
          >
            <div style={{ height: 14 }} />
            {[0, 1, 2, 3, 4, 5, 6].map((d) => (
              <div
                key={d}
                className="flex items-center"
                style={{ height: 11 }}
              >
                {d === 1 ? "Mon" : d === 3 ? "Wed" : d === 5 ? "Fri" : ""}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex" style={{ gap: 3 }}>
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                {/* Month label */}
                <div
                  className="text-[10px] h-[14px] flex items-end"
                  style={{ color: "#8b949e" }}
                >
                  {monthLabels.find((m) => m.weekIndex === wi)?.label || ""}
                </div>
                {/* Day cells */}
                {week.map((day, di) => {
                  if (loading) {
                    return (
                      <div
                        key={di}
                        className="rounded-[2px] animate-pulse"
                        style={{
                          width: 11,
                          height: 11,
                          backgroundColor: "#161b22",
                        }}
                      />
                    );
                  }
                  const isFuture = day.level === -1;
                  return (
                    <div
                      key={di}
                      className="rounded-[2px]"
                      title={
                        isFuture
                          ? undefined
                          : `${day.date}: level ${day.level}`
                      }
                      style={{
                        width: 11,
                        height: 11,
                        backgroundColor: isFuture
                          ? "#0d1117"
                          : LEVEL_COLORS[day.level] || "#161b22",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-[11px] mt-2" style={{ color: "#8b949e" }}>
            Could not load activity
          </p>
        )}
      </div>

      {/* Recent events */}
      {recentEvents.length > 0 && (
        <div
          className="px-3 sm:px-4 py-3 border-t flex flex-col gap-1.5"
          style={{ borderColor: "#30363d" }}
        >
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs flex items-center gap-1.5 truncate"
              style={{ color: "#c9d1d9" }}
            >
              <span>{getEventLabel(event.type)}</span>
              <span style={{ color: "#539bf5" }}>{event.repo.name}</span>
              <span className="ml-auto shrink-0 text-[10px]" style={{ color: "#8b949e" }}>
                {timeAgo(event.created_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
