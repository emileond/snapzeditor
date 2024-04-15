import { createContext, useContext, useState } from 'react'

// Define the context
const AiImagesContext = createContext()

// Define a provider for the context
export const AiImagesProvider = ({ children }) => {
  const [images, setImages] = useState([])

  // Function to add a new prediction object
  const addImage = (prediction) => {
    setImages((prevPredictions) => [prediction, ...prevPredictions])
  }

  // Function to update a prediction's object
  const updateImage = (prediction_id, update) => {
    setImages((prevPredictions) =>
      prevPredictions.map((prediction) =>
        prediction.id === prediction_id
          ? { ...prediction, ...update }
          : prediction
      )
    )
  }

  return (
    <AiImagesContext.Provider value={{ images, addImage, updateImage }}>
      {children}
    </AiImagesContext.Provider>
  )
}

// Custom hook to use the context
export const useAiImages = () => useContext(AiImagesContext)
