import { createContext, useContext, useState } from 'react'

const LicenseContext = createContext()

export const LicenseProvider = ({ children }) => {
  const [isLicensed, setIsLicensed] = useState(false)

  // Method to update the license status
  const updateLicenseStatus = (status) => {
    setIsLicensed(status)
  }

  return (
    <LicenseContext.Provider value={{ isLicensed, updateLicenseStatus }}>
      {children}
    </LicenseContext.Provider>
  )
}

// Custom hook to use license context
export const useLicense = () => useContext(LicenseContext)
