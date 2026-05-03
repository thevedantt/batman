"use client";

import { useEffect, useRef, type SVGProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const GithubGlyph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.45.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinGlyph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4V9h4v2" />
    <path d="M2 9h4v12H2z" />
    <path d="M4 3a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

const navLinks = [
  { label: "Identity", href: "#identity" },
  { label: "Gotham Systems", href: "#projects" },
  { label: "Mission Logs", href: "#mission-logs" },
  { label: "Tech Toolbox", href: "#tech-toolbox" },
  { label: "Contact", href: "#contact" },
] as const;

const socialChannels = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/thevedantt",
    icon: GithubGlyph,
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vedant-talekar-055910208/",
    icon: LinkedinGlyph,
    external: true,
  },
  {
    key: "mail",
    label: "Email",
    href: "mailto:vedanttalekar1705@gmail.com",
    icon: Mail,
  },
  {
    key: "phone",
    label: "Phone",
    href: "tel:+919321793949",
    icon: Phone,
  },
] as const;

export function GothamFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".gotham-footer-reveal", {
        opacity: 0,
        y: 12,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="gotham-footer relative mt-auto w-full border-t border-red-600/30 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(193,18,31,0.15),transparent_70%)] pointer-events-none" />
      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-9 pt-10 sm:px-8 lg:px-14 lg:pb-11 lg:pt-12 xl:px-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="gotham-footer-reveal flex flex-col gap-4"
          >
            <p className="inline-flex w-fit bg-red-600 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.45em] text-white sm:text-[0.65rem]">
              GOTHAM_NODE
            </p>
            <div>
              <p className="font-heading text-2xl font-normal tracking-wide text-white sm:text-3xl">
                VEDANT TALEKAR
              </p>
              <p className="mt-1.5 max-w-sm text-sm font-normal leading-relaxed text-white/60">
                AI Engineer • Full Stack Developer • AI Systems Builder
              </p>
            </div>
            <p className="max-w-sm text-xs font-normal leading-relaxed text-white/40 sm:text-sm">
              Building intelligent systems designed to survive Gotham.
            </p>
            <div className="flex items-center gap-2 font-mono text-[0.58rem] font-normal uppercase tracking-[0.3em] text-white/50">
              <span className="gotham-footer-status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" aria-hidden />
              <span className="text-white/70">STATUS:</span>
              <span className="bg-red-600 px-1.5 py-0.5 text-white font-bold">ACTIVE</span>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="gotham-footer-reveal flex flex-col gap-4 lg:items-center"
            aria-label="Footer navigation"
          >
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.42em] bg-white text-black px-2 py-0.5 sm:text-[0.65rem]">
              NAVIGATION
            </p>
            <ul className="flex flex-col gap-2.5 lg:items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex font-mono text-sm font-normal text-white transition-colors hover:text-white/80"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 bg-red-600 transition-[width] duration-200 ease-out group-hover:w-full"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div 
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="gotham-footer-reveal flex flex-col gap-4 lg:items-end"
          >
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.42em] bg-white text-black px-2 py-0.5 sm:text-[0.65rem] lg:text-right">
              SECURE_CHANNELS
            </p>
            <ul className="flex flex-wrap gap-2.5 lg:justify-end">
              {socialChannels.map(({ key, label, href, icon: Icon, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md border border-red-600/30 bg-black text-white transition-all duration-200",
                      "hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <hr className="gotham-footer-reveal mt-10 w-full border-0 border-t border-red-600/20" />

        <div className="gotham-footer-reveal mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center font-mono text-[0.65rem] font-normal uppercase tracking-[0.15em] text-white sm:text-left sm:text-xs">
            © 2026 Vedant Talekar. All Rights Reserved.
          </p>
          <p className="text-center font-heading text-xs font-normal uppercase tracking-[0.32em] text-white sm:text-right sm:text-sm">
            ENGINEERED IN GOTHAM
          </p>
        </div>

        <p className="gotham-footer-reveal mt-5 text-center font-mono text-[0.55rem] font-normal uppercase tracking-[0.22em] text-white sm:text-[0.58rem]">
          Powered by Next.js • GSAP • Three.js • AI Systems
        </p>
      </div>
    </footer>
  );
}
