import React from 'react';
import { useReward } from './react-surprise/useReward';

const TechAnimationsDemo: React.FC = () => {
  const { reward: glitchReward, isAnimating: isGlitchAnimating } = useReward('glitch', 'glitch', {
    particleCount: 20,
    lifetime: 100,
  });

  const { reward: galaxyReward, isAnimating: isGalaxyAnimating } = useReward('galaxy', 'galaxy', {
    particleCount: 60,
    lifetime: 250,
  });

  const { reward: crystalsReward, isAnimating: isCrystalsAnimating } = useReward('crystals', 'crystals', {
    particleCount: 20,
    lifetime: 180,
  });

  const { reward: magicdustReward, isAnimating: isMagicdustAnimating } = useReward('magicdust', 'magicdust', {
    particleCount: 35,
    lifetime: 200,
  });

  const { reward: auroraReward, isAnimating: isAuroraAnimating } = useReward('aurora', 'aurora', {
    particleCount: 15,
    lifetime: 250,
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
      <h1>Visual Effects Demo</h1>
      
      <div style={{ marginTop: '30px' }}>
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
          id="galaxy"
          onClick={galaxyReward}
          disabled={isGalaxyAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#1a1a2e',
            color: '#fff',
          }}
        >
          Galaxy
        </button>

        <button
          id="crystals"
          onClick={crystalsReward}
          disabled={isCrystalsAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#9c27b0',
            color: '#fff',
          }}
        >
          Crystals
        </button>

        <button
          id="magicdust"
          onClick={magicdustReward}
          disabled={isMagicdustAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#e91e63',
            color: '#fff',
          }}
        >
          Magic Dust
        </button>

        <button
          id="aurora"
          onClick={auroraReward}
          disabled={isAuroraAnimating}
          style={{
            ...buttonStyle,
            backgroundColor: '#00bcd4',
            color: '#fff',
          }}
        >
          Aurora
        </button>
      </div>
    </div>
  );
};

export default TechAnimationsDemo;