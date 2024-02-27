/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Divider, NextUIProvider } from '@nextui-org/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Hero from './components/landing/Hero.jsx'
import Layout from './components/Layout.jsx'
import FeaturesGrid from './components/landing/FeaturesGrid.jsx'
import Download from './components/landing/Download.jsx'
import AbralyticsScript from './components/AbralyticsScript.jsx'
import { Toaster } from 'react-hot-toast'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supabaseClient.js'
import Pricing from './components/landing/Pricing.jsx'
import { FingerprintProvider } from './context/FingerprintContext.jsx'
import { LicenseProvider } from './context/LicenseContext.jsx'
import GetTerms from './components/GetTerms.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <FingerprintProvider>
        <LicenseProvider>
          <NextUIProvider>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Hero />
                      <Divider
                        style={{
                          maxWidth: '800px',
                          opacity: 0.5,
                        }}
                      />
                      <FeaturesGrid />
                      <Divider
                        style={{
                          maxWidth: '800px',
                          opacity: 0.5,
                        }}
                      />
                      <Pricing />
                      <Divider
                        style={{
                          maxWidth: '800px',
                          opacity: 0.5,
                        }}
                      />
                      <Download />
                    </Layout>
                  }
                />
                <Route
                  path="/app"
                  element={
                    <section
                      id="app"
                      className="dark bg-background/8 w-dvw h-dvh"
                    >
                      <App />
                    </section>
                  }
                />
                <Route
                  path="privacy-policy"
                  element={
                    <Layout>
                      <GetTerms doc="privacy" />
                    </Layout>
                  }
                />
                <Route
                  path="tos"
                  element={
                    <Layout>
                      <GetTerms doc="tos" />
                    </Layout>
                  }
                />
              </Routes>
            </Router>
            <AbralyticsScript />
            <Toaster position="bottom-center" />
          </NextUIProvider>
        </LicenseProvider>
      </FingerprintProvider>
    </SessionContextProvider>
  </React.StrictMode>
)
