"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/lib/sectionRegistry";
import { useActiveSection } from "@/lib/ScrollSectionContext";

export default function GitBranchConnections() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<{ d: string; color: string; id: string }[]>([]);
  const { activeSection } = useActiveSection();

  useEffect(() => {
    function calculatePaths() {
      const newPaths: { d: string; color: string; id: string }[] = [];
      const container = document.querySelector("[data-spine-container]");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const colors = ["#539bf5", "#3fb950", "#8957e5", "#e3b341", "#f85149"];

      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const startY = rect.top + scrollTop - containerRect.top - scrollTop + 20;
        const startX = 24; // spine center
        const endX = 48; // content start
        const midY = startY + 30;

        const d = `M ${startX} ${startY} C ${startX + 15} ${startY}, ${endX - 5} ${midY}, ${endX} ${midY}`;
        newPaths.push({
          d,
          color: colors[i % colors.length],
          id: section.id,
        });
      });

      setPaths(newPaths);
    }

    calculatePaths();
    const throttledCalc = () => requestAnimationFrame(calculatePaths);
    window.addEventListener("resize", throttledCalc);
    window.addEventListener("scroll", throttledCalc);

    return () => {
      window.removeEventListener("resize", throttledCalc);
      window.removeEventListener("scroll", throttledCalc);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
    >
      {paths.map((path) => {
        const isActive = activeSection === path.id;
        return (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={isActive ? 2 : 1}
            opacity={isActive ? 0.8 : 0.2}
            className="transition-all duration-500"
            strokeDasharray={isActive ? "none" : "4 4"}
          />
        );
      })}
    </svg>
  );
}
