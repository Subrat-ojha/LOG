import Link from "next/link";

const suggestions = [
  { cmd: "projects", path: "/#projects" },
  { cmd: "contact", path: "/#contact" },
  { cmd: "experience", path: "/#experience" },
  { cmd: "blog", path: "/#blog" },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0d1117" }}
    >
      <div className="max-w-lg w-full font-mono">
        {/* Terminal window */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{ borderColor: "#30363d" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ backgroundColor: "#161b22", borderColor: "#30363d" }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
            <span className="ml-2 text-[11px]" style={{ color: "#484f58" }}>
              bash -- 404
            </span>
          </div>

          {/* Body */}
          <div className="px-4 py-4 text-sm" style={{ backgroundColor: "#0d1117" }}>
            {/* Command */}
            <div>
              <span style={{ color: "#3fb950" }}>subrat@arch</span>
              <span style={{ color: "#8b949e" }}>:</span>
              <span style={{ color: "#539bf5" }}>~</span>
              <span style={{ color: "#8b949e" }}>$ </span>
              <span style={{ color: "#e6edf3" }}>git checkout page</span>
            </div>

            {/* Error */}
            <div className="mt-3" style={{ color: "#f85149" }}>
              error: pathspec &apos;page&apos; did not match any file(s) known to git
            </div>

            <div className="mt-4" style={{ color: "#8b949e" }}>
              hint: The page you&apos;re looking for doesn&apos;t exist.
            </div>

            <div className="mt-1" style={{ color: "#8b949e" }}>
              hint: Did you mean one of these?
            </div>

            {/* Suggestions */}
            <div className="mt-2 flex flex-col gap-1">
              {suggestions.map((s) => (
                <Link
                  key={s.cmd}
                  href={s.path}
                  className="inline-flex items-center gap-2 group"
                >
                  <span style={{ color: "#8b949e" }}>{"    "}</span>
                  <span
                    className="group-hover:underline"
                    style={{ color: "#539bf5" }}
                  >
                    {s.cmd}
                  </span>
                </Link>
              ))}
            </div>

            {/* Return home */}
            <div className="mt-6">
              <span style={{ color: "#3fb950" }}>subrat@arch</span>
              <span style={{ color: "#8b949e" }}>:</span>
              <span style={{ color: "#539bf5" }}>~</span>
              <span style={{ color: "#8b949e" }}>$ </span>
              <Link
                href="/"
                className="hover:underline"
                style={{ color: "#3fb950" }}
              >
                cd ~
              </Link>
              <span className="animate-cursor-blink ml-0.5" style={{ color: "#3fb950" }}>|</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center text-xs" style={{ color: "#484f58" }}>
          HTTP 404 -- This is not the page you are looking for.
        </div>
      </div>
    </div>
  );
}
