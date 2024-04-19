import { createContext, useContext, useState, useEffect } from 'react'

// Create context with default value "screenshot"
const EditorModeContext = createContext({
  mode: 'screenshot', // default mode
  setMode: () => {}, // placeholder function
})

// Provider component
export const EditorModeProvider = ({ children }) => {
  // Initialize state with value from localStorage or fallback to 'screenshot'
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('editorMode')
    return storedMode || 'screenshot'
  })

  // Effect to update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('editorMode', mode)
  }, [mode])

  return (
    <EditorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </EditorModeContext.Provider>
  )
}

// Custom hook to use the editor mode context
export const useEditorMode = () => useContext(EditorModeContext)
