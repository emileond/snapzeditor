import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/Canvas'
import { Button } from '@nextui-org/react'

function App() {
  const [canvasBg, setCanvasBg] = useState('lightblue')

  return (
    <>
      <Canvas canvasBg={canvasBg} />
      <Button
        color="primary"
        onClick={() =>
          setCanvasBg(canvasBg === 'lightblue' ? 'lightgreen' : 'lightblue')
        }
      >
        Change color
      </Button>
    </>
  )
}

export default App
