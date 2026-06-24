interface SectionTitleProps {
  children: React.ReactNode
  /** Heading level for correct document outline. Defaults to h2. */
  as?: 'h2' | 'h3'
  /** 'dark' for the navy sidebar, 'light' for the main content column. */
  variant?: 'light' | 'dark'
}

export function SectionTitle({ children, as: Tag = 'h2', variant = 'light' }: SectionTitleProps) {
  if (variant === 'dark') {
    return (
      <div className="mb-4">
        <Tag className="text-sidebar-foreground text-xs font-bold uppercase tracking-widest">
          {children}
        </Tag>
        <div className="h-px bg-sidebar-border mt-2" />
      </div>
    )
  }

  return (
    <div className="mb-5">
      <Tag className="text-brand text-sm font-bold uppercase tracking-widest">{children}</Tag>
      <div className="h-0.5 bg-brand mt-2" />
    </div>
  )
}
