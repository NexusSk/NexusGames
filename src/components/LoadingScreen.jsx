import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="loading-logo">
        <span className="logo-accent">NEXUS</span>GAMES
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
    </motion.div>
  )
}
