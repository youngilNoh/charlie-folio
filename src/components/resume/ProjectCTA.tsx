'use client'

import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './SocialIcons'
import { track } from '@/lib/tracking'
import type { Project } from '@/lib/resume-data'

type CTATarget = 'live' | 'repo'

/**
 * Project call-to-action links (Live Demo / Code). Every click logs a
 * `project_click`; GrowthBook joins it to the visitor's variant by the shared
 * stable id, so project CTR can be compared across the photo / no-photo cohorts.
 */
export function ProjectCTA({ project }: { project: Project }) {
  const onClick = (target: CTATarget, href: string, label: string) =>
    track('project_click', { project_id: project.id, target, href, label })

  return (
    <div className="flex items-center gap-3 shrink-0">
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick('repo', project.repo!, `${project.name} repo`)}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-brand transition-colors"
        >
          <GitHubIcon className="w-3.5 h-3.5" />
          Code
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClick('live', project.url!, `${project.name} live`)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
          Live Demo
        </a>
      )}
    </div>
  )
}
