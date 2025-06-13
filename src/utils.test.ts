import { randomInRange, generateId, createParticleStyle } from './utils';
import { Particle } from './types';

describe('utils', () => {
  describe('randomInRange', () => {
    it('should return a number within the specified range', () => {
      const min = 10;
      const max = 20;

      for (let i = 0; i < 100; i++) {
        const result = randomInRange(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
      }
    });

    it('should handle negative ranges', () => {
      const min = -20;
      const max = -10;

      for (let i = 0; i < 100; i++) {
        const result = randomInRange(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
      }
    });

    it('should return the same value when min equals max', () => {
      const value = 42;
      expect(randomInRange(value, value)).toBe(value);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const ids = new Set<string>();
      const count = 1000;

      for (let i = 0; i < count; i++) {
        ids.add(generateId());
      }

      expect(ids.size).toBe(count);
    });

    it('should generate strings of reasonable length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(0);
      expect(id.length).toBeLessThan(50);
    });
  });

  describe('createParticleStyle', () => {
    const mockParticle: Particle = {
      id: 'test-particle',
      x: 100,
      y: 200,
      vx: 0,
      vy: 0,
      life: 50,
      opacity: 0.8,
      size: 30,
      rotation: 45,
      color: '#ff0000',
    };

    const mockContainerRect: DOMRect = {
      top: 0,
      left: 0,
      width: 1000,
      height: 800,
      right: 1000,
      bottom: 800,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    it('should create correct particle style object', () => {
      const style = createParticleStyle(mockParticle, mockContainerRect);

      expect(style.position).toBe('absolute');
      expect(style.left).toBe('100px');
      expect(style.top).toBe('200px');
      expect(style.width).toBe('30px');
      expect(style.height).toBe('30px');
      expect(style.opacity).toBe(0.8);
      expect(style.pointerEvents).toBe('none');
      expect(style.transform).toContain('rotate(45deg)');
      expect(style.transform).toContain('translateX(-50%)');
      expect(style.transform).toContain('translateY(-50%)');
    });

    it('should handle zero opacity', () => {
      const particleWithZeroOpacity = { ...mockParticle, opacity: 0 };
      const style = createParticleStyle(
        particleWithZeroOpacity,
        mockContainerRect
      );

      expect(style.opacity).toBe(0);
    });

    it('should handle negative rotation', () => {
      const particleWithNegativeRotation = { ...mockParticle, rotation: -90 };
      const style = createParticleStyle(
        particleWithNegativeRotation,
        mockContainerRect
      );

      expect(style.transform).toContain('rotate(-90deg)');
    });

    it('should handle particles at container edges', () => {
      const edgeParticle = { ...mockParticle, x: 0, y: 0 };
      const style = createParticleStyle(edgeParticle, mockContainerRect);

      expect(style.left).toBe('0px');
      expect(style.top).toBe('0px');
    });
  });
});
