import { motion } from 'framer-motion'

const partners = [
  'Unreal Engine',
  'Unity',
  'PlayStation',
  'Xbox',
  'Nintendo Switch',
  'Steam',
  'Epic Games Store',
  'NVIDIA',
  'AMD',
  'Dolby Atmos',
  'Havok Physics',
  'Wwise Audio',
]

export default function Marquee() {
  const doubled = [...partners, ...partners]

  return (
    <section className="marquee-section">
      <div className="marquee-label">
        <span className="section-label">Trusted Partners & Platforms</span>
      </div>
      <div className="marquee-container">
        <motion.div
          className="marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {doubled.map((partner, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-diamond" />
              <span>{partner}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
