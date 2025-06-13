export const animationManager = {
  addAnimation: jest.fn(),
  removeAnimation: jest.fn(),
  pauseAnimation: jest.fn(),
  resumeAnimation: jest.fn(),
  isAnimationPaused: jest.fn(() => false),
  getAnimation: jest.fn(),
  getStats: jest.fn(() => ({
    activeAnimations: 0,
    currentFps: 60,
    isRunning: false,
    totalParticles: 0,
  })),
  setTargetFPS: jest.fn(),
};