import React from 'react'
import '../index.css'
import '../App.css'

export default function Home() {
  return (
    <div className="home-root">
      <main className="home-card">
        <h1 className="home-title">Apps4Nisha</h1>

        <section className="apps-list">
          <a className="app-link" href="#/clock">Time4Nisha</a>
          <a className="app-link" href="#/">Coming Soon...</a>
        </section>
      </main>
    </div>
  )
}
