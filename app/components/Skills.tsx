'use client'

import React, { useState, useEffect } from 'react'

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('skills')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const skills = [
    { name: 'Suporte Técnico', level: 95, category: 'support' },
    { name: 'Linux SysAdmin', level: 90, category: 'systems' },
    { name: 'Redes & Infraestrutura', level: 88, category: 'networks' },
    { name: 'Segurança da Informação', level: 85, category: 'security' },
    { name: 'Hardware & Manutenção', level: 92, category: 'support' },
    { name: 'Desenvolvimento Web', level: 80, category: 'development' }
  ]

  const certifications = [
    'Analista de Suporte I & II',
    'Linux SysAdmin I & II',
    'Linux NetAdmin & SecAdmin I & II',
    'Switches e Roteadores',
    'Segurança da Informação',
    'Reparo de Placa Notebook/Desktop'
  ]

  return (
    <section id="skills" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Competências
          </h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills Progress */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Expertise Técnica</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-primary-500 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div 
                      className="h-full bg-gradient-tech rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Certificações</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div 
                  key={cert}
                  className="flex items-center gap-3 p-4 bg-neutral-900/50 rounded-lg border-l-4 border-primary-500/40 hover:border-primary-500 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-tech-gray hover:text-white transition-colors duration-300">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 