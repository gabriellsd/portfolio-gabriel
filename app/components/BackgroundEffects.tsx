'use client'

import React from 'react'

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Apenas um background simples */}
      <div className="absolute inset-0 bg-dark-bg"></div>
    </div>
  )
}

export default BackgroundEffects 