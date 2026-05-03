"use client";

import {
  useEffect,
  useRef,
  type FormEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/** Brand strokes — lucide-react@1.14 in this repo does not ship Github/Linkedin icons. */
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

type ContactChannel = {
  key: string;
  label: string;
  value: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
};

const channels: ContactChannel[] = [
  {
    key: "email",
    label: "EMAIL",
    value: "vedanttalekar1705@gmail.com",
    href: "mailto:vedanttalekar1705@gmail.com",
    icon: <Mail className="h-6 w-6" aria-hidden />,
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/vedant-talekar-055910208",
    href: "https://www.linkedin.com/in/vedant-talekar-055910208/",
    external: true,
    icon: <LinkedinGlyph className="h-6 w-6" aria-hidden />,
  },
  {
    key: "github",
    label: "GITHUB",
    value: "github.com/thevedantt",
    href: "https://github.com/thevedantt",
    external: true,
    icon: <GithubGlyph className="h-6 w-6" aria-hidden />,
  },
  {
    key: "phone",
    label: "CONTACT NUMBER",
    value: "+91 9321793949",
    href: "tel:+919321793949",
    icon: <Phone className="h-6 w-6" aria-hidden />,
  },
];

export function GothamContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-terminal-reveal-header > *", {
        opacity: 0,
        y: 28,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });

      gsap.from(".contact-terminal-info-card", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.11,
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
        },
      });

      gsap.from(".contact-terminal-form-shell", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      gsap.from(".contact-terminal-meta-row", {
        opacity: 0,
        y: 12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
        },
      });

      gsap.to(".contact-terminal-grid-pulse", {
        opacity: 0.55,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".contact-terminal-ambient-drift", {
        xPercent: 4,
        yPercent: -3,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      name ? `Portfolio contact — ${name}` : "Portfolio contact"
    );
    const body = encodeURIComponent(
      [
        name && `Name: ${name}`,
        email && `Reply-to: ${email}`,
        "",
        message || "(No message body)",
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:vedanttalekar1705@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(193,18,31,0.06),transparent_60%)]" />
      
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-5 lg:max-w-3xl"
        >
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.6em] text-[#c1121f]">
              SECURE_COMMUNICATION
            </p>
            <div className="h-px w-20 bg-[#c1121f]/40" />
          </div>
          <h2 className="font-heading text-6xl leading-[0.85] text-[#eaeaea] sm:text-7xl lg:text-8xl">
            GET IN <span className="text-[#c1121f]">TOUCH</span>
          </h2>
          <p className="max-w-xl text-sm leading-8 text-white/70 sm:text-base lg:text-lg">
            Request system access, discuss architectural collaborations, or initiate secure
            intelligence sharing missions.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid gap-10 lg:grid-cols-2 lg:gap-20"
        >
          <div className="flex flex-col gap-4">
            {channels.map((ch) => (
              <motion.div
                key={ch.key}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <Card
                  className={cn(
                    "contact-terminal-info-card group rounded-xl border border-white/12 bg-black transition-colors duration-200",
                    "border-l-2 border-l-[#c1121f] hover:border-white/25 hover:border-l-[#c1121f]"
                  )}
                >
                  <CardContent className="flex flex-row items-start gap-4 p-5 sm:p-6">
                    <div className="contact-terminal-icon-well mt-0.5 shrink-0">
                      {ch.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs uppercase tracking-[0.34em] text-white/45 sm:text-sm">
                        {ch.label}
                      </p>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          {...(ch.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-2.5 block break-all text-base leading-relaxed text-white underline decoration-[#c1121f] decoration-1 underline-offset-[6px] transition-colors hover:text-[#c1121f] hover:decoration-white sm:text-lg"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <span className="mt-2.5 block text-base text-white sm:text-lg">
                          {ch.value}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="contact-terminal-form-shell"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <Card className="rounded-xl border border-white/15 bg-black">
              <CardHeader className="gap-2 border-b-2 border-b-[#c1121f] px-6 pb-5 pt-6 sm:px-8">
                <p className="inline-flex w-fit bg-white px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-black sm:text-[0.62rem]">
                  OUTBOUND_UPLINK
                </p>
                <p className="font-heading text-2xl tracking-wide text-white">
                  SECURE MESSAGE
                </p>
              </CardHeader>
              <CardContent className="gap-6 px-6 py-7 sm:px-8 sm:py-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="contact-name"
                      className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/55"
                    >
                      Name
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your Name"
                      required
                      className="contact-terminal-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="contact-email"
                      className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/55"
                    >
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      required
                      className="contact-terminal-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="contact-message"
                      className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/55"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="contact-terminal-field min-h-[140px] resize-y"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className={cn(
                      "contact-terminal-send h-11 w-full rounded-lg border-2 border-white bg-[#c1121f] px-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-white transition-colors duration-200",
                      "hover:bg-white hover:text-black hover:border-white",
                      "active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1121f]"
                    )}
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="contact-terminal-meta-row flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/15 pt-8 font-mono text-[0.62rem] uppercase tracking-[0.38em] text-white/45 sm:justify-between">
          <span className="text-white/55">COMMUNICATION_NODE</span>
          <span className="font-semibold text-[#c1121f]">STATUS: ACTIVE</span>
          <span className="text-white/55">SECURE_CHANNEL</span>
        </div>
      </div>
    </section>
  );
}
