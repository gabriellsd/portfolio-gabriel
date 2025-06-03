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
        {/* Animated Avatar/Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-spin-slow opacity-75 blur-sm"></div>
            <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
              <span className="text-3xl font-bold text-neon-blue neon-glow">GDS</span>
            </div>
          </div>
        </div>

        {/* Main Title with Glitch Effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
          <span className="block text-white glitch" data-text="PORTFOLIO">
            PORTFOLIO
          </span>
        </h1>

        {/* Typing Animation */}
        <div className="text-xl md:text-3xl mb-4 h-12 flex items-center justify-center">
          <span className="text-neon-blue neon-glow font-mono">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Professional Title */}
        <div className="text-lg md:text-xl text-neon-purple font-semibold mb-8">
          Tecnólogo em Análise e Desenvolvimento de Sistemas
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          Especialista em <span className="text-neon-blue">suporte técnico</span>, 
          <span className="text-neon-purple"> desenvolvimento de sistemas</span> e 
          <span className="text-neon-pink"> administração de redes</span>. 
          Proficiente em Linux, configuração de redes e segurança da informação, 
          com foco em soluções eficientes e seguras.
        </p>

        {/* Location and Status */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Campo Largo, Paraná</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span>Disponível para novos projetos</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:text-black neon-border"
          >
            <span className="relative z-10">Ver Projetos</span>
            <div className="absolute inset-0 bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/50"
          >
            <span className="relative z-10">Entre em Contato</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-neon-blue rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-neon-purple rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-neon-pink rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-neon-green rounded-full animate-float opacity-30" style={{ animationDelay: '6s' }}></div>
    </section>
  )
}

export default Hero 