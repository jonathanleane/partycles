import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const defaultColors = ['#FFE5B4', '#FFF8DC', '#FFFACD', '#FFF5EE'];

export const createPopcornParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    startVelocity = 25,
    colors = defaultColors,
    elementSize = 20
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 10, // Initial upward boost
      life: config.lifetime || 150,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderPopcornParticle = (particle: Particle): React.ReactNode => {
  // Add some rotation animation
  const rotation = particle.rotation + (150 - particle.life) * 3;
  
  // Add bounce effect
  const bounceProgress = (150 - particle.life) / 150;
  const scale = 0.5 + Math.sin(bounceProgress * Math.PI) * 0.5;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity: particle.opacity,
        userSelect: 'none',
      }}
    >
      🍿
    </div>
  );
};