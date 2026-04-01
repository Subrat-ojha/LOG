"use client";

interface Suggestion {
  removed: string;
  added: string;
}

interface Review {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  status: "approved" | "changes_requested" | "commented";
  body: string;
  suggestion?: Suggestion;
  timeAgo: string;
}

const REVIEWS: Review[] = [
  {
    name: "Sanjay M.",
    role: "Tech Lead",
    initials: "SM",
    avatarBg: "#388bfd",
    status: "approved",
    body: "Consistently delivers clean, well-tested code. His Spring Boot microservices are some of the most maintainable I've reviewed.",
    suggestion: {
      removed: '  status: junior',
      added: '  status: senior-ready',
    },
    timeAgo: "2 weeks ago",
  },
  {
    name: "Priya K.",
    role: "Product Manager",
    initials: "PK",
    avatarBg: "#a371f7",
    status: "approved",
    body: "Takes ownership of features end-to-end. Translated complex FSM requirements into a working system ahead of schedule.",
    timeAgo: "3 days ago",
  },
  {
    name: "Rahul D.",
    role: "Senior Dev",
    initials: "RD",
    avatarBg: "#3fb950",
    status: "commented",
    body: "Solid understanding of distributed systems. Would love to see more Kafka integration in the next sprint.",
    suggestion: {
      removed: '  messaging: "REST only"',
      added: '  messaging: ["REST", "Kafka", "gRPC"]',
    },
    timeAgo: "5 days ago",
  },
];

function StatusBadge({ status }: { status: Review["status"] }) {
  if (status === "approved") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ backgroundColor: "#238636", color: "#ffffff" }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
        </svg>
        Approved
      </span>
    );
  }

  if (status === "changes_requested") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ backgroundColor: "#9e6a03", color: "#ffffff" }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75h4.44a.75.75 0 0 0 0-1.5H5.78a.75.75 0 0 0 0 1.5Z" />
        </svg>
        Changes requested
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: "#30363d", color: "#8b949e" }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm9-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 6.75Z" />
      </svg>
      Commented
    </span>
  );
}

function SuggestionBlock({ suggestion }: { suggestion: Suggestion }) {
  return (
    <div
      className="mt-3 overflow-hidden rounded-md border text-xs"
      style={{ borderColor: "#30363d" }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 font-medium"
        style={{ backgroundColor: "#161b22", color: "#8b949e", borderBottom: "1px solid #30363d" }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M14.064 0h.186C15.216 0 16 .784 16 1.75v.186l-2 2L10.5 7.5 8 5l3.564-3.564 2.5-2.5ZM0 12.564 8 4.5 11.5 8l-8 8H0v-3.436Z" />
        </svg>
        Suggested change
      </div>
      <div style={{ fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace" }}>
        <div
          className="px-3 py-1"
          style={{ backgroundColor: "#2d1215", color: "#f85149" }}
        >
          <span style={{ userSelect: "none", color: "#f8514980", marginRight: "8px" }}>-</span>
          {suggestion.removed}
        </div>
        <div
          className="px-3 py-1"
          style={{ backgroundColor: "#12261e", color: "#3fb950" }}
        >
          <span style={{ userSelect: "none", color: "#3fb95080", marginRight: "8px" }}>+</span>
          {suggestion.added}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="rounded-md border"
      style={{ borderColor: "#30363d", backgroundColor: "#0d1117" }}
    >
      {/* Review header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        {/* Avatar */}
        <div
          className="flex shrink-0 items-center justify-center rounded-full text-xs font-semibold"
          style={{
            width: 32,
            height: 32,
            backgroundColor: review.avatarBg,
            color: "#ffffff",
          }}
        >
          {review.initials}
        </div>

        {/* Name and role */}
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>
            {review.name}
          </span>
          <span className="text-xs" style={{ color: "#8b949e" }}>
            {review.role}
          </span>
        </div>

        {/* Time + Badge */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs sm:inline" style={{ color: "#8b949e" }}>
            {review.timeAgo}
          </span>
          <StatusBadge status={review.status} />
        </div>
      </div>

      {/* Review body */}
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed" style={{ color: "#e6edf3" }}>
          {review.body}
        </p>
        {review.suggestion && <SuggestionBlock suggestion={review.suggestion} />}
      </div>
    </div>
  );
}

export default function PRReviews() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      {/* Section heading styled like a GitHub conversation thread */}
      <div className="mb-6 flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#8b949e"
        >
          <path d="M1.5 2.75a.25.25 0 0 1 .25-.25h8.5a.25.25 0 0 1 .25.25v5.5a.25.25 0 0 1-.25.25h-3.5a.75.75 0 0 0-.53.22L3.5 11.44V9.25a.75.75 0 0 0-.75-.75h-1a.25.25 0 0 1-.25-.25Zm.25-1.75A1.75 1.75 0 0 0 0 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.458 1.458 0 0 0 2.487 1.03L7.061 10h3.189A1.75 1.75 0 0 0 12 8.25v-5.5A1.75 1.75 0 0 0 10.25 1ZM14.5 4.75a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.457 1.457 0 0 1-2.487 1.03L9.22 12.28a.75.75 0 1 1 1.06-1.06l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z" />
        </svg>
        <h2 className="text-base font-semibold" style={{ color: "#e6edf3" }}>
          Review comments
        </h2>
        <span
          className="ml-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: "#30363d", color: "#8b949e" }}
        >
          {REVIEWS.length}
        </span>
      </div>

      {/* Timeline spine */}
      <div className="relative flex flex-col gap-4">
        {/* Vertical line connecting reviews */}
        <div
          className="absolute left-[15px] top-0 hidden h-full w-[2px] sm:block"
          style={{ backgroundColor: "#30363d" }}
          aria-hidden="true"
        />

        {REVIEWS.map((review, i) => (
          <div key={i} className="relative sm:pl-10">
            {/* Dot on timeline */}
            <div
              className="absolute left-[11px] top-5 z-10 hidden size-[10px] rounded-full border-2 sm:block"
              style={{ backgroundColor: "#0d1117", borderColor: "#30363d" }}
              aria-hidden="true"
            />
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </section>
  );
}
