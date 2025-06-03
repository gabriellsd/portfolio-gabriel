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
                um Analista de Sistemas com sólida experiência em 
                <span className="text-tech-purple font-semibold"> suporte técnico</span>, 
                <span className="text-accent-500 font-semibold"> desenvolvimento de sistemas</span> e 
                <span className="text-primary-600 font-semibold"> administração de redes</span>.
              </p>
              
              <p>
                Natural de <span className="text-primary-500">Campo Largo, Paraná</span>, 
                me formei pela UNICNEC em dezembro de 2023. Desde agosto de 2020, 
                atuo como Analista em uma empresa de grande porte, onde desenvolvi 
                expertise em múltiplas áreas da tecnologia.
              </p>

              <p>
                Sou apaixonado por <span className="text-tech-purple">Linux</span>, 
                <span className="text-accent-500"> segurança da informação</span> e 
                <span className="text-primary-600"> desenvolvimento de soluções eficientes</span>. 
                Acredito que a tecnologia deve ser segura, eficiente e acessível.
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
                    <span>📍</span>
                    <span>Campo Largo, Paraná</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>🎂</span>
                    <span>23/05/2000</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>🎓</span>
                    <span>UNICNEC - 2023</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>💼</span>
                    <span>Disponível para projetos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary-500/30 rounded-full animate-float opacity-40"></div>
            <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-tech-purple/30 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 -right-8 w-3 h-3 bg-accent-500/30 rounded-full animate-float opacity-35" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 