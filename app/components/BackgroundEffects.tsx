'use client'

import React, { useEffect, useState } from 'react'

const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          delay: Math.random() * 8
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 matrix-bg" />
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            background: `radial-gradient(circle, #00f5ff, transparent)`
          }}
        />
      ))}
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-900/20 via-transparent to-purple-900/20" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-neon-blue/10 via-transparent to-transparent" />
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-blue/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-neon-purple/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-neon-pink/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
    </div>
  )
}

export default BackgroundEffects 