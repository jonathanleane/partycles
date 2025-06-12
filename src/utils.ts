import { Particle } from './types';

export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getRandomColor = (colors: string[]): string => {
  return (
    colors[Math.floor(Math.random() * colors.length)] || colors[0] || '#ffffff'
  );
};

export const createParticleStyle = (
  particle: Particle,
  _containerRect: DOMRect
): React.CSSProperties => {
  return {
    position: 'absolute',
    left: `${particle.x}px`,
    top: `${particle.y}px`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    transform: `rotate(${particle.rotation}deg) translateX(-50%) translateY(-50%)`,
    opacity: particle.opacity,
    pointerEvents: 'none',
    transition: 'none',
    willChange: 'transform, opacity',
  };
};
