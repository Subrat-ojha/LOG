"use client";

import { useState } from "react";
import { ScrollSectionProvider } from "@/lib/ScrollSectionContext";
import AnimatedSection from "@/components/AnimatedSection";
import TerminalHero from "@/components/TerminalHero";
import ContributionGraph from "@/components/ContributionGraph";
import GitDiff from "@/components/GitDiff";
import GitHubActivity from "@/components/GitHubActivity";
import ProjectPRCards from "@/components/PRCard";
import CommitHistory from "@/components/CommitHistory";
import IssueContact from "@/components/IssueContact";
import CommitSpine from "@/components/CommitSpine";
import FileTreeSidebar from "@/components/FileTreeSidebar";
import GitStash from "@/components/GitStash";
import GitBlame from "@/components/GitBlame";
import GitBranchConnections from "@/components/GitBranchConnections";
import GitCloneResume from "@/components/GitCloneResume";
import VisitorCounter from "@/components/VisitorCounter";
import StatusBar from "@/components/StatusBar";
import PullRequestAbout from "@/components/PullRequestAbout";
import GitGraph from "@/components/GitGraph";
import GitActionsWorkflow from "@/components/GitActionsWorkflow";
import PRReviews from "@/components/PRReviews";
import AchievementBadges from "@/components/AchievementBadges";
import NowPlaying from "@/components/NowPlaying";
import MergeConflict from "@/components/MergeConflict";

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${contactForm.name}`);
    const body = encodeURIComponent(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`);
    window.open(`mailto:iamsubratojha@gmail.com?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <ScrollSectionProvider>
      <div className="relative max-w-5xl mx-auto px-3 sm:px-4" data-spine-container>
        {/* SVG branch connections overlay */}
        <GitBranchConnections />

        <div className="flex gap-6 justify-center">
          {/* Left: Commit Spine */}
          <CommitSpine />

          {/* Center: Main Content */}
          <div className="max-w-2xl w-full min-w-0 py-8 sm:py-12 md:py-20">
            {/* Hero - Terminal CLI */}
            <section id="hero">
              <AnimatedSection>
                <TerminalHero />
              </AnimatedSection>
            </section>

            {/* Resume Download */}
            <div className="my-6">
              <AnimatedSection delay={200}>
                <GitCloneResume />
              </AnimatedSection>
            </div>

            <hr className="border-border my-10" />

            {/* About Me - Pull Request */}
            <section id="about">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">About Me</h2>
                <PullRequestAbout />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Career Evolution - GitHub Diff */}
            <section id="career">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Career Evolution</h2>
                <p className="text-sm text-muted-foreground mb-4">How my stack has evolved over time:</p>
                <GitDiff />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Career Graph - git log --graph */}
            <section id="graph">
              <AnimatedSection variant="fade-left">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Career Path</h2>
                <p className="text-sm text-muted-foreground mb-4">Branch history of my journey:</p>
                <GitGraph />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Tech Stack - Contribution Graph */}
            <section id="tech-stack">
              <AnimatedSection variant="fade-left">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</h2>
                <ContributionGraph />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* GitHub Activity - Real-time Commit Graph */}
            <section id="activity">
              <AnimatedSection variant="fade-right">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">GitHub Activity</h2>
                <GitHubActivity />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* CI/CD Pipeline */}
            <section id="pipeline">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">How I Ship Code</h2>
                <GitActionsWorkflow />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Projects - PR Cards */}
            <section id="projects">
              <AnimatedSection variant="stagger" staggerDelay={100}>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Projects</h2>
                <ProjectPRCards />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* PR Reviews / Testimonials */}
            <section id="reviews">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Code Reviews</h2>
                <p className="text-sm text-muted-foreground mb-4">What people say about working with me:</p>
                <PRReviews />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Experience & Education - Commit History */}
            <section id="experience">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Experience</h2>
                <CommitHistory />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Achievement Badges */}
            <section id="achievements">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Achievements</h2>
                <AchievementBadges />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Git Stash - Learning */}
            <section id="stash">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Currently Learning</h2>
                <p className="text-sm text-muted-foreground mb-4">Things I&apos;m exploring next — stashed for later:</p>
                <GitStash />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Now Playing / Current Status */}
            <section id="now">
              <AnimatedSection variant="fade-right">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Current Status</h2>
                <NowPlaying />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Merge Conflict - Work vs Life */}
            <section id="conflict">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Work-Life Balance</h2>
                <MergeConflict />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Blog - Git Blame */}
            <section id="blog">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Writing</h2>
                <p className="text-sm text-muted-foreground mb-4">Articles and thoughts on engineering:</p>
                <GitBlame />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Contact - Issue Tracker */}
            <section id="contact">
              <AnimatedSection variant="fade-up">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Contact Me</h2>
                <IssueContact
                  form={contactForm}
                  onChange={setContactForm}
                  onSubmit={handleContact}
                />
              </AnimatedSection>
            </section>

            <hr className="border-border my-10" />

            {/* Social Links */}
            <AnimatedSection>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground mb-10">
                <a href="https://github.com/Subrat-ojha" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Github</a>
                <span className="text-border">/</span>
                <a href="https://linkedin.com/in/Subrat-ojha" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                <span className="text-border">/</span>
                <a href="https://twitter.com/iamsubratojha" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
                <span className="text-border">/</span>
                <a href="https://medium.com/@subratojha" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Medium</a>
              </div>
            </AnimatedSection>

            {/* Visitor Counter */}
            <AnimatedSection>
              <div className="mb-6">
                <VisitorCounter />
              </div>
            </AnimatedSection>

            {/* Footer */}
            <footer className="border-t border-border pt-6 pb-12 text-xs text-muted-foreground font-mono space-y-1">
              <p>&copy; {new Date().getFullYear()} Subrat Ojha</p>
              <p>
                Built by{" "}
                <a href="https://subrat.tech" className="text-primary hover:underline">
                  Subrat Ojha
                </a>
                . The source code is available on{" "}
                <a href="https://github.com/subratojha" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  GitHub
                </a>
                .
              </p>
              <p className="text-[10px]">Press Ctrl+K to navigate -- Konami code unlocks a surprise</p>
            </footer>
          </div>

          {/* Right: File Tree Sidebar */}
          <FileTreeSidebar />
        </div>
      </div>
      <StatusBar />
    </ScrollSectionProvider>
  );
}
