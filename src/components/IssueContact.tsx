"use client";

interface IssueContactProps {
  form: { name: string; email: string; message: string };
  onChange: (form: { name: string; email: string; message: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const labels = [
  { text: "question", color: "#539bf5" },
  { text: "collaboration", color: "#3fb950" },
  { text: "hiring", color: "#8957e5" },
] as const;

export default function IssueContact({
  form,
  onChange,
  onSubmit,
}: IssueContactProps) {
  const update = (field: keyof typeof form, value: string) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="w-full rounded-md border border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3 sm:px-6">
        <h2 className="font-mono text-lg font-semibold text-[#e6edf3]">
          New Issue
        </h2>
        <div className="flex items-center gap-2">
          {labels.map((label) => (
            <span
              key={label.text}
              className="cursor-default select-none rounded-full border px-2.5 py-0.5 font-mono text-xs leading-tight"
              style={{
                borderColor: label.color,
                color: label.color,
              }}
            >
              {label.text}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4">
        {/* Title input */}
        <div>
          <label
            htmlFor="issue-title"
            className="mb-1.5 block font-mono text-xs font-medium text-[#8b949e]"
          >
            Title
          </label>
          <input
            id="issue-title"
            type="text"
            placeholder="Brief subject..."
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 font-mono text-sm text-[#e6edf3] placeholder-[#484f58] outline-none transition-colors focus:border-[#539bf5]"
          />
        </div>

        {/* Email input */}
        <div>
          <label
            htmlFor="issue-email"
            className="mb-1.5 block font-mono text-xs font-medium text-[#8b949e]"
          >
            Email
          </label>
          <input
            id="issue-email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full max-w-xs rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#e6edf3] placeholder-[#484f58] outline-none transition-colors focus:border-[#539bf5]"
          />
        </div>

        {/* Tab bar */}
        <div className="border-b border-[#30363d]">
          <div className="flex gap-0 -mb-px">
            <button
              type="button"
              className="rounded-t-md border border-[#30363d] border-b-[#0d1117] bg-[#0d1117] px-4 py-1.5 font-mono text-xs font-medium text-[#e6edf3]"
            >
              Write
            </button>
            <button
              type="button"
              className="rounded-t-md border border-transparent px-4 py-1.5 font-mono text-xs text-[#8b949e] hover:text-[#e6edf3]"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            placeholder="Leave a comment..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={8}
            className="w-full resize-y rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] outline-none transition-colors focus:border-[#539bf5]"
          />
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-[#484f58]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z" />
            </svg>
            Styling with markdown is supported
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-[#30363d] pt-4">
          <span className="text-xs text-[#484f58]">
            Reach me at{" "}
            <span className="font-mono text-[#8b949e]">
              iamsubratojha@gmail.com
            </span>
          </span>
          <button
            type="submit"
            className="rounded-md bg-[#238636] px-4 py-1.5 font-mono text-sm font-semibold text-white transition-colors hover:bg-[#2ea043]"
          >
            Submit new issue
          </button>
        </div>
      </form>
    </div>
  );
}
