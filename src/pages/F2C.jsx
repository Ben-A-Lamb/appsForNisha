// filepath: c:\Users\benja\Documents\Personal Projects\Java Personal\time4nisha\src\pages\F2C.jsx
import React, { useState, useEffect } from 'react'
import '../index.css'
import '../App.css'

export default function F2C() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const [isFtoC, setIsFtoC] = useState(() => {
    try {
      const v = localStorage.getItem('f2cIsFtoC')
      return v === null ? true : v === '1'
    } catch (e) {
      void e
      return true
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('f2cIsFtoC', isFtoC ? '1' : '0')
    } catch (e) {
      void e
    }
  }, [isFtoC])

  const handleChange = (e) => {
    const val = e.target.value
    setInput(val)
    const num = parseFloat(val)
    if (!Number.isFinite(num)) {
      setResult(null)
      return
    }

    if (isFtoC) {
      const c = ((num - 32) * 5) / 9
      setResult(Number.isFinite(c) ? c.toFixed(2) : null)
    } else {
      const f = (num * 9) / 5 + 32
      setResult(Number.isFinite(f) ? f.toFixed(2) : null)
    }
  }

  const toggleDirection = () => {
    setIsFtoC((v) => !v)
    // when toggling, attempt to convert current input to other direction
    const num = parseFloat(input)
    if (!Number.isFinite(num)) {
      setResult(null)
      return
    }
    if (isFtoC) {
      // currently F->C, toggling to C->F: treat current input as Celsius and convert
      const f = (num * 9) / 5 + 32
      setResult(Number.isFinite(f) ? f.toFixed(2) : null)
    } else {
      // currently C->F, toggling to F->C
      const c = ((num - 32) * 5) / 9
      setResult(Number.isFinite(c) ? c.toFixed(2) : null)
    }
  }

  const clear = () => {
    setInput('')
    setResult(null)
  }

  const inputLabel = isFtoC ? 'Fahrenheit' : 'Celsius'
  const outputUnit = isFtoC ? '°C' : '°F'
  const inputUnit = isFtoC ? '°F' : '°C'

  return (
    <div className="home-root" style={{ padding: 20 }}>
      <main className="home-card">
        <h2>{isFtoC ? 'Fahrenheit → Celsius' : 'Celsius → Fahrenheit'}</h2>

        <div style={{ marginTop: 8 }}>
          <label>
            {inputLabel}:
            <input
              type="number"
              step="any"
              value={input}
              onChange={handleChange}
              placeholder={`Enter ${inputUnit}`}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          {result !== null && input !== '' ? (
            <p>
              {input} {inputUnit} = {result} {outputUnit}
            </p>
          ) : (
            <p>Enter a valid number to convert.</p>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={clear} style={{ marginRight: 8 }}>
            Clear
          </button>

          <button onClick={toggleDirection} aria-pressed={isFtoC} style={{ marginRight: 8 }}>
            Switch to {isFtoC ? 'C → F' : 'F → C'}
          </button>

          <a className="app-link" href="#/">Back to Home</a>
        </div>
      </main>
    </div>
  )
}
