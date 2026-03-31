"use client";

import { useState, useRef, useEffect } from "react";
import { executeCommand } from "@/lib/terminalCommands";

interface HistoryEntry {
  command: string;
  output: string[];
}

function colorize(line: string): React.ReactNode {
  // Handle ANSI-like color codes
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const colorMap: Record<string, string> = {
    "\\x1b[33m": "#e3b341",
    "\\x1b[31m": "#f85149",
    "\\x1b[32m": "#3fb950",
    "\\x1b[36m": "#539bf5",
    "\\x1b[0m": "",
  };

  // Simple approach: replace escape codes with spans
  const regex = /\x1b\[(\d+)m/g;
  let lastIndex = 0;
  let currentColor = "";
  let match;

  while ((match = regex.exec(line)) !== null) {
    // Text before this code
    if (match.index > lastIndex) {
      const text = line.slice(lastIndex, match.index);
      parts.push(
        <span key={key++} style={currentColor ? { color: currentColor } : undefined}>
          {text}
        </span>
      );
    }

    const code = match[0];
    if (code === "\x1b[0m") {
      currentColor = "";
    } else {
      currentColor = colorMap[code.replace("[", "\\x1b[")] || "";
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={key++} style={currentColor ? { color: currentColor } : undefined}>
        {line.slice(lastIndex)}
      </span>
    );
  }

  return parts.length > 0 ? <>{parts}</> : line;
}

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { output, clear } = executeCommand(input);

    if (clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: input, output }]);
    }

    if (input.trim()) {
      setCmdHistory((prev) => [input, ...prev]);
    }
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIndex);
      if (cmdHistory[newIndex]) setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex] || "");
      }
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: isOpen ? "#238636" : "#161b22",
          borderColor: isOpen ? "#3fb950" : "#30363d",
          color: isOpen ? "#fff" : "#8b949e",
        }}
        aria-label="Toggle interactive terminal"
      >
        <span className="font-mono text-sm font-bold">&gt;_</span>
      </button>

      {/* Terminal panel */}
      {isOpen && (
        <div
          className="fixed bottom-16 right-5 z-50 w-[min(420px,calc(100vw-40px))] rounded-lg border overflow-hidden font-mono text-xs shadow-2xl"
          style={{
            borderColor: "#30363d",
            backgroundColor: "#0d1117",
            animation: "terminalSlideIn 0.2s ease-out",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-3 py-2 border-b select-none"
            style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#febc2e" }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
            <span className="ml-2 text-[10px]" style={{ color: "#484f58" }}>
              interactive — bash
            </span>
          </div>

          {/* Output */}
          <div
            ref={scrollRef}
            className="px-3 py-2 max-h-60 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Welcome message */}
            {history.length === 0 && (
              <div style={{ color: "#8b949e" }}>
                Type &quot;help&quot; for available commands.
              </div>
            )}

            {history.map((entry, i) => (
              <div key={i} className="mb-1">
                {/* Prompt + command */}
                <div>
                  <span style={{ color: "#3fb950" }}>subrat@arch</span>
                  <span style={{ color: "#8b949e" }}>:</span>
                  <span style={{ color: "#539bf5" }}>~</span>
                  <span style={{ color: "#8b949e" }}>$ </span>
                  <span style={{ color: "#e6edf3" }}>{entry.command}</span>
                </div>
                {/* Output */}
                {entry.output.map((line, j) => (
                  <div key={j} style={{ color: "#c9d1d9" }} className="whitespace-pre">
                    {colorize(line)}
                  </div>
                ))}
              </div>
            ))}

            {/* Active prompt */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span style={{ color: "#3fb950" }}>subrat@arch</span>
              <span style={{ color: "#8b949e" }}>:</span>
              <span style={{ color: "#539bf5" }}>~</span>
              <span style={{ color: "#8b949e" }}>$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none caret-[#3fb950] ml-1"
                style={{ color: "#e6edf3" }}
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
