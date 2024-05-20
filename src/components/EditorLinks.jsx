import { Button, Link } from '@nextui-org/react'

function EditorLinks() {
  const openTaku = () => {
    window.Taku('news:show')
  }

  return (
    <div className="flex gap-4 text-sm self-end px-4">
      <Link
        href="https://feedback.snapseditor.com"
        color="foreground"
        size="sm"
        isBlock
        isExternal
        showAnchorIcon
        className="text-xs hover:text-default-900 font-bold"
      >
        Feedback
      </Link>
      <Button
        onClick={openTaku}
        id="taku-launcher"
        variant="light"
        size="sm"
        className="text-xs font-normal"
      >
        🎉 What&apos;s new
      </Button>
    </div>
  )
}

export default EditorLinks
