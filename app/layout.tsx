import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabriel Dias da Silva - Tecnólogo em Análise e Desenvolvimento de Sistemas',
  description: 'Portfolio profissional de Gabriel Dias da Silva, Tecnólogo em ADS com experiência em suporte técnico, desenvolvimento de sistemas e administração de redes',
  keywords: ['Gabriel Dias', 'Analista de Sistemas', 'Suporte Técnico', 'Redes', 'Linux', 'Desenvolvimento', 'Paraná'],
  authors: [{ name: 'Gabriel Dias da Silva', url: 'https://www.linkedin.com/in/gabriel-dias-676a68266/' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
} 