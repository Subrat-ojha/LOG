# Portfolio Feature Tracker

## Completed Features (Previous)
- [x] Terminal Hero (neofetch-style intro)
- [x] GitHub-themed dark/light mode toggle
- [x] Contribution Graph (Tech Proficiency)
- [x] GitHub Activity (real-time contribution calendar)
- [x] PR-style Project Cards
- [x] Commit History (Experience timeline)
- [x] Git Stash (Currently Learning)
- [x] Git Blame (Blog/Writing)
- [x] Issue Contact Form
- [x] File Tree Sidebar navigation
- [x] Commit Spine scroll indicator
- [x] Interactive Terminal
- [x] Git Branch Connections SVG overlay
- [x] Smaller dark mode toggle icon
- [x] Mobile responsiveness fixes across all components
- [x] Real-time GitHub contribution graph (via API route scraping)

## New Features (Batch 2)

### 1. Typing Sound Effects on Terminal Hero
- **Status:** Done
- **File:** `src/components/TerminalHero.tsx`
- **Description:** Subtle mechanical keyboard click sounds via Web Audio API during the neofetch typing animation. Uses oscillator-based synthesis -- no external audio files needed.

### 2. Pinned GitHub Repos (Dynamic PR Cards)
- **Status:** Done
- **Files:** `src/app/api/repos/route.ts`, `src/components/PRCard.tsx`
- **Description:** Fetches real repos from GitHub API (`/api/repos`), merges with static project data, and renders additional repos as PR cards with language-colored tags. Falls back to static data on API failure.

### 3. Command Palette (Ctrl+K)
- **Status:** Done
- **File:** `src/components/CommandPalette.tsx`
- **Description:** VS Code-style command palette overlay. Opens with Ctrl+K / Cmd+K. Fuzzy search across all sections, keyboard navigation (arrows + enter), SVG file icons matching the sidebar. Wired into layout.tsx for global access.

### 4. Visitor Counter (git pull stat)
- **Status:** Done
- **File:** `src/components/VisitorCounter.tsx`
- **Description:** Displays as `$ git pull origin main -- N fetches`. Uses localStorage for persistence with session-based increment tracking. Seeded with base count. Placed above footer.

### 5. Resume Download (git clone)
- **Status:** Done
- **File:** `src/components/GitCloneResume.tsx`
- **Description:** Terminal-styled `$ git clone https://subrat.tech/resume.pdf` button. On click: triggers download, shows "Cloning into..." message, animated progress bar (0-100%), then "Done." Resets after 2 seconds. Placed after hero section.

### 6. Animated Code Diff (Career Section)
- **Status:** Done
- **File:** `src/components/GitDiff.tsx`
- **Description:** Diff lines now animate in sequentially (40ms per line) when the section scrolls into view via IntersectionObserver. Only animates once. Creates the feel of watching `git diff` output stream in.

### 7. Easter Egg Terminal Commands
- **Status:** Done
- **File:** `src/lib/terminalCommands.ts`
- **Description:** Added 8+ new commands to the interactive terminal:
  - `sudo hire-me` -- ASCII box with contact info
  - `cat skills.json` -- Pretty-printed, color-coded skills JSON
  - `history` -- Career timeline as bash history
  - `fortune` -- Random dev wisdom/jokes
  - `uptime` -- Coding uptime stats
  - `rm -rf /` -- Humorous refusal
  - `exit` -- "There is no escape" message
  - `date`, `uname`, `ping` -- System command parodies
  - Updated `help` to list all easter eggs
  - Updated `ls` to show `skills.json` and `resume.pdf`

### 8. Enhanced Theme Transition
- **Status:** Done
- **File:** `src/components/ThemeToggle.tsx`
- **Description:** Code-themed particle burst effect on theme toggle. Spawns 18 monospace characters (`01{};<>/=()`) that fly outward from the click point with rotation and fade. Green particles for dark mode, blue for light mode. Complements the existing ripple/view transition.

### 9. VS Code Status Bar
- **Status:** Done
- **File:** `src/components/StatusBar.tsx`
- **Description:** Fixed bottom bar mimicking VS Code. Shows:
  - Left: green git branch badge ("main"), sync icon, 0 errors / 0 warnings
  - Right: current section filename (reactive via scroll context), UTF-8, TypeScript JSX, notification bell
  - GitHub dark theme styling with 24px height
