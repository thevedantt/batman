"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const roles = [
  '"AI Engineer"',
  '"Python Developer"',
  '"Multi-Agent Architect"',
  '"Full-Stack Developer"',
  '"GenAI Builder"',
  '"RAG Engineer"',
  '"AI Systems Architect"',
  '"Problem Solver"',
];

const AnimatedTextRoller = () => {
  const [index, setIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(56);
  const itemRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!itemRef.current) return;
    setItemHeight(itemRef.current.offsetHeight);
  }, []);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        I AM
      </p>
      <div
        className="overflow-hidden"
        style={{ height: `${itemHeight}px` }}
      >
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${index * itemHeight}px)` }}
        >
          {roles.map((role, i) => (
            <p
              key={`${role}-${i}`}
              ref={i === 0 ? itemRef : undefined}
              className={cn(
                "h-12 sm:h-14 flex items-center justify-start font-heading text-4xl sm:text-5xl text-foreground",
                "drop-shadow-[0_0_12px_rgba(193,18,31,0.35)]",
              )}
            >
              {role}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTextRoller;
