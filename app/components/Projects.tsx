'use client'

import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'support', label: 'Suporte' },
    { id: 'networks', label: 'Redes' },
    { id: 'development', label: 'Desenvolvimento' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Infraestrutura de TI Corporativa',
      description: 'Implementação completa de infraestrutura de TI para empresa de grande porte, incluindo configuração de servidores, redes LAN/WAN e políticas de segurança.',
      category: 'networks',
      technologies: ['Linux', 'Windows Server', 'Switches', 'Roteadores', 'Firewalls'],
      icon: '🏢'
    },
    {
      id: 2,
      title: 'Sistema de Suporte Técnico',
      description: 'Desenvolvimento e implementação de sistema de gestão de chamados técnicos com dashboard de monitoramento e relatórios em tempo real.',
      category: 'support',
      technologies: ['Python', 'JavaScript', 'Chart.js', 'Firebase'],
      icon: '🛠️'
    },
    {
      id: 3,
      title: 'Segurança de Rede Corporativa',
      description: 'Implementação de políticas de segurança avançada, configuração de firewalls e monitoramento de ameaças cibernéticas.',
      category: 'networks',
      technologies: ['Firewalls', 'Linux Security', 'Monitoramento', 'VPN'],
      icon: '🔒'
    },
    {
      id: 4,
      title: 'Modernização de Hardware',
      description: 'Projeto de atualização e manutenção de hardware corporativo, incluindo notebooks, desktops e servidores.',
      category: 'support',
      technologies: ['Hardware', 'Diagnóstico', 'Reparo de Placas', 'Manutenção'],
      icon: '💻'
    },
    {
      id: 5,
      title: 'Dashboard de Monitoramento',
      description: 'Desenvolvimento de dashboard web para monitoramento de performance de rede e sistemas em tempo real.',
      category: 'development',
      technologies: ['JavaScript', 'Chart.js', 'HTML/CSS', 'Firebase'],
      icon: '📊'
    },
    {
      id: 6,
      title: 'Migração para Linux',
      description: 'Projeto de migração de sistemas Windows para ambiente Linux, incluindo treinamento de usuários e documentação técnica.',
      category: 'networks',
      technologies: ['Linux Migration', 'Shell Script', 'Documentação', 'Treinamento'],
      icon: '🐧'
    }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Projetos
          </h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-tech text-white'
                  : 'bg-neutral-900/50 text-tech-gray border border-neutral-700 hover:border-primary-500 hover:text-primary-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="pro-card hover-lift p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 text-center opacity-80">
                {project.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-tech-gray text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-500/10 text-primary-500 text-xs rounded-full border border-primary-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 