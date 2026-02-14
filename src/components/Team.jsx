import { motion } from 'framer-motion'

const team = [
  { name: 'Alex Chen', role: 'Creative Director', initials: 'AC' },
  { name: 'Maya Torres', role: 'Lead Engineer', initials: 'MT' },
  { name: 'Kai Nakamura', role: 'Art Director', initials: 'KN' },
  { name: 'Elena Voss', role: 'Game Designer', initials: 'EV' },
  { name: 'Marcus Reed', role: 'Sound Director', initials: 'MR' },
  { name: 'Priya Sharma', role: 'Narrative Lead', initials: 'PS' },
  { name: 'Liam O\'Brien', role: 'Tech Lead', initials: 'LO' },
  { name: 'Zara Kim', role: 'Community Manager', initials: 'ZK' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Team() {
  return (
    <section className="section" id="team">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">The People</span>
        <h2 className="section-title">Meet the Minds Behind the Magic</h2>
        <p className="section-subtitle">
          A diverse team of dreamers, builders, and storytellers united by a 
          shared passion for creating unforgettable interactive experiences.
        </p>
      </motion.div>

      <motion.div
        className="team-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="team-card"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            <div className="team-avatar">
              {member.initials}
            </div>
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
