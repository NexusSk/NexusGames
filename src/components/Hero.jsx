import { motion } from 'framer-motion'
import HeroScene from './HeroScene'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.8 + i * 0.15, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-canvas">
        <HeroScene />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="pulse-dot" />
          Now Hiring — Join Our Team
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We Craft Worlds
          <br />
          <span className="gradient-text">You'll Never Forget</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          NexusGames is an independent game studio pushing the boundaries of 
          interactive entertainment. From breathtaking open worlds to pulse-pounding 
          competitive arenas — we build experiences that resonate.
        </motion.p>

        <motion.div
          className="hero-buttons"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a href="#games" className="btn-primary">
            Explore Our Games
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#about" className="btn-secondary">
            Our Story
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="stat-item">
            <h3>12M+</h3>
            <p>Players Worldwide</p>
          </div>
          <div className="stat-item">
            <h3>6</h3>
            <p>Titles Released</p>
          </div>
          <div className="stat-item">
            <h3>85+</h3>
            <p>Team Members</p>
          </div>
          <div className="stat-item">
            <h3>14</h3>
            <p>Awards Won</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
