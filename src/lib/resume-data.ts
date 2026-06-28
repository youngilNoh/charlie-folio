export interface Personal {
  name: string
  title: string
  location: string
  email: string
  phone: string
  salary: string
  photoSrc: string
}

export interface LinkSet {
  webpage: string
  pdf: string
  github: string
  medium: string
  linkedin: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  id: string
  company: string
  /** Optional company logo (under /public). Falls back to a monogram when absent or it fails to load. */
  logoSrc?: string
  role: string
  period: string
  /** Optional — omit for a just-started / ongoing role with no meaningful length yet. */
  duration?: string
  /**
   * Bullet text verbatim from the source résumé. Wrap emphasized spans in
   * `**...**` (markdown-style bold) and links as `[label](url)` — rendered by <EmphasizedText>.
   */
  highlights: string[]
  stack: string[]
}

export interface Project {
  id: string
  name: string
  /** Optional project logo (under /public). Falls back to a monogram when absent or it fails to load. */
  logoSrc?: string
  tagline: string
  highlights: string[]
  stack: string[]
  /** Live deployment URL. */
  url?: string
  /** Source repository URL. */
  repo?: string
}

export interface Education {
  degree: string
  institution: string
  year: string
}

export interface Resume {
  personal: Personal
  links: LinkSet
  summary: string
  /** Core strengths emphasized as chips under the summary. */
  focus: string[]
  skills: SkillGroup[]
  interests: string[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
}

export const RESUME: Resume = {
  personal: {
    name: "Charlie Noh",
    title: "Frontend Engineer",
    location: "Melbourne, VIC",
    email: "yesimnoh@gmail.com",
    phone: "0455-177-015",
    salary: "$ Negotiable",
    photoSrc: "/images/profile.png",
  },
  links: {
    webpage: "https://charlie-folio.vercel.app/",
    pdf: "", // TODO: Insert Google Drive share link
    github: "https://github.com/youngilNoh",
    medium: "https://medium.com/@yesimnoh",
    linkedin: "https://www.linkedin.com/in/youngil-noh-470992198/",
  },
  summary:
    "Strong experienced in **React, Next.js, TypeScript, Vue, and Nuxt** across e-commerce and iGaming domains. I focus on scalable UI architecture, design systems, admin platforms, frontend performance, and developer productivity. My recent work includes **Server-Driven UI**, **CI/CD improvements**, and **reusable frontend seed projects**. I believe technology is a tool for solving problems, and great engineers take ownership of those problems from end to end.",
  focus: [
    "Scalable UI Architecture",
    "Design Systems",
    "Server-Driven UI",
    "Frontend Performance",
    "Developer Productivity",
    "CI/CD",
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      items: [
        "TypeScript",
        "JavaScript",
        "React",
        "Vue",
        "Next.js",
        "Nuxt",
        "Node.js",
      ],
    },
    {
      category: "Documentation",
      items: ["Storybook", "Docusaurus"],
    },
    {
      category: "Testing",
      items: ["Jest", "Vitest", "Playwright"],
    },
    {
      category: "DevOps",
      items: ["Docker", "GitHub Actions", "Argo CD"],
    },
    {
      category: "AI",
      items: ["AI Agents", "Claude Code", "AI-driven Workflow"],
    },
  ],
  interests: ["AI", "Chess", "Problem Solving", "Poker", "Crossfit", "Coffee"],
  experience: [
    {
      id: "nsus-group",
      company: "NSUS GROUP",
      logoSrc: "/images/logos/nsus.png",
      role: "Frontend Engineer",
      period: "Feb 2025 – Mar 2026",
      duration: "1 year 1 month",
      highlights: [
        "Identified that new iGaming platforms were being bootstrapped by copying customized Vue 2 legacy projects, **creating security, compliance, maintainability, and onboarding risks** after Vue 2 reached EOL. Led the architecture and implementation of an **AI-assisted Nuxt Seed Project** with reusable module patterns and **markdown-based Claude Code guardrails**, enabling both developers and AI-generated code to follow consistent state, API, UI, validation, logging, testing, and deployment standards while reducing new project setup effort **from 2+ MD to 1 MD**. Open-sourced a general-purpose version on GitHub — [Seed_Vue_Nuxt](https://github.com/youngilNoh/Seed_Vue_Nuxt).",
        "Identified that minor or urgent iGaming configuration changes, such as domain routing, country-specific signup settings, and environment values, had to go through full test, staging, and production redeployments, creating operational delays in a revenue-critical environment; led the frontend architecture and implementation of an **internal Config Management Dashboard** with audit logs, role-based API access, dynamic role-based menus, and value validation, reducing config update effort **from 30–60 minutes of redeployment to seconds.**",
        "Resolved recurring workflow issues caused by **missing coding conventions, lack of automated quality checks, and an undefined branching strategy.** Introduced ESLint, Prettier, Husky, lint-staged, and **a scheduled-release Git Flow with dedicated feature, QA, release, and hotfix branches** to reduce PR noise, recurring merge conflicts, and release preparation overhead.",
        "Strengthened **production incident triage** by analyzing New Relic and Grafana error rates, response times, HTTP status codes, failed requests, and user behavior logs to distinguish server timeouts, frontend handling issues, stale Cloudflare-cached releases, and suspicious traffic patterns; coordinated evidence-based escalation or executed cache invalidation to **reduce response delays and minimize service disruption.**",
      ],
      stack: ["Nuxt", "Vue", "TypeScript", "Claude Code", "Docker", "Argo CD"],
    },
    {
      id: "trenbe",
      company: "Trenbe",
      logoSrc: "/images/logos/trenbe.png",
      role: "Frontend Engineer",
      period: "Jan 2021 – Feb 2025",
      duration: "4 years 1 month",
      highlights: [
        "**Architected Server-Driven UI System**: Developed a promotion management platform enabling non-technical teams to directly configure campaigns, eliminating external publishing dependencies and **saving $15,600 AUD annually**.",
        "Engineered **High-Concurrency Event Architecture**: Designed WebSocket-based real-time synchronization for 'Open Run' events supporting 1,000+ concurrent users. Implemented a **client-server time-synchronization algorithm** to ensure fairness and prevent premature API polling, utilizing exponential backoff for connection stability.",
        "Led **Frontend Architecture & Developer Experience (DX)**: Spearheaded the Trenbe Design System (TDS) using Feature-Sliced Design (FSD) architecture",
        "Drove **Data-Informed & Usability Enhancements**: Integrated **A/B testing environments** using Hackle and GrowthBook, and developed internal admin keyboard shortcuts, increasing operational processing speed by 30%.",
        "Led Frontend **Performance Optimization**: Designed an Intersection **Observer-based lazy-loading** strategy for image-heavy product listing pages, reducing initial resource usage from **120MB to 9.6MB** and improving first-page load time from approximately **30s to 5.5s**.",
      ],
      stack: [
        "React",
        "Next.js",
        "TypeScript",
        "WebSocket",
        "GrowthBook",
        "Hackle",
      ],
    },
    {
      id: "baketico",
      company: "BakeTico",
      logoSrc: "/images/logos/baketico.png",
      role: "Barista – All Rounder",
      period: "Jun 2026 – Present",
      highlights: [
        "Prepare a wide range of high-quality coffee, deliver excellent customer service, and keep the workspace clean and organized throughout each shift.",
        "Built **an onboarding page** to streamline new-staff onboarding — [Baketico Memory](https://btmemory.yesimnoh.workers.dev).",
      ],
      stack: [],
    },
  ],
  projects: [
    {
      id: "real-estate-valuation",
      name: "Real Estate Valuation Engine",
      logoSrc: "/images/logos/real-estate-valuation.png",
      tagline:
        "A comprehensive valuation web service that scores and grades Korean land & building investments across 25 evaluation factors.",
      highlights: [
        "Designed a unidirectional data flow: address input → PNU conversion (/api/address) → 6-layer evaluation pipeline (/api/evaluate) → results dashboard → report download (/api/report/:id).",
        "Parallelized 10 public-data collection modules with Promise.allSettled, plus lru-cache and Supabase day-based caching to absorb Vercel serverless limits and partial external-API failures.",
        "Split the frontend into reusable components — overall-score card, category radar chart, price-trend chart (Recharts), and Kakao Map view — with 4 weight presets that recompute instantly on the client.",
        "Kept a type-safe client–server contract via shared types between API responses and the UI.",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "React",
        "Supabase",
        "Recharts",
        "Kakao Map",
      ],
      url: "https://realestate-valuation-engine.vercel.app/",
    },
  ],
  education: [
    {
      degree: "Bachelor of Information and Communication Technology",
      institution: "Tech University of Korea",
      year: "2020",
    },
  ],
}
