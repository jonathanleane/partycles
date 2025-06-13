import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';
import { createPooledParticles } from '../particlePool';

const heartColors = ['#ff1744', '#e91e63', '#ff4569', '#ff6b6b', '#ee5a70'];

export const createHeartParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 25,
    startVelocity = 12,
    colors = heartColors,
    elementSize = 30,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-45, -135);
    const velocity = randomInRange(startVelocity * 0.7, startVelocity * 1.3);
    const horizontalDrift = randomInRange(-2, 2);

    return {
      id: generateId(),
      x: origin.x + randomInRange(-10, 10),
      y: origin.y,
      vx: Math.cos((angle * Math.PI) / 180) * velocity + horizontalDrift,
      vy: Math.sin((angle * Math.PI) / 180) * velocity,
      life: config.lifetime || 180,
      opacity: 1,
      size: randomInRange(elementSize * 0.6, elementSize * 1.2),
      rotation: randomInRange(-20, 20),
      color: getRandomColor(colors),
    };
  });
};

export const renderHeartParticle = (
  particle: Particle & { config?: AnimationConfig }
): React.ReactNode => {
  // Calculate pulse effect if enabled
  const pulse = particle.config?.effects?.pulse
    ? 1 + Math.sin(particle.life * 0.2) * 0.1
    : 1;

  return (
    <svg
      key={particle.id}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill={particle.color}
      style={{
        filter: `drop-shadow(0 0 ${particle.size * 0.15}px ${particle.color})`,
        transform: `scale(${pulse})`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};
