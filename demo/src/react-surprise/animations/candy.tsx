import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF6347', '#FFA500', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD'];
const candyEmojis = ['🍬', '🍭', '🍮', '🍯'];

export const createCandyParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 20,
    startVelocity = 20,
    spread = 80,
    colors = defaultColors,
    elementSize = 25
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(-30, 30); // Mostly falling down
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    
    particles.push({
      id: generateId(),
      x: origin.x,
      y: origin.y - 50, // Start above origin
      vx: Math.sin(angle * Math.PI / 180) * velocity * 0.5,
      vy: randomInRange(3, 6), // Fall down
      life: config.lifetime || 180,
      opacity: 1,
      size: randomInRange(elementSize * 0.7, elementSize * 1.3),
      // Encode candy type (0-3) + initial rotation * 10
      rotation: Math.floor(Math.random() * candyEmojis.length) + (Math.floor(randomInRange(0, 360)) * 10),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderCandyParticle = (particle: Particle): React.ReactNode => {
  const candyIndex = particle.rotation % 10;
  const initialRotation = Math.floor(particle.rotation / 10);
  const candy = candyEmojis[candyIndex] || candyEmojis[0];
  
  // Add tumbling rotation
  const tumbleSpeed = 5;
  const rotation = initialRotation + (180 - particle.life) * tumbleSpeed;
  
  // Add sway effect
  const swayAmount = Math.sin((180 - particle.life) * 0.05) * 20;
  
  return (
    <div
      key={particle.id}
      style={{
        fontSize: `${particle.size}px`,
        transform: `translateX(${swayAmount}px) rotate(${rotation}deg)`,
        opacity: particle.opacity,
        userSelect: 'none',
      }}
    >
      {candy}
    </div>
  );
};