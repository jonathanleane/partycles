import React, { useState } from 'react';
import { useReward } from './react-surprise/index';
import './App.css';

const defaultColors = {
  confetti: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'],
  sparkles: ['#FFD700', '#FFFFFF'],
  hearts: ['#ff1744', '#e91e63', '#ff4569', '#ff6b6b'],
  fireworks: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  bubbles: ['rgba(66, 165, 245, 0.4)', 'rgba(41, 182, 246, 0.4)'],
  stars: ['#FFD700', '#FFA500', '#FF6347'],
};

const defaultConfigs = {
  confetti: {
    particleCount: 50,
    spread: 90,
    startVelocity: 55,
    elementSize: 20,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  sparkles: {
    particleCount: 35,
    spread: 120,
    startVelocity: 45,
    elementSize: 25,
    lifetime: 120,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  hearts: {
    particleCount: 25,
    spread: 70,
    startVelocity: 30,
    elementSize: 30,
    lifetime: 180,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  fireworks: {
    particleCount: 60,
    spread: 180,
    startVelocity: 50,
    elementSize: 8,
    lifetime: 140,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  bubbles: {
    particleCount: 30,
    spread: 80,
    startVelocity: 30,
    elementSize: 40,
    lifetime: 160,
    physics: { gravity: -0.1, wind: 0, friction: 0.99 }
  },
  stars: {
    particleCount: 40,
    spread: 100,
    startVelocity: 35,
    elementSize: 30,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  }
};

function App() {
  const [selectedAnimation, setSelectedAnimation] = useState<keyof typeof defaultConfigs>('confetti');
  const [config, setConfig] = useState(defaultConfigs[selectedAnimation]);
  const [colors, setColors] = useState(defaultColors[selectedAnimation]);
  const [showPresets, setShowPresets] = useState(false);

  const { reward, isAnimating } = useReward('playground', selectedAnimation, {
    ...config,
    colors: colors.length > 0 ? colors : undefined,
  });

  const handleAnimationChange = (animation: keyof typeof defaultConfigs) => {
    setSelectedAnimation(animation);
    setConfig(defaultConfigs[animation]);
    setColors(defaultColors[animation]);
  };

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updatePhysics = (key: keyof typeof config.physics, value: number) => {
    setConfig(prev => ({
      ...prev,
      physics: { ...prev.physics, [key]: value }
    }));
  };

  const addColor = () => {
    const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setColors([...colors, newColor]);
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const resetToDefaults = () => {
    setConfig(defaultConfigs[selectedAnimation]);
    setColors(defaultColors[selectedAnimation]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Partycles Playground</h1>
        <p>Customize your animations in real-time!</p>

        <div className="playground-container">
          <div className="controls-panel">
            <h3>Animation Type</h3>
            <div className="animation-selector">
              {Object.keys(defaultConfigs).map((animation) => (
                <button
                  key={animation}
                  className={`animation-type-btn ${selectedAnimation === animation ? 'active' : ''}`}
                  onClick={() => handleAnimationChange(animation as keyof typeof defaultConfigs)}
                >
                  {animation}
                </button>
              ))}
            </div>

            <h3>Basic Parameters</h3>
            <div className="control-group">
              <label>
                Particle Count: <span className="value">{config.particleCount}</span>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={config.particleCount}
                  onChange={(e) => updateConfig('particleCount', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Spread: <span className="value">{config.spread}°</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={config.spread}
                  onChange={(e) => updateConfig('spread', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Start Velocity: <span className="value">{config.startVelocity}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.startVelocity}
                  onChange={(e) => updateConfig('startVelocity', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Element Size: <span className="value">{config.elementSize}px</span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={config.elementSize}
                  onChange={(e) => updateConfig('elementSize', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Lifetime: <span className="value">{config.lifetime}</span>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={config.lifetime}
                  onChange={(e) => updateConfig('lifetime', Number(e.target.value))}
                />
              </label>
            </div>

            <h3>Physics</h3>
            <div className="control-group">
              <label>
                Gravity: <span className="value">{config.physics.gravity.toFixed(2)}</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.01"
                  value={config.physics.gravity}
                  onChange={(e) => updatePhysics('gravity', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Wind: <span className="value">{config.physics.wind.toFixed(2)}</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.01"
                  value={config.physics.wind}
                  onChange={(e) => updatePhysics('wind', Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Friction: <span className="value">{config.physics.friction.toFixed(3)}</span>
                <input
                  type="range"
                  min="0.9"
                  max="1"
                  step="0.001"
                  value={config.physics.friction}
                  onChange={(e) => updatePhysics('friction', Number(e.target.value))}
                />
              </label>
            </div>

            <h3>Colors</h3>
            <div className="colors-section">
              {colors.map((color, index) => (
                <div key={index} className="color-input">
                  <input
                    type="color"
                    value={color.startsWith('rgba') ? '#42a5f5' : color}
                    onChange={(e) => updateColor(index, e.target.value)}
                  />
                  <span className="color-value">{color}</span>
                  <button 
                    className="remove-color"
                    onClick={() => removeColor(index)}
                    disabled={colors.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button className="add-color" onClick={addColor}>
                + Add Color
              </button>
            </div>

            <div className="actions">
              <button className="reset-btn" onClick={resetToDefaults}>
                Reset to Defaults
              </button>
              <button 
                className="presets-btn" 
                onClick={() => setShowPresets(!showPresets)}
              >
                {showPresets ? 'Hide' : 'Show'} Presets
              </button>
            </div>
          </div>

          <div className="preview-area">
            <button
              className="trigger-button"
              id="playground"
              onClick={reward}
              disabled={isAnimating}
            >
              Click to Trigger Animation!
            </button>

            <div className="config-display">
              <h4>Current Configuration:</h4>
              <pre>{JSON.stringify({ ...config, colors }, null, 2)}</pre>
            </div>
          </div>
        </div>

        {showPresets && (
          <div className="presets-section">
            <h2>Preset Examples</h2>
            <div className="preset-buttons">
              <PresetButton
                label="Epic Confetti"
                animation="confetti"
                config={{
                  particleCount: 100,
                  spread: 120,
                  startVelocity: 70,
                  elementSize: 25,
                  lifetime: 200,
                  physics: { gravity: 0.2, wind: 0.1, friction: 0.97 }
                }}
              />
              <PresetButton
                label="Gentle Hearts"
                animation="hearts"
                config={{
                  particleCount: 15,
                  spread: 45,
                  startVelocity: 20,
                  elementSize: 40,
                  lifetime: 250,
                  physics: { gravity: 0.15, wind: 0.05, friction: 0.995 }
                }}
              />
              <PresetButton
                label="Crazy Fireworks"
                animation="fireworks"
                config={{
                  particleCount: 100,
                  spread: 360,
                  startVelocity: 80,
                  elementSize: 12,
                  lifetime: 180,
                  physics: { gravity: 0.5, wind: 0, friction: 0.96 }
                }}
              />
              <PresetButton
                label="Floating Bubbles"
                animation="bubbles"
                config={{
                  particleCount: 40,
                  spread: 100,
                  startVelocity: 15,
                  elementSize: 50,
                  lifetime: 300,
                  physics: { gravity: -0.15, wind: 0.1, friction: 0.995 }
                }}
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function PresetButton({ label, animation, config }: { 
  label: string; 
  animation: string; 
  config: any;
}) {
  const { reward, isAnimating } = useReward(`preset-${label}`, animation as any, config);

  return (
    <button 
      className="preset-button" 
      onClick={reward} 
      disabled={isAnimating}
    >
      <span id={`preset-${label}`} />
      {label}
    </button>
  );
}

export default App;