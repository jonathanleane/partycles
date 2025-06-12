import { createConfettiParticles, renderConfettiParticle } from './confetti';
import { Particle } from '../types';

describe('confetti animation', () => {
  describe('createConfettiParticles', () => {
    const origin = { x: 100, y: 200 };
    const defaultConfig = {};

    it('should create default number of particles', () => {
      const particles = createConfettiParticles(origin, defaultConfig);
      expect(particles.length).toBeGreaterThan(0);
      expect(particles.length).toBeLessThanOrEqual(100); // reasonable upper limit
    });

    it('should create particles with custom count', () => {
      const config = { particleCount: 25 };
      const particles = createConfettiParticles(origin, config);
      expect(particles).toHaveLength(25);
    });

    it('should create particles at the origin point', () => {
      const particles = createConfettiParticles(origin, defaultConfig);
      
      particles.forEach(particle => {
        expect(particle.x).toBe(origin.x);
        expect(particle.y).toBe(origin.y);
      });
    });

    it('should create particles with required properties', () => {
      const particles = createConfettiParticles(origin, defaultConfig);
      
      particles.forEach(particle => {
        expect(particle).toHaveProperty('id');
        expect(particle).toHaveProperty('x');
        expect(particle).toHaveProperty('y');
        expect(particle).toHaveProperty('vx');
        expect(particle).toHaveProperty('vy');
        expect(particle).toHaveProperty('life');
        expect(particle).toHaveProperty('opacity');
        expect(particle).toHaveProperty('size');
        expect(particle).toHaveProperty('rotation');
        expect(particle).toHaveProperty('color');
      });
    });

    it('should create particles with velocities', () => {
      const config = { spread: 45, startVelocity: 10 };
      const particles = createConfettiParticles(origin, config);
      
      particles.forEach(particle => {
        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        expect(velocity).toBeGreaterThan(0);
        // Velocity includes both startVelocity and initial upward boost (vy - 30)
        expect(velocity).toBeLessThan(50); // reasonable upper bound considering vy boost
      });
    });

    it('should use custom colors when provided', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      const config = { colors: customColors };
      const particles = createConfettiParticles(origin, config);
      
      particles.forEach(particle => {
        expect(customColors).toContain(particle.color);
      });
    });

    it('should create particles with unique IDs', () => {
      const particles = createConfettiParticles(origin, defaultConfig);
      const ids = particles.map(p => p.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('renderConfettiParticle', () => {
    const mockParticle: Particle = {
      id: 'test-1',
      x: 100,
      y: 200,
      vx: 5,
      vy: -10,
      life: 80,
      opacity: 0.8,
      size: 20,
      rotation: 45,
      color: '#ff0000',
    };

    it('should render a confetti particle element', () => {
      const result = renderConfettiParticle(mockParticle);
      expect(result).toBeTruthy();
      expect(result).toMatchObject({
        type: 'div',
        props: expect.objectContaining({
          style: expect.objectContaining({
            width: `${mockParticle.size}px`,
            height: `${mockParticle.size * 0.6}px`,
            backgroundColor: mockParticle.color,
          }),
        }),
      });
    });

    it('should apply correct styles to the particle', () => {
      const result = renderConfettiParticle(mockParticle) as React.ReactElement;
      
      expect(result.props.style).toMatchObject({
        width: `${mockParticle.size}px`,
        height: `${mockParticle.size * 0.6}px`,
        backgroundColor: mockParticle.color,
        borderRadius: '3px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      });
    });

    it('should handle flutter effect when enabled', () => {
      const particleWithEffect: Particle & { config?: { effects?: { flutter?: boolean } } } = {
        ...mockParticle,
        config: { effects: { flutter: true } },
      };
      
      const result = renderConfettiParticle(particleWithEffect) as React.ReactElement;
      
      // Flutter transform is calculated based on particle.life
      expect(result.props.style.transform).toContain('rotateY');
    });

    it('should handle particles without throwing', () => {
      // Should not throw
      expect(() => {
        renderConfettiParticle(mockParticle);
      }).not.toThrow();
    });
  });
});