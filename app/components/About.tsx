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
                <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Sobre Mim
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              <p>
                Sou <span className="text-neon-blue font-semibold">Gabriel Dias da Silva</span>, 
                um Tecnólogo em Análise e Desenvolvimento de Sistemas com sólida experiência em 
                <span className="text-neon-purple font-semibold"> suporte técnico</span>, 
                <span className="text-neon-pink font-semibold"> desenvolvimento de sistemas</span> e 
                <span className="text-neon-green font-semibold"> administração de redes</span>.
              </p>
              
              <p>
                Natural de <span className="text-neon-blue">Campo Largo, Paraná</span>, 
                me formei pela UNICNEC em dezembro de 2023. Desde agosto de 2020, 
                atuo como Analista em uma empresa de grande porte, onde desenvolvi 
                expertise em múltiplas áreas da tecnologia.
              </p>

              <p>
                Sou apaixonado por <span className="text-neon-purple">Linux</span>, 
                <span className="text-neon-pink"> segurança da informação</span> e 
                <span className="text-neon-green"> desenvolvimento de soluções eficientes</span>. 
                Acredito que a tecnologia deve ser segura, eficiente e acessível.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-blue neon-glow mb-2">4+</div>
                <div className="text-sm text-gray-400">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple neon-glow mb-2">2023</div>
                <div className="text-sm text-gray-400">Formação ADS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-pink neon-glow mb-2">100%</div>
                <div className="text-sm text-gray-400">Dedicação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-neon-blue/20 neon-border hover:scale-105 transition-all duration-300">
              {/* Profile Image Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-pulse opacity-75"></div>
                <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">GDS</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">Gabriel Dias da Silva</h3>
                <p className="text-neon-blue">Tecnólogo em ADS</p>
                
                <div className="space-y-2 text-sm text-gray-400">
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
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue rounded-full animate-float opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-neon-pink rounded-full animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Professional Journey Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Jornada Profissional
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                <span className="text-neon-blue font-semibold">Atual - Analista Multifuncional</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Empresa de Grande Porte • Ago 2020 - Presente</p>
              <p className="text-gray-300 text-sm">
                Atuação em suporte técnico, análise de sistemas e administração de redes. 
                Responsável por configuração de infraestrutura, desenvolvimento de soluções 
                e garantia da segurança da informação.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm rounded-xl p-6 border border-neon-purple/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                <span className="text-neon-purple font-semibold">Formação Acadêmica</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">UNICNEC • Concluído em Dez 2023</p>
              <p className="text-gray-300 text-sm">
                Tecnólogo em Análise e Desenvolvimento de Sistemas. 
                Formação sólida em programação, banco de dados, engenharia de software 
                e gestão de projetos tecnológicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 