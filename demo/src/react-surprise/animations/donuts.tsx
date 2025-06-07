import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const defaultColors = ['#FFB6C1', '#FF69B4', '#FFD700', '#FF6347', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export const createDonutParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 15,
    startVelocity = 25,
    spread = 100,
    colors = defaultColors,
    elementSize = 30
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
      life: config.lifetime || 200,
      opacity: 1,
      size: randomInRange(elementSize * 0.6, elementSize * 1.4),
      rotation: randomInRange(0, 360),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderDonutParticle = (particle: Particle): React.ReactNode => {
  // Add spinning animation
  const spinSpeed = 8;
  const rotation = particle.rotation + (200 - particle.life) * spinSpeed;
  
  // Add bounce effect
  const bounceProgress = (200 - particle.life) / 200;
  const scale = 0.9 + Math.sin(bounceProgress * Math.PI * 2) * 0.1;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity: particle.opacity,
        userSelect: 'none',
        position: 'relative',
      }}
    >
      🍩
      {/* Add sprinkles effect */}
      {[0, 120, 240].map((angle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '8px',
            backgroundColor: particle.color,
            borderRadius: '40%',
            top: '50%',
            left: '50%',
            transform: `
              translate(-50%, -50%) 
              rotate(${angle + rotation}deg) 
              translateY(${particle.size * 0.3}px)
              scale(${scale})
            `,
            opacity: particle.opacity * 0.8,
          }}
        />
      ))}
    </div>
  );
};