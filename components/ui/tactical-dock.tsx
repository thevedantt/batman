"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { House, User, Cpu, Briefcase, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", link: "#", icon: House },
  { name: "Identity", link: "#identity", icon: User },
  { name: "Systems", link: "#projects", icon: Cpu },
  { name: "Mission", link: "#mission-logs", icon: Briefcase },
  { name: "Resume", link: "/vedantpython%20developer%20resume.pdf", icon: FileText, download: true },
  { name: "Contact", link: "#contact", icon: Mail },
];

export const TacticalIconDock = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide dock after hero section (approx 100vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Update active section
      const sections = ["identity", "projects", "mission-logs", "contact"];
      let current = "#";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = `#${section}`;
          }
        }
      }
      
      if (window.scrollY < 100) current = "#";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-3"
        >
          {/* Microdetail label */}
          <motion.p 
            animate={{ opacity: isHovered ? 0.4 : 0.2 }}
            className="mr-4 font-mono text-[0.5rem] uppercase tracking-[0.5em] text-white"
          >
            NAV_NODE_v01
          </motion.p>

          <motion.div
            layout
            className={cn(
              "flex flex-row gap-6 rounded-full border border-red-500/30 bg-black/90 p-4 shadow-[0_0_25px_rgba(193,18,31,0.2)] transition-all duration-500",
              isHovered ? "px-8" : "px-6"
            )}
            style={{
              backdropFilter: "blur(12px)",
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.link;

              return (
                <a
                  key={item.name}
                  href={item.link}
                  download={item.download ? "vedant_python_developer_resume.pdf" : undefined}
                  className="group relative flex flex-col items-center gap-1 outline-none"
                >
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <Icon 
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive ? "text-[#c1121f]" : "text-white/70 group-hover:text-white"
                      )} 
                    />
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "absolute -bottom-6 whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.2em]",
                          isActive ? "text-[#c1121f]" : "text-white/40"
                        )}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </motion.div>

          {/* Microdetail Bottom */}
          <motion.div 
            animate={{ opacity: isHovered ? 0.3 : 0.1 }}
            className="mr-4 flex flex-row gap-4 font-mono text-[0.4rem] uppercase tracking-[0.3em] text-white"
          >
            <span className="text-[#c1121f]">OS_LINK_ACTIVE</span>
            <span>GOTHAM_SYSTEMS</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
