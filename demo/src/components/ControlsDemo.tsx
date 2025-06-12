import React, { useRef } from 'react';
import { useReward } from '../react-surprise/useReward';
import styles from './Demo.module.css';

export const ControlsDemo = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { reward, isAnimating, pause, resume, replay, isPaused } = useReward(
    buttonRef,
    'confetti',
    {
      particleCount: 50,
      startVelocity: 25,
      lifetime: 150,
    }
  );

  return (
    <div className={styles.demoItem}>
      <h3>Animation Controls Demo</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          ref={buttonRef}
          onClick={reward}
          className={styles.button}
          disabled={isAnimating}
        >
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </button>
        
        <button
          onClick={pause}
          className={styles.button}
          disabled={!isAnimating || isPaused}
        >
          Pause
        </button>
        
        <button
          onClick={resume}
          className={styles.button}
          disabled={!isAnimating || !isPaused}
        >
          Resume
        </button>
        
        <button
          onClick={replay}
          className={styles.button}
        >
          Replay
        </button>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Status: {isAnimating ? (isPaused ? 'Paused' : 'Playing') : 'Idle'}
      </div>
    </div>
  );
};