import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('senafim_theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('senafim_theme', theme)
    } catch (e) {}
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <header className="site-header">
      <div className="site-left">
        <div className="logo" aria-hidden>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 18h16M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="brand">SENAFIM</div>
      </div>

      <nav className="site-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
        <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'active' : '')}>Vacantes</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contacto</NavLink>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Alternar tema claro/oscuro"
          aria-pressed={theme === 'dark'}
        >
          <svg className="theme-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#FFD166" />
                <stop offset="100%" stopColor="#FF6B00" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="5" fill="url(#g1)" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header
