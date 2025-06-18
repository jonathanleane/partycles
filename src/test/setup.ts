// Jest setup file
import '@testing-library/jest-dom';

// Mock requestAnimationFrame for tests
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(Date.now()), 0) as unknown as number;
};

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

// Mock performance.now for tests
if (!global.performance) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).performance = {
    now: () => Date.now(),
  };
}

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 100,
  height: 50,
  top: 10,
  left: 20,
  right: 120,
  bottom: 60,
  x: 20,
  y: 10,
  toJSON: () => {},
}));

// Mock document.hidden for visibility tests
Object.defineProperty(document, 'hidden', {
  writable: true,
  value: false,
});

// Mock createRoot for React 18
// NOTE: We need to keep the actual implementation for React Testing Library to work
// Only mock this when testing the useReward hook specifically
// const mockRoot = {
//   render: jest.fn(),
//   unmount: jest.fn(),
// };
//
// jest.mock('react-dom/client', () => ({
//   createRoot: jest.fn(() => mockRoot),
// }));

// Suppress console warnings in tests unless explicitly testing them
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});
