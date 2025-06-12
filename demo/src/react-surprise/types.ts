export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  opacity: number;
  size: number;
  rotation: number;
  color: string;
  element?: React.ReactNode;
  config?: AnimationConfig; // Store config for render functions
}

export interface AnimationConfig {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  lifetime?: number;
  colors?: string[];
  elementSize?: number;
  duration?: number;
  physics?: {
    gravity?: number;
    wind?: number;
    friction?: number;
  };
  // Radial movement configuration
  radial?: {
    enabled?: boolean; // Enable radial burst movement
    pattern?: 'circular' | 'cone' | 'random' | 'spiral' | 'vortex' | 'pinwheel'; // Burst pattern type
    angleVariation?: number; // Randomness in angle (0-1)
    velocityVariation?: number; // Randomness in velocity (0-1)
    spiralTurns?: number; // Number of spiral rotations (for spiral pattern)
    vortexPull?: number; // Strength of inward pull (for vortex pattern)
    pinwheelArms?: number; // Number of arms on the pinwheel (for pinwheel pattern)
    rotationSpeed?: number; // Speed of pinwheel rotation
  };
  // Optional enhanced effects
  effects?: {
    flutter?: boolean; // For confetti - paper-like floating
    twinkle?: boolean; // For stars/sparkles - brightness variation
    pulse?: boolean; // For hearts - heartbeat effect
    spin3D?: boolean; // For coins - 3D rotation effect
    wobble?: boolean; // For bubbles - realistic wobble
    windDrift?: boolean; // For snow/leaves - horizontal drift
  };
}

export type AnimationType =
  | 'confetti'
  | 'sparkles'
  | 'fireworks'
  | 'hearts'
  | 'stars'
  | 'bubbles'
  | 'snow'
  | 'emoji'
  | 'coins'
  | 'petals'
  | 'aurora'
  | 'fireflies'
  | 'paint'
  | 'balloons'
  | 'galaxy'
  | 'leaves'
  | 'glitch'
  | 'magicdust'
  | 'crystals';

export interface UseRewardConfig extends AnimationConfig {
  animationType: AnimationType;
}
