import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/Subrat-ojha/repos?sort=updated&per_page=30&type=owner",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ repos: [] }, { status: 502 });
    }

    const data: GitHubRepo[] = await res.json();

    // Filter out forks and pick the top repos by stars, then recent updates
    const owned = data
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    const repos = owned.map((r) => ({
      name: r.name,
      description: r.description || "No description",
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics?.slice(0, 4) || [],
    }));

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 500 });
  }
}
