import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import FeaturedGame from './components/FeaturedGame'
import Games from './components/Games'
import Press from './components/Press'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ParticleTrail from './components/ParticleTrail'
import GradientBlobs from './components/GradientBlobs'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <ParticleTrail />
      <GradientBlobs />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <FeaturedGame />
        <Games />
        <Press />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
