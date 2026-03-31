"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { sections } from "./sectionRegistry";

interface ScrollSectionContextType {
  activeSection: string;
}

const ScrollSectionContext = createContext<ScrollSectionContextType>({
  activeSection: "hero",
});

export function ScrollSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length > 0) {
      setActiveSection(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "-10% 0px -10% 0px",
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <ScrollSectionContext.Provider value={{ activeSection }}>
      {children}
    </ScrollSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ScrollSectionContext);
}
