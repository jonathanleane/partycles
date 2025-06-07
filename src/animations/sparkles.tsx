import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

export const createSparkleParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 35,
    spread = 120,
    startVelocity = 15,
    elementSize = 25,
    colors = ['#FFD700', '#FFFFFF']
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const velocityScale = startVelocity / 45; // Scale based on default
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-spread, spread),
      y: origin.y + randomInRange(-spread, spread),
      vx: randomInRange(-3, 3) * velocityScale,
      vy: randomInRange(-3, 3) * velocityScale,
      life: config.lifetime || 120,
      opacity: 0,
      size: randomInRange(elementSize * 0.4, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#ffffff',
    });
  }

  return particles;
};

export const renderSparkleParticle = (particle: Particle): React.ReactNode => {
  const scale = particle.opacity;
  
  return (
    <svg
      key={particle.id}
      width={particle.size}
      height={particle.size}
      viewBox="0 0 24 24"
      style={{
        transform: `scale(${scale}) rotate(${particle.rotation}deg)`,
        filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))',
      }}
    >
      <path
        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
        fill={particle.color}
      />
    </svg>
  );
};