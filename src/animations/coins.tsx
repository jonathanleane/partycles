import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const coinColors = ['#FFD700', '#FFA500', '#FFB300', '#FFC700'];

export const createCoinParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 30,
    spread = 70,
    startVelocity = 25,
    colors = coinColors,
    elementSize = 25,
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);

    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.sin(angle) * velocity,
      vy: -Math.cos(angle) * velocity,
      life: config.lifetime || 120,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    });
  }

  return particles;
};

export const renderCoinParticle = (particle: Particle): React.ReactNode => {
  const spinSpeed = 8; // Degrees per frame
  const currentRotation = particle.rotation + (120 - particle.life) * spinSpeed;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: `radial-gradient(ellipse at 30% 30%, ${particle.color}, #B8860B)`,
        borderRadius: '50%',
        transform: `rotateY(${currentRotation}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: `
          inset -2px -2px 4px rgba(0, 0, 0, 0.3),
          inset 2px 2px 4px rgba(255, 255, 255, 0.5),
          0 2px 4px rgba(0, 0, 0, 0.3)
        `,
        border: `1px solid ${particle.color}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dollar sign */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: `${particle.size * 0.5}px`,
          fontWeight: 'bold',
          color: '#B8860B',
          textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        $
      </div>
    </div>
  );
};
