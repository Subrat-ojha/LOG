"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "copilot";
  text: string;
  timestamp: Date;
}

/* ─── Knowledge Base ─── */
const KNOWLEDGE: Record<string, string> = {
  // Greetings
  "hello|hi|hey|sup|yo|howdy|greetings":
    "Hey there! 👋 I'm Subrat's portfolio copilot. Ask me anything about his skills, projects, experience, or just say hi. I don't judge.",
  // Name / Who
  "who are you|your name|what are you":
    "I'm a Copilot-style assistant embedded in Subrat's portfolio. Think of me as his digital wingman — I know his resume better than he does. 😄",
  // About Subrat
  "about|tell me about subrat|who is subrat|introduce":
    "Subrat Ojha is a **Java Developer** at **IbaseIt Inc.**, building backend systems with finite state machine frameworks. He's got 1+ years of professional experience plus ~1.5 years of freelancing. MCA from Krupajal Engineering College (2022–2024). He ships code, writes on Medium, and occasionally sleeps.",
  // Tech stack
  "tech stack|technologies|stack|what do you use|tools|languages":
    "Here's the arsenal:\n\n**Backend:** Java, Spring Boot, Hibernate\n**Infra:** Docker, Kubernetes, AWS\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Other:** Git, REST APIs, Microservices architecture\n\nBasically, if it runs on a server, Subrat probably knows it.",
  // Experience
  "experience|work|job|career|company|ibaseit":
    "Currently a **Java Developer at IbaseIt Inc.**, working on backend systems using finite state machine frameworks for complex state transitions and workflow logic. Before that, ~1.5 years of freelancing building full-stack apps for various clients.",
  // Education
  "education|college|university|degree|study|mca|krupajal":
    "**MCA** (Master of Computer Applications) from **Krupajal Engineering College**, Bhubaneswar (2022–2024). The place where the coding journey got serious.",
  // Projects
  "project|projects|built|portfolio|side project|work on":
    "Subrat has shipped 20+ projects — from full-stack web apps to microservice architectures. Check out the **Projects** section above (scroll up!) to see PR-style cards for each one with live demos and source links. 🚀",
  // Skills / Java / Spring
  "java|spring boot|spring|backend|hibernate":
    "Java is the bread and butter. Subrat works daily with **Spring Boot** and **Hibernate** for building enterprise-grade backend services. He designs systems around **finite state machines** for managing complex workflow logic. Clean code, tested pipelines, production-ready.",
  // Docker / K8s / Cloud
  "docker|kubernetes|k8s|aws|cloud|devops|infra|deploy":
    "The infra stack: **Docker** for containerization, **Kubernetes** for orchestration, **AWS** for cloud deployment. Subrat believes in CI/CD pipelines that actually work — automated testing, automated deployment, zero drama.",
  // Frontend
  "react|next|nextjs|frontend|tailwind|css|ui":
    "While primarily a backend dev, Subrat also builds frontends with **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**. This very portfolio is proof — built from scratch with a GitHub-inspired design system.",
  // Contact
  "contact|email|reach|hire|message|connect":
    "Best ways to reach Subrat:\n\n📧 **Email:** iamsubratojha@gmail.com\n🐙 **GitHub:** github.com/Subrat-ojha\n💼 **LinkedIn:** linkedin.com/in/Subrat-ojha\n🐦 **Twitter:** @iamsubratojha\n\nOr scroll down to the **Issue Contact** form and file a new issue! 😉",
  // Resume
  "resume|cv|download":
    "Click the **git clone** terminal near the top of the page — it'll download Subrat's resume with a slick terminal animation. Or if you're in a hurry, just hit `/resume.pdf` directly.",
  // Open to work
  "open to work|available|hiring|freelance|looking|opportunities":
    "Yes! Subrat is always open to interesting opportunities — whether it's full-time roles, freelance projects, or open-source collaborations. Drop a message via the contact form or shoot an email to **iamsubratojha@gmail.com**.",
  // Blog / Writing
  "blog|write|medium|article|writing":
    "Subrat writes about engineering and tech on **Medium** (medium.com/@subratojha). Topics range from Java internals to system design patterns. Check the **Writing** section in the portfolio for featured articles.",
  // Fun / Hobbies
  "hobby|hobbies|fun|free time|interests|outside work":
    "Outside of coding: solving hard problems (yes, that's both work and hobby), writing technical articles on Medium, building side projects, and occasionally touching grass. The Konami code on this site unlocks a surprise — try it! 🎮",
  // This portfolio
  "this site|this portfolio|how built|portfolio made|design":
    "This portfolio is a **GitHub-themed** developer site built with Next.js, TypeScript, and Tailwind CSS. Every section mimics a Git/GitHub feature — PR cards, diff views, commit history, contribution graphs, even this Copilot chat. It's meta all the way down. 🐙",
  // Location
  "location|where|based|city|country|india":
    "Subrat is based in **India**. Open to remote work and relocation for the right opportunity.",
  // Microservices / Architecture
  "microservice|architecture|system design|distributed|state machine|fsm":
    "Subrat specializes in **microservices architecture** and **finite state machine frameworks**. At IbaseIt, he designs systems that handle complex state transitions and workflow logic — the kind of stuff that breaks if you don't think it through carefully.",
  // Thanks
  "thanks|thank you|thx|appreciate":
    "You're welcome! If you need anything else, just ask. And if you liked the portfolio, maybe drop Subrat a star on GitHub? ⭐",
};

