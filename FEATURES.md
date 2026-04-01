# Portfolio Feature Tracker

## Core Features (Batch 1)
- [x] Terminal Hero (neofetch-style intro with typing sounds)
- [x] GitHub-themed dark/light mode toggle (with particle burst)
- [x] Language Bar + Collapsible Skill Categories
- [x] Real-time GitHub Activity (contribution calendar via API)
- [x] PR-style Project Cards (with live GitHub repo fetching)
- [x] Commit History (Experience timeline)
- [x] Git Stash (Currently Learning)
- [x] Git Blame (Blog/Writing)
- [x] Issue Contact Form
- [x] File Tree Sidebar navigation
- [x] Commit Spine scroll indicator
- [x] Interactive Terminal (with easter egg commands)
- [x] Git Branch Connections SVG overlay

## Interactive Features (Batch 2)
- [x] Command Palette (Ctrl+K) -- fuzzy search navigation
- [x] VS Code Status Bar -- branch, file, encoding
- [x] Git Clone Resume -- animated download button
- [x] Visitor Counter -- git pull stat
- [x] Animated Code Diff -- lines stream on scroll
- [x] Theme Transition Particles -- code character burst

## New Features (Batch 3)

### 1. PR Review Testimonials
- **File:** `src/components/PRReviews.tsx`
- **Description:** Colleague testimonials styled as GitHub PR reviews with Approved/Commented badges, avatars (initials), and inline code suggestion diffs.

### 2. GitHub Actions Pipeline
- **File:** `src/components/GitActionsWorkflow.tsx`
- **Description:** Dev workflow visualized as a CI/CD pipeline run. Jobs animate step-by-step on scroll with spinning yellow indicators turning to green checkmarks.

### 3. Merge Conflict (Work vs Life)
- **File:** `src/components/MergeConflict.tsx`
- **Description:** Interactive merge conflict between work and life. Visitor can "Accept Current", "Accept Incoming", or "Accept Both" to resolve the conflict with a merged humorous result.

### 4. Konami Code Easter Egg
- **File:** `src/components/KonamiEasterEgg.tsx`
- **Description:** Type the Konami code (up up down down left right left right B A) to trigger a full-screen matrix rain effect with Japanese characters and "ACCESS GRANTED" message.

### 5. Custom 404 Page
- **File:** `src/app/not-found.tsx`
- **Description:** Git-themed 404 page: `git checkout page` -> "error: pathspec 'page' did not match any file(s)". Shows suggestions as clickable links. `cd ~` returns home.

### 6. Achievement Badges
- **File:** `src/components/AchievementBadges.tsx`
- **Description:** GitHub-style profile achievement badges in a grid. Badges: First Deploy, 100+ Commits, 3AM Debugger, Pull Shark, Microservice Architect, Full Stack. Each has a glowing icon, hover effects.

### 7. Git Graph (Career Network)
- **File:** `src/components/GitGraph.tsx`
- **Description:** `git log --graph --oneline --all` visualization of career path. Shows branches for education, freelance, career merging into main. Animated on scroll with colored branch lines.

### 8. Current Status (Now Playing)
- **File:** `src/components/NowPlaying.tsx`
- **Description:** Rotating `git status` output showing current activity. Cycles through different "branches" (coding-mode, deep-focus, learning, etc.) with modified files. Live indicator with ping animation.

### 9. Typewriter README
- **File:** `src/components/TypewriterReadme.tsx`
- **Description:** GitHub profile-style README.md that types itself out on scroll. Includes headings, shield badges, bullet lists, and code blocks. Renders with proper markdown styling.

## Section Registry (16 sections)
hero > readme > career > graph > tech-stack > activity > pipeline > projects > reviews > experience > achievements > stash > now > conflict > blog > contact
