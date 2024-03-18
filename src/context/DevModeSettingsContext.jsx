import { createContext, useContext, useState } from 'react'

// Initial default settings
const defaultSettings = {
  codeLang: 'javascript',
  theme: 'Snaps',
}

// Create the context with default settings
const DevModeSettingsContext = createContext({
  settings: defaultSettings,
  updateSettings: () => {}, // Placeholder function for updating the settings
})

// Provider component
export const DevModeSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)

  // Function to update the settings
  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  return (
    <DevModeSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </DevModeSettingsContext.Provider>
  )
}

// Custom hook for easy access to the context
export const useDevModeSettings = () => useContext(DevModeSettingsContext)
