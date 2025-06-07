import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

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

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-45, -135);
    const velocity = randomInRange(startVelocity * 0.7, startVelocity * 1.3);
    const horizontalDrift = randomInRange(-2, 2);

    particles.push({
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
    });
  }

  return particles;
};

export const renderHeartParticle = (particle: Particle): React.ReactNode => {
  return (
    <svg
      key={particle.id}
      width={particle.size}
      height={particle.size}
      viewBox="0 0 24 24"
      fill={particle.color}
      style={{
        filter: `drop-shadow(0 0 ${particle.size * 0.15}px ${particle.color})`,
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};
