"use client";

import { useState, useEffect } from "react";

interface Article {
  hash: string;
  title: string;
  date: string;
  link: string;
}

const fallbackArticles: Article[] = [
  {
    hash: "a3f7b2d",
    title: "Understanding State Machines in Java",
    date: "2024-10-15",
    link: "https://medium.com/@subratojha",
  },
  {
    hash: "8e1c4f9",
    title: "Docker Best Practices for Spring Boot",
    date: "2024-09-22",
    link: "https://medium.com/@subratojha",
  },
  {
    hash: "4d2e8a1",
    title: "Microservices Communication Patterns",
    date: "2024-08-10",
    link: "https://medium.com/@subratojha",
  },
  {
    hash: "c7b9f3e",
    title: "Building REST APIs with Spring Boot 3",
    date: "2024-07-05",
    link: "https://medium.com/@subratojha",
  },
];

function shortHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).slice(0, 7).padStart(7, "0");
}

export default function GitBlame() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/medium");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      } catch {
        // fallback articles already set
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div
      className="rounded-md border overflow-hidden font-mono text-xs"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
          </svg>
          <span style={{ color: "#e6edf3" }}>git blame blog.md</span>
        </div>
        <span style={{ color: "#8b949e" }}>{articles.length} articles</span>
      </div>

      {/* Blame lines */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="px-3 py-4 flex items-center gap-2" style={{ color: "#8b949e" }}>
            <div className="w-3 h-3 border border-[#8b949e] border-t-transparent rounded-full animate-spin" />
            Fetching articles...
          </div>
        ) : (
          articles.map((article, i) => {
            const hash = article.hash || shortHash(article.link);
            return (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:bg-[#161b22] transition-colors group"
              >
                {/* Blame gutter */}
                <div
                  className="shrink-0 px-3 py-1.5 border-r flex items-center gap-3 min-w-0"
                  style={{ borderColor: "#30363d", backgroundColor: "#161b22", width: 240 }}
                >
                  <span style={{ color: "#e3b341" }}>{hash}</span>
                  <span style={{ color: "#8b949e" }} className="truncate">
                    Subrat Ojha
                  </span>
                  <span style={{ color: "#484f58" }} className="shrink-0">
                    {article.date}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 px-3 py-1.5 min-w-0">
                  <span
                    className="truncate block group-hover:text-[#539bf5] transition-colors"
                    style={{ color: "#e6edf3" }}
                  >
                    {article.title}
                  </span>
                </div>

                {/* Line number */}
                <span
                  className="shrink-0 px-3 py-1.5 text-right"
                  style={{ color: "#484f58", width: 40 }}
                >
                  {i + 1}
                </span>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
