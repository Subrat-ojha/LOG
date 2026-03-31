import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@subratojha", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ articles: [] });
    }

    const xml = await res.text();

    // Parse RSS items
    const items: { hash: string; title: string; date: string; link: string }[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];

      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
        itemXml.match(/<title>(.*?)<\/title>/);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const dateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

      if (titleMatch && linkMatch) {
        const link = linkMatch[1];
        let hash = 0;
        for (let i = 0; i < link.length; i++) {
          const char = link.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash |= 0;
        }

        const pubDate = dateMatch ? new Date(dateMatch[1]) : new Date();

        items.push({
          hash: Math.abs(hash).toString(16).slice(0, 7).padStart(7, "0"),
          title: titleMatch[1],
          date: pubDate.toISOString().slice(0, 10),
          link: link,
        });
      }
    }

    return NextResponse.json({ articles: items.slice(0, 8) });
  } catch {
    return NextResponse.json({ articles: [] });
  }
}
