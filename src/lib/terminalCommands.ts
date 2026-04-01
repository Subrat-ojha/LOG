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

const skillsJson = [
  "{",
  "  \x1b[36m\"languages\"\x1b[0m: [\x1b[32m\"Java 17+\"\x1b[0m, \x1b[32m\"SQL\"\x1b[0m, \x1b[32m\"JavaScript\"\x1b[0m],",
  "  \x1b[36m\"frameworks\"\x1b[0m: [\x1b[32m\"Spring Boot\"\x1b[0m, \x1b[32m\"Hibernate\"\x1b[0m, \x1b[32m\"React.js\"\x1b[0m],",
  "  \x1b[36m\"databases\"\x1b[0m: [\x1b[32m\"Oracle\"\x1b[0m, \x1b[32m\"PostgreSQL\"\x1b[0m],",
  "  \x1b[36m\"devops\"\x1b[0m: [\x1b[32m\"Docker\"\x1b[0m, \x1b[32m\"Kubernetes\"\x1b[0m, \x1b[32m\"AWS\"\x1b[0m, \x1b[32m\"CI/CD\"\x1b[0m],",
  "  \x1b[36m\"architecture\"\x1b[0m: [\x1b[32m\"Microservices\"\x1b[0m, \x1b[32m\"FSM frameworks\"\x1b[0m, \x1b[32m\"REST APIs\"\x1b[0m]",
  "}",
];

const fortunes = [
  "You will mass-produce Spring Boot microservices today.",
  "A wild NullPointerException appears... just kidding, you use Optional.",
  "The code you write today will confuse you in 6 months. Comment wisely.",
  "Your next deployment will go smoothly. (This fortune is not covered by SLA.)",
  "Someone will appreciate your clean git history.",
  "Today is a good day to refactor that legacy code. Or not.",
  "A container orchestrator smiles upon you.",
  "Your pull request will be approved on the first try. Probably.",
];

const historyContent = [
  "  1  git init life",
  "  2  git checkout -b education",
  "  3  commit: \"MCA @ Krupajal Engineering College (2022-2024)\"",
  "  4  git checkout -b freelance",
  "  5  commit: \"Freelance Full-Stack Developer (Feb 2023 - Sep 2024)\"",
  "  6  git checkout -b career",
  "  7  commit: \"Java Developer @ IbaseIt Inc. (Oct 2024 - Present)\"",
  "  8  commit: \"Built FSM-based workflow engines\"",
  "  9  commit: \"Shipped 20+ projects\"",
  " 10  git push origin main  # still going...",
];

const helpContent = [
  "Available commands:",
  "  help              Show this help message",
  "  whoami            Display current user",
  "  ls [path]         List directory contents",
  "  cat <file>        Display file contents",
  "  git log           Show commit history",
  "  git diff          Show career evolution",
  "  pwd               Print working directory",
  "  echo <text>       Echo text",
  "  clear             Clear terminal",
  "  neofetch          System info",
  "",
  "  \x1b[33m-- Easter eggs --\x1b[0m",
  "  sudo hire-me      Try it ;)",
  "  cat skills.json   Pretty-print skills",
  "  history           Career timeline",
  "  fortune           Dev wisdom",
  "  uptime            How long I've been coding",
  "  rm -rf /          Don't even think about it",
  "  exit              You can't escape",
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
          "about.md      career.diff    projects/",
          "skills.json   skills.graph   experience.log",
          "contact.md    resume.pdf",
        ],
      };

    case "cat":
      if (args === "about.md" || args === "README.md") {
        return { output: aboutContent };
      }
      if (args === "career.diff") {
        return { output: diffContent };
      }
      if (args === "skills.json") {
        return { output: skillsJson };
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

    case "sudo":
      if (args.startsWith("hire-me") || args.startsWith("hire")) {
        return { output: [
          "",
          "\x1b[32m  ============================================\x1b[0m",
          "\x1b[32m  |                                          |\x1b[0m",
          "\x1b[32m  |   Thanks for considering me!             |\x1b[0m",
          "\x1b[32m  |                                          |\x1b[0m",
          "\x1b[32m  |   Email: iamsubratojha@gmail.com         |\x1b[0m",
          "\x1b[32m  |   GitHub: github.com/Subrat-ojha         |\x1b[0m",
          "\x1b[32m  |   LinkedIn: linkedin.com/in/Subrat-ojha  |\x1b[0m",
          "\x1b[32m  |                                          |\x1b[0m",
          "\x1b[32m  |   Let's build something great together.  |\x1b[0m",
          "\x1b[32m  |                                          |\x1b[0m",
          "\x1b[32m  ============================================\x1b[0m",
          "",
        ]};
      }
      return { output: [`sudo: ${args}: command not found`] };

    case "history":
      return { output: historyContent };

    case "fortune":
      return { output: [fortunes[Math.floor(Math.random() * fortunes.length)]] };

    case "uptime":
      return { output: [
        ` up since Oct 2024, 1+ years of shipping code`,
        ` load average: caffeinated, focused, deploying`,
      ]};

    case "rm":
      if (args.includes("-rf")) {
        return { output: [
          "\x1b[31mNice try. This portfolio is protected by:\x1b[0m",
          "  - git reflog",
          "  - common sense",
          "  - a deep fear of data loss",
        ]};
      }
      return { output: [`rm: cannot remove '${args}': Permission denied`] };

    case "exit":
      return { output: [
        "There is no escape from this portfolio.",
        "Why not check out the \x1b[36mprojects\x1b[0m section instead?",
      ]};

    case "date":
      return { output: [new Date().toString()] };

    case "uname":
      return { output: ["SubratOS 1.0.0 (Powered by Java & Spring Boot)"] };

    case "ping":
      return { output: [
        `PING ${args || "subrat.tech"} (127.0.0.1): 56 data bytes`,
        `64 bytes: icmp_seq=0 ttl=64 time=0.042 ms`,
        `64 bytes: icmp_seq=1 ttl=64 time=0.038 ms`,
        `--- ${args || "subrat.tech"} ping statistics ---`,
        `2 packets transmitted, 2 received, 0% packet loss`,
      ]};

    case "":
      return { output: [] };

    default:
      return { output: [`bash: ${cmd}: command not found. Try 'help' for available commands.`] };
  }
}
