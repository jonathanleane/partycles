import { AnimationConfig } from './types';

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check user agent
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Check viewport width
  const isMobileWidth = window.innerWidth <= 768;
  
  // Check touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileUA || (isMobileWidth && hasTouch);
};

export const optimizeConfigForMobile = (config: AnimationConfig): AnimationConfig => {
  if (!isMobileDevice()) return config;
  
  return {
    ...config,
    // Reduce particle count by 40%
    particleCount: Math.floor((config.particleCount || 50) * 0.6),
    // Reduce element size by 20%
    elementSize: Math.floor((config.elementSize || 20) * 0.8),
    // Reduce lifetime by 20%
    lifetime: Math.floor((config.lifetime || 150) * 0.8),
    // Simplify physics
    physics: {
      ...config.physics,
      // Reduce precision for mobile
      gravity: Math.round((config.physics?.gravity || 0) * 100) / 100,
      wind: Math.round((config.physics?.wind || 0) * 100) / 100,
      friction: Math.round((config.physics?.friction || 0.98) * 100) / 100,
    }
  };
};

// Frame skipping for mobile
export const shouldSkipFrame = (frameCount: number): boolean => {
  if (!isMobileDevice()) return false;
  // Skip every 3rd frame on mobile
  return frameCount % 3 === 0;
};

// Reduce visual complexity for mobile
export const simplifyVisualEffects = (animationType: string): boolean => {
  if (!isMobileDevice()) return false;
  // These animations have heavy visual effects
  const heavyAnimations = ['fireflies', 'galaxy', 'aurora', 'crystals', 'glitch'];
  return heavyAnimations.includes(animationType);
};