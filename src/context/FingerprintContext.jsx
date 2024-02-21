import { createContext, useState, useEffect, useContext } from 'react'
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs'

// Create a context
const FingerprintContext = createContext()

// Create a provider component
export const FingerprintProvider = ({ children }) => {
  const [fingerprint, setFingerprint] = useState(null)

  useEffect(() => {
    const fetchFingerprint = async () => {
      try {
        const fp = await getFingerprint()
        setFingerprint(fp)
      } catch (error) {
        console.error('Error fetching fingerprint:', error)
      }
    }

    fetchFingerprint()
  }, [])

  return (
    <FingerprintContext.Provider value={fingerprint}>
      {children}
    </FingerprintContext.Provider>
  )
}

// Create a custom hook for consuming context
export const useFingerprint = () => useContext(FingerprintContext)
