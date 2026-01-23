import React, { useEffect, useState } from 'react'
import './App.css'


function TimeWithFlips({ date, is24 }) {
  const pad = (n) => String(n).padStart(2, '0')
  const h24 = date.getHours()
  const m = pad(date.getMinutes())
  const s = pad(date.getSeconds())

  const hh = is24 ? pad(h24) : pad(h24 % 12 || 12)

  // Flip only HH:MM (per-minute flips). Seconds update every second as plain spans.
  return (
    <div style={{ display: 'flex', gap: '0.28em', alignItems: 'baseline' }}>
      <div className="time">{hh}</div>
      <div className="clock-sep">:</div>
      <div className="time">{m}</div>
      <div className="clock-sep">:</div>
      <div className="time">{s}</div>
    </div>
  )
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [is24, setIs24] = useState(() => {
    try {
      const v = localStorage.getItem('clockIs24')
      return v === null ? true : v === '1'
    } catch (e) {
      return true
    }
  })
  // color palettes provided by user — each is a map of the semantic vars
  const palettes = [
    { text: '#e8eae7', background: '#080c07', primary: '#b6c9b1', secondary: '#44633c', accent: '#6ca95d' },
    { text: '#e6e7e5', background: '#080907', primary: '#c5ccb0', secondary: '#5f6d3a', accent: '#a4bb64' },
    { text: '#f2f0f4', background: '#08050a', primary: '#b593d3', secondary: '#582584', accent: '#9c4ce0' },
    { text: '#ece0e3', background: '#070405', primary: '#d3aab2', secondary: '#763845', accent: '#c17081' },
    { text: '#e9ebf8', background: '#04050e', primary: '#8c94e3', secondary: '#1a2487', accent: '#4553e3' },
  ]

  const [paletteIndex, setPaletteIndex] = useState(() => {
    try {
      const v = localStorage.getItem('clockPalette')
      return v === null ? 0 : Number(v)
    } catch (e) {
      return 0
    }
  })

  // apply palette to :root variables
  useEffect(() => {
    const p = palettes[paletteIndex] || palettes[0]
    const root = document.documentElement
    root.style.setProperty('--text', p.text)
    root.style.setProperty('--background', p.background)
    root.style.setProperty('--primary', p.primary)
    root.style.setProperty('--secondary', p.secondary)
    root.style.setProperty('--accent', p.accent)
    try {
      localStorage.setItem('clockPalette', String(paletteIndex))
    } catch (e) {}
  }, [paletteIndex])

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('clockIs24', is24 ? '1' : '0')
    } catch (e) {
      // ignore
    }
  }, [is24])

  return (
    <>
      <div className="clock-root">
        <div className="clock-time">
          <TimeWithFlips date={now} is24={is24} />
        </div>
      </div>

      <div className="screen-controls" aria-hidden={false}>
        <button
          className="clock-toggle"
          onClick={() => setIs24((v) => !v)}
          aria-pressed={is24}
        >
          Switch to {is24 ? '12-hour' : '24-hour'}
        </button>

        <div className="palette-controls">
          <button onClick={() => setPaletteIndex((i) => (i - 1 + palettes.length) % palettes.length)} aria-label="Previous palette">◀</button>
          <div className="palette-label">Palette {paletteIndex + 1} / {palettes.length}</div>
          <button onClick={() => setPaletteIndex((i) => (i + 1) % palettes.length)} aria-label="Next palette">▶</button>
        </div>
      </div>
    </>
  )
}

export default App
