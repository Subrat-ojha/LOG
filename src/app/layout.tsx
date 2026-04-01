import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "Subrat Ojha — Full-Stack Java Developer",
  description:
    "Java Developer specializing in Spring Boot, Microservices, and Backend Systems.",
  metadataBase: new URL("https://subrat.tech"),
  openGraph: {
    title: "Subrat Ojha — Java Developer",
    description: "Java Developer at IbaseIt Inc. specializing in Spring Boot, Microservices, and Backend Systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subrat Ojha — Java Developer",
    description: "Java Developer at IbaseIt Inc. specializing in Spring Boot, Microservices, and Backend Systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        <CommandPalette />
        {children}
        <InteractiveTerminal />
      </body>
    </html>
  );
}
