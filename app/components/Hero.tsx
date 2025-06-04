'use client'

import React, { useEffect, useState } from 'react'

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = 'Gabriel Dias da Silva'

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Professional Avatar/Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-tech opacity-20 blur-xl"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-primary-500 to-tech-purple animate-pulse opacity-30"></div>
            <div className="absolute inset-2 rounded-full bg-neutral-900 border-2 border-primary-500/30 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-500 subtle-glow">GDS</span>
            </div>
          </div>
        </div>

        {/* Main Title - Clean and Professional */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
          <span className="block text-white tracking-tight">
            PORTFOLIO
          </span>
        </h1>

        {/* Typing Animation - Without visible cursor */}
        <div className="text-xl md:text-3xl mb-4 h-12 flex items-center justify-center">
          <span className="text-primary-500 subtle-glow font-medium">
            {displayText}
          </span>
        </div>

        {/* Professional Title - Updated */}
        <div className="text-lg md:text-xl gradient-text font-semibold mb-8">
          Analista de Sistemas
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-tech-gray mb-12 max-w-4xl mx-auto leading-relaxed">
          Transformando desafios técnicos em soluções eficientes. 
          <span className="text-primary-500 font-medium"> 4+ anos de experiência</span> em 
          <span className="text-tech-purple font-medium"> infraestrutura de TI</span> e 
          <span className="text-accent-500 font-medium"> suporte empresarial</span>.
        </p>

        {/* Location and Status */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-tech-gray">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Campo Largo, Paraná</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-neutral-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Disponível para novos projetos</span>
          </div>
        </div>

        {/* Professional CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline smooth-transition"
          >
            Ver Projetos
          </button>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary smooth-transition"
          >
            Entre em Contato
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero 