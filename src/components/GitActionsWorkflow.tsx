"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  name: string;
  duration: string;
  detail?: string;
}

interface Job {
  name: string;
  steps: Step[];
}

const jobs: Job[] = [
  {
    name: "build",
    steps: [
      { name: "Checkout code", duration: "2s" },
      { name: "Setup Java 17", duration: "15s" },
      { name: "Run tests", duration: "34s" },
      { name: "Build with Maven", duration: "48s" },
    ],
  },
  {
    name: "deploy",
    steps: [
      { name: "Docker build", duration: "22s" },
      { name: "Push to ECR", duration: "8s" },
      { name: "Deploy to K8s", duration: "12s" },
      { name: "Health check", duration: "3s", detail: "200 OK" },
    ],
  },
];

const totalSteps = jobs.reduce((acc, job) => acc + job.steps.length, 0);

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 1.5a6.5 6.5 0 1 0 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JobIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="1"
        y="1"
        width="14"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 8l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GitActionsWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let step = 0;
    // First step appears spinning immediately
    setActiveStep(0);

    const interval = setInterval(() => {
      step++;
      if (step > totalSteps) {
        clearInterval(interval);
        return;
      }
      setActiveStep(step);
    }, 400);

    return () => clearInterval(interval);
  }, [started]);

  // Map activeStep to per-step state
  // Each step has 2 phases: spinning (activeStep === flatIndex), done (activeStep > flatIndex)
  let flatIndex = 0;

  function getStepState(idx: number): "idle" | "running" | "done" {
    if (!started || activeStep < idx) return "idle";
    if (activeStep === idx) return "running";
    return "done";
  }

  function getJobState(jobSteps: Step[], startIdx: number): "idle" | "running" | "done" {
    const endIdx = startIdx + jobSteps.length - 1;
    if (activeStep < startIdx) return "idle";
    if (activeStep > endIdx) return "done";
    return "running";
  }

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <style>{`
        @keyframes spin-step {
          to { transform: rotate(360deg); }
        }
        .ga-spinner {
          animation: spin-step 0.8s linear infinite;
        }
        .ga-step-enter {
          animation: gaStepIn 0.25s ease-out forwards;
        }
        @keyframes gaStepIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        className="rounded-md overflow-hidden"
        style={{
          border: "1px solid #30363d",
          backgroundColor: "#0d1117",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
        }}
      >
        {/* Workflow header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            backgroundColor: "#161b22",
            borderBottom: "1px solid #30363d",
          }}
        >
          <span style={{ color: "#3fb950" }}>
            <CheckIcon />
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: "#e6edf3" }}
          >
            deploy-portfolio.yml
          </span>
        </div>

        {/* Run info */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderBottom: "1px solid #30363d" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-base font-semibold"
              style={{ color: "#e6edf3" }}
            >
              Build &amp; Ship
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                color: "#8b949e",
                backgroundColor: "#21262d",
                border: "1px solid #30363d",
              }}
            >
              #42
            </span>
          </div>
          <span className="text-xs" style={{ color: "#8b949e" }}>
            triggered 2m ago
          </span>
        </div>

        {/* Jobs */}
        <div className="px-4 py-3 space-y-1">
          {(() => {
            let stepCounter = 0;
            return jobs.map((job, jobIdx) => {
              const jobStartIdx = stepCounter;
              const jobState = getJobState(job.steps, jobStartIdx);

              const jobEl = (
                <div key={job.name} className={jobIdx > 0 ? "mt-3" : ""}>
                  {/* Job header */}
                  <div
                    className="flex items-center gap-2 py-1.5"
                    style={{
                      opacity:
                        jobState === "idle" ? 0.4 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        color:
                          jobState === "done"
                            ? "#3fb950"
                            : jobState === "running"
                            ? "#d29922"
                            : "#8b949e",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {jobState === "running" ? (
                        <SpinnerIcon className="ga-spinner" />
                      ) : (
                        <JobIcon />
                      )}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#e6edf3" }}
                    >
                      {job.name}
                    </span>
                  </div>

                  {/* Steps */}
                  <div
                    className="ml-2 pl-4"
                    style={{ borderLeft: "2px solid #30363d" }}
                  >
                    {job.steps.map((step, stepIdx) => {
                      const currentFlatIdx = jobStartIdx + stepIdx;
                      const state = getStepState(currentFlatIdx);

                      return (
                        <div
                          key={step.name}
                          className={
                            state !== "idle" ? "ga-step-enter" : ""
                          }
                          style={{
                            opacity: state === "idle" ? 0 : 1,
                            animationDelay:
                              state !== "idle" ? "0ms" : undefined,
                          }}
                        >
                          <div
                            className="flex items-center justify-between py-1 px-2 rounded text-sm"
                            style={{
                              backgroundColor:
                                state === "running"
                                  ? "rgba(210,153,34,0.06)"
                                  : "transparent",
                              transition: "background-color 0.3s ease",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {state === "running" ? (
                                <span style={{ color: "#d29922" }}>
                                  <SpinnerIcon className="ga-spinner" />
                                </span>
                              ) : state === "done" ? (
                                <span style={{ color: "#3fb950" }}>
                                  <CheckIcon />
                                </span>
                              ) : (
                                <span
                                  style={{
                                    width: 16,
                                    height: 16,
                                    display: "inline-block",
                                  }}
                                />
                              )}
                              <span style={{ color: "#e6edf3" }}>
                                {step.name}
                              </span>
                              {step.detail && state === "done" && (
                                <span
                                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                                  style={{
                                    color: "#3fb950",
                                    backgroundColor:
                                      "rgba(63,185,80,0.1)",
                                  }}
                                >
                                  {step.detail}
                                </span>
                              )}
                            </div>
                            {state === "done" && (
                              <span
                                className="text-xs font-mono"
                                style={{ color: "#8b949e" }}
                              >
                                {step.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );

              stepCounter += job.steps.length;
              return jobEl;
            });
          })()}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-1.5 px-4 py-2 text-xs"
          style={{
            borderTop: "1px solid #30363d",
            color: "#8b949e",
          }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                activeStep >= totalSteps ? "#3fb950" : "#d29922",
              transition: "background-color 0.3s ease",
            }}
          />
          {activeStep >= totalSteps
            ? "All jobs completed successfully"
            : started
            ? "Running..."
            : "Waiting to start"}
        </div>
      </div>
    </div>
  );
}
