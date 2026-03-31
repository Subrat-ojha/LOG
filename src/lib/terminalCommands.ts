const projects = [
  "gratis/",
  "hospital-management-system/",
  "multithreaded-web-server/",
  "inplace/",
];

const aboutContent = [
  "# Subrat Ojha",
  "",
  "Java developer at **IbaseIt Inc.** building backend systems",
  "using finite state machine frameworks to manage complex",
  "state transitions and workflow logic.",
  "",
  "Stack: Java 17+, Spring Boot, Hibernate, Microservices",
  "Infra: Docker, Kubernetes, AWS, CI/CD",
  "Education: MCA, Krupajal Engineering College (2022-2024)",
  "Location: India",
];

const gitLogContent = [
  "\x1b[33mcommit a3f7b2d\x1b[0m (HEAD -> main)",
  "Author: Subrat Ojha <iamsubratojha@gmail.com>",
  "Date:   Oct 2024 — Present",
  "",
  "    feat: Java Developer @ IbaseIt Inc.",
  "",
  "\x1b[33mcommit 8e1c4f9\x1b[0m",
  "Author: Subrat Ojha <iamsubratojha@gmail.com>",
  "Date:   Feb 2023 — Sep 2024",
  "",
  "    feat: Freelance Full-Stack Developer",
  "",
  "\x1b[33mcommit 4d2e8a1\x1b[0m",
  "Author: Subrat Ojha <iamsubratojha@gmail.com>",
  "Date:   2022 — 2024",
  "",
  "    docs: MCA @ Krupajal Engineering College",
];

const helpContent = [
  "Available commands:",
  "  help          Show this help message",
  "  whoami        Display current user",
  "  ls [path]     List directory contents",
  "  cat <file>    Display file contents",
  "  git log       Show commit history",
  "  git diff      Show career evolution",
  "  pwd           Print working directory",
  "  echo <text>   Echo text",
  "  clear         Clear terminal",
  "  neofetch      System info",
];

const diffContent = [
  "\x1b[36m@@ -1,15 +1,20 @@ # career evolution\x1b[0m",
  "  name: \"Subrat Ojha\"",
  "  location: \"India\"",
  "",
  "\x1b[31m- role: \"Freelance Developer\"\x1b[0m",
  "\x1b[31m- type: \"Part-Time\"\x1b[0m",
  "\x1b[32m+ role: \"Java Developer @ IbaseIt Inc.\"\x1b[0m",
  "\x1b[32m+ type: \"Full-Time\"\x1b[0m",
  "\x1b[32m+ focus: \"Enterprise backend systems\"\x1b[0m",
];

const neofetchOutput = [
  "       /\\       subrat@dev",
  "      /  \\      ----------------",
  "     /\\   \\     name: Subrat Ojha",
  "    /      \\    role: Java Developer @ IbaseIt Inc.",
  "   /   ,,   \\   stack: Java 17+, Spring Boot, Hibernate",
  "  /   |  |  -\\  infra: Docker, Kubernetes, AWS",
  " /_-''    ''-_\\ xp: 1+ yrs · 20+ projects",
];

export function executeCommand(input: string): { output: string[]; clear?: boolean } {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || "";
  const args = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return { output: helpContent };

    case "whoami":
      return { output: ["subrat"] };

    case "pwd":
      return { output: ["/home/subrat/portfolio"] };

    case "ls":
      if (args === "projects" || args === "projects/") {
        return { output: projects };
      }
      return {
        output: [
          "about.md    career.diff   projects/",
          "skills.graph  experience.log  contact.md",
        ],
      };

    case "cat":
      if (args === "about.md" || args === "README.md") {
        return { output: aboutContent };
      }
      if (args === "career.diff") {
        return { output: diffContent };
      }
      return { output: [`cat: ${args || "..."}: No such file or directory`] };

    case "git":
      if (args === "log") return { output: gitLogContent };
      if (args === "diff") return { output: diffContent };
      if (args === "status") return { output: ["On branch main", "nothing to commit, working tree clean"] };
      if (args === "stash list") return { output: [
        "stash@{0}: WIP on main: Learning Rust",
        "stash@{1}: WIP on main: Exploring Go concurrency",
        "stash@{2}: WIP on main: Kafka event streaming",
      ]};
      return { output: [`git: '${args}' is not a git command`] };

    case "echo":
      return { output: [args || ""] };

    case "clear":
      return { output: [], clear: true };

    case "neofetch":
      return { output: neofetchOutput };

    case "":
      return { output: [] };

    default:
      return { output: [`bash: ${cmd}: command not found`] };
  }
}
