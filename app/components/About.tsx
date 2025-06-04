'use client'

import React from 'react'

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="gradient-text">
                  Sobre Mim
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-tech"></div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-tech-gray">
              <p>
                Sou <span className="text-primary-500 font-semibold">Gabriel Dias da Silva</span>, 
                formado em Análise e Desenvolvimento de Sistemas pela 
                <span className="text-tech-purple font-semibold"> UNICNEC</span> em dezembro de 2023.
              </p>
              
              <p>
                Desde agosto de 2020, atuo como Analista em uma empresa de grande porte, 
                onde desenvolvi expertise sólida em <span className="text-primary-600 font-semibold">infraestrutura de TI</span>, 
                <span className="text-accent-500 font-semibold"> redes corporativas</span> e 
                <span className="text-tech-purple font-semibold"> suporte técnico avançado</span>.
              </p>

              <p>
                Apaixonado por <span className="text-tech-purple">tecnologia open source</span> e 
                <span className="text-accent-500"> segurança da informação</span>, 
                busco constantemente aprimorar minhas habilidades para entregar 
                <span className="text-primary-600"> soluções robustas e eficientes</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 subtle-glow mb-2">4+</div>
                <div className="text-sm text-tech-gray">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-purple subtle-glow mb-2">2023</div>
                <div className="text-sm text-tech-gray">Formação ADS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-500 subtle-glow mb-2">100%</div>
                <div className="text-sm text-tech-gray">Dedicação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative pro-card hover-lift p-8">
              {/* Profile Image Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-tech animate-pulse opacity-30"></div>
                <div className="absolute inset-2 rounded-full bg-neutral-900 border-2 border-primary-500/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">GDS</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">Gabriel Dias da Silva</h3>
                <p className="text-primary-500">Analista de Sistemas</p>
                
                <div className="space-y-2 text-sm text-tech-gray">
                  <div className="flex items-center justify-center gap-2">
                    <span>💼</span>
                    <span>Analista de Sistemas</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>🎓</span>
                    <span>UNICNEC - ADS 2023</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>⚡</span> 
                    <span>4+ anos de experiência</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>✅</span>
                    <span>Disponível para projetos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Journey Timeline with Enhanced Effects */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="gradient-text">
              Jornada Profissional
            </span>
          </h3>
          
          {/* Enhanced Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line - apenas para desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-500 via-tech-purple to-accent-500 opacity-30" style={{ height: 'calc(100% - 4rem)' }}></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Current Position */}
              <div className="md:flex md:items-center relative">
                <div className="md:flex-1 md:pr-8 md:text-right">
                  <div className="pro-card hover-lift p-6">
                    <h4 className="text-xl font-bold text-primary-500 mb-2">Analista Multifuncional</h4>
                    <p className="text-tech-gray text-sm mb-2">Empresa de Grande Porte</p>
                    <p className="text-white text-sm">
                      Suporte técnico, administração de redes e desenvolvimento de sistemas
                    </p>
                  </div>
                </div>
                
                {/* Timeline Dot - apenas para desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full border-4 border-dark-bg shadow-lg z-10">
                  <div className="w-full h-full bg-primary-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="md:flex-1 md:pl-8 mt-4 md:mt-0">
                  <div className="text-primary-500 font-semibold">Ago 2020 - Presente</div>
                  <div className="text-tech-gray text-sm">4+ anos de experiência</div>
                </div>
              </div>

              {/* Education */}
              <div className="md:flex md:items-center relative">
                <div className="md:flex-1 md:pr-8 md:text-right">
                  <div className="pro-card hover-lift p-6">
                    <h4 className="text-xl font-bold text-tech-purple mb-2">Formação ADS</h4>
                    <p className="text-tech-gray text-sm mb-2">UNICNEC</p>
                    <p className="text-white text-sm">
                      Tecnólogo em Análise e Desenvolvimento de Sistemas
                    </p>
                  </div>
                </div>
                
                {/* Timeline Dot - apenas para desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-tech-purple rounded-full border-4 border-dark-bg shadow-lg z-10">
                  <div className="w-full h-full bg-tech-purple rounded-full"></div>
                </div>
                
                <div className="md:flex-1 md:pl-8 mt-4 md:mt-0">
                  <div className="text-tech-purple font-semibold">Dez 2023</div>
                  <div className="text-tech-gray text-sm">Diploma registrado</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="md:flex md:items-center relative">
                <div className="md:flex-1 md:pr-8 md:text-right">
                  <div className="pro-card hover-lift p-6">
                    <h4 className="text-xl font-bold text-accent-500 mb-2">Certificações</h4>
                    <p className="text-tech-gray text-sm mb-2">Elaborata Informática</p>
                    <p className="text-white text-sm">
                      Múltiplas certificações em Linux, Redes e Suporte
                    </p>
                  </div>
                </div>
                
                {/* Timeline Dot - apenas para desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-500 rounded-full border-4 border-dark-bg shadow-lg z-10">
                  <div className="w-full h-full bg-accent-500 rounded-full"></div>
                </div>
                
                <div className="md:flex-1 md:pl-8 mt-4 md:mt-0">
                  <div className="text-accent-500 font-semibold">2021 - 2022</div>
                  <div className="text-tech-gray text-sm">Especializações técnicas</div>
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