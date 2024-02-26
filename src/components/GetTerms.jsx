import { useEffect } from 'react'

function GetTerms({ doc }) {
  useEffect(() => {
    // Function to insert the script
    const insertScript = () => {
      const scriptId = 'getterms-embed-js'
      // Check if the script is already added
      if (document.getElementById(scriptId)) {
        return
      }
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'text/javascript'
      script.src = 'https://app.getterms.io/dist/js/embed.js'
      // Insert the script before the first script tag in the document
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    insertScript()

    // Optional: Cleanup function to remove the script when the component unmounts
    return () => {
      const script = document.getElementById('getterms-embed-js')
      if (script) {
        script.parentNode.removeChild(script)
      }
    }
  }, [doc])

  return (
    <div
      className="getterms-document-embed bg-content1 dark max-w-4xl text-lg text-left z-10 p-8"
      data-getterms="04RxY"
      data-getterms-document={doc}
      data-getterms-lang="en-us"
      data-getterms-mode="direct"
    ></div>
  )
}

export default GetTerms
