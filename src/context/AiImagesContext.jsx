import { createContext, useContext, useState } from 'react'

// Define the context
const AiImagesContext = createContext()

// Define a provider for the context
export const AiImagesProvider = ({ children }) => {
  const [images, setImages] = useState([])

  // Function to add a new image object
  const addImage = (imageObject) => {
    setImages((prevImages) => [...prevImages, imageObject])
  }

  // Function to update the output of a specific image
  const updateImageOutput = (imageIndex, output) => {
    setImages((prevImages) =>
      prevImages.map((img, index) =>
        index === imageIndex ? { ...img, output: output } : img
      )
    )
  }

  return (
    <AiImagesContext.Provider value={{ images, addImage, updateImageOutput }}>
      {children}
    </AiImagesContext.Provider>
  )
}

// Custom hook to use the context
export const useAiImages = () => useContext(AiImagesContext)
