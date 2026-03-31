"use client";

import { sections } from "@/lib/sectionRegistry";
import { useActiveSection } from "@/lib/ScrollSectionContext";

export default function CommitSpine() {
  const { activeSection } = useActiveSection();

  return (
    <div className="hidden md:flex flex-col items-center sticky top-0 h-screen py-20 w-12">
      {/* Main vertical line */}
      <div className="relative flex-1 w-px bg-[#30363d]">
        {sections.map((section, i) => {
          const isActive = activeSection === section.id;
          const top = `${((i + 0.5) / sections.length) * 100}%`;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="absolute left-1/2 -translate-x-1/2 group"
              style={{ top }}
              title={section.label}
            >
              {/* Glow ring */}
              <div
                className="absolute inset-0 -m-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? "rgba(63, 185, 80, 0.2)" : "transparent",
                  boxShadow: isActive ? "0 0 12px rgba(63, 185, 80, 0.4)" : "none",
                  width: 18,
                  height: 18,
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                }}
              />
              {/* Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                style={{
                  borderColor: isActive ? "#3fb950" : "#30363d",
                  backgroundColor: isActive ? "#3fb950" : "#0d1117",
                }}
              />
            </a>
          );
        })}

        {/* Animated progress line */}
        <div
          className="absolute top-0 left-0 w-full transition-all duration-500 ease-out"
          style={{
            height: `${((sections.findIndex((s) => s.id === activeSection) + 1) / sections.length) * 100}%`,
            background: "linear-gradient(to bottom, #3fb950, #539bf5)",
          }}
        />
      </div>
    </div>
  );
}
