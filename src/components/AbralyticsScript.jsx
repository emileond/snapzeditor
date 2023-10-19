import { useEffect } from 'react'

function AbralyticsScript() {
  useEffect(() => {
    const script = document.createElement('script')

    script.defer = true
    script.setAttribute('data-domain', 'snapseditor.com')
    script.src = 'https://app.abralytics.com/assets/tracker/index.js'

    document.body.appendChild(script)

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}

export default AbralyticsScript
