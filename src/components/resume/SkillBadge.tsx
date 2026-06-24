interface SkillBadgeProps {
  children: React.ReactNode
  /** 'primary' = solid brand (navy sidebar), 'secondary' = subtle (white/main column) */
  variant?: 'primary' | 'secondary'
}

export function SkillBadge({ children, variant = 'primary' }: SkillBadgeProps) {
  if (variant === 'secondary') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-subtle text-brand-subtle-foreground border border-brand-border">
        {children}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-brand text-brand-foreground">
      {children}
    </span>
  )
}
