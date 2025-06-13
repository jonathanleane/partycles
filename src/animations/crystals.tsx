import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';
import { createPooledParticles } from '../particlePool';

const defaultColors = [
  '#FF1493',
  '#00CED1',
  '#FFD700',
  '#FF69B4',
  '#7B68EE',
  '#00FA9A',
  '#FF6347',
  '#4169E1',
];

export const createCrystalParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 15,
    startVelocity = 15,
    colors = defaultColors,
    elementSize = 25,
  } = config;

  return createPooledParticles(particleCount, () => {
    // Crystals explode outward and fall with gravity
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const color = getRandomColor(colors);

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 10,
      life: config.lifetime || 150,
      opacity: randomInRange(0.7, 1),
      size: randomInRange(elementSize * 0.6, elementSize),
      rotation: randomInRange(0, 360),
      color,
    }
  });
};

export const renderCrystalParticle = (particle: Particle): React.ReactNode => {
  // Create rainbow refraction effect
  const hue = (Date.now() * 0.5 + particle.x + particle.y) % 360;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 1.5}px`,
        position: 'relative',
        transform: `rotate(${particle.rotation}deg)`,
      }}
    >
      {/* Crystal shape with gradient */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${particle.color}, ${particle.color}88, transparent)`,
          clipPath: 'polygon(50% 0%, 100% 40%, 75% 100%, 25% 100%, 0% 40%)',
          boxShadow: `0 0 ${particle.size}px ${particle.color}44`,
        }}
      />

      {/* Inner facets */}
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          top: '10%',
          left: '10%',
          background: `linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
          clipPath: 'polygon(50% 10%, 90% 45%, 65% 90%, 35% 90%, 10% 45%)',
        }}
      />

      {/* Rainbow refraction overlay */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(${hue}deg, 
            hsla(${hue}, 100%, 50%, 0.3),
            hsla(${(hue + 60) % 360}, 100%, 50%, 0.3),
            hsla(${(hue + 120) % 360}, 100%, 50%, 0.3)
          )`,
          clipPath: 'polygon(50% 0%, 100% 40%, 75% 100%, 25% 100%, 0% 40%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Shine effect */}
      <div
        style={{
          position: 'absolute',
          width: '30%',
          height: '30%',
          top: '20%',
          left: '35%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)',
          borderRadius: '50%',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};
