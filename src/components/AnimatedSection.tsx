"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "stagger" | "parallax";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: AnimationVariant;
  staggerDelay?: number;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  variant = "fade-up",
  staggerDelay = 80,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (variant === "parallax") {
      const handleScroll = () => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = 1 - rect.top / viewportHeight;
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      };

      const onScroll = () => requestAnimationFrame(handleScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [variant]);

  if (variant === "parallax") {
    const translateY = (1 - scrollProgress) * 30;
    const opacity = Math.min(scrollProgress * 1.5, 1);
    return (
      <div
        ref={ref}
        className={className}
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          transition: "transform 0.1s linear, opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    );
  }

  if (variant === "stagger" && visible) {
    const staggeredChildren = Children.map(children, (child, i) => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, {
          className: `stagger-child ${(child as React.ReactElement<{ className?: string }>).props.className || ""}`,
          style: {
            ...((child as React.ReactElement<{ style?: React.CSSProperties }>).props.style || {}),
            animationDelay: `${delay + i * staggerDelay}ms`,
          },
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={className}>
        {staggeredChildren}
      </div>
    );
  }

  const variantClasses: Record<string, { hidden: string; visible: string }> = {
    "fade-up": {
      hidden: "opacity-0 translate-y-4",
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      hidden: "opacity-0 -translate-x-4",
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      hidden: "opacity-0 translate-x-4",
      visible: "opacity-100 translate-x-0",
    },
    stagger: {
      hidden: "opacity-0 translate-y-4",
      visible: "opacity-100 translate-y-0",
    },
  };

  const classes = variantClasses[variant] || variantClasses["fade-up"];

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${
        visible ? classes.visible : classes.hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
