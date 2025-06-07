import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE'];

export const createButterflyParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 6,
    startVelocity = 3,
    colors = defaultColors,
    elementSize = 40
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = randomInRange(0, 360);
    const velocity = randomInRange(startVelocity * 0.5, startVelocity);
    
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-50, 50),
      y: origin.y + randomInRange(-30, 30),
      vx: Math.cos(angle * Math.PI / 180) * velocity,
      vy: -Math.abs(Math.sin(angle * Math.PI / 180) * velocity * 0.5), // Float upward
      life: config.lifetime || 200,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      // Encode wing phase (0-360), wobble phase (0-360), and rotation speed (-10 to 10)
      rotation: Math.floor(randomInRange(0, 360)) + (Math.floor(randomInRange(0, 360)) * 1000) + ((Math.floor(randomInRange(-10, 10)) + 10) * 1000000),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderButterflyParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const wingPhase = (particle.rotation % 1000);
  const wobblePhase = Math.floor((particle.rotation % 1000000) / 1000);
  const rotationSpeed = (Math.floor(particle.rotation / 1000000) - 10) / 10;
  
  // Calculate wing flapping and wobble
  const wingAngle = Math.sin((Date.now() * 0.01 + wingPhase) * Math.PI / 180) * 30;
  const wobbleX = Math.sin((Date.now() * 0.003 + wobblePhase) * Math.PI / 180) * 10;
  const rotation = (Date.now() * rotationSpeed * 0.01) % 360;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `translateX(${wobbleX}px) rotate(${rotation}deg)`,
      }}
    >
      <svg
        width={particle.size}
        height={particle.size}
        viewBox="-25 -25 50 50"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Left wing */}
        <ellipse
          cx="-8"
          cy="0"
          rx="12"
          ry="18"
          fill={particle.color}
          opacity="0.8"
          transform={`rotate(${-wingAngle} 0 0)`}
        />
        <ellipse
          cx="-6"
          cy="-10"
          rx="8"
          ry="12"
          fill={particle.color}
          opacity="0.6"
          transform={`rotate(${-wingAngle - 15} 0 0)`}
        />
        
        {/* Right wing */}
        <ellipse
          cx="8"
          cy="0"
          rx="12"
          ry="18"
          fill={particle.color}
          opacity="0.8"
          transform={`rotate(${wingAngle} 0 0)`}
        />
        <ellipse
          cx="6"
          cy="-10"
          rx="8"
          ry="12"
          fill={particle.color}
          opacity="0.6"
          transform={`rotate(${wingAngle + 15} 0 0)`}
        />
        
        {/* Body */}
        <ellipse
          cx="0"
          cy="0"
          rx="3"
          ry="15"
          fill="#333"
        />
        
        {/* Antennae */}
        <line
          x1="0"
          y1="-12"
          x2="-3"
          y2="-18"
          stroke="#333"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="-12"
          x2="3"
          y2="-18"
          stroke="#333"
          strokeWidth="1"
        />
        
        {/* Wing patterns */}
        <circle cx="-8" cy="0" r="3" fill="white" opacity="0.4" />
        <circle cx="8" cy="0" r="3" fill="white" opacity="0.4" />
        <circle cx="-6" cy="-8" r="2" fill="black" opacity="0.3" />
        <circle cx="6" cy="-8" r="2" fill="black" opacity="0.3" />
      </svg>
    </div>
  );
};