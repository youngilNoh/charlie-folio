import { SkillBadge } from "./SkillBadge"
import { LogoMark } from "./LogoMark"
import { EmphasizedText } from "./EmphasizedText"
import type { Experience } from "@/lib/resume-data"

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="mb-8 last:mb-0">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
        <div className="flex items-center gap-3">
          <LogoMark src={experience.logoSrc} name={experience.company} />
          <div>
            <h3 className="font-bold text-brand text-[15px] leading-snug">{experience.company}</h3>
            <p className="text-muted-foreground text-sm font-medium mt-0.5">{experience.role}</p>
          </div>
        </div>
        <div className="sm:text-right shrink-0">
          <p className="text-muted-foreground text-xs">{experience.period}</p>
          <p className="text-muted-foreground/80 text-xs mt-0.5">{experience.duration}</p>
        </div>
      </header>

      <ul className="space-y-2.5 mb-3 list-none p-0 m-0">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
            <span aria-hidden="true" className="text-brand mt-[3px] shrink-0 text-base leading-none">
              •
            </span>
            <span>
              <EmphasizedText text={highlight} />
            </span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Tech stack">
        {experience.stack.map((tech) => (
          <li key={tech}>
            <SkillBadge variant="secondary">{tech}</SkillBadge>
          </li>
        ))}
      </ul>
    </article>
  )
}
