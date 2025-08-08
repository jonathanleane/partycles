import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const emberColors = ['#ffcf6b', '#ffa24a', '#ff7b3d', '#ff5e3a', '#ffd8a8'];

export const createEmberParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 60,
    startVelocity = 2.5,
    colors = emberColors,
    elementSize = 3,
  } = config;

  return createPooledParticles(particleCount, () => {
    const vx = randomInRange(-0.8, 0.8);
    const vy = randomInRange(-startVelocity * 1.2, -startVelocity * 0.6); // upward

    return {
      id: generateId(),
      x: origin.x + randomInRange(-15, 15),
      y: origin.y + randomInRange(-10, 10),
      vx,
      vy,
      life: config.lifetime || 120,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.6),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(Math.random() * colors.length)],
      config,
    };
  });
};

export const renderEmberParticle = (particle: Particle): React.ReactNode => {
  const p = particle as Particle & { config?: AnimationConfig };
  const twinkle = p.config?.effects?.twinkle;
  const flickerOpacity = twinkle ? 0.6 + Math.sin(p.life * 0.3) * 0.4 : 1;

  return (
    <div
      key={particle.id}
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, ${particle.color}, rgba(0,0,0,0))`,
        borderRadius: '50%',
        opacity: particle.opacity * flickerOpacity,
        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        filter: 'blur(0.3px)'
      }}
    />
  );
}; 