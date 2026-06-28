import { Fragment } from "react"
import { TrackedLink } from "./TrackedLink"

type Segment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "link"; text: string; href: string }

// Matches **bold** or [label](url)
const TOKEN = /\*\*([\s\S]+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

function toSegments(text: string): Segment[] {
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(TOKEN)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", text: text.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: "bold", text: match[1] })
    } else {
      segments.push({ type: "link", text: match[2], href: match[3] })
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ type: "text", text: text.slice(lastIndex) })
  }
  return segments
}

/**
 * Renders text verbatim with lightweight markup:
 *  - `**...**` → emphasized (bold) span, mirroring the source résumé's bold runs
 *  - `[label](url)` → tracked external link
 */
export function EmphasizedText({ text }: { text: string }) {
  return (
    <>
      {toSegments(text).map((segment, i) => {
        if (segment.type === "bold") {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {segment.text}
            </strong>
          )
        }
        if (segment.type === "link") {
          return (
            <TrackedLink
              key={i}
              href={segment.href}
              label={segment.text}
              external
              className="text-brand font-medium hover:underline underline-offset-2 whitespace-nowrap"
            >
              {segment.text}
              <span aria-hidden="true"> ↗</span>
            </TrackedLink>
          )
        }
        return <Fragment key={i}>{segment.text}</Fragment>
      })}
    </>
  )
}
