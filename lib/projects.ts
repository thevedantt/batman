export type ProjectLink = {
  github?: string;
  youtube?: string;
  demo?: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  techStack: string[];
  links: ProjectLink;
  status: string;
  year: string;
  projectType: string;
  categories: string[];
};

const FILTERS = [
  "AI SYSTEMS",
  "MULTI-AGENT",
  "FULL STACK",
  "ML TOOLS",
  "EXPERIMENTAL",
];

const cleanTitle = (raw: string) => {
  const withoutEmoji = raw.replace(/^[^A-Za-z0-9]+/, "");
  return withoutEmoji.replace(/^\d+\.\s*/, "").trim();
};

const inferCategories = (project: Project) => {
  const text = [
    project.title,
    project.tagline,
    project.description,
    project.capabilities.join(" "),
    project.techStack.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const categories = new Set<string>();

  if (text.includes("multi-agent")) {
    categories.add("MULTI-AGENT");
  }

  if (
    text.includes("full-stack") ||
    text.includes("full stack") ||
    text.includes("next.js") ||
    text.includes("react")
  ) {
    categories.add("FULL STACK");
  }

  if (
    text.includes("ml") ||
    text.includes("rag") ||
    text.includes("xgboost") ||
    text.includes("retrieval") ||
    text.includes("llm")
  ) {
    categories.add("ML TOOLS");
  }

  if (text.includes("experimental")) {
    categories.add("EXPERIMENTAL");
  }

  if (text.includes("ai")) {
    categories.add("AI SYSTEMS");
  }

  if (categories.size === 0) {
    categories.add("AI SYSTEMS");
  }

  const ordered = FILTERS.filter((filter) => categories.has(filter));
  return ordered.length > 0 ? ordered : ["AI SYSTEMS"];
};

export const parseProjects = (content: string): Project[] => {
  const lines = content.split(/\r?\n/);
  const projects: Project[] = [];
  const year = new Date().getFullYear().toString();

  let current: Project | null = null;
  let mode: "tagline" | "description" | "capabilities" | "tech" =
    "description";
  let descriptionLines: string[] = [];

  const finalize = () => {
    if (!current) return;
    current.description = descriptionLines.join(" ").replace(/\s+/g, " ").trim();
    current.categories = inferCategories(current);
    current.projectType = current.categories[0];
    projects.push(current);
    current = null;
    descriptionLines = [];
    mode = "description";
  };

  const isProjectStart = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (
      trimmed === "Key Capabilities" ||
      trimmed === "Tech Stack" ||
      trimmed.startsWith("github:") ||
      trimmed.startsWith("youtube:")
    ) {
      return false;
    }
    const firstChar = trimmed.charCodeAt(0);
    if (firstChar > 127) return true;
    return /^\d+\.\s+/.test(trimmed);
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (isProjectStart(trimmed)) {
      finalize();
      current = {
        id: cleanTitle(trimmed).toLowerCase().replace(/\s+/g, "-") ||
          `system-${projects.length + 1}`,
        title: cleanTitle(trimmed),
        tagline: "",
        description: "",
        capabilities: [],
        techStack: [],
        links: {},
        status: "ACTIVE",
        year,
        projectType: "AI SYSTEMS",
        categories: [],
      };
      mode = "tagline";
      return;
    }

    if (!current) return;

    if (trimmed === "Key Capabilities") {
      mode = "capabilities";
      return;
    }

    if (trimmed === "Tech Stack") {
      mode = "tech";
      return;
    }

    if (trimmed.startsWith("github:")) {
      current.links.github = trimmed.replace("github:", "").trim();
      return;
    }

    if (trimmed.startsWith("github of fine tuned:")) {
      current.links.github = trimmed
        .replace("github of fine tuned:", "")
        .trim();
      return;
    }

    if (trimmed.startsWith("youtube:")) {
      current.links.demo = trimmed.replace("youtube:", "").trim();
      return;
    }

    if (mode === "tagline") {
      current.tagline = trimmed;
      mode = "description";
      return;
    }

    if (mode === "description") {
      descriptionLines.push(trimmed);
      return;
    }

    if (mode === "capabilities") {
      current.capabilities.push(trimmed);
      return;
    }

    if (mode === "tech") {
      current.techStack.push(trimmed);
    }
  });

  finalize();
  return projects;
};
