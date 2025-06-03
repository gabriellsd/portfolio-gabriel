'use client'

import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'support', label: 'Suporte Técnico' },
    { id: 'networks', label: 'Redes & Infraestrutura' },
    { id: 'development', label: 'Desenvolvimento' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Infraestrutura de TI Corporativa',
      description: 'Implementação completa de infraestrutura de TI para empresa de grande porte, incluindo configuração de servidores, redes LAN/WAN e políticas de segurança.',
      category: 'networks',
      technologies: ['Linux', 'Windows Server', 'Switches', 'Roteadores', 'Firewalls'],
      image: '🏢',
      status: 'Concluído'
    },
    {
      id: 2,
      title: 'Sistema de Suporte Técnico',
      description: 'Desenvolvimento e implementação de sistema de gestão de chamados técnicos com dashboard de monitoramento e relatórios em tempo real.',
      category: 'support',
      technologies: ['Python', 'JavaScript', 'Chart.js', 'Firebase'],
      image: '🛠️',
      status: 'Concluído'
    },
    {
      id: 3,
      title: 'Segurança de Rede Corporativa',
      description: 'Implementação de políticas de segurança avançada, configuração de firewalls e monitoramento de ameaças cibernéticas.',
      category: 'networks',
      technologies: ['Firewalls', 'Linux Security', 'Monitoramento', 'VPN'],
      image: '🔒',
      status: 'Concluído'
    },
    {
      id: 4,
      title: 'Modernização de Hardware',
      description: 'Projeto de atualização e manutenção de hardware corporativo, incluindo notebooks, desktops e servidores.',
      category: 'support',
      technologies: ['Hardware', 'Diagnóstico', 'Reparo de Placas', 'Manutenção'],
      image: '💻',
      status: 'Concluído'
    },
    {
      id: 5,
      title: 'Dashboard de Monitoramento',
      description: 'Desenvolvimento de dashboard web para monitoramento de performance de rede e sistemas em tempo real.',
      category: 'development',
      technologies: ['JavaScript', 'Chart.js', 'HTML/CSS', 'Firebase'],
      image: '📊',
      status: 'Concluído'
    },
    {
      id: 6,
      title: 'Migração para Linux',
      description: 'Projeto de migração de sistemas Windows para ambiente Linux, incluindo treinamento de usuários e documentação técnica.',
      category: 'networks',
      technologies: ['Linux Migration', 'Shell Script', 'Documentação', 'Treinamento'],
      image: '🐧',
      status: 'Em Andamento'
    }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'text-neon-green'
      case 'Em Andamento': return 'text-neon-blue'
      case 'Em Desenvolvimento': return 'text-neon-purple'
      case 'Planejamento': return 'text-neon-pink'
      default: return 'text-gray-400'
    }
  }

  return (
    <section id="projects" className="relative py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Projetos & Experiência
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Principais projetos e realizações na área de TI e infraestrutura corporativa
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white neon-border'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-neon-blue hover:text-neon-blue'
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
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-neon-blue/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image/Icon */}
              <div className="relative h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                <span className="text-6xl opacity-80">{project.image}</span>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)} bg-black/50`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full border border-neon-blue/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all duration-300">
                    Ver Detalhes
                  </button>
                  <button className="px-4 py-2 border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Experiência Profissional
            </span>
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-purple"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="flex items-center relative">
                  <div className="flex-1 pr-8 text-right">
                    <h4 className="text-xl font-bold text-neon-blue">Analista Multifuncional</h4>
                    <p className="text-gray-400 text-sm mb-2">Empresa de Grande Porte</p>
                    <p className="text-gray-300 text-sm">
                      Suporte técnico, administração de redes e desenvolvimento de sistemas
                    </p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-blue rounded-full border-4 border-black"></div>
                  <div className="flex-1 pl-8">
                    <p className="text-neon-blue font-semibold">Ago 2020 - Presente</p>
                    <p className="text-gray-400 text-sm">4+ anos de experiência</p>
                  </div>
                </div>

                <div className="flex items-center relative">
                  <div className="flex-1 pr-8 text-right">
                    <h4 className="text-xl font-bold text-neon-purple">Formação ADS</h4>
                    <p className="text-gray-400 text-sm mb-2">UNICNEC</p>
                    <p className="text-gray-300 text-sm">
                      Tecnólogo em Análise e Desenvolvimento de Sistemas
                    </p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-purple rounded-full border-4 border-black"></div>
                  <div className="flex-1 pl-8">
                    <p className="text-neon-purple font-semibold">Dez 2023</p>
                    <p className="text-gray-400 text-sm">Diploma registrado</p>
                  </div>
                </div>

                <div className="flex items-center relative">
                  <div className="flex-1 pr-8 text-right">
                    <h4 className="text-xl font-bold text-neon-green">Certificações</h4>
                    <p className="text-gray-400 text-sm mb-2">Elaborata Informática</p>
                    <p className="text-gray-300 text-sm">
                      Múltiplas certificações em Linux, Redes e Suporte
                    </p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-green rounded-full border-4 border-black"></div>
                  <div className="flex-1 pl-8">
                    <p className="text-neon-green font-semibold">2021 - 2022</p>
                    <p className="text-gray-400 text-sm">Especializações técnicas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Interessado em colaborar ou saber mais sobre meus projetos?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/30"
          >
            Vamos Conversar!
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects 