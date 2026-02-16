import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200 })
  const isHovering = useRef(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const addHover = () => {
      if (dotRef.current) dotRef.current.classList.add('cursor-hover')
      if (ringRef.current) ringRef.current.classList.add('cursor-hover')
    }
    const removeHover = () => {
      if (dotRef.current) dotRef.current.classList.remove('cursor-hover')
      if (ringRef.current) ringRef.current.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, .game-card, .about-card, .team-card, .social-link, .nav-cta')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
