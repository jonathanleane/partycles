import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

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

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(-spread / 2, spread / 2) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);

    return {
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
    }
  });
};

export const renderCoinParticle = (
  particle: Particle & { config?: AnimationConfig }
): React.ReactNode => {
  const spinSpeed = particle.config?.effects?.spin3D ? 8 : 2; // Faster spin with 3D effect
  const currentRotation = particle.rotation + (120 - particle.life) * spinSpeed;

  // 3D effect: scale X based on rotation to simulate perspective
  const scaleX = particle.config?.effects?.spin3D
    ? Math.abs(Math.cos((currentRotation * Math.PI) / 180))
    : 1;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        background: `radial-gradient(ellipse at 30% 30%, ${particle.color}, #B8860B)`,
        borderRadius: '50%',
        transform: particle.config?.effects?.spin3D
          ? `rotateY(${currentRotation}deg) scaleX(${scaleX})`
          : `rotate(${currentRotation}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: `
          inset -2px -2px 4px rgba(0, 0, 0, 0.3),
          inset 2px 2px 4px rgba(255, 255, 255, 0.5),
          0 2px 4px rgba(0, 0, 0, 0.3)
        `,
        border: `1px solid ${particle.color}`,
        position: 'relative',
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Dollar sign - hide when flipped */}
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
          opacity: particle.config?.effects?.spin3D && scaleX < 0.3 ? 0 : 1,
          transition: 'opacity 0.1s',
        }}
      >
        $
      </div>
    </div>
  );
};
