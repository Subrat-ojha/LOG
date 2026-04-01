import { NextResponse } from "next/server";

interface ContributionDay {
  date: string;
  count: number;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://github.com/users/Subrat-ojha/contributions",
      {
        headers: { Accept: "text/html" },
        next: { revalidate: 3600 }, // cache 1 hour
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 }
      );
    }

    const html = await res.text();

    // Parse contribution data from the HTML
    // GitHub renders <td> elements with data-date and data-level attributes
    const days: ContributionDay[] = [];
    const regex =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;

    // Also try the alternate format where level comes first
    const regex2 =
      /data-level="(\d)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10);
      days.push({ date, count: level });
    }

    // If the first regex didn't match, try alternate order
    if (days.length === 0) {
      while ((match = regex2.exec(html)) !== null) {
        const level = parseInt(match[1], 10);
        const date = match[2];
        days.push({ date, count: level });
      }
    }

    // Also try to extract the total contributions text
    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i
    );
    const totalContributions = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
      : null;

    return NextResponse.json({ days, totalContributions });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
