// Track paused state for animations
const pausedAnimations = new Set<string>();

export const animationManager = {
  addAnimation: jest.fn(),
  removeAnimation: jest.fn((id: string) => {
    pausedAnimations.delete(id);
  }),
  pauseAnimation: jest.fn((id: string) => {
    pausedAnimations.add(id);
  }),
  resumeAnimation: jest.fn((id: string) => {
    pausedAnimations.delete(id);
  }),
  isAnimationPaused: jest.fn((id: string) => pausedAnimations.has(id)),
  getAnimation: jest.fn(),
  getStats: jest.fn(() => ({
    activeAnimations: 0,
    currentFps: 60,
    isRunning: false,
    totalParticles: 0,
  })),
  setTargetFPS: jest.fn(),
};

// Reset function for tests
export const resetAnimationManager = () => {
  pausedAnimations.clear();
  jest.clearAllMocks();
};
