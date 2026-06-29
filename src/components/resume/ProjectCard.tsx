import { SkillBadge } from "./SkillBadge"
import { LogoMark } from "./LogoMark"
import { ProjectImpression } from "./ProjectImpression"
import { ProjectCTA } from "./ProjectCTA"
import type { Project } from "@/lib/resume-data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectImpression
      projectId={project.id}
      className="mb-8 last:mb-0 border-l-2 border-brand-border pl-3.5"
    >
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
        <div className="flex items-center gap-3">
          <LogoMark src={project.logoSrc} name={project.name} />
          <h3 className="font-bold text-brand text-[15px] leading-snug">{project.name}</h3>
        </div>
        <ProjectCTA project={project} />
      </header>

      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{project.tagline}</p>

      <ul className="space-y-2 mb-3 list-none p-0 m-0">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2 text-[13px] text-muted-foreground leading-relaxed"
          >
            <span aria-hidden="true" className="text-brand mt-[3px] shrink-0 text-base leading-none">
              ›
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech}>
            <SkillBadge variant="secondary">{tech}</SkillBadge>
          </li>
        ))}
      </ul>
    </ProjectImpression>
  )
}
