import { useState, Suspense, lazy } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Games from './components/Games'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ParticleTrail from './components/ParticleTrail'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <ParticleTrail />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Games />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
