import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const snowColors = ['#FFFFFF', '#F0F8FF', '#F5F5F5', '#FAFAFA'];

export const createSnowParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 50,
    spread = 200,
    startVelocity = 3,
    colors = snowColors,
    elementSize = 15,
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Spread particles across the width, starting from above viewport
    const x = origin.x + randomInRange(-spread * 2, spread * 2);
    const y = origin.y - randomInRange(100, 300); // Start above the trigger point

    particles.push({
      id: generateId(),
      x,
      y,
      vx: randomInRange(-0.5, 0.5), // Gentle horizontal drift
      vy: randomInRange(startVelocity * 0.5, startVelocity * 1.2),
      life: config.lifetime || 300, // Longer lifetime for snow
      opacity: randomInRange(0.4, 0.9),
      size: randomInRange(elementSize * 0.3, elementSize),
      rotation: randomInRange(0, 360),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    });
  }

  return particles;
};

export const renderSnowParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: particle.color,
        borderRadius: '50%',
        boxShadow: `
          0 0 ${particle.size * 0.5}px rgba(255, 255, 255, 0.8),
          inset 0 0 ${particle.size * 0.3}px rgba(255, 255, 255, 0.5)
        `,
        filter: 'blur(0.5px)',
      }}
    />
  );
};
