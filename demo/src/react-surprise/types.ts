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
  | 'lightning'
  | 'petals';

export interface UseRewardConfig extends AnimationConfig {
  animationType: AnimationType;
}