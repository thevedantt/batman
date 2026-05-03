"use client";

import { useEffect, useMemo, useRef, useState, type SVGProps } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTextRoller from "@/components/shadcn-space/animated-text/animated-text-04";
import AnimatedTypingMotion from "@/components/shadcn-space/animated-text/animated-text-03";
import { AiHorizontalBar, EngineeringRadarDots } from "@/components/charts/gotham-chart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { GothamContactSection } from "@/components/gotham-contact-section";
import { GothamFooter } from "@/components/gotham-footer";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { type Project, parseProjects } from "@/lib/projects";
import { TacticalIconDock } from "@/components/ui/tactical-dock";
import {
  Home as HomeIcon,
  User,
  Briefcase,
  Terminal,
  Mail,
  GraduationCap,
  Shield,
  Brain,
  Database,
  Cpu,
  GaugeCircle,
  Award,
  BarChart3,
  BadgeCheck,
  Crosshair,
  PieChart,
  Gauge,
  Layers,
  AreaChart,
  LineChart,
  Code2,
  MonitorSmartphone,
  Server,
  FileText,
} from "lucide-react";

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
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

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
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

const HeroIdentityTransition = () => {
  return (
    <AnimatedTypingMotion 
      words={["VEDANT", "THEVEDANT"]} 
      delay={120} 
      pauseDuration={3000} 
    />
  );
};

interface TacticalIdentityWidgetProps {
  onToggleMusic: () => void;
  isPlaying: boolean;
}

