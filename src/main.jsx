import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground w-[100vw] h-[100vh]">
        <section className="flex flex-col items-center justify-center w-full h-full bg-background">
          <App />
        </section>
      </main>
    </NextUIProvider>
  </React.StrictMode>
)
