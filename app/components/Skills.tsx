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

  const technicalSkills = [
    { name: 'Suporte Técnico', level: 95, color: 'neon-blue' },
    { name: 'Linux (SysAdmin/NetAdmin)', level: 90, color: 'neon-purple' },
    { name: 'Administração de Redes', level: 88, color: 'neon-pink' },
    { name: 'Segurança da Informação', level: 85, color: 'neon-green' },
    { name: 'Hardware & Manutenção', level: 92, color: 'neon-blue' },
    { name: 'Desenvolvimento Web', level: 80, color: 'neon-purple' }
  ]

  const systemsNetworking = [
    { name: 'Linux', icon: '🐧' },
    { name: 'Windows', icon: '🪟' },
    { name: 'Roteadores', icon: '📡' },
    { name: 'Switches', icon: '🔌' },
    { name: 'Firewalls', icon: '🛡️' },
    { name: 'LAN/WAN', icon: '🌐' }
  ]

  const devTools = [
    { name: 'Python', icon: '🐍' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'HTML/CSS', icon: '🎨' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Chart.js', icon: '📈' },
    { name: 'GitHub', icon: '🐙' }
  ]

  const certifications = [
    'Analista de Suporte I & II',
    'Reparo de Placa Notebook/Desktop',
    'Switches e Roteadores',
    'Linux SysAdmin I & II',
    'Linux NetAdmin & SecAdmin I & II',
    'Segurança da Informação'
  ]

  return (
    <section id="skills" className="relative py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experiência sólida em suporte técnico, sistemas Linux e administração de redes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Technical Skills */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-neon-blue">💻</span>
              Competências Técnicas
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className={`text-${skill.color} font-bold`}>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-${skill.color} to-${skill.color}/80 rounded-full transition-all duration-1000 ease-out transform origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                      style={{ 
                        width: `${skill.level}%`,
                        transitionDelay: `${index * 200}ms`,
                        boxShadow: `0 0 10px var(--${skill.color}), 0 0 20px var(--${skill.color})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Systems & Networking */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-neon-purple">🖥️</span>
                Sistemas & Redes
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {systemsNetworking.map((item, index) => (
                  <div 
                    key={item.name}
                    className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg p-4 border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm text-gray-300 group-hover:text-neon-purple transition-colors duration-300">
                        {item.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Tools */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-neon-pink">⚡</span>
                Desenvolvimento
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {devTools.map((tool, index) => (
                  <div 
                    key={tool.name}
                    className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg p-4 border border-neon-pink/20 hover:border-neon-pink/40 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{tool.icon}</div>
                      <div className="text-sm text-gray-300 group-hover:text-neon-pink transition-colors duration-300">
                        {tool.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <span className="text-neon-green">🏆</span>
            Certificações & Cursos (Elaborata Informática)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={cert}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-900/30 to-transparent rounded-lg border-l-4 border-neon-green/40 hover:border-neon-green transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-neon-green">✓</span>
                <span className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Focus Areas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-neon-blue/10 to-transparent border border-neon-blue/20 rounded-xl">
            <div className="text-4xl mb-4">🛠️</div>
            <h4 className="text-xl font-bold text-neon-blue mb-2">Suporte Técnico</h4>
            <p className="text-gray-400 text-sm">
              Resolução de problemas, configuração de sistemas e manutenção de hardware
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-neon-purple/10 to-transparent border border-neon-purple/20 rounded-xl">
            <div className="text-4xl mb-4">🌐</div>
            <h4 className="text-xl font-bold text-neon-purple mb-2">Administração de Redes</h4>
            <p className="text-gray-400 text-sm">
              Configuração de roteadores, switches e implementação de segurança
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-neon-pink/10 to-transparent border border-neon-pink/20 rounded-xl">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold text-neon-pink mb-2">Segurança da Informação</h4>
            <p className="text-gray-400 text-sm">
              Implementação de firewalls, políticas de segurança e proteção contra ameaças
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 