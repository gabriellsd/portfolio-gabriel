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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simular delay de processamento
    setTimeout(() => {
      // Preparar dados para o email
      const emailSubject = encodeURIComponent(formData.subject || 'Contato do Portfolio')
      const emailBody = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      )
      
      // Abrir cliente de email
      window.open(`mailto:gabrielsilvadis@outlook.com?subject=${emailSubject}&body=${emailBody}`)
      
      // Marcar como sucesso
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'Email',
      value: 'gabrielsilvadis@outlook.com',
      link: 'mailto:gabrielsilvadis@outlook.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'gabriel-dias-676a68266',
      link: 'https://www.linkedin.com/in/gabriel-dias-676a68266/'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      title: 'WhatsApp',
      value: '+55 (41) 99567-1711',
      link: 'https://wa.me/5541995671711'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: 'Localização',
      value: 'Campo Largo, PR',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      link: 'mailto:gabrielsilvadis@outlook.com',
      label: 'Email'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      link: 'https://www.linkedin.com/in/gabriel-dias-676a68266/',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-1.653 0-2.878-2.245-5.688-5.487-5.688-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.001 12.017z"/>
        </svg>
      ),
      link: 'https://www.instagram.com/gabriellsd_',
      label: 'Instagram'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
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
            <span className="gradient-text">
              Vamos Conversar
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto mb-8"></div>
          <p className="text-xl text-tech-gray max-w-3xl mx-auto">
            Pronto para colaborar em projetos de TI? Tenho experiência em infraestrutura, redes e suporte técnico!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="relative">
            <div className="pro-card p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-primary-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                Envie uma Mensagem
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg text-primary-500">
                  ✅ Mensagem enviada com sucesso! Gabriel entrará em contato em breve.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                  ❌ Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-tech-gray mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all duration-300"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-tech-gray mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-tech-gray mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all duration-300"
                    placeholder="Ex: Projeto de Infraestrutura, Suporte Técnico, etc."
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-tech-gray mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Descreva seu projeto, necessidade de suporte técnico ou oportunidade de colaboração..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
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
                <span className="text-tech-purple">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group flex items-center gap-4 p-4 pro-card hover-lift transition-all duration-300"
                  >
                    <div className="text-primary-500 group-hover:text-tech-purple transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-tech-gray">{info.title}</div>
                      <div className="text-white group-hover:text-primary-500 transition-colors duration-300">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Status Card */}
            <div className="pro-card p-6 border-primary-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-primary-500 font-semibold">Disponível para Projetos</span>
              </div>
              <p className="text-tech-gray text-sm">
                Atualmente aceito novos projetos nas áreas de infraestrutura de TI, 
                suporte técnico e administração de redes. Respondo em até 24 horas!
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Áreas de Atuação</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 pro-card text-sm text-tech-gray hover:text-white transition-colors duration-300">
                  <span>🛠️</span>
                  <span>Suporte Técnico</span>
                </div>
                <div className="flex items-center gap-2 p-3 pro-card text-sm text-tech-gray hover:text-white transition-colors duration-300">
                  <span>🖥️</span>
                  <span>Linux Admin</span>
                </div>
                <div className="flex items-center gap-2 p-3 pro-card text-sm text-tech-gray hover:text-white transition-colors duration-300">
                  <span>🌐</span>
                  <span>Redes</span>
                </div>
                <div className="flex items-center gap-2 p-3 pro-card text-sm text-tech-gray hover:text-white transition-colors duration-300">
                  <span>🔒</span>
                  <span>Segurança</span>
                </div>
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
                    className="w-12 h-12 pro-card flex items-center justify-center text-tech-gray hover:text-primary-500 hover-lift transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-neutral-800">
          <div className="text-center">
            <p className="text-tech-gray mb-4">
              © 2024 Gabriel Dias da Silva. Todos os direitos reservados.
            </p>
            <p className="text-sm text-neutral-500">
              Analista de Sistemas • Campo Largo, PR • Desenvolvido com ❤️ e muita tecnologia
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 