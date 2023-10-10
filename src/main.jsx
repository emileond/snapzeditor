import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import Logo from './assets/snapzeditor-logo-w.svg'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground w-[100vw] h-[100vh]">
        <header className="w-full flex justify-center bg-background py-4">
          <img src={Logo} alt="SnapzEditor Logo" className="w-[180px]" />
        </header>
        <section className="flex flex-col items-center justify-start w-full h-full bg-background">
          <App />
        </section>
      </main>
    </NextUIProvider>
  </React.StrictMode>
)
