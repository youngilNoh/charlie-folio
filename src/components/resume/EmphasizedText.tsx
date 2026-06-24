import { Fragment } from "react"

interface Segment {
  text: string
  bold: boolean
}

const BOLD = /\*\*([\s\S]+?)\*\*/g

function toSegments(text: string): Segment[] {
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(BOLD)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false })
    }
    segments.push({ text: match[1], bold: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false })
  }
  return segments
}

/**
 * Renders text verbatim, turning `**...**` spans into emphasized (bold) text.
 * Emphasis darkens + bolds the span against muted body copy, mirroring the bold
 * runs in the source résumé.
 */
export function EmphasizedText({ text }: { text: string }) {
  return (
    <>
      {toSegments(text).map((segment, i) =>
        segment.bold ? (
          <strong key={i} className="font-semibold text-foreground">
            {segment.text}
          </strong>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </>
  )
}
