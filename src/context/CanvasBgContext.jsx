import { createContext, useContext, useState } from 'react'

// Create a context with a default empty state
const CanvasBgContext = createContext({
  background: {}, // This will store our background properties
  setBackground: () => {}, // A function to update the background
})

// Create a provider component
export const CanvasBgProvider = ({ children }) => {
  const [canvasBg, setCanvasBg] = useState()

  // Value that will be passed to consuming components
  const value = { canvasBg, setCanvasBg }

  return (
    <CanvasBgContext.Provider value={value}>
      {children}
    </CanvasBgContext.Provider>
  )
}

// Custom hook to use the background context
export const useCanvasBg = () => useContext(CanvasBgContext)
