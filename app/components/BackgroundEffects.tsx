'use client'

import React from 'react'

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 minimal-grid opacity-30"></div>
      
      {/* Professional Background Gradient */}
      <div className="absolute inset-0 tech-bg"></div>
      
      {/* Subtle Overlay Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/10 via-transparent to-neutral-900/20"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary-500/5 via-transparent to-transparent"></div>
      
      {/* Minimal Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-tech-purple/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  )
}

export default BackgroundEffects 