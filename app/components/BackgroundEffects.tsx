'use client'

import React from 'react'

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 matrix-rain"></div>
      
      {/* Professional Background Gradient */}
      <div className="absolute inset-0 tech-bg"></div>
      
      {/* Subtle Overlay Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/10 via-transparent to-neutral-900/20"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary-500/5 via-transparent to-transparent"></div>
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/15 rounded-full blur-xl animate-pulse" style={{ animation: 'pulse-particle 6s ease-in-out infinite' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-tech-purple/15 rounded-full blur-xl" style={{ animation: 'pulse-particle 8s ease-in-out infinite', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent-500/15 rounded-full blur-xl" style={{ animation: 'pulse-particle 7s ease-in-out infinite', animationDelay: '4s' }}></div>
      
      {/* Additional Moving Elements */}
      <div className="absolute top-10 right-10 w-1 h-20 bg-gradient-to-b from-primary-500/30 to-transparent animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-20 h-1 bg-gradient-to-r from-tech-purple/30 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  )
}

export default BackgroundEffects 