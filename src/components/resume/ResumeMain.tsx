import { RESUME } from '@/lib/resume-data'
import { SectionTitle } from './SectionTitle'
import { ExperienceCard } from './ExperienceCard'
import { ProjectCard } from './ProjectCard'
import { TrackedSection } from './TrackedSection'
import { EmphasizedText } from './EmphasizedText'

export function ResumeMain() {
  const { summary, focus, experience, projects, education } = RESUME

  return (
    <div id="content" className="flex-1 px-6 sm:px-8 py-8 min-w-0">
      {/* Summary */}
      <TrackedSection id="summary" label="Summary" className="mb-8">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-muted-foreground text-sm leading-relaxed">
          <EmphasizedText text={summary} />
        </p>
        {focus.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0"
            aria-label="Core strengths"
          >
            {focus.map((item) => (
              <li
                key={item}
                className="inline-flex items-center rounded-md border border-brand-border bg-brand-subtle px-2.5 py-1 text-xs font-semibold text-brand-subtle-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </TrackedSection>

      {/* Work Experience */}
      <TrackedSection id="experience" label="Work Experience" className="mb-8">
        <SectionTitle>Work Experience</SectionTitle>
        {experience.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </TrackedSection>

      {/* Projects */}
      <TrackedSection id="projects" label="Projects" className="mb-8">
        <SectionTitle>Projects</SectionTitle>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </TrackedSection>

      {/* Education */}
      <TrackedSection id="education" label="Education">
        <SectionTitle>Education</SectionTitle>
        {education.map((edu) => (
          <div key={edu.degree} className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-snug">{edu.degree}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{edu.institution}</p>
            </div>
            <span className="text-muted-foreground/80 text-xs shrink-0 mt-0.5">{edu.year}</span>
          </div>
        ))}
      </TrackedSection>
    </div>
  )
}
