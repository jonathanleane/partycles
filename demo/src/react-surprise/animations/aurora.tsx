import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const auroraColors = ['#00ff88', '#00ffaa', '#00ddff', '#0099ff', '#0066ff', '#9933ff', '#ff00ff'];

export const createAuroraParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 15,
    spread = 200,
    startVelocity = 3,
    colors = auroraColors,
    elementSize = 100
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * spread - spread / 2;
    const offset = randomInRange(-30, 30);
    
    particles.push({
      id: generateId(),
      x: origin.x + angle + offset,
      y: origin.y,
      vx: randomInRange(-1, 1),
      vy: -startVelocity,
      life: config.lifetime || 250,
      opacity: 0,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(-15, 15),
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0],
    });
  }

  return particles;
};

export const renderAuroraParticle = (particle: Particle): React.ReactNode => {
  // Create flowing wave motion
  const wave = Math.sin(particle.life * 0.05) * 20;
  const fadeIn = Math.min(1, (250 - particle.life) / 50);
  const fadeOut = particle.life / 250;
  const opacity = Math.min(fadeIn, fadeOut) * 0.4;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 0.3}px`,
        position: 'relative',
        transform: `translateX(${wave}px) rotate(${particle.rotation}deg)`,
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