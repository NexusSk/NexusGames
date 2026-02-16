import { motion } from 'framer-motion'

export default function FeaturedGame() {
  return (
    <section className="section featured-section" id="featured">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">Now Available</span>
        <h2 className="section-title">Featured Title</h2>
      </motion.div>

      <motion.div
        className="featured-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="featured-visual">
          <div className="featured-video-wrapper">
            <div className="featured-video-placeholder">
              <div className="featured-glow-orb orb-1" />
              <div className="featured-glow-orb orb-2" />
              <div className="featured-glow-orb orb-3" />
              <div className="play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="featured-video-label">Watch Trailer</span>
            </div>
          </div>
          <div className="featured-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 5 ? 'var(--color-primary)' : 'none'} stroke="var(--color-primary)" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="rating-text">4.9 / 5.0 — 12,847 reviews</span>
          </div>
        </div>

        <div className="featured-info">
          <div className="featured-tags">
            <span className="featured-tag tag-new">New Release</span>
            <span className="featured-tag tag-genre">Open World RPG</span>
          </div>
          <h3>Ecliptica: Shattered Realms</h3>
          <p className="featured-desc">
            Embark on an epic journey through fractured dimensions where every choice 
            reshapes the very fabric of reality. Wield ancient powers, forge alliances, 
            and uncover the truth behind the Shattering.
          </p>
          <ul className="featured-highlights">
            <li>
              <span className="highlight-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              200+ hours of handcrafted content
            </li>
            <li>
              <span className="highlight-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              Seamless open world, zero loading screens
            </li>
            <li>
              <span className="highlight-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              Dynamic weather & day-night cycle
            </li>
            <li>
              <span className="highlight-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              Cross-platform multiplayer co-op
            </li>
          </ul>
          <div className="featured-actions">
            <a href="#" className="btn-primary">
              Get It Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="featured-platforms-row">
              <span className="platform-tag">PC</span>
              <span className="platform-tag">PS5</span>
              <span className="platform-tag">Xbox</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
