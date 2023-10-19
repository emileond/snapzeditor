import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import Hero from './components/landing/Hero.jsx'
import Layout from './components/Layout.jsx'
import FeaturesGrid from './components/landing/FeaturesGrid.jsx'
import Download from './components/landing/Download.jsx'
import AbralyticsScript from './components/AbralyticsScript.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Layout>
        <Hero />
        <section
          id="app"
          className="flex flex-col items-center justify-start w-full"
        >
          <App />
        </section>
        <FeaturesGrid />
        <Download />
      </Layout>
      <AbralyticsScript />
    </NextUIProvider>
  </React.StrictMode>
)
