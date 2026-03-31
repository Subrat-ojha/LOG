"use client";

import { useState, useRef } from "react";

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  previewSrc?: string;
  className?: string;
}

export default function LinkPreview({
  href,
  children,
  previewSrc,
  className = "",
}: LinkPreviewProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top });
    timeoutRef.current = setTimeout(() => setShow(true), 300);
  };

  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  };

  const imgSrc =
    previewSrc ||
    `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-primary hover:underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-all ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
      {show && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden p-1.5 animate-preview-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt="Preview"
              className="w-[240px] h-[150px] object-cover rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
