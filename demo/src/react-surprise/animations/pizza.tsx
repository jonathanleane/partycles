import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor, degreesToRadians } from '../utils';

const defaultColors = ['#FF6347', '#FFD700', '#98D8C8', '#FF8C00', '#DC143C'];

export const createPizzaParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 12,
    startVelocity = 30,
    spread = 90,
    colors = defaultColors,
    elementSize = 35
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
      vy: Math.sin(degreesToRadians(angle)) * velocity - 15, // Initial upward boost
      life: config.lifetime || 180,
      opacity: 1,
      size: randomInRange(elementSize * 0.5, elementSize * 1.2),
      rotation: randomInRange(0, 360),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderPizzaParticle = (particle: Particle): React.ReactNode => {
  // Add spinning and flipping animation
  const spinSpeed = 10;
  const rotation = particle.rotation + (180 - particle.life) * spinSpeed;
  const flipAngle = (180 - particle.life) * 2;
  
  // Add wobble effect
  const wobble = Math.sin((180 - particle.life) * 0.1) * 10;
  
  // Scale animation
  const progress = (180 - particle.life) / 180;
  const scale = 0.8 + Math.sin(progress * Math.PI) * 0.2;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        transform: `
          translateX(${wobble}px) 
          rotate(${rotation}deg) 
          rotateX(${flipAngle}deg)
          scale(${scale})
        `,
        transformStyle: 'preserve-3d',
        opacity: particle.opacity,
        userSelect: 'none',
        position: 'relative',
      }}
    >
      🍕
      {/* Add topping effects */}
      {Math.random() > 0.5 && (
        <div
          style={{
            position: 'absolute',
            fontSize: `${particle.size * 0.4}px`,
            top: `${10 + Math.random() * 30}%`,
            left: `${10 + Math.random() * 30}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: particle.opacity * 0.8,
          }}
        >
          {['🍅', '🧀', '🌶️'][Math.floor(Math.random() * 3)]}
        </div>
      )}
    </div>
  );
};