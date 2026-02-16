import { motion } from 'framer-motion'

const reviews = [
  {
    quote: '"NexusGames has redefined what indie studios can achieve. Ecliptica is a masterpiece."',
    source: 'IGN',
    score: '9.5 / 10',
  },
  {
    quote: '"VORTEX Protocol is the most innovative tactical shooter since Rainbow Six Siege."',
    source: 'GameSpot',
    score: '9.0 / 10',
  },
  {
    quote: '"A studio that consistently delivers bold, genre-defining experiences."',
    source: 'PC Gamer',
    score: 'Editor\'s Choice',
  },
  {
    quote: '"Starborne Odyssey is the space game we\'ve been dreaming about for a decade."',
    source: 'Eurogamer',
    score: 'Essential',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Press() {
  return (
    <section className="section press-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">What They Say</span>
        <h2 className="section-title">Press & Reviews</h2>
        <p className="section-subtitle">
          Recognized by the world's leading gaming publications for innovation, 
          quality, and unforgettable player experiences.
        </p>
      </motion.div>

      <motion.div
        className="press-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {reviews.map((review, i) => (
          <motion.div key={i} className="press-card" variants={cardVariants}>
            <div className="press-quote-mark">&ldquo;</div>
            <p className="press-quote">{review.quote}</p>
            <div className="press-bottom">
              <span className="press-source">{review.source}</span>
              <span className="press-score">{review.score}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
