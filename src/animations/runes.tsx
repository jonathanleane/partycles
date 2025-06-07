import React from 'react';
import { AnimationConfig, Particle } from '../types';
import { randomInRange, degreesToRadians, generateId, getRandomColor } from '../utils';

const defaultColors = ['#9C27B0', '#673AB7', '#3F51B5', '#00BCD4', '#4CAF50', '#FFEB3B', '#FF9800'];

// Ancient rune symbols
const runeSymbols = [
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'
];

export const createRuneParticles = (
  origin: { x: number; y: number },
  config: AnimationConfig
): Particle[] => {
  const {
    particleCount = 12,
    startVelocity = 6,
    colors = defaultColors,
    elementSize = 35
  } = config;

  const particles: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Runes float upward in a mystical pattern
    const angle = randomInRange(250, 290); // Mostly upward
    const velocity = randomInRange(startVelocity * 0.3, startVelocity * 0.7);
    const color = getRandomColor(colors);
    
    // Create circular spawn pattern
    const spawnAngle = (i / particleCount) * 360;
    const spawnRadius = randomInRange(20, 60);
    
    const runeIndex = Math.floor(Math.random() * runeSymbols.length);
    
    particles.push({
      id: generateId(),
      x: origin.x + Math.cos(degreesToRadians(spawnAngle)) * spawnRadius,
      y: origin.y + Math.sin(degreesToRadians(spawnAngle)) * spawnRadius,
      vx: Math.cos(degreesToRadians(angle)) * velocity + randomInRange(-1, 1),
      vy: Math.sin(degreesToRadians(angle)) * velocity,
      life: config.lifetime || 160,
      opacity: 0,
      size: randomInRange(elementSize * 0.8, elementSize * 1.2),
      // Store runeIndex in lower bits of rotation, keep rotation angle in upper bits
      rotation: runeIndex + (Math.floor(randomInRange(0, 360)) * 100),
      color,
    });
  }

  return particles;
};

export const renderRuneParticle = (particle: Particle): React.ReactNode => {
  // Extract rune index and rotation from encoded value
  const runeIndex = particle.rotation % 100;
  const rotationAngle = Math.floor(particle.rotation / 100);
  const runeSymbol = runeSymbols[runeIndex] || runeSymbols[0];
  
  // Calculate pulsing glow effect
  const glowIntensity = (Math.sin(Date.now() * 0.003 + particle.x * 0.01) + 1) / 2;
  // Fade in and out based on life
  const fadeProgress = particle.life > 120 ? (160 - particle.life) / 40 : particle.life < 40 ? particle.life / 40 : 1;
  
  return (
    <div
      key={particle.id}
      style={{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        position: 'relative',
        transform: `rotate(${rotationAngle}deg)`,
        opacity: fadeProgress,
      }}
    >
      {/* Outer glow circle */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${particle.color}44 0%, transparent 70%)`,
          transform: `scale(${1.5 + glowIntensity * 0.5})`,
          filter: 'blur(4px)',
        }}
      />
      
      {/* Inner glow */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${particle.color}88 0%, ${particle.color}44 50%, transparent 100%)`,
          transform: `scale(${1.2 + glowIntensity * 0.3})`,
        }}
      />
      
      {/* Rune symbol */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${particle.size * 0.7}px`,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textShadow: `
            0 0 10px ${particle.color},
            0 0 20px ${particle.color},
            0 0 30px ${particle.color},
            0 0 40px ${particle.color}
          `,
          filter: `brightness(${1.5 + glowIntensity * 0.5})`,
        }}
      >
        {runeSymbol}
      </div>
      
      {/* Magical sparkles around the rune */}
      {[0, 72, 144, 216, 288].map((angle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: `
              translate(-50%, -50%) 
              rotate(${angle + rotationAngle}deg) 
              translateY(-${particle.size * 0.6}px)
              scale(${0.5 + glowIntensity})
            `,
            boxShadow: '0 0 6px #FFFFFF',
            opacity: glowIntensity,
          }}
        />
      ))}
    </div>
  );
};