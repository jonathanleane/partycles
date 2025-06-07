import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const starColors = ['#FFD700', '#FFA500', '#FF6347', '#FFE4B5'];

export const createStarParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 40,
    startVelocity = 18,
    colors = starColors,
    elementSize = 30
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);

    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos((angle * Math.PI) / 180) * velocity,
      vy: Math.sin((angle * Math.PI) / 180) * velocity - 15,
      life: config.lifetime || 150,
      opacity: 1,
      size: randomInRange(elementSize * 0.5, elementSize * 1.3),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#ffffff',
    });
  }

  return particles;
};

export const renderStarParticle = (particle: Particle): React.ReactNode => {
  return (
    <svg
      key={particle.id}
      width={particle.size}
      height={particle.size}
      viewBox="0 0 24 24"
      fill={particle.color}
      style={{
        filter: `drop-shadow(0 0 ${particle.size * 0.2}px ${particle.color})`,
      }}
    >
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg>
  );
};