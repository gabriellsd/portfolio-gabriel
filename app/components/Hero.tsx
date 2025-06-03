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

        {/* Typing Animation */}
        <div className="text-xl md:text-3xl mb-4 h-12 flex items-center justify-center">
          <span className="text-primary-500 subtle-glow font-medium">
            {displayText}
            <span className="animate-pulse text-tech-purple">|</span>
          </span>
        </div>

        {/* Professional Title */}
        <div className="text-lg md:text-xl gradient-text font-semibold mb-8">
          Tecnólogo em Análise e Desenvolvimento de Sistemas
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-tech-gray mb-12 max-w-4xl mx-auto leading-relaxed">
          Especialista em <span className="text-primary-500 font-medium">suporte técnico</span>, 
          <span className="text-tech-purple font-medium"> desenvolvimento de sistemas</span> e 
          <span className="text-accent-500 font-medium"> administração de redes</span>. 
          Proficiente em Linux, configuração de redes e segurança da informação, 
          com foco em soluções eficientes e seguras.
        </p>

        {/* Location and Status */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-tech-gray">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Campo Largo, Paraná</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-neutral-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
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

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary-500/30 rounded-full animate-float opacity-40"></div>
      <div className="absolute top-40 right-20 w-4 h-4 bg-tech-purple/20 rounded-full float opacity-30" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-accent-500/25 rounded-full animate-float opacity-35" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary-500/20 rounded-full animate-float opacity-25" style={{ animationDelay: '6s' }}></div>
    </section>
  )
}

export default Hero 