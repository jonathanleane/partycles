import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const pixelColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FF1493'];

export const createPixelParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 30,
    colors = pixelColors,
    elementSize = 20
  } = config;

  const particles: Particle[] = [];
  const gridSize = Math.floor(Math.sqrt(particleCount));
  const spacing = 30;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const targetX = origin.x + (i - gridSize / 2) * spacing;
      const targetY = origin.y + (j - gridSize / 2) * spacing;
      const angle = randomInRange(0, 360);
      const velocity = randomInRange(150, 300);
      
      particles.push({
        id: generateId(),
        x: targetX,
        y: targetY,
        vx: Math.cos(degreesToRadians(angle)) * velocity,
        vy: Math.sin(degreesToRadians(angle)) * velocity,
        life: config.lifetime || 150,
        opacity: 1,
        size: randomInRange(elementSize * 0.6, elementSize),
        // Store targetX offset in rotation (from -500 to 500, add 1000 to make positive)
        rotation: ((targetX - origin.x) + 500) + ((targetY - origin.y) + 500) * 1000,
        color: getRandomColor(colors),
      });
    }
  }
  
  return particles.slice(0, particleCount);
};

export const renderPixelParticle = (particle: Particle): React.ReactNode => {
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        backgroundColor: particle.color,
        boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
      }}
    />
  );
};