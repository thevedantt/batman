import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

import { parseProjects } from "@/lib/projects";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "projects",
    "projects.txt"
  );
  const content = await fs.readFile(filePath, "utf8");
  const projects = parseProjects(content);
  return NextResponse.json({ projects });
}
