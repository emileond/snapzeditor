import { createContext, useContext, useState } from 'react'

// Create context with default value "screenshot"
const EditorModeContext = createContext({
  mode: 'screenshot', // default mode
  setMode: () => {}, // placeholder function
})

// Provider component
export const EditorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('screenshot')

  return (
    <EditorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </EditorModeContext.Provider>
  )
}

// Custom hook to use the editor mode context
export const useEditorMode = () => useContext(EditorModeContext)
