"use client";

import { useState, useEffect, useMemo } from "react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: Record<string, unknown>;
}

interface DayData {
  date: string;
  count: number;
  dayOfWeek: number;
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

function getColor(count: number): string {
  if (count === 0) return "#161b22";
  if (count <= 2) return "#0e4429";
  if (count <= 4) return "#006d32";
  if (count <= 7) return "#26a641";
  return "#39d353";
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEGEND_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const [res1, res2] = await Promise.all([
          fetch(
            "https://api.github.com/users/Subrat-ojha/events/public?per_page=100&page=1"
          ),
          fetch(
            "https://api.github.com/users/Subrat-ojha/events/public?per_page=100&page=2"
          ),
        ]);

        if (res1.status === 403 || res2.status === 403) {
          setError(true);
          setLoading(false);
          return;
        }

        const [data1, data2] = await Promise.all([
          res1.ok ? res1.json() : [],
          res2.ok ? res2.json() : [],
        ]);

        setEvents([...data1, ...data2]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const { grid, totalContributions, monthLabels } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = today.getDay(); // 0=Sun
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));

    const totalDays = 16 * 7;
    const startDate = new Date(endOfWeek);
    startDate.setDate(endOfWeek.getDate() - totalDays + 1);

    // Count events per day
    const countMap: Record<string, number> = {};
    for (const event of events) {
      const dateStr = event.created_at.slice(0, 10);
      countMap[dateStr] = (countMap[dateStr] || 0) + 1;
    }

    // Build grid: 16 columns (weeks), 7 rows (Sun=0 to Sat=6)
    const weeks: DayData[][] = [];
    const mLabels: { weekIndex: number; label: string }[] = [];
    let total = 0;
    let lastMonth = -1;

    const cursor = new Date(startDate);
    for (let w = 0; w < 16; w++) {
      const week: DayData[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = cursor.toISOString().slice(0, 10);
        const count = countMap[dateStr] || 0;
        const dow = cursor.getDay();

        // Track month label on first day of each week
        if (d === 0) {
          const month = cursor.getMonth();
          if (month !== lastMonth) {
            mLabels.push({ weekIndex: w, label: MONTH_LABELS[month] });
            lastMonth = month;
          }
        }

        // Only include days up to today
        if (cursor <= today) {
          total += count;
          week.push({ date: dateStr, count, dayOfWeek: dow });
        } else {
          week.push({ date: dateStr, count: -1, dayOfWeek: dow }); // future
        }

        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }

    return { grid: weeks, totalContributions: total, monthLabels: mLabels };
  }, [events]);

  const recentEvents = events.slice(0, 3);

  return (
    <div
      className="font-mono rounded-lg border overflow-hidden"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <span className="text-xs" style={{ color: "#c9d1d9" }}>
          {totalContributions} contributions in the last 16 weeks
        </span>
        <div className="flex items-center gap-1 text-[10px]" style={{ color: "#8b949e" }}>
          <span>Less</span>
          {LEGEND_COLORS.map((color) => (
            <div
              key={color}
              className="rounded-[2px]"
              style={{
                width: 11,
                height: 11,
                backgroundColor: color,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-0">
          {/* Day labels column */}
          <div
            className="flex flex-col text-[10px] pr-2 shrink-0"
            style={{ color: "#8b949e", gap: 3 }}
          >
            {/* Spacer for month labels row */}
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
                  const isFuture = day.count === -1;
                  return (
                    <div
                      key={di}
                      className="rounded-[2px]"
                      title={
                        isFuture
                          ? undefined
                          : `${day.date}: ${day.count} event${day.count !== 1 ? "s" : ""}`
                      }
                      style={{
                        width: 11,
                        height: 11,
                        backgroundColor: isFuture
                          ? "#0d1117"
                          : getColor(day.count),
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-[11px] mt-2" style={{ color: "#8b949e" }}>
            Could not load activity
          </p>
        )}
      </div>

      {/* Recent events */}
      {recentEvents.length > 0 && (
        <div
          className="px-4 py-3 border-t flex flex-col gap-1.5"
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
