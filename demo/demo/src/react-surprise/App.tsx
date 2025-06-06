import React from 'react';
import { useReward } from 'partycles';
import './App.css';

const animations = [
  { type: 'confetti', label: 'Confetti', color: '#FF6B6B' },
  { type: 'sparkles', label: 'Sparkles', color: '#FFD93D' },
  { type: 'hearts', label: 'Hearts', color: '#FF1744' },
  { type: 'fireworks', label: 'Fireworks', color: '#4ECDC4' },
  { type: 'bubbles', label: 'Bubbles', color: '#45B7D1' },
  { type: 'stars', label: 'Stars', color: '#FFA500' },
] as const;

function AnimationButton({ type, label, color }: { type: any; label: string; color: string }) {
  const { reward, isAnimating } = useReward(`reward-${type}`, type, {
    particleCount: 30,
    spread: 60,
    startVelocity: 35,
  });

  return (
    <button
      className="animation-button"
      style={{ backgroundColor: color }}
      onClick={reward}
      disabled={isAnimating}
    >
      <span id={`reward-${type}`} />
      {label}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Partycles Demo</h1>
        <p>Click the buttons below to see different animation effects!</p>
        
        <div className="button-grid">
          {animations.map((animation) => (
            <AnimationButton
              key={animation.type}
              type={animation.type}
              label={animation.label}
              color={animation.color}
            />
          ))}
        </div>

        <div className="custom-section">
          <h2>Custom Configurations</h2>
          <div className="custom-buttons">
            <BigConfettiButton />
            <SlowMotionButton />
            <RainbowButton />
          </div>
        </div>
      </header>
    </div>
  );
}

function BigConfettiButton() {
  const { reward, isAnimating } = useReward('big-confetti', 'confetti', {
    particleCount: 100,
    spread: 100,
    startVelocity: 50,
    elementSize: 20,
  });

  return (
    <button className="custom-button" onClick={reward} disabled={isAnimating}>
      <span id="big-confetti" />
      Big Confetti
    </button>
  );
}

function SlowMotionButton() {
  const { reward, isAnimating } = useReward('slow-motion', 'hearts', {
    particleCount: 20,
    startVelocity: 10,
    physics: {
      gravity: 0.1,
      friction: 0.995,
    },
  });

  return (
    <button className="custom-button" onClick={reward} disabled={isAnimating}>
      <span id="slow-motion" />
      Slow Motion Hearts
    </button>
  );
}

function RainbowButton() {
  const { reward, isAnimating } = useReward('rainbow', 'sparkles', {
    particleCount: 50,
    spread: 120,
    colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
  });

  return (
    <button className="custom-button rainbow" onClick={reward} disabled={isAnimating}>
      <span id="rainbow" />
      Rainbow Sparkles
    </button>
  );
}

export default App;