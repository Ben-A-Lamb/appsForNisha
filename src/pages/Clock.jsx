import React, { useEffect, useState } from 'react'
import '../App.css'


function TimeDisplay({ date, is24, showSeconds }) {
  const pad = (n) => String(n).padStart(2, '0')
  const h24 = date.getHours()
  const m = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  const hh = is24 ? pad(h24) : pad(h24 % 12 || 12)

  return (
    <div style={{ display: 'flex', gap: '0.28em', alignItems: 'baseline' }}>
      <div className="time">{hh}</div>
      <div className="clock-sep">:</div>
      <div className="time">{m}</div>
      {showSeconds ? (
        <>
          <div className="clock-sep">:</div>
          <div className="time">{s}</div>
        </>
      ) : null}
    </div>
  )
}

function Clock() {
  const [now, setNow] = useState(() => new Date())
  const [is24, setIs24] = useState(() => {
    try {
      const v = localStorage.getItem('clockIs24')
      return v === null ? true : v === '1'
    } catch {
      return true
    }
  })

  const [showSeconds, setShowSeconds] = useState(() => {
    try {
      const v = localStorage.getItem('clockShowSeconds')
      return v === null ? true : v === '1'
    } catch {
      return true
    }
  })

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('clockIs24', is24 ? '1' : '0')
    } catch {
      // ignore
    }
  }, [is24])

  useEffect(() => {
    try {
      localStorage.setItem('clockShowSeconds', showSeconds ? '1' : '0')
    } catch {
      // ignore
    }
  }, [showSeconds])

  return (
    <>
      <div className="app-topbar">
        <button className="back-button" onClick={() => (window.location.hash = '#/')} aria-label="Back to home">← Back</button>
      </div>
      <div className="clock-root">
        <div className="clock-time">
          <TimeDisplay date={now} is24={is24} showSeconds={showSeconds} />
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

        <button
          className="clock-toggle"
          onClick={() => setShowSeconds((v) => !v)}
          aria-pressed={showSeconds}
          style={{ marginLeft: 8 }}
        >
          {showSeconds ? 'Hide seconds' : 'Show seconds'}
        </button>
      </div>
    </>
  )
}

export default Clock
