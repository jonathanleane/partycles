import { particlePool } from '../particlePool';

describe('ParticlePool', () => {
  beforeEach(() => {
    // Clear the pool before each test
    particlePool.clear();
  });

  it('should reuse particles from the pool', () => {
    // Get initial stats
    const initialStats = particlePool.getStats();
    expect(initialStats.poolSize).toBe(0);
    expect(initialStats.totalCreated).toBe(0);

    // Acquire some particles
    const p1 = particlePool.acquire();
    const p2 = particlePool.acquire();
    const p3 = particlePool.acquire();

    // Check stats after acquisition
    let stats = particlePool.getStats();
    expect(stats.poolSize).toBe(0);
    expect(stats.totalCreated).toBe(3);

    // Release particles back to pool
    particlePool.release(p1);
    particlePool.release(p2);
    particlePool.release(p3);

    // Check pool size increased
    stats = particlePool.getStats();
    expect(stats.poolSize).toBe(3);
    expect(stats.totalCreated).toBe(3);

    // Acquire again - should reuse from pool
    const p4 = particlePool.acquire();
    const p5 = particlePool.acquire();

    stats = particlePool.getStats();
    expect(stats.poolSize).toBe(1); // One still in pool
    expect(stats.totalCreated).toBe(3); // No new particles created

    // The reused particles should be the same objects
    expect(p4).toBe(p3); // Last in, first out
    expect(p5).toBe(p2);
  });

  it('should reset particle properties when releasing', () => {
    const particle = particlePool.acquire();

    // Set some properties
    particle.element = 'test-element';
    particle.config = { particleCount: 50 };
    particle.x = 100;
    particle.y = 200;

    // Release it
    particlePool.release(particle);

    // Properties that should be reset
    expect(particle.element).toBeUndefined();
    expect(particle.config).toBeUndefined();
    expect(particle._pooled).toBe(true);

    // Properties that should NOT be reset (for performance)
    expect(particle.x).toBe(100);
    expect(particle.y).toBe(200);
  });

  it('should respect max pool size', async () => {
    // Create a small pool for testing
    const { ParticlePool } = await import('../particlePool');
    const testPool = new ParticlePool(5);

    // Create and release 10 particles
    const particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push(testPool.acquire());
    }

    // Release all
    testPool.releaseAll(particles);

    // Pool should only contain max size
    const stats = testPool.getStats();
    expect(stats.poolSize).toBe(5);
    expect(stats.totalCreated).toBe(10);
  });

  it('should handle releaseAll correctly', () => {
    const particles = [];
    for (let i = 0; i < 5; i++) {
      particles.push(particlePool.acquire());
    }

    particlePool.releaseAll(particles);

    const stats = particlePool.getStats();
    expect(stats.poolSize).toBe(5);

    // All particles should be marked as pooled
    particles.forEach((p) => {
      expect(p._pooled).toBe(true);
    });
  });

  it('should not add already pooled particles', () => {
    const particle = particlePool.acquire();
    particlePool.release(particle);

    let stats = particlePool.getStats();
    expect(stats.poolSize).toBe(1);

    // Try to release again
    particlePool.release(particle);

    // Pool size should not increase
    stats = particlePool.getStats();
    expect(stats.poolSize).toBe(1);
  });
});
