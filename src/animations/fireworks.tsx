import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';
import { createPooledParticles } from '../particlePool';

const fireworkColors = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ffffff',
];

export const createFireworkParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 60,
    startVelocity = 25,
    colors = fireworkColors,
    elementSize = 8,
  } = config;

  return createPooledParticles(particleCount, (i) => {
    const angle = (360 / particleCount) * i + randomInRange(-5, 5);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity * 1.2);
    const color = getRandomColor(colors);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 10,
      life: config.lifetime || 140,
      opacity: 1,
      size: randomInRange(elementSize * 0.6, elementSize * 1.4),
      rotation: 0,
      color,
    };
  });
};

export const renderFireworkParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        boxShadow: `
          0 0 ${particle.size}px ${particle.color},
          0 0 ${particle.size * 2}px ${particle.color},
          0 0 ${particle.size * 3}px ${particle.color},
          0 0 ${particle.size * 4}px ${particle.color}
        `,
        background: `radial-gradient(circle, #ffffff 0%, ${particle.color} 40%, transparent 70%)`,
      }}
    />
  );
};
