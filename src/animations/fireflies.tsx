import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const fireflyColors = ['#FFFF99', '#FFFFCC', '#FFFF66', '#FFFFAA'];

export const createFireflyParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    spread = 150,
    startVelocity = 2,
    colors = fireflyColors,
    elementSize = 8,
  } = config;

  return createPooledParticles(particleCount, () => {
    const angle = randomInRange(0, 360) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.3, startVelocity);

    return {
      id: generateId(),
      x: origin.x + randomInRange(-spread / 2, spread / 2),
      y: origin.y + randomInRange(-20, 20),
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity * 0.5, // More horizontal movement
      life: config.lifetime || 300,
      opacity: 0,
      size: randomInRange(elementSize * 0.6, elementSize),
      rotation: randomInRange(0, 360), // Used for blink timing
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    }
  });
};

export const renderFireflyParticle = (particle: Particle): React.ReactNode => {
  // Create organic floating motion
  const floatX = Math.sin(particle.life * 0.02 + particle.rotation) * 15;
  const floatY = Math.cos(particle.life * 0.03 + particle.rotation) * 10;

  // Blinking effect - each firefly has its own rhythm based on rotation
  const blinkCycle = Math.sin(particle.life * 0.1 + particle.rotation * 0.1);
  const isBlinking = blinkCycle > 0.3;
  const glowIntensity = isBlinking ? 1 : 0.1;

  // Fade in/out
  const fadeIn = Math.min(1, (300 - particle.life) / 30);
  const fadeOut = particle.life / 300;
  const baseFade = Math.min(fadeIn, fadeOut);

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `translate(${floatX}px, ${floatY}px)`,
      }}
    >
      {/* Firefly body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: particle.color,
          borderRadius: '50%',
          opacity: baseFade * glowIntensity,
          boxShadow: `
            0 0 ${particle.size}px ${particle.color},
            0 0 ${particle.size * 2}px ${particle.color},
            0 0 ${particle.size * 3}px ${particle.color}88
          `,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Glow aura */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${particle.size * 4}px`,
          height: `${particle.size * 4}px`,
          background: `radial-gradient(circle, ${particle.color}44 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: baseFade * glowIntensity * 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};
