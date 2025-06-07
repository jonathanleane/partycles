import React from 'react';
import { useReward } from './react-surprise/useReward';

const TechAnimationsDemo: React.FC = () => {
  const { reward: matrixReward, isAnimating: isMatrixAnimating } = useReward('matrix', 'matrix', {
    particleCount: 50,
    lifetime: 200,
  });

  const { reward: pixelsReward, isAnimating: isPixelsAnimating } = useReward('pixels', 'pixels', {
    particleCount: 30,
    lifetime: 150,
  });

  const { reward: glitchReward, isAnimating: isGlitchAnimating } = useReward('glitch', 'glitch', {
    particleCount: 20,
    lifetime: 100,
  });

  const { reward: diceReward, isAnimating: isDiceAnimating } = useReward('dice', 'dice', {
    particleCount: 8,
    lifetime: 180,
  });

  const { reward: levelupReward, isAnimating: isLevelupAnimating } = useReward('levelup', 'levelup', {
    particleCount: 10,
    lifetime: 150,
  });

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Tech/Gaming Animations Demo</h1>
      
      <div style={{ marginTop: '30px' }}>
        <button
          id="matrix"
          onClick={matrixReward}
          disabled={isMatrixAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#00ff00',
            color: '#000',
          }}
        >
          Matrix Rain
        </button>

        <button
          id="pixels"
          onClick={pixelsReward}
          disabled={isPixelsAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#ff6b6b',
            color: '#fff',
          }}
        >
          Pixel Explosion
        </button>

        <button
          id="glitch"
          onClick={glitchReward}
          disabled={isGlitchAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#333',
            color: '#0ff',
          }}
        >
          Glitch Effect
        </button>

        <button
          id="dice"
          onClick={diceReward}
          disabled={isDiceAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#fff',
            color: '#333',
            border: '2px solid #333',
          }}
        >
          Roll Dice
        </button>

        <button
          id="levelup"
          onClick={levelupReward}
          disabled={isLevelupAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#ffd700',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          Level Up!
        </button>
      </div>
    </div>
  );
};

export default TechAnimationsDemo;