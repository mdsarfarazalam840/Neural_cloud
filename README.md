<div align="center">

# 🧬 NEURAL_ARCHITECT

## HYPER-SPECTRAL INTERFACE

**v1.0.0** — *A cyberpunk/HUD-themed interactive portfolio experience*

![React](https://img.shields.io/badge/React-19-74f5ff?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-a855f7?style=flat-square&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-0.184-00dbe7?style=flat-square&logo=three.js)
![Tailwind](https://img.shields.io/badge/Tailwind-4-74f5ff?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/Router-7-ecb2ff?style=flat-square&logo=reactrouter)

</div>

---

## Overview

NEURAL_ARCHITECT is a **dark-theme, hyper-spectral interface** built as a portfolio and interactive showcase for a fictional "Neural Architect" persona. It blends high-fidelity minimalism with cyberpunk aesthetics, featuring real-time 3D/2D background scenes, a custom dual-cursor system, glassmorphic UI components, and an embedded WebSocket-powered terminal emulator.

The project explores the intersection of **brutalist technical data visualization** and **luxurious motion design** — presenting kernel modules, protocol stacks, signal routing schematics, and system metrics as if they were part of a real distributed operating system.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 8 |
| **Routing** | React Router 7 |
| **3D Graphics** | Three.js 0.184, @react-three/fiber 9, @react-three/drei 10, @react-three/postprocessing 3 |
| **Styling** | Tailwind CSS 4 (via @tailwindcss/vite) |
| **Typography** | Sora (display), JetBrains Mono (body) |
| **Terminal** | @xterm/xterm 6, @xterm/addon-fit, WebSocket (ws 8) |
| **Animation** | IntersectionObserver, CSS keyframes, spring physics (custom) |
| **Build** | Vite 8, Rolldown |

---

## Features

- **3 Interchangeable Background Scenes** — HyperSpectral (Three.js — icosahedron wireframe, orbital rings, particle constellation with bloom post-processing), Cinematic (Canvas2D — particle network, data streams, moving grid), Motion (Canvas2D — optimized 60fps particles + grid)
- **Custom Dual-Cursor** — Cyan outer ring + violet trailing dot with spring-physics lerp, expands on interactive elements
- **Embedded Terminal Emulator** — Full xterm.js terminal with WebSocket-backed shell access (Ctrl+Backtick), auto-reconnect
- **Glassmorphic UI System** — Frosted glass cards with backdrop blur, luminous borders, 3D tilt on hover, shimmer overlays
- **Scanline & Noise Overlays** — CRT scanline effect + SVG fractal noise for analog texture
- **Glitch Effect** — Text glitch animation on hover for headings
- **Scroll-Reveal Animations** — IntersectionObserver-based fade-in-up entrance animations staggered across all sections
- **Live Metrics Strip** — Animated system status bar (uptime, nodes, throughput, signal lock)
- **Settings Panel** — Toggle scanline, noise, glitch; switch visual modes; all persisted to localStorage
- **4 Themed Pages** — Home, Core Kernel, Protocol Docs, Schematics — each with a distinct informational layout
- **Responsive Design** — Fluid grid (12-col desktop, 4-col mobile), spacing in 8px increments

---

## Architecture

```
BrowserRouter
 └── SettingsProvider (Context + localStorage)
      └── Routes
           └── Layout (shared shell)
                ├── ScrollToTop          ← scrolls to top on route change
                ├── Cursor               ← custom dual-cursor
                ├── BackgroundScene      ← HyperSpectral | Cinematic | Motion
                ├── Navbar               ← fixed top nav with active section tracking
                ├── <Outlet />           ← page content
                │    ├── / → App
                │    │    ├── Hero
                │    │    ├── MetricsStrip
                │    │    ├── AboutSection
                │    │    ├── ProjectsSection
                │    │    └── ConnectSection
                │    ├── /core → CorePage
                │    ├── /protocol-docs → ProtocolDocsPage
                │    └── /schematics → SchematicsPage
                ├── Footer               ← live telemetry streams
                ├── ShellTerminal        ← xterm.js WebSocket terminal
                └── SectionNavWatcher    ← highlights active nav link on scroll
```

---

## Project Structure

```
src/
├── main.jsx                              # Entry point — BrowserRouter + routes
├── App.jsx                               # Home page composition (sections)
├── index.css                             # Global styles, design tokens, animations
│
├── components/
│   ├── hero/
│   │   ├── Hero.jsx                      # Full-screen hero with CTAs
│   │   └── SideMetrics.jsx              # Sidebar metrics
│   │
│   ├── layout/
│   │   ├── Layout.jsx                    # Shared shell — cursor, scene, navbar, footer, terminal
│   │   ├── Navbar.jsx                    # Fixed top nav — smooth scroll / route nav
│   │   ├── Footer.jsx                    # Bottom footer — live telemetry (TX, MEM, TEMP)
│   │   ├── Cursor.jsx                    # Dual-cursor with spring physics
│   │   └── ShellTerminal.jsx            # xterm.js terminal overlay
│   │
│   ├── scenes/
│   │   ├── HyperSpectralScene.jsx        # Three.js — icosahedron, rings, particles, bloom
│   │   ├── CinematicScene.jsx           # Canvas2D — particle network, data streams, grid
│   │   └── MotionScene.jsx             # Canvas2D — optimized 60fps particles + grid
│   │
│   ├── sections/
│   │   ├── AboutSection.jsx             # Core infrastructure cards
│   │   ├── ConnectSection.jsx           # Contact form (themed)
│   │   ├── MetricsStrip.jsx            # Live system status bar
│   │   └── ProjectsSection.jsx         # Operational systems directory
│   │
│   ├── settings/
│   │   └── SettingsPanel.jsx            # Visual settings panel
│   │
│   └── ui/
│       ├── GlassCard.jsx                # Frosted glass container with 3D tilt
│       ├── StatusDot.jsx                # Pulsing radar-style indicator
│       ├── SyncBar.jsx                  # Animated data-sync progress bar
│       └── ToggleSwitch.jsx             # Settings toggle
│
├── pages/
│   ├── CorePage.jsx                     # /core — Kernel architecture & module specs
│   ├── ProtocolDocsPage.jsx             # /protocol-docs — Protocol stack & API reference
│   └── SchematicsPage.jsx               # /schematics — Pipeline flow & signal routing
│
├── context/
│   └── SettingsContext.jsx              # Global state — scanline, noise, glitch, visualMode
│
├── hooks/
│   ├── useScrollReveal.js               # IntersectionObserver-based entrance animations
│   ├── useMouseSpring.js               # Shared spring-physics mouse tracker (singleton)
│   └── useLiveStreams.js               # Simulated telemetry data feed
│
└── server/
    ├── terminal-server.mjs              # Standalone WebSocket terminal server
    └── terminal-plugin.mjs              # Vite plugin for embedded WebSocket terminal
```

---

## Design System

The interface follows a **dark-only, high-contrast cyberpunk** design language documented in `hyper_spectral_interface/DESIGN.md`.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#050505` | Deep obsidian base |
| `--color-primary-fixed-dim` | `#00dbe7` | Electric Cyan — primary accent, buttons, links |
| `--color-primary-fixed` | `#74f5ff` | Cyan highlight — hover states, glow |
| `--color-secondary-fixed-dim` | `#ecb2ff` | Neon Violet — secondary accent |
| `--color-tertiary-fixed-dim` | `#e8c423` | Gold — tertiary highlights, badges |
| `--color-on-surface-variant` | `#b9cacb` | Muted text — body copy |
| `--color-outline` | `#849495` | Borders, dividers |

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display (desktop) | Sora | 800 | 72px |
| Display (mobile) | Sora | 800 | 40px |
| Headline | Sora | 600 | 32px / 24px |
| Body | JetBrains Mono | 400 | 16px / 18px |
| Labels | JetBrains Mono | 500 | 12px, 0.1em tracking |

### Glassmorphism

- Background: `rgba(19, 19, 19, 0.6)` with `backdrop-filter: blur(12px) saturate(1.2)`
- Borders: `1px solid rgba(255, 255, 255, 0.05)`
- Glow: `box-shadow: 0 0 20px rgba(0, 219, 231, 0.3)` on hover
- Shimmer: Animated sweep across card surface

### Motion Philosophy

- **Scroll reveals:** Fade-in-up (30px → 0) with `cubic-bezier(0.19, 1, 0.22, 1)` — intentional, weighty
- **Hover tilts:** `perspective(1000px) rotateX/Y` driven by spring physics — tactile, responsive
- **Cursors:** Spring lerp with stiffness/damping — smooth, never laggy
- **Scene animations:** Time-based continuous rotation, pulsing, mouse parallax — ambient, non-distracting
- **Data streams:** Falling code characters spawning every 3s — atmospheric, rhythmic

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

### Installation

```bash
git clone <repository-url>
cd neural-architect
npm install
```

### Development

```bash
npm run dev
```

Starts Vite dev server (default: `http://localhost:5173`). The WebSocket terminal is automatically embedded in the dev server via the Vite plugin.

### Production Build

```bash
npm run build
npm run preview
```

Build output goes to `dist/`.

### Standalone Terminal Server (optional)

```bash
npm run terminal
```

Runs a standalone WebSocket terminal server on `ws://localhost:3001`. Useful if you want to connect an external terminal client.

---

## Routes

| Path | Page | Sections |
|------|------|----------|
| `/` | **Home** (`App.jsx`) | Hero, Metrics Strip, About (Core Infrastructure), Projects (Operational Systems), Connect |
| `/core` | **Core Page** (`CorePage.jsx`) | Kernel hero, Kernel Modules grid (2×2), Technical Specification, Bottom CTA |
| `/protocol-docs` | **Protocol Docs** (`ProtocolDocsPage.jsx`) | Protocol hero, OSI Stack layers (5), Public API Reference (4 endpoints), Bottom CTA |
| `/schematics` | **Schematics** (`SchematicsPage.jsx`) | Process hero, Data Pipelines, Signal Routing, State Machines, End-to-End Schematic |

---

## Configuration

Visual preferences are accessible via the **settings panel** (gear icon in navbar) and persisted to `localStorage` under the key `neural_settings`.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `scanline` | boolean | `true` | CRT scanline overlay |
| `noise` | boolean | `true` | SVG fractal noise texture |
| `glitch` | boolean | `false` | Text glitch effect on headings |
| `visualMode` | `'hyper-spectral'` \| `'cinematic'` \| `'motion'` | `'hyper-spectral'` | 3D/2D background scene |

---

## Troubleshooting

### Navigation scrolls to bottom of next page

**Issue:** Clicking ACCESS_CORE or PROTOCOL_DOCS from the ORBITAL_FRAME project card (or any cross-route navigation) lands the user at the bottom of the target page instead of the top.

**Root Cause:** React Router does not automatically reset scroll position on route changes. The browser preserves the scroll Y offset from the previous page.

**Solution:** Added a `ScrollToTop` component in `src/components/layout/Layout.jsx` that watches `useLocation().pathname` and calls `window.scrollTo(0, 0)` on every route change. This ensures all page transitions start from the top without affecting existing smooth-scroll behavior on the home page.

### Vite build warns about large chunks

**Issue:** The production build outputs a single JS chunk exceeding 500 kB.

**Root Cause:** All page components, 3D libraries (Three.js, R3F), and the terminal emulator are bundled into one chunk without code-splitting.

**Workaround:** The app remains fully functional. For production optimization, implement route-level lazy loading (see Future Roadmap).

### Terminal fails to connect

**Issue:** The embedded terminal shows "connecting..." indefinitely.

**Root Cause:** The WebSocket terminal server is only available during `vite dev` (embedded via the Vite plugin) or when explicitly started with `npm run terminal`. It is not available in the production build (`npm run preview` or static deployment).

**Solution:** Use `npm run dev` for terminal access, or run `npm run terminal` separately and ensure the client connects to the correct WebSocket URL.

---

## Future Roadmap

- [ ] **Code-Splitting** — Route-level lazy loading with `React.lazy` and `Suspense` to reduce initial bundle size below 500 kB
- [ ] **Test Suite** — Unit tests (Vitest) for hooks, context, and utility functions; integration tests for page rendering and navigation
- [ ] **CI/CD Pipeline** — GitHub Actions for lint, type-check, test, and build on PR/push; auto-deploy to GitHub Pages or Vercel
- [ ] **Docker Containerization** — Dockerfile + docker-compose for reproducible development and production environments
- [ ] **Accessibility Audit** — ARIA labels, keyboard navigation, focus trapping (settings panel, terminal), color contrast ratios, reduced-motion media query
- [ ] **Contact Form Backend** — Serverless function (Vercel Edge / Cloudflare Worker) for form submission handling with rate limiting
- [ ] **PWA Support** — Service worker, offline fallback, manifest.json, install prompt
- [ ] **Internationalization (i18n)** — Locale switching with react-i18next or similar; RTL layout support
- [ ] **Additional 3D Scenes** — Particle cosmos, voxel landscape, wireframe cityscape — each selectable from the settings panel
- [ ] **Keyboard Shortcuts** — Cheatsheet overlay for power users (toggle terminal, toggle settings, navigate routes)

---

## Design Variants

The repository includes generated design variant outputs from the `impeccable` AI skill tool, capturing different visual mode configurations:

| Directory | Scene Mode | Context |
|-----------|-----------|---------|
| `neural_architect_home_live_cinematic/` | Cinematic | Home page |
| `neural_architect_home_motion_active_60fps/` | Motion (60fps) | Home page |
| `operational_systems_projects_live_cinematic/` | Cinematic | Projects section |
| `operational_systems_projects_motion_active_60fps/` | Motion (60fps) | Projects section |

---

## Credits

- **React** and **ReactDOM** — UI framework
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D rendering
- **Tailwind CSS** — Utility-first styling
- **React Router** — Client-side routing
- **xterm.js** — Terminal emulator
- **Vite** — Build tooling
- **Sora** + **JetBrains Mono** — Typography via Google Fonts
- **Material Symbols** — Icon set

---

## License

MIT — see `LICENSE` for details.
