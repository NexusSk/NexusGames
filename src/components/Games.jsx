import { motion } from 'framer-motion'

const games = [
  {
    title: 'Ecliptica: Shattered Realms',
    genre: 'Open World RPG',
    description: 'Explore a fractured dimension where every choice reshapes reality. 200+ hours of handcrafted adventure await.',
    platforms: ['PC', 'PS5', 'Xbox'],
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    accent: '#7b2ff7',
  },
  {
    title: 'VORTEX Protocol',
    genre: 'Tactical Shooter',
    description: 'Fast-paced 5v5 competitive shooter with destructible environments and unique operator abilities.',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch'],
    gradient: 'linear-gradient(135deg, #0a0a0f, #1a0a2e, #0a1a2e)',
    accent: '#00f0ff',
  },
  {
    title: 'Starborne Odyssey',
    genre: 'Space Exploration',
    description: 'Chart the unknown in a procedurally generated universe. Build, trade, fight, and discover among the stars.',
    platforms: ['PC', 'PS5'],
    gradient: 'linear-gradient(135deg, #0d0d2b, #1a0533, #2d0a1a)',
    accent: '#ff2d75',
  },
  {
    title: 'Mythfall',
    genre: 'Action ARPG',
    description: 'A dark mythology-inspired action RPG with souls-like combat and a living world that evolves with the seasons.',
    platforms: ['PC', 'PS5', 'Xbox'],
    gradient: 'linear-gradient(135deg, #1a0a00, #2d1a0a, #0d1a0d)',
    accent: '#ff8c00',
  },
  {
    title: 'Neon Drift',
    genre: 'Racing / Arcade',
    description: 'High-octane anti-gravity racing through neon-soaked cyberpunk cityscapes. 60+ tracks. Zero gravity. Pure adrenaline.',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch', 'Mobile'],
    gradient: 'linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a1a1a)',
    accent: '#00ff88',
  },
  {
    title: 'Whispers of Elara',
    genre: 'Narrative Adventure',
    description: 'An emotionally gripping narrative adventure about memory, loss, and the stories that bind us across lifetimes.',
    platforms: ['PC', 'PS5', 'Xbox', 'Switch'],
    gradient: 'linear-gradient(135deg, #0d0d1a, #1a0d2e, #2e1a2e)',
    accent: '#c77dff',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Games() {
  return (
    <section className="section games-section" id="games">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">Our Portfolio</span>
        <h2 className="section-title">Worlds We've Built</h2>
        <p className="section-subtitle">
          From epic RPGs to competitive shooters, each title represents our 
          commitment to innovation and unforgettable player experiences.
        </p>
      </motion.div>

      <motion.div
        className="games-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {games.map((game, index) => (
          <motion.div
            key={index}
            className="game-card"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            <div className="game-image">
              <div
                className="game-image-bg"
                style={{
                  background: game.gradient,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Abstract game art */}
                <div style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${game.accent}33, transparent)`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }} />
                <div style={{
                  position: 'absolute',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: `1px solid ${game.accent}22`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }} />
                <div style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  border: `1px solid ${game.accent}11`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '4px',
                  color: game.accent,
                  opacity: 0.6,
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {game.genre}
                </span>
              </div>
              <span className="game-genre">{game.genre}</span>
            </div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-platforms">
                {game.platforms.map((platform, i) => (
                  <span key={i} className="platform-tag">{platform}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
