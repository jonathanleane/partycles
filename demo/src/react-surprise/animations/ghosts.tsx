import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, degreesToRadians, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FFFFFF', '#F0F0F0', '#E8E8E8', '#F5F5F5', '#FAFAFA'];

export const createGhostParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 8,
    startVelocity = 5,
    colors = defaultColors,
    elementSize = 30
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Ghosts float upward with slight horizontal movement
    const angle = randomInRange(250, 290); // Mostly upward
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    const color = getRandomColor(colors);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-50, 50),
      y: origin.y + randomInRange(-20, 20),
      vx: Math.cos(degreesToRadians(angle)) * velocity,
      vy: Math.sin(degreesToRadians(angle)) * velocity,
      life: config.lifetime || 200,
      opacity: randomInRange(0.5, 0.8),
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      rotation: randomInRange(-15, 15),
      color,
    });
  }

  return particles;
};

export const renderGhostParticle = (particle: Particle): React.ReactNode => {
  // Calculate wave effect for tail
  const waveOffset = Math.sin(Date.now() * 0.003 + particle.x * 0.01) * 3;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size * 1.4}px`,
        position: 'relative',
        transform: `rotate(${particle.rotation}deg)`,
      }}
    >
      {/* Ghost body */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '70%',
          backgroundColor: particle.color,
          borderRadius: '50% 50% 0 0',
          boxShadow: `0 0 20px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.1)`,
        }}
      />
      
      {/* Ghost tail with wavy effect */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '40%',
          backgroundColor: particle.color,
          clipPath: `polygon(
            0 0,
            100% 0,
            100% 60%,
            ${75 + waveOffset}% 80%,
            ${50 - waveOffset}% 100%,
            ${25 + waveOffset}% 80%,
            0 60%
          )`,
        }}
      />
      
      {/* Eyes */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '15%',
          height: '15%',
          backgroundColor: '#000',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '15%',
          height: '15%',
          backgroundColor: '#000',
          borderRadius: '50%',
        }}
      />
      
      {/* Mouth */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '25%',
          height: '15%',
          border: '2px solid #000',
          borderTop: 'none',
          borderRadius: '0 0 50% 50%',
        }}
      />
    </div>
  );
};