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
    
    setTimeout(() => {
      const emailSubject = encodeURIComponent(formData.subject || 'Contato do Portfolio')
      const emailBody = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      )
      
      window.open(`mailto:gabrielsilvadis@outlook.com?subject=${emailSubject}&body=${emailBody}`)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
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

  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Contato
          </h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="pro-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg text-primary-500">
                ✅ Mensagem enviada com sucesso!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-tech-gray mb-2">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:outline-none transition-all duration-300"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-tech-gray mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:outline-none transition-all duration-300"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-tech-gray mb-2">Assunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:outline-none transition-all duration-300"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-tech-gray mb-2">Mensagem *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-tech-gray focus:border-primary-500 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Sua mensagem..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center gap-4 p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-800/50 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h4 className="text-primary-500 font-semibold group-hover:text-primary-400 transition-colors">
                        {info.title}
                      </h4>
                      <p className="text-tech-gray text-sm">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="pro-card p-6 text-center">
              <h4 className="text-xl font-bold text-white mb-4">Disponibilidade</h4>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="text-primary-500 font-medium">Disponível para projetos</span>
              </div>
              <p className="text-tech-gray text-sm">
                Respondo em até 24 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 