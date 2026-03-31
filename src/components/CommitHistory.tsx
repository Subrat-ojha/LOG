"use client";

interface Commit {
  hash: string;
  refs?: string[];
  author: string;
  email: string;
  date: string;
  title: string;
  body?: string[];
  tags?: string[];
}

const commits: Commit[] = [
  {
    hash: "a3f7b2d",
    refs: ["HEAD -> main", "origin/main"],
    author: "Subrat Ojha",
    email: "iamsubratojha@gmail.com",
    date: "Oct 2024 — Present",
    title: "feat: Java Developer @ IbaseIt Inc.",
    body: [
      "Developing backend systems using FSM-based framework",
      "Building robust APIs with Java 17+ and Spring Boot",
      "Implementing microservices with Docker & Kubernetes",
      "Managing cloud infrastructure on AWS with CI/CD",
    ],
    tags: [
      "Java 17+",
      "Spring Boot",
      "Hibernate",
      "Microservices",
      "Docker",
      "Kubernetes",
      "AWS",
      "FSM",
    ],
  },
  {
    hash: "8e1c4f9",
    author: "Subrat Ojha",
    email: "iamsubratojha@gmail.com",
    date: "Feb 2023 — Sep 2024",
    title: "feat: Freelance Full-Stack Developer",
    body: [
      "Built full-stack applications for various clients",
      "Developed REST APIs and React.js frontends",
    ],
    tags: ["Java", "Spring Boot", "React.js", "REST APIs"],
  },
  {
    hash: "4d2e8a1",
    author: "Subrat Ojha",
    email: "iamsubratojha@gmail.com",
    date: "2022 — 2024",
    title: "docs: MCA @ Krupajal Engineering College",
  },
];

function RefBadge({ text }: { text: string }) {
  if (text.startsWith("HEAD")) {
    const parts = text.split(", ");
    return (
      <span>
        <span className="text-[#58a6ff]">(</span>
        {parts.map((part, i) => {
          const isHead = part.startsWith("HEAD");
          const isOrigin = part.startsWith("origin");
          let display = part;
          if (isHead) display = part.replace("(", "");
          if (i === parts.length - 1) display = display.replace(")", "");
          return (
            <span key={i}>
              {i > 0 && <span className="text-[#58a6ff]">, </span>}
              <span className={isOrigin ? "text-[#f85149]" : "text-[#58a6ff]"}>
                {display}
              </span>
            </span>
          );
        })}
        <span className="text-[#58a6ff]">)</span>
      </span>
    );
  }
  return <span className="text-[#58a6ff]">{text}</span>;
}

export default function CommitHistory() {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md font-mono text-sm overflow-hidden">
      {commits.map((commit, index) => (
        <div
          key={commit.hash}
          className={
            index < commits.length - 1
              ? "border-b border-[#30363d]"
              : undefined
          }
        >
          <div className="flex">
            {/* Git graph gutter */}
            <div className="flex flex-col items-center w-10 shrink-0 pt-5">
              <div
                className={`w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 ${index === 0 ? "" : ""}`}
              />
              {index < commits.length - 1 && (
                <div className="w-px flex-1 bg-orange-500/40" />
              )}
            </div>

            {/* Commit content */}
            <div className="py-4 pr-4 flex-1 min-w-0">
              {/* commit hash + refs */}
              <div className="leading-relaxed">
                <span className="text-[#e3b341]">commit {commit.hash}</span>
                {commit.refs && commit.refs.length > 0 && (
                  <span className="ml-1">
                    <RefBadge text={`(${commit.refs.join(", ")})`} />
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="leading-relaxed">
                <span className="text-[#8b949e]">Author: </span>
                <span className="text-[#e6edf3]">
                  {commit.author} &lt;{commit.email}&gt;
                </span>
              </div>

              {/* Date */}
              <div className="leading-relaxed">
                <span className="text-[#8b949e]">Date:{"   "}</span>
                <span className="text-[#e6edf3]">{commit.date}</span>
              </div>

              {/* Commit message */}
              <div className="mt-3">
                <div className="text-[#e6edf3]">
                  {"    "}
                  {commit.title}
                </div>
                {commit.body && commit.body.length > 0 && (
                  <div className="mt-1">
                    {commit.body.map((line, i) => (
                      <div key={i} className="text-[#8b949e]">
                        {"    "}{line}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              {commit.tags && commit.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 ml-4">
                  {commit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full border border-[#30363d] text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
