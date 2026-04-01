"use client";

import { useEffect, useState, useRef, useCallback } from "react";

function spawnParticles(x: number, y: number, toDark: boolean) {
  const count = 18;
  const chars = "01{};<>/=()";
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const dist = 30 + Math.random() * 60;
    const char = chars[Math.floor(Math.random() * chars.length)];
    span.textContent = char;
    span.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      z-index: 10000;
      pointer-events: none;
      font-family: monospace;
      font-size: ${9 + Math.random() * 5}px;
      color: ${toDark ? "#3fb950" : "#539bf5"};
      opacity: 1;
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    document.body.appendChild(span);
    requestAnimationFrame(() => {
      span.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 180}deg)`;
      span.style.opacity = "0";
    });
    setTimeout(() => span.remove(), 650);
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [rotating, setRotating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggle = (e: React.MouseEvent) => {
    const next = !dark;
    setRotating(true);
    setTimeout(() => setRotating(false), 500);

    const x = e.clientX;
    const y = e.clientY;

    spawnParticles(x, y, next);

    const applyTheme = () => {
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    };

    // Try View Transitions API first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docAny = document as any;
    if (typeof docAny.startViewTransition === "function") {
      docAny.startViewTransition(applyTheme);
    } else {
      // Fallback: ripple effect
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        background-color: ${next ? "#060606" : "#fafafa"};
        --ripple-x: ${x}px;
        --ripple-y: ${y}px;
      `;
      ripple.classList.add("theme-ripple");
      document.body.appendChild(ripple);

      requestAnimationFrame(applyTheme);

      setTimeout(() => ripple.remove(), 700);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 w-7 h-7 rounded-md flex items-center justify-center border transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: dark ? "#161b22" : "#f6f8fa",
        borderColor: dark ? "#30363d" : "#d0d7de",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={dark ? "#e3b341" : "#539bf5"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500"
        style={{ transform: rotating ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {dark ? (
          // Sun icon
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          // Moon icon
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
