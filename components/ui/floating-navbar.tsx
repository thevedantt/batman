"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
    download?: boolean | string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is in upper-mid area
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      if (item.link.startsWith("#") && item.link.length > 1) {
        const element = document.querySelector(item.link);
        if (element) observer.observe(element);
      }
    });

    // Special case for top of page and visibility blocking
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("#");
      }
      
      const isPastLanding = window.scrollY > window.innerHeight * 0.95;
      if (!isPastLanding) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;
      
      // Calculate if we've reached the Identity section (approx at the end of the first viewport)
      const isPastLanding = window.scrollY > window.innerHeight * 0.95;

      if (!isPastLanding) {
        setVisible(false);
      } else {
        // Show when scrolling up, hide when scrolling down, but ONLY after landing
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-full border border-red-500/50 bg-black/60 px-4 py-2 shadow-[0_0_20px_rgba(220,38,38,0.15)] backdrop-blur-md">
          {/* Nav items container */}
          <div className="flex items-center gap-2">
            {navItems.map((navItem, idx: number) => {
              const isActive = activeSection === navItem.link || (navItem.link === "#" && activeSection === "#");
              return (
                <a
                  key={`link-${idx}`}
                  href={navItem.link}
                  download={navItem.download}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-red-500/10 hover:text-white",
                    isActive 
                      ? "bg-red-500/20 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                      : "text-white/70"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-red-500/40"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
