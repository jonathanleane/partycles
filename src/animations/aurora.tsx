import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';
import { createPooledParticles } from '../particlePool';

const auroraColors = [
  '#00ff88',
  '#00ffaa',
  '#00ddff',
  '#0099ff',
  '#0066ff',
  '#9933ff',
  '#ff00ff',
];

export const createAuroraParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    spread = 300,
    startVelocity = 0.8,
    colors = auroraColors,
    elementSize = 100,
  } = config;

  return createPooledParticles(particleCount, (i) => {
    const angle = (i / particleCount) * spread - spread / 2;
    const offset = randomInRange(-30, 30);

    return {
      id: generateId(),
      x: origin.x + angle + offset,
      y: origin.y,
      vx: randomInRange(-0.5, 0.5),
      vy: -startVelocity,
      life: config.lifetime || 250,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(-15, 15),
      color:
        colors[Math.floor(Math.random() * colors.length)] ||
        colors[0] ||
        '#ffffff',
    };
  });
};

export const renderAuroraParticle = (particle: Particle): React.ReactNode => {
  // Create gentle flowing wave motion - reduced amplitude
  const wave = Math.sin(particle.life * 0.02) * 10;
  // Use the actual particle opacity set by animationManager
  const baseOpacity = particle.opacity;
  // Add fade in/out effect
  const fadeIn = particle.life > 350 ? (400 - particle.life) / 50 : 1;
  const fadeOut = particle.life < 50 ? particle.life / 50 : 1;
  const opacity = baseOpacity * fadeIn * fadeOut * 0.4;

  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 0.3}px`,
        position: 'relative',
        transform: `translateX(${wave}px)`,
        filter: 'blur(2px)',
      }}
    >
      {/* Aurora ribbon */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${particle.color}, transparent)`,
          borderRadius: '50%',
          opacity,
          boxShadow: `0 0 ${particle.size * 0.5}px ${particle.color}`,
          animation: 'shimmer 2s infinite',
        }}
      />
      {/* Secondary layer for depth */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '80%',
          height: '60%',
          background: `radial-gradient(ellipse at center, ${particle.color}44, transparent)`,
          borderRadius: '50%',
          opacity: opacity * 0.5,
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
};
