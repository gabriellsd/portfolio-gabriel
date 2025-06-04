'use client'

import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Sobre
          </h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Experiência */}
          <div className="space-y-8">
            <div className="space-y-6 text-lg leading-relaxed text-tech-gray">
              <p>
                <span className="text-primary-500 font-semibold">4+ anos de experiência</span> em análise de sistemas, 
                atuando em empresa de grande porte desde agosto de 2020.
              </p>
              
              <p>
                Formado em <span className="text-tech-purple">Tecnologia em ADS</span> pela UNICNEC (2023), 
                com certificações em <span className="text-accent-500">Linux, Redes e Segurança da Informação</span> 
                pela Elaborata Informática.
              </p>

              <p>
                Especializado em resolução de problemas complexos, implementação de soluções eficientes 
                e melhoria contínua de processos de TI.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 subtle-glow mb-2">4+</div>
                <div className="text-sm text-tech-gray">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-purple subtle-glow mb-2">6</div>
                <div className="text-sm text-tech-gray">Certificações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-500 subtle-glow mb-2">100%</div>
                <div className="text-sm text-tech-gray">Dedicação</div>
              </div>
            </div>
          </div>

          {/* Principais Competências */}
          <div className="pro-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Principais Competências</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-neutral-900/50 rounded-lg">
                <span className="text-2xl">🛠️</span>
                <div>
                  <h4 className="text-primary-500 font-semibold">Suporte Técnico</h4>
                  <p className="text-sm text-tech-gray">Hardware, Software e Redes</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-neutral-900/50 rounded-lg">
                <span className="text-2xl">🐧</span>
                <div>
                  <h4 className="text-tech-purple font-semibold">Linux SysAdmin</h4>
                  <p className="text-sm text-tech-gray">Administração e Configuração</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-neutral-900/50 rounded-lg">
                <span className="text-2xl">🌐</span>
                <div>
                  <h4 className="text-accent-500 font-semibold">Redes & Segurança</h4>
                  <p className="text-sm text-tech-gray">Configuração e Monitoramento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 