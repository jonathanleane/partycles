import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId } from '../utils';

const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';

export const createMatrixParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 50,
    elementSize = 300
  } = config;

  const particles: Particle[] = [];
  const columns = Math.floor(elementSize / 20);
  
  for (let i = 0; i < columns; i++) {
    const columnX = origin.x - elementSize / 2 + (i / columns) * elementSize;
    const columnParticles = Math.floor(Math.random() * 15) + 10;
    
    for (let j = 0; j < columnParticles; j++) {
      const charIndex = Math.floor(Math.random() * matrixChars.length);
      const speed = randomInRange(80, 120);
      
      particles.push({
        id: generateId(),
        x: columnX + randomInRange(-10, 10),
        y: origin.y - elementSize / 2 - j * 25 - randomInRange(0, 100),
        vx: columnParticles, // Store columnHeight in vx (since we don't use horizontal movement)
        vy: speed,
        life: config.lifetime || 150,
        opacity: 1,
        size: 20 + (j * 0.1), // Store fadeDelay as decimal part
        rotation: charIndex + (columnParticles * 1000), // Store charIndex and columnHeight
        color: '#00ff00',
      });
    }
  }
  
  return particles.slice(0, particleCount);
};

export const renderMatrixParticle = (particle: Particle): React.ReactNode => {
  // Extract stored values
  const charIndex = Math.floor(particle.rotation % 1000);
  const columnHeight = Math.floor(particle.rotation / 1000);
  const fadeDelay = (particle.size - Math.floor(particle.size));
  const character = matrixChars[charIndex] || matrixChars[0];
  
  const brightness = 1 - (fadeDelay / columnHeight) * 0.5;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: '20px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: `rgba(${0}, ${255 * brightness}, ${0}, ${particle.opacity})`,
        textShadow: `0 0 10px rgba(0, ${255 * brightness}, 0, ${particle.opacity * 0.8})`,
        userSelect: 'none',
      }}
    >
      {character}
    </div>
  );
};