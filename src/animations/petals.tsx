import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const petalColors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFF0F5'];

export const createPetalParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 40,
    spread = 100,
    startVelocity = 8,
    colors = petalColors,
    elementSize = 20,
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.3, startVelocity);

    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-20, 20),
      y: origin.y - randomInRange(0, 30),
      vx: Math.sin(angle) * velocity,
      vy: randomInRange(2, 5), // Gentle fall
      life: config.lifetime || 200,
      opacity: randomInRange(0.7, 1),
      size: randomInRange(elementSize * 0.7, elementSize * 1.3),
      rotation: randomInRange(0, 360),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    });
  }

  return particles;
};

export const renderPetalParticle = (particle: Particle): React.ReactNode => {
  // Create spiral motion
  const spiralPhase = (200 - particle.life) * 0.1;
  const spiralX = Math.sin(spiralPhase) * 15;
  const wobble = Math.sin(particle.life * 0.1) * 10;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 1.2}px`,
        position: 'relative',
        transform: `translateX(${spiralX}px) rotate(${particle.rotation + wobble}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Petal shape */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 30%, ${particle.color}, ${particle.color}DD)`,
          borderRadius: '0% 100% 0% 100%',
          position: 'absolute',
          boxShadow: `
            inset 1px 1px 3px rgba(255, 255, 255, 0.5),
            0 2px 4px rgba(0, 0, 0, 0.1)
          `,
          border: `1px solid ${particle.color}CC`,
          transform: 'rotateY(45deg)',
        }}
      />
      {/* Second petal for depth */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 30%, ${particle.color}EE, ${particle.color}BB)`,
          borderRadius: '0% 100% 0% 100%',
          position: 'absolute',
          transform: 'rotate(45deg) scale(0.9)',
          opacity: 0.8,
        }}
      />
    </div>
  );
};
