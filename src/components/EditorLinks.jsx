import { Link } from '@nextui-org/react'

function EditorLinks() {
  return (
    <div className="flex gap-4 text-default-600 text-sm font-medium self-end px-4">
      <Link
        className="text-xs hover:text-default-900"
        href="https://feedback.snapseditor.com"
        color="foreground"
        size="sm"
        isBlock
        isExternal
        showAnchorIcon
      >
        Feedback
      </Link>
      <Link
        className="text-xs hover:text-default-900"
        href="https://feedback.snapseditor.com/changelog"
        color="foreground"
        size="sm"
        isBlock
        isExternal
        showAnchorIcon
      >
        🎉 What&apos;s new
      </Link>
    </div>
  )
}

export default EditorLinks
