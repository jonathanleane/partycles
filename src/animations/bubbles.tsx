import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const bubbleColors = [
  'rgba(66, 165, 245, 0.4)',
  'rgba(41, 182, 246, 0.4)',
  'rgba(38, 198, 218, 0.4)',
  'rgba(129, 212, 250, 0.4)',
];

export const createBubbleParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 30,
    spread = 80,
    startVelocity = 8,
    colors = bubbleColors,
    elementSize = 40,
  } = config;

  return createPooledParticles(particleCount, () => {
    return {
      id: generateId(),
      x: origin.x + randomInRange(-spread, spread),
      y: origin.y,
      vx: randomInRange(-3, 3),
      vy: -randomInRange(startVelocity * 0.7, startVelocity * 1.2),
      life: config.lifetime || 160,
      opacity: 0.7,
      size: randomInRange(elementSize * 0.4, elementSize * 1.2),
      rotation: 0,
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    };
  });
};

export const renderBubbleParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: particle.color,
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        backgroundImage:
          'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent)',
        boxShadow: `
          inset 0 0 ${particle.size * 0.3}px rgba(255, 255, 255, 0.4),
          0 0 ${particle.size * 0.5}px ${particle.color}
        `,
      }}
    />
  );
};