const SUGGESTIONS = [
  "What's his tech stack?",
  "Tell me about his projects",
  "Is he open to work?",
  "How was this site built?",
];

const FALLBACKS = [
  "Hmm, I don't have a specific answer for that. Try asking about Subrat's **tech stack**, **experience**, **projects**, or **contact info**!",
  "That's outside my training data 😅 I know everything about Subrat though — try asking about his **skills**, **career**, or **education**.",
  "Good question, but I'm only trained on Subrat-related knowledge. Ask me about his **work**, **projects**, **stack**, or how to **contact** him!",
  "I'm more of a specialist than a generalist — I know Subrat's portfolio inside out. Try: *\"What does Subrat do?\"* or *\"What's his tech stack?\"*",
];

/* ─── Response Engine ─── */
function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const [keys, response] of Object.entries(KNOWLEDGE)) {
    const patterns = keys.split("|");
    if (patterns.some((p) => lower.includes(p))) {
      return response;
    }
  }

  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

/* ─── Markdown-lite renderer ─── */
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    let html = line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Inline code
    html = html.replace(/`(.+?)`/g, '<code style="background:#1f2937;padding:1px 5px;border-radius:3px;font-size:12px">$1</code>');

    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

/* ─── Component ─── */
export default function CopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "copilot",
      text: "Hey! I'm Subrat's portfolio Copilot. Ask me anything about his skills, experience, or projects — or pick a suggestion below to get started.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowSuggestions(false);
      setIsTyping(true);

      // Simulate thinking delay
      const delay = 600 + Math.random() * 1000;
      setTimeout(() => {
        const response = getResponse(text);
        const copilotMsg: Message = {
          id: `c-${Date.now()}`,
          role: "copilot",
          text: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, copilotMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ─── Floating Trigger Button ─── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open Copilot Chat"
        className="fixed z-[100] transition-all duration-300 ease-out group"
        style={{
          bottom: 40,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: isOpen
            ? "#30363d"
            : "linear-gradient(135deg, #6e40c9 0%, #8957e5 50%, #bc8cff 100%)",
          border: "1px solid rgba(139,148,158,0.3)",
          boxShadow: isOpen
            ? "none"
            : "0 4px 24px rgba(137,87,229,0.4), 0 0 0 1px rgba(137,87,229,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
        }}
      >
        {isOpen ? (
          /* Close X icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6edf3" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          /* Copilot sparkle icon */
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
              fill="white"
              opacity="0.95"
            />
            <circle cx="12" cy="12" r="2.5" fill="rgba(110,64,201,0.6)" />
          </svg>
        )}

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "rgba(137,87,229,0.3)",
              animationDuration: "3s",
            }}
          />
        )}
      </button>

      {/* ─── Chat Panel ─── */}
      <div
        ref={panelRef}
        className="fixed z-[99] transition-all duration-300 ease-out"
        style={{
          bottom: 100,
          right: 20,
          width: "min(400px, calc(100vw - 32px))",
          maxHeight: "min(580px, calc(100vh - 140px))",
          borderRadius: 12,
          border: "1px solid #30363d",
          backgroundColor: "#0d1117",
          boxShadow: "0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(48,54,61,0.5)",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {/* ─── Header ─── */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 shrink-0"
          style={{
            backgroundColor: "#161b22",
            borderBottom: "1px solid #30363d",
          }}
        >
          {/* Copilot icon small */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #6e40c9, #8957e5)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold" style={{ color: "#e6edf3" }}>
              Copilot
            </div>
            <div className="text-[10px]" style={{ color: "#8b949e" }}>
              Ask about Subrat&apos;s skills, experience & more
            </div>
          </div>
          {/* Status dot */}
          <div className="flex items-center gap-1.5">
            <span
              className="block w-2 h-2 rounded-full"
              style={{
                backgroundColor: "#3fb950",
                boxShadow: "0 0 6px rgba(63,185,80,0.4)",
              }}
            />
            <span className="text-[10px]" style={{ color: "#8b949e" }}>
              Online
            </span>
          </div>
        </div>

        {/* ─── Messages ─── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{
            minHeight: 0,
            scrollbarWidth: "thin",
            scrollbarColor: "#30363d transparent",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              {msg.role === "copilot" ? (
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "linear-gradient(135deg, #6e40c9, #8957e5)",
                    marginTop: 2,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              ) : (
                <div
                  className="shrink-0 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: "#238636",
                    color: "#fff",
                    marginTop: 2,
                  }}
                >
                  U
                </div>
              )}

              {/* Bubble */}
              <div
                className="text-[13px] leading-relaxed px-3 py-2 rounded-lg max-w-[85%]"
                style={
                  msg.role === "copilot"
                    ? {
                        backgroundColor: "#161b22",
                        border: "1px solid #30363d",
                        color: "#c9d1d9",
                        borderTopLeftRadius: 4,
                      }
                    : {
                        backgroundColor: "rgba(137,87,229,0.15)",
                        border: "1px solid rgba(137,87,229,0.3)",
                        color: "#e6edf3",
                        borderTopRightRadius: 4,
                      }
                }
              >
                {renderMarkdown(msg.text)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #6e40c9, #8957e5)",
                  marginTop: 2,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <div
                className="px-3 py-2.5 rounded-lg flex items-center gap-1"
                style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderTopLeftRadius: 4,
                }}
              >
                <span className="copilot-dot" style={{ animationDelay: "0ms" }} />
                <span className="copilot-dot" style={{ animationDelay: "150ms" }} />
                <span className="copilot-dot" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-[11px] px-2.5 py-1.5 rounded-md transition-colors"
                  style={{
                    backgroundColor: "rgba(137,87,229,0.1)",
                    border: "1px solid rgba(137,87,229,0.25)",
                    color: "#bc8cff",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(137,87,229,0.2)";
                    e.currentTarget.style.borderColor = "rgba(137,87,229,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(137,87,229,0.1)";
                    e.currentTarget.style.borderColor = "rgba(137,87,229,0.25)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ─── Input Area ─── */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 px-3 py-2.5"
          style={{
            borderTop: "1px solid #30363d",
            backgroundColor: "#0d1117",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Subrat..."
              disabled={isTyping}
              className="flex-1 text-[13px] bg-transparent border-none outline-none"
              style={{
                color: "#e6edf3",
                caretColor: "#8957e5",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="shrink-0 flex items-center justify-center transition-all"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background:
                  input.trim() && !isTyping
                    ? "linear-gradient(135deg, #6e40c9, #8957e5)"
                    : "#21262d",
                border: "none",
                cursor: input.trim() && !isTyping ? "pointer" : "default",
                opacity: input.trim() && !isTyping ? 1 : 0.5,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e6edf3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className="text-[10px] mt-1.5 px-1 flex items-center gap-1" style={{ color: "#484f58" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
            </svg>
            Powered by Subrat&apos;s knowledge base — not an actual AI
          </div>
        </form>
      </div>

      {/* ─── Typing animation keyframes ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .copilot-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #8957e5;
          animation: copilot-bounce 1.2s ease-in-out infinite;
        }
        @keyframes copilot-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}} />
    </>
  );
}
