'use client'

import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import BackgroundEffects from './components/BackgroundEffects'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <BackgroundEffects />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
} 