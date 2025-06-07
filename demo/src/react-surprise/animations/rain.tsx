import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

const defaultColors = ['#4A90E2', '#5BA0F2', '#6BB0FF', '#3A80D2'];

export const createRainParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 50,
    colors = defaultColors,
    elementSize = 300
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: generateId(),
      x: randomInRange(origin.x - elementSize/2, origin.x + elementSize/2),
      y: origin.y - randomInRange(0, elementSize),
      vx: randomInRange(-0.5, 0.5),
      vy: randomInRange(8, 12),
      life: config.lifetime || 150,
      opacity: randomInRange(0.3, 0.7),
      size: randomInRange(2, 4),
      // Encode: length (15-25) + splashing state (0 or 1) * 100 + splash frame (0-15) * 1000
      rotation: Math.floor(randomInRange(15, 25)),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderRainParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const length = particle.rotation % 100;
  const isSplashing = Math.floor((particle.rotation % 1000) / 100) === 1;
  const splashFrame = Math.floor(particle.rotation / 1000);
  
  // Render splash effect
  if (isSplashing && splashFrame < 15) {
    const splashRadius = splashFrame * 2;
    const splashOpacity = Math.max(0, 1 - splashFrame / 15) * 0.5;
    
    return (
      <div key={particle.id} style={{ position: 'relative' }}>
        <svg
          width={splashRadius * 4}
          height={splashRadius * 2}
          style={{
            position: 'absolute',
            left: -splashRadius * 2,
            top: -splashRadius,
          }}
        >
          {/* Splash ripples */}
          <ellipse
            cx={splashRadius * 2}
            cy={splashRadius}
            rx={splashRadius}
            ry={splashRadius / 3}
            fill="none"
            stroke={particle.color}
            strokeWidth="1"
            opacity={splashOpacity}
          />
          
          {/* Splash droplets */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * 90 + 45) * Math.PI / 180;
            const distance = splashFrame * 1.5;
            const dropX = splashRadius * 2 + Math.cos(angle) * distance;
            const dropY = splashRadius - Math.sin(angle) * distance + splashFrame * 0.5;
            
            return (
              <circle
                key={i}
                cx={dropX}
                cy={dropY}
                r="1.5"
                fill={particle.color}
                opacity={splashOpacity}
              />
            );
          })}
        </svg>
      </div>
    );
  }
  
  // Render falling raindrop
  return (
    <div key={particle.id} style={{ position: 'relative' }}>
      <svg
        width={particle.size * 2}
        height={length + particle.size * 3}
        style={{
          position: 'absolute',
          left: -particle.size,
          top: -length,
        }}
      >
        {/* Raindrop trail */}
        <line
          x1={particle.size}
          y1={0}
          x2={particle.size}
          y2={length}
          stroke={particle.color}
          strokeWidth={particle.size}
          strokeLinecap="round"
          opacity={particle.opacity * 0.3}
        />
        
        {/* Raindrop head */}
        <ellipse
          cx={particle.size}
          cy={length + particle.size * 1.5}
          rx={particle.size}
          ry={particle.size * 1.5}
          fill={particle.color}
          opacity={particle.opacity}
        />
      </svg>
    </div>
  );
};