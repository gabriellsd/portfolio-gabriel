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
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Título Principal */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text">
          {displayText}
          {currentIndex < fullText.length && (
            <span className="animate-pulse text-primary-500 opacity-75">|</span>
          )}
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-tech-purple mb-4 font-medium">
          Analista de Sistemas
        </p>

        {/* Especialidades */}
        <p className="text-lg text-tech-gray mb-12 max-w-2xl mx-auto">
          Especialista em <span className="text-primary-500">Suporte Técnico</span> • 
          <span className="text-tech-purple"> Linux & Redes</span> • 
          <span className="text-accent-500"> Segurança da Informação</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Ver Projetos
          </button>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Contato
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero 