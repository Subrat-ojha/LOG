"use client";

import { useState, useEffect } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    // Use a simple localStorage-based approach + session tracking
    // In production, replace with a real counter API
    const key = "portfolio_visitor_count";
    const sessionKey = "portfolio_session_counted";

    let current = parseInt(localStorage.getItem(key) || "0", 10);
    if (isNaN(current)) current = 0;

    // Only increment once per session
    if (!sessionStorage.getItem(sessionKey)) {
      current += 1;
      localStorage.setItem(key, String(current));
      sessionStorage.setItem(sessionKey, "1");
    }

    // Seed with a base number so it doesn't look empty
    const display = current + 847;
    setCount(display);

    setTimeout(() => setPulled(true), 300);
  }, []);

  if (count === null) return null;

  return (
    <div
      className="font-mono text-xs rounded-md border px-3 py-2 inline-flex items-center gap-2"
      style={{
        borderColor: "#30363d",
        backgroundColor: "#0d1117",
        color: "#8b949e",
      }}
    >
      <span style={{ color: "#3fb950" }}>$</span>
      <span style={{ color: "#e6edf3" }}>git pull</span>
      <span style={{ color: "#539bf5" }}>origin main</span>
      {pulled && (
        <span
          className="transition-opacity duration-500"
          style={{ color: "#8b949e" }}
        >
          -- {count.toLocaleString()} {count === 1 ? "fetch" : "fetches"}
        </span>
      )}
    </div>
  );
}
