import { createContext, useContext, useState } from 'react'

const LicenseContext = createContext()

export const LicenseProvider = ({ children }) => {
  const [license, setLicense] = useState(false)

  // Method to update the license status
  const updateLicenseStatus = (status) => {
    setLicense(status)
  }

  return (
    <LicenseContext.Provider value={{ license, updateLicenseStatus }}>
      {children}
    </LicenseContext.Provider>
  )
}

// Custom hook to use license context
export const useLicense = () => useContext(LicenseContext)
