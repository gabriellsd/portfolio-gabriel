'use client'

import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Mensagem enviada com sucesso! Gabriel entrará em contato em breve.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'gabrielsilvadis@outlook.com',
      link: 'mailto:gabrielsilvadis@outlook.com'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'gabriel-dias-676a68266',
      link: 'https://www.linkedin.com/in/gabriel-dias-676a68266/'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      value: '+55 (41) 99567-1711',
      link: 'https://wa.me/5541995671711'
    },
    {
      icon: '📍',
      title: 'Localização',
      value: 'Campo Largo, PR',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      icon: '📧',
      link: 'mailto:gabrielsilvadis@outlook.com',
      label: 'Email'
    },
    {
      icon: '💼',
      link: 'https://www.linkedin.com/in/gabriel-dias-676a68266/',
      label: 'LinkedIn'
    },
    {
      icon: '📷',
      link: 'https://www.instagram.com/gabriellsd_',
      label: 'Instagram'
    },
    {
      icon: '🐙',
      link: '#',
      label: 'GitHub'
    }
  ]

  return (
    <section id="contact" className="relative py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Vamos Conversar
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pronto para colaborar em projetos de TI? Tenho experiência em infraestrutura, redes e suporte técnico!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-neon-blue/20 neon-border">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-neon-blue">✉️</span>
                Envie uma Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue focus:outline-none transition-all duration-300"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue focus:outline-none transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue focus:outline-none transition-all duration-300"
                    placeholder="Ex: Projeto de Infraestrutura, Suporte Técnico, etc."
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Descreva seu projeto, necessidade de suporte técnico ou oportunidade de colaboração..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-neon-purple">📞</span>
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group flex items-center gap-4 p-4 bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-neon-purple/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <div className="text-sm text-gray-400">{info.title}</div>
                      <div className="text-white group-hover:text-neon-purple transition-colors duration-300">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-neon-green/10 to-transparent border border-neon-green/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-neon-green font-semibold">Disponível para Projetos</span>
              </div>
              <p className="text-gray-400 text-sm">
                Atualmente aceito novos projetos nas áreas de infraestrutura de TI, 
                suporte técnico e administração de redes. Respondo em até 24 horas!
              </p>
            </div>

            {/* Professional Areas */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Áreas de Atuação</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🛠️', text: 'Suporte Técnico' },
                  { icon: '🖥️', text: 'Linux Admin' },
                  { icon: '🌐', text: 'Redes' },
                  { icon: '🔒', text: 'Segurança' }
                ].map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-lg text-sm text-gray-300"
                  >
                    <span>{area.icon}</span>
                    <span>{area.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target={social.link.startsWith('http') ? '_blank' : '_self'}
                    rel={social.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    title={social.label}
                    className="w-12 h-12 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700 rounded-lg flex items-center justify-center text-xl hover:border-neon-blue hover:scale-110 transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2024 Gabriel Dias da Silva. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-500">
              Tecnólogo em ADS • Campo Largo, PR • Desenvolvido com ❤️ e muita tecnologia
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 