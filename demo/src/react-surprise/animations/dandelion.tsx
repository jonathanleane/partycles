import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, generateId, getRandomColor } from '../utils';

const defaultColors = ['#FFFFFF', '#F5F5F5', '#FAFAFA'];

export const createDandelionParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 15,
    startVelocity = 2,
    colors = defaultColors,
    elementSize = 15
  } = config;

  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: generateId(),
      x: origin.x + randomInRange(-20, 20),
      y: origin.y + randomInRange(-20, 20),
      vx: randomInRange(-2, 2),
      vy: randomInRange(-1, -0.3),
      life: config.lifetime || 200,
      opacity: 1,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      // Encode: rotation angle + float phase * 1000 + drift phase * 1000000
      rotation: Math.floor(randomInRange(0, 360)) + 
                (Math.floor(randomInRange(0, 360)) * 1000) +
                (Math.floor(randomInRange(0, 360)) * 1000000),
      color: getRandomColor(colors),
    });
  }
  
  return particles;
};

export const renderDandelionParticle = (particle: Particle): React.ReactNode => {
  // Extract encoded values
  const rotationAngle = particle.rotation % 1000;
  const floatPhase = Math.floor((particle.rotation % 1000000) / 1000);
  const driftPhase = Math.floor(particle.rotation / 1000000);
  
  // Calculate floating effects
  const floatY = Math.sin((Date.now() * 0.002 + floatPhase) * Math.PI / 180) * 5;
  const driftX = Math.sin((Date.now() * 0.001 + driftPhase) * Math.PI / 180) * 3;
  const rotation = (Date.now() * 0.01 + rotationAngle) % 360;
  
  const seedCount = 7;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size * 2}px`,
        height: `${particle.size * 2}px`,
        position: 'relative',
        transform: `translate(${driftX}px, ${floatY}px) rotate(${rotation}deg)`,
        opacity: particle.opacity,
      }}
    >
      <svg
        width={particle.size * 2}
        height={particle.size * 2}
        viewBox={`-${particle.size} -${particle.size} ${particle.size * 2} ${particle.size * 2}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {/* Center */}
        <circle
          cx="0"
          cy="0"
          r="2"
          fill="#F5F5DC"
        />
        
        {/* Seed strands radiating from center */}
        {Array.from({ length: seedCount }).map((_, i) => {
          const angle = (i * 360 / seedCount) * Math.PI / 180;
          const endX = Math.cos(angle) * particle.size;
          const endY = Math.sin(angle) * particle.size;
          const midX = Math.cos(angle) * particle.size * 0.7;
          const midY = Math.sin(angle) * particle.size * 0.7;
          
          return (
            <g key={i}>
              {/* Strand */}
              <line
                x1="0"
                y1="0"
                x2={endX}
                y2={endY}
                stroke="#E5E5E5"
                strokeWidth="0.5"
                opacity="0.8"
              />
              
              {/* Fluffy part */}
              <circle
                cx={endX}
                cy={endY}
                r="3"
                fill={particle.color}
                opacity="0.6"
              />
              <circle
                cx={midX}
                cy={midY}
                r="2"
                fill={particle.color}
                opacity="0.4"
              />
              
              {/* Small filaments */}
              {[0, 1, 2].map((j) => {
                const filamentAngle = angle + (j - 1) * 0.1;
                const filamentX = endX + Math.cos(filamentAngle) * 2;
                const filamentY = endY + Math.sin(filamentAngle) * 2;
                
                return (
                  <line
                    key={j}
                    x1={endX}
                    y1={endY}
                    x2={filamentX}
                    y2={filamentY}
                    stroke="#E5E5E5"
                    strokeWidth="0.3"
                    opacity="0.6"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};