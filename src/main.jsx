import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import Clock from './pages/Clock.jsx'

function Router() {
  const getRoute = () => (window.location.hash || '#/').replace(/^#/, '')
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (route === '/' || route === '') return <Home />
  if (route === '/clock' || route === 'clock') return <Clock />
  // fallback
  return (
    <div style={{ padding: 20 }}>
      <p>Unknown route: {route}</p>
      <a href="#/">Back home</a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
