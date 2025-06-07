import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const lightningColors = ['#FFFF00', '#FFFFFF', '#00FFFF', '#FF00FF'];

export const createLightningParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    spread = 360,
    startVelocity = 50,
    colors = lightningColors,
    elementSize = 30
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, spread) * (Math.PI / 180);
    const velocity = randomInRange(startVelocity * 0.7, startVelocity * 1.3);
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.sin(angle) * velocity,
      vy: -Math.abs(Math.cos(angle) * velocity * 0.5), // Mostly horizontal movement
      life: config.lifetime || 60, // Quick flashes
      opacity: 1,
      size: randomInRange(elementSize * 0.5, elementSize * 1.5),
      rotation: randomInRange(0, 360),
      color: colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#ffffff',
    });
  }

  return particles;
};

export const renderLightningParticle = (particle: Particle): React.ReactNode => {
  // Create zigzag pattern based on particle life
  const zigzagOffset = Math.sin(particle.life * 0.5) * 10;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 0.3}px`,
        position: 'relative',
        filter: `blur(0.5px) brightness(2)`,
        transform: `translateX(${zigzagOffset}px) rotate(${particle.rotation}deg)`,
      }}
    >
      {/* Lightning bolt shape using CSS */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: particle.color,
          clipPath: 'polygon(0% 0%, 60% 0%, 40% 45%, 100% 45%, 0% 100%, 40% 55%, 20% 55%, 35% 100%)',
          boxShadow: `
            0 0 10px ${particle.color},
            0 0 20px ${particle.color},
            0 0 30px ${particle.color}
          `,
        }}
      />
      {/* Electric glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${particle.color}88 0%, transparent 70%)`,
          animation: `electricPulse ${randomInRange(100, 200)}ms infinite`,
        }}
      />
    </div>
  );
};