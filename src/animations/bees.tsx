import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FFD700', '#FFA500'];

export const createBeeParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 5,
    colors = defaultColors,
    elementSize = 18
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-50, 50),
      y: origin.y + randomInRange(-50, 50),
      vx: randomInRange(2, 4),
      vy: randomInRange(-1, 1),
      life: config.lifetime || 300,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.1),
      // Encode: zigzag phase (0-360) + wing phase (0-360) * 1000 + buzz phase (0-360) * 1000000
      rotation: Math.floor(randomInRange(0, 360)) + 
                (Math.floor(randomInRange(0, 360)) * 1000) +
                (Math.floor(randomInRange(0, 360)) * 1000000),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderBeeParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const zigzagPhase = particle.rotation % 1000;
  const wingPhase = Math.floor((particle.rotation % 1000000) / 1000);
  const buzzPhase = Math.floor(particle.rotation / 1000000);
  
  // Calculate animations
  const zigzagY = Math.sin((Date.now() * 0.005 + zigzagPhase) * Math.PI / 180) * 15;
  const wingAngle = Math.sin((Date.now() * 0.02 + wingPhase) * Math.PI / 180) * 20;
  const buzzOffset = Math.sin((Date.now() * 0.015 + buzzPhase) * Math.PI / 180) * 2;
  
  // Calculate rotation based on movement direction
  const movementAngle = Math.atan2(particle.vy, particle.vx) * 180 / Math.PI;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size * 2}px`,
        height: `${particle.size * 2}px`,
        position: 'relative',
        transform: `translate(${buzzOffset}px, ${zigzagY}px) rotate(${movementAngle}deg)`,
      }}
    >
      <svg
        width={particle.size * 2}
        height={particle.size * 2}
        viewBox="-15 -10 30 20"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Left wing */}
        <ellipse
          cx="-2"
          cy="-3"
          rx="8"
          ry="4"
          fill="#E5E5E5"
          opacity="0.7"
          transform={`rotate(${-wingAngle - 20} -2 -3)`}
        />
        
        {/* Right wing */}
        <ellipse
          cx="-2"
          cy="3"
          rx="8"
          ry="4"
          fill="#E5E5E5"
          opacity="0.7"
          transform={`rotate(${wingAngle + 20} -2 3)`}
        />
        
        {/* Body segments */}
        <ellipse
          cx="0"
          cy="0"
          rx="8"
          ry="6"
          fill={particle.color}
        />
        <ellipse
          cx="-6"
          cy="0"
          rx="6"
          ry="5"
          fill="#333"
        />
        
        {/* Stripes */}
        <rect
          x="-3"
          y="-6"
          width="2"
          height="12"
          fill="#333"
        />
        <rect
          x="1"
          y="-6"
          width="2"
          height="12"
          fill="#333"
        />
        <rect
          x="5"
          y="-5"
          width="2"
          height="10"
          fill="#333"
        />
        
        {/* Head */}
        <circle
          cx="8"
          cy="0"
          r="4"
          fill="#333"
        />
        
        {/* Eyes */}
        <circle
          cx="9"
          cy="-1.5"
          r="1"
          fill="#FFF"
        />
        <circle
          cx="9"
          cy="1.5"
          r="1"
          fill="#FFF"
        />
        
        {/* Antennae */}
        <line
          x1="10"
          y1="-2"
          x2="12"
          y2="-4"
          stroke="#333"
          strokeWidth="0.5"
        />
        <line
          x1="10"
          y1="2"
          x2="12"
          y2="4"
          stroke="#333"
          strokeWidth="0.5"
        />
        
        {/* Stinger */}
        <polygon
          points="-10,0 -12,1 -12,-1"
          fill="#333"
        />
      </svg>
    </div>
  );
};