const TacticalIdentityWidget = ({ onToggleMusic, isPlaying }: TacticalIdentityWidgetProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Auto-collapse after 4 seconds of landing
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsCollapsed(true);
    }
    
    // Hide entirely after landing section (100vh)
    if (latest > window.innerHeight * 0.95) {
      setIsSectionVisible(false);
    } else {
      setIsSectionVisible(true);
    }
  });

  const activeCollapsed = isCollapsed && !isHovered;

  return (
    <AnimatePresence>
      {isSectionVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          exit={{ opacity: 0, x: -50 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          layout
          onClick={onToggleMusic}
          animate={{
            width: activeCollapsed ? "48px" : "auto",
            padding: activeCollapsed ? "4px" : "8px 20px",
            opacity: 1,
            x: 0,
            borderColor: isPlaying ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed left-8 top-8 z-[100] flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-black shadow-[0_0_25px_rgba(0,0,0,0.6)] cursor-pointer hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(193,18,31,0.2)] group"
        >
          <div className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/5 shadow-inner transition-transform duration-500 ${isPlaying ? "scale-105" : "scale-100"}`}>
            <Image
              src="/lp/pfp.jpg"
              alt="Identity"
              fill
              className={`object-cover transition-all duration-700 ${isPlaying ? "brightness-110 saturate-110" : "grayscale-[0.3] opacity-80"}`}
            />
            {isPlaying && (
              <motion.div 
                className="absolute inset-0 border-2 border-red-500/50 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          
          <AnimatePresence>
            {!activeCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -15, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col pr-2"
              >
                <span className="font-heading text-lg tracking-[0.1em] text-white leading-none">
                  thevedant
                </span>
                <span className="font-mono text-[0.45rem] uppercase tracking-[0.4em] text-red-500/50 mt-1">
                  Auth_Level: 01
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const identityRef = useRef<HTMLElement | null>(null);
  const identityBgRef = useRef<HTMLDivElement | null>(null);
  const identityFogRef = useRef<HTMLDivElement | null>(null);
  const systemsRef = useRef<HTMLElement | null>(null);
  const gatewayRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);
  const [batmanMode, setBatmanMode] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL SYSTEMS");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [scrollYValue, setScrollYValue] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
        setIsMusicPlaying(true);
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  };

  useEffect(() => {
    // Attempt autoplay on mount
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      const attemptPlay = () => {
        audio.play()
          .then(() => setIsMusicPlaying(true))
          .catch(() => {
            console.log("Autoplay blocked. Waiting for user interaction.");
            // Add one-time listener to start audio on any user interaction
            const startOnInteraction = () => {
              audio.play().then(() => {
                setIsMusicPlaying(true);
                window.removeEventListener("click", startOnInteraction);
                window.removeEventListener("keydown", startOnInteraction);
              });
            };
            window.addEventListener("click", startOnInteraction);
            window.addEventListener("keydown", startOnInteraction);
          });
      };
      attemptPlay();
    }
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYValue(latest);
  });

  const navItems = [
    {
      name: "Home",
      link: "#",
      icon: <HomeIcon className="h-4 w-4 text-white" />,
    },
    {
      name: "Identity",
      link: "#identity",
      icon: <User className="h-4 w-4 text-white" />,
    },
    {
      name: "Systems",
      link: "#projects",
      icon: <Briefcase className="h-4 w-4 text-white" />,
    },
    {
      name: "Mission",
      link: "#mission-logs",
      icon: <Terminal className="h-4 w-4 text-white" />,
    },
    {
      name: "Resume",
      link: "/vedantpython%20developer%20resume.pdf",
      icon: <FileText className="h-4 w-4 text-white" />,
      download: "vedant_python_developer_resume.pdf",
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Mail className="h-4 w-4 text-white" />,
    },
  ];

  const filterOptions = useMemo(
    () => [
      { value: "ALL SYSTEMS", label: "ALL SYSTEMS" },
      { value: "AI SYSTEMS", label: "AI SYSTEMS" },
      { value: "MULTI-AGENT", label: "MULTI-AGENT" },
      { value: "FULL STACK", label: "FULL STACK" },
      { value: "ML TOOLS", label: "ML TOOLS" },
      { value: "EXPERIMENTAL", label: "EXPERIMENTAL" },
    ],
    []
  );


  const techIconMap = useMemo(
    () => ({
      "next.js": "/icons/nextjs.png",
      nextjs: "/icons/nextjs.png",
      react: "/icons/cover.jpg",
      typescript: "/icons/cover.jpg",
      python: "/icons/Python-logo-notext.svg.png",
      fastapi: "/icons/fastapi.png",
      django: "/icons/django.png",
      flask: "/icons/flask.jpg",
      firebase: "/icons/firebase.png",
      "postgresql": "/icons/PostgreSQL-Logo.wine.png",
      "neon postgresql": "/icons/PostgreSQL-Logo.wine.png",
      "sqlite": "/icons/SQLite-Logo.wine.png",
      chromadb: "/icons/chromadb.png",
      gemini: "/icons/gemini.png",
      "hugging face": "/icons/huggingface.png",
      "openai": "/icons/chatgpt-1.jpg",
      "langraph": "/icons/cover.jpg",
      "three.js": "/icons/cover.jpg",
      "tailwindcss": "/icons/cover.jpg",
      "shadcn/ui": "/icons/cover.jpg",
    }),
    []
  );

  const resolveTechIcon = (tech: string) => {
    const key = tech.toLowerCase();
    const direct = techIconMap[key as keyof typeof techIconMap];
    if (direct) return direct;
    if (key.includes("postgres")) return "/icons/PostgreSQL-Logo.wine.png";
    if (key.includes("sqlite")) return "/icons/SQLite-Logo.wine.png";
    if (key.includes("python")) return "/icons/Python-logo-notext.svg.png";
    if (key.includes("next")) return "/icons/nextjs.png";
    if (key.includes("firebase")) return "/icons/firebase.png";
    return "/icons/cover.jpg";
  };

  const resolveProjectImage = (project: Project) => {
    return `/projectspfp/${project.id}.png`;
  };

  useEffect(() => {
    let mounted = true;
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = (await response.json()) as { projects: Project[] };
        if (mounted) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error(error);
        if (mounted) {
          setProjects(parseProjects(""));
        }
      } finally {
        if (mounted) {
          setLoadingProjects(false);
        }
      }
    };
    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!identityRef.current) return;
    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(
        ".identity-reveal"
      );
      gsap.from(revealItems, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: identityRef.current,
          start: "top 75%",
        },
      });

      gsap.to(identityBgRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: identityRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(identityFogRef.current, {
        xPercent: 6,
        opacity: 0.75,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

    }, identityRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!missionRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".mission-reveal");
      gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 75%",
        },
      });
    }, missionRef);

    return () => ctx.revert();
  }, []);



  const handlePrivateAccess = (projectTitle: string) => {
    alert("Requested video is private!, please contact me on my email for access.");
    window.location.href = `mailto:vedanttalekar1705@gmail.com?subject=Access Request: ${projectTitle}&body=I would like to request access to the private video/source code for ${projectTitle}.`;
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL SYSTEMS") {
      return projects.slice(0, 9);
    }
    return projects
      .filter((project) => project.categories.includes(activeFilter))
      .slice(0, 9);
  }, [activeFilter, projects]);

  const achievements = [
    {
      title: "SIH 2025 FINALIST",
      image: "/price/SIH.jpeg",
      size: "tall",
      description:
        "Selected as a finalist for Smart India Hackathon 2025, one of India's largest innovation-driven hackathons focused on solving real-world problems through scalable technology and AI systems.",
      year: "2025",
      organization: "Smart India Hackathon",
      link: "https://www.linkedin.com/posts/vedant-talekar-055910208_last-year-we-couldnt-even-clear-the-sih-ugcPost-7406214471343562752-ol00?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTQ_UEBv4DWWWoc66d4Nm2TLosFrjmeGvA",
    },
    {
      title: "2nd Runner-Up — Avishkaar Season 2",
      image: "/price/aviseason2.jpeg",
      size: "tall",
      description:
        "National-level 48-hour hackathon powered by GeeksforGeeks focused on innovation, rapid problem-solving, and AI-driven solutions.",
      year: "2024",
      organization: "GeeksforGeeks · Avishkaar Season 2",
      link: "https://www.linkedin.com/posts/vedant-talekar-055910208_innovation-hackathon-nationalhackathon-ugcPost-7282420829802450944-OCQQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTQ_UEBv4DWWWoc66d4Nm2TLosFrjmeGvA",
    },
    {
      title: "2nd Runner-Up — HackUp 2026",
      image: "/price/hackup.jpeg",
      size: "tall",
      description:
        "Recognized at Navi Mumbai's largest hackathon hosted by HackTheCore for building innovative AI-powered systems and cybersecurity-focused solutions.",
      year: "2026",
      organization: "HackTheCore · HackUp 2026",
      link: "https://www.linkedin.com/posts/vedant-talekar-055910208_hackup2026-hackthecore-hackathon-share-7454879783600971776-Oa7Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTQ_UEBv4DWWWoc66d4Nm2TLosFrjmeGvA",
    },
    {
      title: "Winner — Vectors 2026 Project Competition",
      image: "/price/projectcomp.jpeg",
      size: "short",
      description:
        "Awarded at Vectors 2026 inter-college technical event for innovative project development and intelligent system implementation.",
      year: "2026",
      organization: "Vectors 2026",
    },
    {
      title: "Finalist — Avishkaar Season 3",
      image: "/price/aviseason3.jpeg",
      size: "short",
      description:
        "Advanced to finalist stage at the national-level Avishkaar Season 3 hackathon through scalable AI-driven innovation and system design.",
      year: "2025",
      organization: "Avishkaar Season 3",
      link: "https://www.linkedin.com/posts/vedant-talekar-055910208_aitam-aitamtekkali-avishkaars3-ugcPost-7413659538274390016-9PGU?utm_source=share&utm_medium=member_desktop&rcm=ACoAADTQ_UEBv4DWWWoc66d4Nm2TLosFrjmeGvA",
    },
    {
      title: "2nd Runner-Up — Prompt Mania",
      image: "/price/promptmania.jpeg",
      size: "short",
      description:
        "Recognized for advanced prompt engineering, AI workflow structuring, and creative problem-solving during Vectors 2026 technical event.",
      year: "2026",
      organization: "Vectors 2026",
    },
  ];

  const radarSkills = [
    { label: "Frontend Engineering", value: 92 },
    { label: "Backend Systems", value: 90 },
    { label: "AI / Machine Learning", value: 94 },
    { label: "Infrastructure", value: 84 },
    { label: "Security", value: 80 },
    { label: "Product Design", value: 88 },
  ];

  const aiRadialSkills = [
    { name: "PyTorch", value: 86, fill: "#fca5a5" },
    { name: "TensorFlow", value: 80, fill: "#fda4af" },
    { name: "scikit-learn", value: 92, fill: "#fecaca" },
    { name: "Transformers", value: 88, fill: "#f9a8d4" },
    { name: "Sentence Transformers", value: 86, fill: "#fbcfe8" },
    { name: "FAISS", value: 90, fill: "#fde68a" },
    { name: "ChromaDB", value: 84, fill: "#fdba74" },
    { name: "RAG Pipelines", value: 92, fill: "#bfdbfe" },
    { name: "Agentic AI Systems", value: 90, fill: "#bae6fd" },
    { name: "LoRA Fine-Tuning", value: 84, fill: "#a7f3d0" },
    { name: "OpenAI APIs", value: 90, fill: "#fecdd3" },
    { name: "Google Gemini API", value: 92, fill: "#fcd34d" },
  ];

  const tacticalSkillModules = [
    {
      title: "LANGUAGES",
      icon: Code2,
      skills: [
        { label: "Python", value: 95 },
        { label: "JavaScript", value: 88 },
        { label: "TypeScript", value: 86 },
        { label: "SQL", value: 82 },
        { label: "HTML/CSS", value: 92 },
      ],
    },
    {
      title: "FRONTEND ENGINEERING",
      icon: MonitorSmartphone,
      skills: [
        { label: "React", value: 92 },
        { label: "Next.js", value: 94 },
        { label: "Tailwind CSS", value: 95 },
        { label: "Three.js", value: 82 },
        { label: "GSAP", value: 84 },
        { label: "shadcn/ui", value: 90 },
      ],
    },
    {
      title: "BACKEND & AI SYSTEMS",
      icon: Server,
      skills: [
        { label: "FastAPI", value: 92 },
        { label: "REST APIs", value: 94 },
        { label: "OpenAI APIs", value: 90 },
        { label: "RAG Pipelines", value: 92 },
        { label: "Agentic AI Systems", value: 90 },
        { label: "PostgreSQL", value: 86 },
      ],
    },
  ];


  const certifications = [
    {
      title: "Certificate of Being Iconic — Tech Visionary",
      provider: "Department of AI & Data Science",
      year: "2026",
      description:
        "Awarded the title of “Tech Visionary” by the Department of Artificial Intelligence & Data Science for innovation, technical creativity, and impactful contribution during the academic journey.",
      image: "/certificates/iconic.jpeg",
      featured: true,
    },
    {
      title: "Winner — Project Competition (Vectors 26)",
      provider: "Vectors 26",
      year: "2026",
      description:
        "Secured First Position in the Project Competition event at Vectors 26 technical festival for innovative system development and technical execution.",
      image: "/certificates/projectcomp.jpeg",
    },
    {
      title: "2nd Runner-Up — Prompt Mania (Vectors 26)",
      provider: "Vectors 26",
      year: "2026",
      description:
        "Recognized for advanced prompt engineering, structured AI workflows, and creative AI-driven problem solving during Vectors 26.",
      image: "/certificates/prompt%20mania.jpeg",
    },
    {
      title: "SIH 2025 Finalist",
      provider: "Smart India Hackathon",
      year: "2025",
      description:
        "Finalist recognition at Smart India Hackathon 2025 for contributing to scalable AI-powered solutions and innovation-focused engineering.",
      image: "/certificates/sih.jpeg",
    },
    {
      title: "Full Stack Developer",
      provider: "Online Credential",
      year: "2023",
      image: "/certificates/fullstack.png",
    },
    {
      title: "Complete Computer Vision Bootcamp With PyTorch & TensorFlow",
      provider: "Online Credential",
      year: "2024",
      image: "/certificates/bootcampl.png",
    },
    {
      title: "Python & TensorFlow: Deep Dive into Machine Learning",
      provider: "Online Credential",
      year: "2024",
      image: "/certificates/python.png",
    },
    {
      title: "Deloitte Australia - Data Analytics Job Simulation",
      provider: "Online Credential",
      year: "2024",
      image: "/certificates/deloite.png",
    },
  ];


  const renderFallbackCards = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <Card
        key={`skeleton-${index}`}
        className="systems-card rounded-3xl"
      >
        <CardContent className="p-6">
          <div className="h-4 w-24 rounded-full bg-white/10" />
          <div className="mt-6 h-10 w-1/2 rounded-md bg-white/10" />
          <div className="mt-3 h-4 w-3/4 rounded-md bg-white/10" />
          <div className="mt-6 h-32 rounded-2xl bg-white/10" />
        </CardContent>
      </Card>
    ));
  };

  const experienceLogs = [
    {
      id: "findfake-services",
      icon: Terminal,
      period: "June 2025 — Present",
      status: "ACTIVE",
      role: "AI Engineer & Application Developer",
      entity: "FindFake Services · Navi Mumbai",
      link: "https://findfake.in/",
      description:
        "Building AI-powered image forgery detection workflows and integrating machine learning models into scalable application systems while developing a cross-platform Flutter application focused on modular architecture and performance-driven UI/UX.",
      metadata: ["STATUS: ACTIVE", "SECTOR: AI_SYSTEMS"],
      tags: ["Flutter", "FastAPI", "ML Pipelines", "Image Processing", "AI Systems"],
    },
    {
      id: "sentinel-ai",
      icon: Shield,
      period: "HackUp 2026",
      status: "ACTIVE",
      role: "AI Engineer & Application Developer",
      entity: "Sentinel AI — Unified AI-Powered Cyber Threat Intelligence & Defense Platform",
      description:
        "Worked on the initial research, architecture discussions, and implementation of Sentinel AI during my time at FindFake Services, contributing to full-stack dashboard systems, multi-layer AI detection pipelines, threat intelligence workflows, and ML-powered fraud analysis systems.",
      metadata: ["STATUS: ACTIVE", "SECTOR: DEFENSE_AI"],
      tags: ["FastAPI", "Next.js", "TypeScript", "BERT", "XGBoost"],
    },
  ];

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden gotham-bg ${batmanMode ? "mode-batman" : ""
        }`}
    >
      <div className="absolute inset-0 gotham-vignette" />
      <div className="absolute inset-0 gotham-noise" />
      <div className="absolute inset-0 gotham-fog" />

      <audio
        ref={audioRef}
        src="/bgm.mpeg"
        loop
        preload="auto"
      />

      <FloatingNav navItems={navItems} />
      <TacticalIconDock />

      <main className="relative z-10 flex min-h-screen w-full flex-col items-start justify-end px-8 pb-16 sm:px-12 sm:pb-24 lg:px-20 overflow-hidden">
        {/* Tactical Identity Widget - Top Left */}
        <TacticalIdentityWidget onToggleMusic={toggleMusic} isPlaying={isMusicPlaying} />

        {/* Full-screen Background Video for Hero */}
        <video 
          src="/lp/ogbatman.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Targeted overlay to hide "veo" watermark in bottom right */}
        <div className="absolute bottom-0 right-0 h-32 w-64 bg-gradient-to-tl from-black via-black/90 to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <HeroIdentityTransition />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 flex flex-col items-start gap-3"
          >
            <div className="h-px w-32 bg-gradient-to-r from-[#c1121f] to-transparent" />
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-white/40">
                Identity_Verification
              </p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.6em] text-[#c1121f] animate-pulse">
                System_Synchronization_Complete
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cinematic HUD elements */}
        <div className="absolute inset-x-12 top-24 flex justify-between pointer-events-none opacity-40">
          <div className="flex flex-col gap-2">
            <div className="h-[1px] w-12 bg-white/30" />
            <div className="font-mono text-[0.5rem] text-white/20 tracking-widest">GOTHAM_INTEL_v01</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-[1px] w-12 bg-white/30" />
            <div className="font-mono text-[0.5rem] text-white/20 tracking-widest">ACTIVE_NEURAL_LINK</div>
          </div>
        </div>
      </main>

      <section
        id="identity"
        ref={identityRef}
        className="relative w-full overflow-hidden py-24 lg:py-32"
      >
        <div ref={identityBgRef} className="absolute inset-0 identity-bg" />
        <div className="absolute inset-0 identity-overlay" />
        <div className="absolute inset-0 identity-vignette" />
        <div ref={identityFogRef} className="absolute inset-0 identity-fog" />
        <div className="absolute inset-0 identity-gradient" />

        <div className="relative z-10 flex w-full flex-col gap-10 pl-6 pr-4 sm:pl-10 sm:pr-6 lg:pl-14 lg:pr-10">
          <div className="identity-reveal">
            <p className="font-mono text-xs uppercase tracking-[0.6em] text-[#c1121f]">
              Classified Dossier
            </p>
            <h2 className="font-heading text-5xl leading-[0.9] text-[#eaeaea] sm:text-6xl">
              IDENTITY
            </h2>
            <div className="mt-7">
              <AnimatedTextRoller />
            </div>
            <div className="tactical-line mt-4" />
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{
                rotateY: 5,
                rotateX: -2,
                scale: 1.01,
                z: 10,
                transition: { type: "spring", stiffness: 200, damping: 20 }
              }}
              className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-[#111111]/90 px-6 py-5 shadow-2xl"
            >
              <h3 className="font-heading text-3xl text-[#eaeaea]">
                &quot;I don&apos;t just build applications.
                <br />
                I engineer intelligent systems designed for real-world impact.&quot;
              </h3>
              <p className="mt-4 text-base leading-7 text-[#a1a1aa]">
                Vedant Talekar is an AI-native Python developer focused on building multi-agent systems,
                intelligent automation platforms, and scalable AI-driven applications. His work combines
                backend architecture, GenAI workflows, and immersive full-stack experiences to create
                systems that are both technically robust and human-centered.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: "easeOut"
              }}
              whileHover={{
                rotateY: -5,
                rotateX: 2,
                scale: 1.01,
                z: 10,
                transition: { type: "spring", stiffness: 200, damping: 20 }
              }}
              className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-[#111111]/90 px-6 py-5 shadow-2xl"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                <div className="lg:max-w-sm">
                  <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#c1121f]">
                    Current Mission
                  </p>
                  <h3 className="mt-3 font-heading text-3xl text-[#eaeaea]">
                    Building AI-powered ecosystems through:
                  </h3>
                </div>
                <div className="grid flex-1 gap-3 text-sm text-[#a1a1aa] sm:grid-cols-2">
                  {[
                    "Multi-agent architectures",
                    "RAG systems",
                    "AI education platforms",
                    "Mental wellness AI",
                    "Intelligent automation",
                    "Full-stack AI applications",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-1 w-6 bg-[#c1121f]/60" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={systemsRef}
        className="gotham-systems relative w-full overflow-hidden py-24"
      >
        <div className="systems-fog" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="systems-header flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.6em] text-[#c1121f]">
                  GOTHAM DATABASE
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-[#c1121f]/40 to-transparent min-w-[100px]" />
              </div>
              <h2 className="font-heading text-6xl leading-[0.85] text-[#eaeaea] sm:text-7xl lg:text-8xl">
                GOTHAM <span className="text-[#c1121f]">SYSTEMS</span>
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
                A classified archive of AI infrastructures, multi-agent ecosystems, and intelligent
                digital systems engineered to solve real-world problems.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-zinc-500">
                FILTER_BY_CATEGORY
              </p>
              <ToggleGroup
                value={activeFilter}
                onValueChange={setActiveFilter}
                options={filterOptions}
                className="max-w-3xl border border-white/5 bg-black/40 p-1 rounded-xl backdrop-blur-sm"
              />
            </div>
          </motion.div>

          <div className="relative">
            <Separator className="bg-gradient-to-r from-[#c1121f]/50 via-white/10 to-transparent" />
            <div className="absolute -top-1 left-0 h-2 w-2 bg-[#c1121f] rounded-full blur-[2px]" />
          </div>

          <div className="systems-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingProjects && renderFallbackCards()}
            {!loadingProjects && (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Card
                    key={project.id}
                    className="systems-card group flex h-full flex-col rounded-3xl border-[#c1121f]/20 bg-[#0a0a0a] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#c1121f]/60 hover:shadow-[0_20px_45px_rgba(193,18,31,0.15)] transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(193,18,31,0.08),transparent_70%)]" />
                    <div className="systems-scanline" />

                    <CardHeader className="px-6 pt-6 relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#c1121f] animate-pulse" />
                          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white">
                            SYS_{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="border-white/10 bg-white/5 text-[0.55rem] text-zinc-300 font-mono">
                            {project.year}
                          </Badge>
                          <Badge className="border-red-500/30 bg-red-500/10 text-[0.55rem] text-red-400 font-mono uppercase tracking-widest">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col px-6 relative z-10">
                      <div className="mt-4 relative overflow-hidden rounded-2xl border border-white/5 bg-black group-hover:border-red-500/30 transition-colors duration-500">
                        <img
                          src={resolveProjectImage(project)}
                          alt={`${project.title} preview`}
                          className="systems-image h-48 w-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          onError={(event) => {
                            event.currentTarget.src = "/projectsbg.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-2 right-3 font-mono text-[0.5rem] text-white/40 tracking-[0.3em]">
                          DATA_NODE_{project.id.toUpperCase()}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-heading text-4xl tracking-tight text-white leading-none group-hover:text-[#c1121f] transition-colors duration-300">
                          {project.title.toUpperCase()}
                        </h3>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-px w-8 bg-[#c1121f]" />
                          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#c1121f]">
                            {project.tagline}
                          </p>
                        </div>
                        <p className="systems-description mt-4 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 space-y-5">
                        <div>
                          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-3">
                            CORE_CAPABILITIES
                          </p>
                          <div className="flex flex-wrap gap-2.5">
                            {project.capabilities.slice(0, 3).map((capability) => (
                              <Badge
                                key={capability}
                                className="border-white/5 bg-white/5 text-[0.7rem] text-zinc-300 font-mono tracking-wider px-2.5 py-1"
                              >
                                {capability}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-3">
                            TECH_ARCHITECTURE
                          </p>
                          <div className="flex flex-wrap gap-2.5">
                            {project.techStack.slice(0, 5).map((tech) => (
                              <Badge
                                key={tech}
                                className="border-red-500/20 bg-red-500/5 text-[0.7rem] text-white/80 font-mono px-2.5 py-1"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="mt-auto px-6 pb-6 relative z-10 pt-4">
                      <div className="flex items-center gap-3 w-full">
                        {index < 3 ? (
                          <>
                            <Button
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono text-[0.6rem] uppercase tracking-[0.15em] h-10 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 gap-2 px-2"
                              onClick={() => handlePrivateAccess(project.title)}
                            >
                              <YoutubeIcon className="h-3.5 w-3.5" />
                              Live Demo
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black font-mono text-[0.6rem] uppercase tracking-[0.15em] h-10 rounded-xl transition-all duration-300 gap-2 px-2"
                              onClick={() => handlePrivateAccess(project.title)}
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                              Source Code
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono text-[0.6rem] uppercase tracking-[0.15em] h-10 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 gap-2 px-2"
                              asChild
                            >
                              <a href={project.links.demo || "#"} target="_blank" rel="noreferrer">
                                <YoutubeIcon className="h-3.5 w-3.5" />
                                Live Demo
                              </a>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black font-mono text-[0.6rem] uppercase tracking-[0.15em] h-10 rounded-xl transition-all duration-300 gap-2 px-2"
                              asChild
                            >
                              <a href={project.links.github || "#"} target="_blank" rel="noreferrer">
                                <GithubIcon className="h-3.5 w-3.5" />
                                Source Code
                              </a>
                            </Button>
                          </>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )))}
          </div>

          <motion.div
            ref={gatewayRef}
            initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="systems-gateway mt-10 flex w-full flex-col gap-6 rounded-2xl border border-[#c1121f]/20 bg-[rgba(10,10,10,0.92)] px-6 py-6 shadow-[0_18px_30px_rgba(0,0,0,0.6)] transition lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="systems-gateway-image relative h-36 w-36 overflow-hidden rounded-xl border border-white/10">
                <img
                  src="/explore.png"
                  alt="Gotham systems preview"
                  className="h-full w-full object-cover"
                />
                <div className="systems-gateway-image-overlay" />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.5em] text-zinc-400">
                  ARCHIVED SYSTEMS
                </p>
                <h3 className="font-heading text-4xl text-[#eaeaea]">
                  EXPLORE GOTHAM SYSTEMS
                </h3>
                <p className="max-w-xl text-sm leading-6 text-[#a1a1aa]">
                  Access the complete archive of experimental AI systems, intelligent
                  infrastructures, full-stack applications, and classified Gotham projects.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="systems-gateway-cta w-fit border-[#c1121f]/40 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-200 hover:border-[#c1121f] hover:text-white"
              asChild
            >
              <a href="/projects">Access Full Database</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section
        id="mission-logs"
        ref={missionRef}
        className="mission-logs relative w-full overflow-hidden py-16 lg:py-20"
      >
        <div className="mission-fog" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mission-reveal flex flex-col gap-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.6em] text-[#c1121f]">
              CAREER DATABASE
            </p>
            <h2 className="font-heading text-5xl leading-[0.9] text-[#eaeaea] sm:text-6xl">
              MISSION LOGS
            </h2>
            <Separator className="mission-header-divider" />
            <p className="max-w-3xl text-sm leading-7 text-[#c7c7d2]">
              Operational timeline documenting AI systems development, research missions, and
              academic progression inside Gotham&apos;s intelligent infrastructure network.
            </p>
          </motion.div>

          <div className="mission-grid grid gap-10 lg:grid-cols-[1.2fr_auto_0.8fr] lg:gap-[120px]">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mission-reveal mission-column mission-column-experience"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-[#c1121f]" />
                <p className="font-mono text-xs uppercase tracking-[0.5em] text-zinc-400">
                  EXPERIENCE_LOGS
                </p>
              </div>

              <div className="mission-timeline mt-8">
                {experienceLogs.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <div key={entry.id} className="mission-card mission-card-experience">
                      <div className="mission-marker mission-marker-active" />
                      <div className="mission-card-content mission-card-content-experience">
                        <div className="flex flex-wrap items-center gap-2 text-[0.55rem] uppercase tracking-[0.32em] text-zinc-500">
                          <Icon className="h-4 w-4 text-[#c1121f]" />
                          <span>{entry.period}</span>
                          <Badge className="border-[#c1121f]/40 bg-black/70 text-zinc-200">
                            {entry.status}
                          </Badge>
                        </div>
                        <h3 className="mission-role-title font-heading text-4xl leading-[0.95] text-[#eaeaea]">
                          {entry.role}
                        </h3>
                        <p className="mission-entity mission-entity-fixed text-base text-white">
                          {entry.entity}
                        </p>
                        {"link" in entry && entry.link && (
                          <div className="mt-1">
                            <a
                              href={entry.link as string}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white transition-colors hover:bg-green-700"
                            >
                              Visit Site
                            </a>
                          </div>
                        )}
                        <p className="mission-description mt-4 text-sm leading-7 text-[#c0c0cb]">
                          {entry.description}
                        </p>
                        <div className="mission-meta mt-5 flex flex-wrap gap-2">
                          {entry.metadata.map((meta, idx) => (
                            <Badge
                              key={meta}
                              className={
                                idx === 0
                                  ? "border-[#c1121f]/40 bg-black/70 text-[0.55rem] text-zinc-200"
                                  : "border-white/10 bg-black/60 text-[0.55rem] text-zinc-300"
                              }
                            >
                              {meta}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <Tooltip key={tag} label={tag}>
                              <Badge className="mission-tag">
                                {tag}
                              </Badge>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <div className="mission-divider" />

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mission-reveal mission-column mission-column-education"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#c1121f]" />
                <p className="font-mono text-xs uppercase tracking-[0.5em] text-zinc-400">
                  ACADEMIC_RECORDS
                </p>
              </div>

              <div className="mission-timeline mt-8">
                <div className="mission-card mission-card-education">
                  <div className="mission-marker mission-marker-active" />
                  <div className="mission-card-content">
                    <div className="flex flex-wrap items-center gap-2 text-[0.55rem] uppercase tracking-[0.32em] text-zinc-500">
                      <Database className="h-4 w-4 text-[#c1121f]" />
                      <span>2022 — 2026</span>
                    </div>
                    <h3 className="mission-role-title font-heading text-4xl leading-[0.95] text-[#eaeaea]">
                      B.E. in Data Science and Artificial Intelligence Engineering
                    </h3>
                    <p className="mission-entity text-sm text-zinc-200">
                      A.C. Patil College of Engineering, Navi Mumbai
                    </p>
                    <div className="mission-metrics mt-5 flex flex-wrap items-center gap-3">
                      <Badge className="mission-metric font-mono">
                        <GaugeCircle className="h-4 w-4 text-[#c1121f]" />
                        CGPI: 7.5
                      </Badge>
                      <Badge className="mission-metric-aux font-mono">
                        <Award className="h-4 w-4 text-[#c1121f]" />
                        Gotham Academy Records
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="mission-card-divider" />

                <div className="mission-card">
                  <div className="mission-marker" />
                  <div className="mission-card-content">
                    <div className="flex flex-wrap items-center gap-2 text-[0.55rem] uppercase tracking-[0.32em] text-zinc-500">
                      <Brain className="h-4 w-4 text-[#c1121f]" />
                      <span>2020 — 2022</span>
                    </div>
                    <h3 className="mission-role-title font-heading text-3xl leading-[0.98] text-[#eaeaea]">
                      Higher Secondary Certificate (HSC)
                    </h3>
                    <p className="mission-entity text-sm text-zinc-200">
                      D.G. Ruparel College of Arts, Science, and Commerce, Mumbai
                    </p>
                    <div className="mission-metrics mt-5 flex flex-wrap items-center gap-3">
                      <Badge className="mission-metric font-mono">
                        <BarChart3 className="h-4 w-4 text-[#c1121f]" />
                        PERCENTAGE: 55%
                      </Badge>
                      <Badge className="mission-metric-aux font-mono">
                        <Award className="h-4 w-4 text-[#c1121f]" />
                        Academic Dossier
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="achievements"
        className="achievements-section relative w-full overflow-hidden py-20 lg:py-28"
      >
        <div className="achievements-bg" />
        <div className="achievements-grid-overlay" />
        <div className="achievements-particles" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="tech-toolbox-header flex flex-col gap-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.6em] text-[#c1121f]">
              PERFORMANCE ARCHIVE
            </p>
            <h2 className="font-heading text-5xl leading-[0.9] text-[#eaeaea] sm:text-6xl">
              Achievements & Certifications
            </h2>
            <Separator className="achievements-header-divider" />
            <p className="max-w-3xl text-sm leading-7 text-[#c7c7d2]">
              A journey through hackathons, intelligent systems, innovation challenges, and
              continuous learning in AI engineering.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30, rotateX: 5 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                className={`achievement-card achievement-card-${achievement.size}`}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className="achievement-banner">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="achievement-banner-image"
                  />
                  <div className="achievement-banner-overlay" />
                </div>
                <div className="achievement-body">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="achievement-year font-mono">{achievement.year}</p>
                      <h3 className="achievement-title font-heading">
                        {achievement.title}
                      </h3>
                    </div>
                    {achievement.link && (
                      <motion.a
                        href={achievement.link}
                        target="_blank"
                        rel="noreferrer"
                        className="achievement-link"
                        aria-label={`View ${achievement.title} on LinkedIn`}
                        whileHover={{ y: -2 }}
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                  <p className="achievement-org">{achievement.organization}</p>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-[#c1121f]" />
              <p className="font-mono text-xs uppercase tracking-[0.5em] text-zinc-400">
                CERTIFICATION DOSSIER
              </p>
            </div>
            <div className="cert-grid hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((certification, idx) => (
                <motion.div
                  key={certification.title}
                  initial={{ opacity: 0, y: 20, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                  className={`cert-card ${certification.image ? "cert-card-media" : ""
                    } ${certification.featured ? "cert-card-featured" : ""} ${certification.title === "Winner — Project Competition (Vectors 26)"
                      ? "cert-card-compact"
                      : ""
                    }`}
                  whileHover={{ y: -4 }}
                >
                  {certification.image ? (
                    <>
                      <div className="cert-image">
                        <Image
                          src={certification.image}
                          alt={certification.title}
                          fill
                          sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                          className="cert-image-img"
                        />
                        <div className="cert-image-overlay" />
                      </div>
                      <div className="cert-content">
                        {certification.featured ? (
                          <div className="cert-featured-row">
                            <span className="cert-featured-badge font-mono">
                              Featured Recognition
                            </span>
                            <div className="cert-badge">
                              <motion.div
                                animate={{ rotate: [0, 6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <Award className="h-4 w-4" />
                              </motion.div>
                            </div>
                          </div>
                        ) : (
                          <div className="cert-badge">
                            <motion.div
                              animate={{ rotate: [0, 6, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Award className="h-4 w-4" />
                            </motion.div>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <h4 className="cert-title font-heading">{certification.title}</h4>
                          <div className="cert-meta font-mono">
                            <span>{certification.provider}</span>
                            <Separator className="h-3 w-px bg-white/10" />
                            <span>{certification.year}</span>
                          </div>
                          {certification.description && (
                            <p className="cert-description">
                              {certification.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="cert-content cert-content-compact">
                      <div className="cert-badge">
                        <motion.div
                          animate={{ rotate: [0, 6, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Award className="h-4 w-4" />
                        </motion.div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="cert-title font-heading">{certification.title}</h4>
                        <div className="cert-meta font-mono">
                          <span>{certification.provider}</span>
                          <Separator className="h-3 w-px bg-white/10" />
                          <span>{certification.year}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="cert-grid flex flex-col gap-5 md:hidden">
              {certifications.slice(0, 5).map((certification, idx) => (
                <motion.div
                  key={certification.title}
                  initial={{ opacity: 0, y: 20, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                  className={`cert-card ${certification.image ? "cert-card-media" : ""
                    } ${certification.featured ? "cert-card-featured" : ""} ${certification.title === "Winner — Project Competition (Vectors 26)"
                      ? "cert-card-compact"
                      : ""
                    }`}
                  whileHover={{ y: -4 }}
                >
                  {certification.image ? (
                    <>
                      <div className="cert-image">
                        <Image
                          src={certification.image}
                          alt={certification.title}
                          fill
                          sizes="100vw"
                          className="cert-image-img"
                        />
                        <div className="cert-image-overlay" />
                      </div>
                      <div className="cert-content">
                        {certification.featured ? (
                          <div className="cert-featured-row">
                            <span className="cert-featured-badge font-mono">
                              Featured Recognition
                            </span>
                            <div className="cert-badge">
                              <motion.div
                                animate={{ rotate: [0, 6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <Award className="h-4 w-4" />
                              </motion.div>
                            </div>
                          </div>
                        ) : (
                          <div className="cert-badge">
                            <motion.div
                              animate={{ rotate: [0, 6, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Award className="h-4 w-4" />
                            </motion.div>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <h4 className="cert-title font-heading">{certification.title}</h4>
                          <div className="cert-meta font-mono">
                            <span>{certification.provider}</span>
                            <Separator className="h-3 w-px bg-white/10" />
                            <span>{certification.year}</span>
                          </div>
                          {certification.description && (
                            <p className="cert-description">
                              {certification.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="cert-content cert-content-compact">
                      <div className="cert-badge">
                        <motion.div
                          animate={{ rotate: [0, 6, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Award className="h-4 w-4" />
                        </motion.div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="cert-title font-heading">{certification.title}</h4>
                        <div className="cert-meta font-mono">
                          <span>{certification.provider}</span>
                          <Separator className="h-3 w-px bg-white/10" />
                          <span>{certification.year}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <details className="cert-dropdown">
                <summary className="cert-dropdown-summary font-mono">
                  More Certificates
                </summary>
                <div className="mt-4 flex flex-col gap-5">
                  {certifications.slice(5).map((certification, idx) => (
                    <motion.div
                      key={certification.title}
                      initial={{ opacity: 0, y: 15, rotateX: 5 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ margin: "-20px" }}
                      transition={{ duration: 0.5, delay: idx * 0.04, ease: "easeOut" }}
                      className={`cert-card ${certification.image ? "cert-card-media" : ""
                        } ${certification.featured ? "cert-card-featured" : ""} ${certification.title === "Winner — Project Competition (Vectors 26)"
                          ? "cert-card-compact"
                          : ""
                        }`}
                      whileHover={{ y: -4 }}
                    >
                      {certification.image ? (
                        <>
                          <div className="cert-image">
                            <Image
                              src={certification.image}
                              alt={certification.title}
                              fill
                              sizes="100vw"
                              className="cert-image-img"
                            />
                            <div className="cert-image-overlay" />
                          </div>
                          <div className="cert-content">
                            {certification.featured ? (
                              <div className="cert-featured-row">
                                <span className="cert-featured-badge font-mono">
                                  Featured Recognition
                                </span>
                                <div className="cert-badge">
                                  <motion.div
                                    animate={{ rotate: [0, 6, 0] }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <Award className="h-4 w-4" />
                                  </motion.div>
                                </div>
                              </div>
                            ) : (
                              <div className="cert-badge">
                                <motion.div
                                  animate={{ rotate: [0, 6, 0] }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <Award className="h-4 w-4" />
                                </motion.div>
                              </div>
                            )}
                            <div className="flex flex-col gap-2">
                              <h4 className="cert-title font-heading">
                                {certification.title}
                              </h4>
                              <div className="cert-meta font-mono">
                                <span>{certification.provider}</span>
                                <Separator className="h-3 w-px bg-white/10" />
                                <span>{certification.year}</span>
                              </div>
                              {certification.description && (
                                <p className="cert-description">
                                  {certification.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="cert-content cert-content-compact">
                          <div className="cert-badge">
                            <motion.div
                              animate={{ rotate: [0, 6, 0] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Award className="h-4 w-4" />
                            </motion.div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h4 className="cert-title font-heading">
                              {certification.title}
                            </h4>
                            <div className="cert-meta font-mono">
                              <span>{certification.provider}</span>
                              <Separator className="h-3 w-px bg-white/10" />
                              <span>{certification.year}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tech-toolbox"
        className="tech-toolbox-section relative w-full overflow-hidden py-24 lg:py-28"
      >
        <div className="tech-toolbox-noise" />
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-2 sm:px-8 sm:py-3 lg:px-14 lg:py-4 xl:px-16">
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-black/20 px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.6em] text-[#c1121f]">
                TACTICAL ENGINEERING DATABASE
              </p>
              <h2 className="font-heading text-5xl leading-[0.9] text-[#eaeaea] sm:text-6xl">
                TECH TOOLBOX
              </h2>
              <div className="tech-toolbox-subcopy">
                <p className="text-sm leading-7 text-white sm:text-base">
                  The technologies, frameworks, AI systems, and engineering tools powering scalable
                  intelligent products — from full-stack applications to autonomous AI ecosystems.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="tech-toolbox-layout grid gap-8 lg:grid-cols-2"
            >
              <div className="order-2 flex flex-col gap-6 lg:order-1">
                <div className="tech-toolbox-card tech-toolbox-card-compact">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-sm uppercase tracking-[0.45em] text-zinc-200">
                      ENGINEERING PROFILE
                    </p>
                    <span className="tactical-chip">RADAR</span>
                  </div>
                  <div className="tech-toolbox-radar mt-8">
                    <EngineeringRadarDots data={radarSkills} />
                  </div>
                </div>
              </div>
              <div className="order-1 flex flex-col gap-6 lg:order-2">
                <div className="tech-toolbox-card">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-zinc-400">
                      AI / MACHINE LEARNING
                    </p>
                    <span className="tactical-chip">RADIAL</span>
                  </div>
                  <div className="mt-6">
                    <AiHorizontalBar data={aiRadialSkills} />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="tactical-skill-grid grid gap-6 lg:grid-cols-3">
              {tacticalSkillModules.map((module, idx) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                    className="tactical-skill-card"
                  >
                    <div className="tactical-skill-card-header">
                      <div className="tactical-skill-icon">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="tactical-skill-title font-heading">
                        {module.title}
                      </h3>
                    </div>

                    <div className="tactical-skill-list">
                      {module.skills.map((skill) => (
                        <div key={skill.label} className="tactical-skill-item">
                          <div className="tactical-skill-row">
                            <span className="tactical-skill-label">{skill.label}</span>
                            <span className="tactical-skill-value">{skill.value}%</span>
                          </div>
                          <div className="tactical-skill-bar">
                            <span
                              className="tactical-skill-bar-fill"
                              style={{ "--progress": `${skill.value}%` } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <GothamContactSection />

      <GothamFooter />

    </div>
  );
}
