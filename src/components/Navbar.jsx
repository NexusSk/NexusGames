import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
    >
      <div className="nav-logo">
        <span className="logo-accent">NEXUS</span>GAMES
      </div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#games">Games</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#contact" className="nav-cta">Contact Us</a></li>
      </ul>
      <div className="mobile-menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </motion.nav>
  )
}
