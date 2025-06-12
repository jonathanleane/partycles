import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const galaxyColors = [
  '#FFFFFF',
  '#FFF9C4',
  '#BBDEFB',
  '#C5CAE9',
  '#D1C4E9',
  '#FFE082',
  '#FFCCBC',
];

export const createGalaxyParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 60,
    spread = 200,
    startVelocity = 15,
    colors = galaxyColors,
    elementSize = 8,
  } = config;

  return createPooledParticles(particleCount, (i) => {
    // Create spiral distribution
    const progress = i / particleCount;
    const spiralAngle = progress * Math.PI * 4; // 2 full rotations
    const radius = progress * spread;

    // Add some randomness to make it look natural
    const angleOffset = randomInRange(-0.3, 0.3);
    const radiusOffset = randomInRange(-10, 10);

    const finalAngle = spiralAngle + angleOffset;
    const finalRadius = radius + radiusOffset;

    // Position based on spiral
    const offsetX = Math.cos(finalAngle) * finalRadius;
    const offsetY = Math.sin(finalAngle) * finalRadius;

    // Velocity follows the spiral tangent
    const tangentAngle = finalAngle + Math.PI / 2;
    const speed = startVelocity * (1 - progress * 0.5); // Outer stars move slower

    return {
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(tangentAngle) * speed * 0.3 + offsetX * 0.02,
      vy: Math.sin(tangentAngle) * speed * 0.3 + offsetY * 0.02,
      life: config.lifetime || 250,
      opacity: 0,
      size:
        randomInRange(elementSize * 0.3, elementSize) * (1 - progress * 0.5), // Smaller at edges
      rotation: randomInRange(0, 360),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    }
  });
};

export const renderGalaxyParticle = (particle: Particle): React.ReactNode => {
  // Particles slowly rotate around center while expanding
  const age = (250 - particle.life) / 250;
  const expansionRate = 1 + age * 0.5;

  // Fade in quickly, fade out slowly
  const fadeIn = Math.min(1, (250 - particle.life) / 30);
  const fadeOut = particle.life / 250;
  const opacity = Math.min(fadeIn, fadeOut);

  // Twinkle effect
  const twinkle = Math.sin(particle.life * 0.2 + particle.rotation) * 0.3 + 0.7;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `scale(${expansionRate})`,
        opacity: opacity * twinkle,
      }}
    >
      {/* Star core */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: particle.color,
          borderRadius: '50%',
          boxShadow: `
            0 0 ${particle.size}px ${particle.color},
            0 0 ${particle.size * 2}px ${particle.color}88,
            0 0 ${particle.size * 3}px ${particle.color}44
          `,
          position: 'relative',
        }}
      >
        {/* Star spikes */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${particle.size * 3}px`,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${particle.color}, transparent)`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            opacity: twinkle,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: `${particle.size * 3}px`,
            background: `linear-gradient(180deg, transparent, ${particle.color}, transparent)`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            opacity: twinkle,
          }}
        />
      </div>

      {/* Nebula dust for larger stars */}
      {particle.size > 5 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${particle.size * 6}px`,
            height: `${particle.size * 6}px`,
            background: `radial-gradient(circle, ${particle.color}22 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: opacity * 0.3,
            filter: 'blur(3px)',
          }}
        />
      )}
    </div>
  );
};
