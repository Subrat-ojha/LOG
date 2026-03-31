export interface SectionEntry {
  id: string;
  label: string;
  icon: "file" | "folder" | "diff" | "graph" | "log" | "md";
  filename: string;
}

export const sections: SectionEntry[] = [
  { id: "hero", label: "Hero", icon: "file", filename: "hero.tsx" },
  { id: "career", label: "Career Evolution", icon: "diff", filename: "career.diff" },
  { id: "tech-stack", label: "Tech Stack", icon: "graph", filename: "skills.graph" },
  { id: "activity", label: "GitHub Activity", icon: "log", filename: "activity.log" },
  { id: "projects", label: "Projects", icon: "folder", filename: "projects/" },
  { id: "experience", label: "Experience", icon: "log", filename: "experience.log" },
  { id: "stash", label: "Learning", icon: "file", filename: "stash.txt" },
  { id: "blog", label: "Writing", icon: "md", filename: "blog.md" },
  { id: "contact", label: "Contact", icon: "md", filename: "contact.md" },
];
