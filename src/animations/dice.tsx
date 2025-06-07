import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, degreesToRadians } from '../utils';

const getDiceFace = (value: number): string => {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return faces[value - 1] || '⚀';
};

export const createDiceParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 8,
    startVelocity = 25,
    elementSize = 40
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const diceValue = Math.floor(randomInRange(1, 7));
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y,
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity - 30,
      life: config.lifetime || 150,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      // Store dice value (1-6) in lower bits, and rotation angles in upper bits
      rotation: diceValue + (Math.floor(randomInRange(0, 360)) * 10),
      color: '#ffffff',
    });
  }
  
  return particles;
};

export const renderDiceParticle = (particle: Particle): React.ReactNode => {
  const diceValue = particle.rotation % 10;
  const rotationAngle = Math.floor(particle.rotation / 10);
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        fontSize: `${particle.size * 0.8}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: `${particle.size * 0.2}px`,
        transform: `rotate(${rotationAngle}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
        border: '2px solid #333',
        fontWeight: 'bold',
      }}
    >
      {getDiceFace(diceValue)}
    </div>
  );
};