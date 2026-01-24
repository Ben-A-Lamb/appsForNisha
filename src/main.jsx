import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import Clock from './pages/Clock.jsx'
import F2C from './pages/F2C.jsx'

export function Router() {
  const getRoute = () => (window.location.hash || '#/').replace(/^#/, '')
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (route === '/' || route === '') return <Home />
  if (route === '/clock' || route === 'clock') return <Clock />
  if (route === '/f2c' || route === 'f2c') return <F2C />
  // fallback
  return (
    <div style={{ padding: 20 }}>
      <p>Unknown route: {route}</p>
      <a href="#/">Back home</a>
    </div>
  )
}

function App() {
  // palettes (moved from Clock) so they apply app-wide
  const palettes = [
    { text: '#e8eae7', background: '#080c07', primary: '#b6c9b1', secondary: '#44633c', accent: '#6ca95d' },
    { text: '#e6e7e5', background: '#080907', primary: '#c5ccb0', secondary: '#5f6d3a', accent: '#a4bb64' },
    { text: '#f2f0f4', background: '#08050a', primary: '#b593d3', secondary: '#582584', accent: '#9c4ce0' },
    { text: '#ece0e3', background: '#070405', primary: '#d3aab2', secondary: '#763845', accent: '#c17081' },
    { text: '#e9ebf8', background: '#04050e', primary: '#8c94e3', secondary: '#1a2487', accent: '#4553e3' },
  ]

  const [paletteIndex, setPaletteIndex] = useState(() => {
    try {
      const v = localStorage.getItem('paletteIndex')
      return v === null ? 0 : Number(v)
    } catch (e) {
      return 0
    }
  })

  useEffect(() => {
    const p = palettes[paletteIndex] || palettes[0]
    const root = document.documentElement
    root.style.setProperty('--text', p.text)
    root.style.setProperty('--background', p.background)
    root.style.setProperty('--primary', p.primary)
    root.style.setProperty('--secondary', p.secondary)
    root.style.setProperty('--accent', p.accent)
    try {
      localStorage.setItem('paletteIndex', String(paletteIndex))
    } catch (e) {}
  }, [paletteIndex])

  return (
    <div>
      <Router />

      {/* Palette controls pinned to viewport so they're visible across all pages */}
      <div
        className="screen-controls"
        aria-hidden={false}
        style={{
          position: 'fixed',
          right: 12,
          top: 12,
          zIndex: 9999,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.12))',
          padding: '8px 10px',
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div style={{ color: 'var(--text)', fontSize: 12, fontWeight: 700, marginRight: 6 }}>Theme</div>
        <div className="palette-controls">
          <button onClick={() => setPaletteIndex((i) => (i - 1 + palettes.length) % palettes.length)} aria-label="Previous palette">◀</button>
          <div className="palette-label">{paletteIndex + 1}/{palettes.length}</div>
          <button onClick={() => setPaletteIndex((i) => (i + 1) % palettes.length)} aria-label="Next palette">▶</button>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
