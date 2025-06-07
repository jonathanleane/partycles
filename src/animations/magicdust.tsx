import React from 'react';
import { AnimationConfig, Particle } from '../types';
import {
  randomInRange,
  degreesToRadians,
  generateId,
  getRandomColor,
} from '../utils';

const defaultColors = [
  '#9C27B0',
  '#E91E63',
  '#FF00FF',
  '#00FFFF',
  '#FFD700',
  '#FF69B4',
  '#DA70D6',
  '#9370DB',
];

export const createMagicDustParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 40,
    startVelocity = 8,
    colors = defaultColors,
    elementSize = 12,
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Create particles in a circular pattern with some randomness
    const angle = (i / particleCount) * 360 + randomInRange(-30, 30);
    const velocity = randomInRange(startVelocity * 0.3, startVelocity);
    const color = getRandomColor(colors);

    // Add some particles that trail behind cursor movement
    const offsetAngle = randomInRange(0, 360);
    const offsetDistance = randomInRange(0, 30);

    particles.push({
      id: generateId(),
      x: origin.x + Math.cos(degreesToRadians(offsetAngle)) * offsetDistance,
      y: origin.y + Math.sin(degreesToRadians(offsetAngle)) * offsetDistance,
      vx: Math.cos(degreesToRadians(angle)) * velocity + randomInRange(-2, 2),
      vy: Math.sin(degreesToRadians(angle)) * velocity + randomInRange(-2, 2),
      life: config.lifetime || 120,
      opacity: randomInRange(0.4, 1),
      size: randomInRange(elementSize * 0.3, elementSize),
      rotation: randomInRange(0, 360),
      color,
    });
  }

  return particles;
};

export const renderMagicDustParticle = (
  particle: Particle
): React.ReactNode => {
  const sparkleSize = particle.size * 0.7;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
      }}
    >
      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: particle.color,
          borderRadius: '50%',
          boxShadow: `0 0 ${particle.size}px ${particle.color}, 0 0 ${particle.size * 2}px ${particle.color}`,
          filter: 'blur(1px)',
        }}
      />
      {/* Sparkle effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${sparkleSize}px`,
          height: `${sparkleSize}px`,
          transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            boxShadow: '0 0 4px white',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '2px',
            height: '100%',
            backgroundColor: 'white',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 4px white',
          }}
        />
      </div>
    </div>
  );
};
