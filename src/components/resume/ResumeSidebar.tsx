import { Mail, Phone, MapPin, Banknote } from 'lucide-react'
import { RESUME } from '@/lib/resume-data'
import { showProfilePhotoFlag } from '@/flags'
import { PhotoSection } from './PhotoSection'
import { SectionTitle } from './SectionTitle'
import { SkillBadge } from './SkillBadge'
import { TrackedLink } from './TrackedLink'
import { GitHubIcon, LinkedInIcon, MediumIcon } from './SocialIcons'

const linkRowClass =
  'flex items-center gap-2.5 text-xs text-sidebar-muted hover:text-sidebar-foreground transition-colors'

export async function ResumeSidebar() {
  const { personal, links, skills, interests } = RESUME
  // A/B test: variant assigned SERVER-SIDE (no client flash). B hides the photo.
  const showPhoto = await showProfilePhotoFlag()

  return (
    <aside
      data-resume-identity
      className="bg-sidebar text-sidebar-foreground px-6 pt-8 pb-10 h-full"
    >
      {showPhoto && <PhotoSection src={personal.photoSrc} name={personal.name} />}

      {/* Name + Title */}
      <div className="text-center mb-8">
        <h1 className="text-lg font-bold leading-tight">{personal.name}</h1>
        <p className="text-sidebar-label text-sm mt-1">{personal.title}</p>
      </div>

      {/* Contact */}
      <div className="mb-7">
        <SectionTitle variant="dark">Contact</SectionTitle>
        <ul className="space-y-2.5 list-none p-0 m-0">
          <li className="flex items-center gap-2.5 text-xs text-sidebar-muted">
            <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
            {personal.location}
          </li>
          <li>
            <TrackedLink href={`mailto:${personal.email}`} label="email" className={linkRowClass}>
              <Mail aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
              {personal.email}
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={`tel:${personal.phone.replace(/[^+\d]/g, '')}`}
              label="phone"
              className={linkRowClass}
            >
              <Phone aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
              {personal.phone}
            </TrackedLink>
          </li>
          <li className="flex items-center gap-2.5 text-xs text-sidebar-muted">
            <Banknote aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
            <span className="sr-only">Salary: </span>
            {personal.salary}
          </li>
        </ul>
      </div>

      {/* Links */}
      <div className="mb-7">
        <SectionTitle variant="dark">Links</SectionTitle>
        <ul className="space-y-2.5 list-none p-0 m-0">
          <li>
            <TrackedLink href={links.github} label="GitHub" external className={linkRowClass}>
              <GitHubIcon className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
              GitHub
            </TrackedLink>
          </li>
          <li>
            <TrackedLink href={links.medium} label="Medium" external className={linkRowClass}>
              <MediumIcon className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
              Medium
            </TrackedLink>
          </li>
          <li>
            <TrackedLink href={links.linkedin} label="LinkedIn" external className={linkRowClass}>
              <LinkedInIcon className="w-3.5 h-3.5 shrink-0 text-sidebar-label" />
              LinkedIn
            </TrackedLink>
          </li>
        </ul>
      </div>

      {/* Skills */}
      <div className="mb-7">
        <SectionTitle variant="dark">Skills</SectionTitle>
        {skills.map((group) => (
          <div key={group.category} className="mb-5 last:mb-0">
            <p className="text-sidebar-label text-[10px] font-semibold uppercase tracking-widest mb-2">
              {group.category}
            </p>
            <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label={group.category}>
              {group.items.map((skill) => (
                <li key={skill}>
                  <SkillBadge>{skill}</SkillBadge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div>
        <SectionTitle variant="dark">Interests</SectionTitle>
        <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0" aria-label="Interests">
          {interests.map((item) => (
            <li key={item}>
              <SkillBadge>{item}</SkillBadge>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
