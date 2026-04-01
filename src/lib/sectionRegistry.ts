export interface SectionEntry {
  id: string;
  label: string;
  icon: "file" | "folder" | "diff" | "graph" | "log" | "md";
  filename: string;
}

export const sections: SectionEntry[] = [
  { id: "hero", label: "Hero", icon: "file", filename: "hero.tsx" },
  { id: "readme", label: "README", icon: "md", filename: "README.md" },
  { id: "career", label: "Career Evolution", icon: "diff", filename: "career.diff" },
  { id: "graph", label: "Career Graph", icon: "graph", filename: "git-graph.log" },
  { id: "tech-stack", label: "Tech Stack", icon: "graph", filename: "skills.graph" },
  { id: "activity", label: "GitHub Activity", icon: "log", filename: "activity.log" },
  { id: "pipeline", label: "Pipeline", icon: "log", filename: "ci.yml" },
  { id: "projects", label: "Projects", icon: "folder", filename: "projects/" },
  { id: "reviews", label: "Reviews", icon: "md", filename: "reviews.md" },
  { id: "experience", label: "Experience", icon: "log", filename: "experience.log" },
  { id: "achievements", label: "Achievements", icon: "file", filename: "badges.json" },
  { id: "stash", label: "Learning", icon: "file", filename: "stash.txt" },
  { id: "now", label: "Status", icon: "log", filename: "status.log" },
  { id: "conflict", label: "Work vs Life", icon: "diff", filename: "conflict.diff" },
  { id: "blog", label: "Writing", icon: "md", filename: "blog.md" },
  { id: "contact", label: "Contact", icon: "md", filename: "contact.md" },
];
