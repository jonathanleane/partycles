import React, { useState } from 'react';
import { useReward, emojiPresets } from './react-surprise/index';
import { ControlsDemo } from './components/ControlsDemo';
import './App.css';

interface AnimationEffects {
  flutter?: boolean;
  twinkle?: boolean;
  pulse?: boolean;
  spin3D?: boolean;
  wobble?: boolean;
  windDrift?: boolean;
}

interface AnimationConfigWithEffects {
  particleCount: number;
  spread: number;
  startVelocity: number;
  elementSize: number;
  lifetime: number;
  physics: {
    gravity: number;
    wind: number;
    friction: number;
  };
  radial?: {
    enabled?: boolean;
    pattern?: 'circular' | 'cone' | 'random' | 'spiral' | 'vortex' | 'pinwheel';
    angleVariation?: number;
    velocityVariation?: number;
    spiralTurns?: number;
    vortexPull?: number;
    pinwheelArms?: number;
    rotationSpeed?: number;
  };
  effects: AnimationEffects;
}

const defaultColors: Record<string, string[]> = {
  confetti: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'],
  sparkles: ['#FFD700', '#FFFFFF'],
  hearts: ['#ff1744', '#e91e63', '#ff4569', '#ff6b6b'],
  fireworks: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  bubbles: ['rgba(66, 165, 245, 0.4)', 'rgba(41, 182, 246, 0.4)'],
  stars: ['#FFD700', '#FFA500', '#FF6347'],
  snow: ['#FFFFFF', '#F0F8FF', '#F5F5F5', '#FAFAFA'],
  emoji: ['🎉', '🎊', '🎈', '🎁', '✨', '🌟', '💫', '🎯'],
  coins: ['#FFD700', '#FFA500', '#FFB300', '#FFC700'],
  petals: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFF0F5'],
  aurora: ['#00ff88', '#00ffaa', '#00ddff', '#0099ff', '#0066ff', '#9933ff', '#ff00ff'],
  fireflies: ['#FFFF99', '#FFFFCC', '#FFFF66', '#FFFFAA'],
  paint: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4'],
  balloons: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4', '#FF4081'],
  galaxy: ['#FFFFFF', '#FFF9C4', '#BBDEFB', '#C5CAE9', '#D1C4E9', '#FFE082', '#FFCCBC'],
  leaves: ['#D2691E', '#CD853F', '#A0522D', '#8B4513', '#FF8C00', '#FF6347'],
  glitch: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  magicdust: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#FFD700'],
  crystals: ['#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#FFEB3B'],
};

const defaultConfigs: Record<string, AnimationConfigWithEffects> = {
  confetti: {
    particleCount: 50,
    spread: 90,
    startVelocity: 20,
    elementSize: 20,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: { flutter: true }
  },
  sparkles: {
    particleCount: 35,
    spread: 120,
    startVelocity: 15,
    elementSize: 25,
    lifetime: 120,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: { twinkle: false }
  },
  hearts: {
    particleCount: 25,
    spread: 70,
    startVelocity: 12,
    elementSize: 30,
    lifetime: 180,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: { pulse: true }
  },
  fireworks: {
    particleCount: 60,
    spread: 180,
    startVelocity: 25,
    elementSize: 8,
    lifetime: 140,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: {}
  },
  bubbles: {
    particleCount: 30,
    spread: 80,
    startVelocity: 3,
    elementSize: 40,
    lifetime: 300,
    physics: { gravity: -0.05, wind: 0.02, friction: 0.995 },
    effects: { wobble: true }
  },
  stars: {
    particleCount: 40,
    spread: 100,
    startVelocity: 18,
    elementSize: 30,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: { twinkle: false }
  },
  snow: {
    particleCount: 50,
    spread: 200,
    startVelocity: 3,
    elementSize: 15,
    lifetime: 300,
    physics: { gravity: 0.05, wind: 0.1, friction: 0.99 },
    effects: { windDrift: true }
  },
  emoji: {
    particleCount: 30,
    spread: 100,
    startVelocity: 15,
    elementSize: 35,
    lifetime: 180,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 },
    effects: {}
  },
  coins: {
    particleCount: 30,
    spread: 70,
    startVelocity: 25,
    elementSize: 25,
    lifetime: 120,
    physics: { gravity: 0.5, wind: 0, friction: 0.97 },
    effects: { spin3D: true }
  },
  petals: {
    particleCount: 40,
    spread: 100,
    startVelocity: 8,
    elementSize: 20,
    lifetime: 200,
    physics: { gravity: 0.08, wind: 0.15, friction: 0.99 },
    effects: {}
  },
  aurora: {
    particleCount: 15,
    spread: 200,
    startVelocity: 3,
    elementSize: 100,
    lifetime: 250,
    physics: { gravity: -0.2, wind: 0, friction: 0.99 },
    effects: {}
  },
  fireflies: {
    particleCount: 20,
    spread: 150,
    startVelocity: 2,
    elementSize: 8,
    lifetime: 300,
    physics: { gravity: 0, wind: 0, friction: 0.99 },
    effects: {}
  },
  paint: {
    particleCount: 25,
    spread: 120,
    startVelocity: 35,
    elementSize: 30,
    lifetime: 150,
    physics: { gravity: 0.6, wind: 0, friction: 0.96 },
    effects: {}
  },
  balloons: {
    particleCount: 15,
    spread: 80,
    startVelocity: 3,
    elementSize: 35,
    lifetime: 400,
    physics: { gravity: -0.05, wind: 0.02, friction: 0.998 },
    effects: {}
  },
  galaxy: {
    particleCount: 60,
    spread: 200,
    startVelocity: 15,
    elementSize: 8,
    lifetime: 250,
    physics: { gravity: 0, wind: 0, friction: 0.995 },
    effects: {}
  },
  leaves: {
    particleCount: 30,
    spread: 150,
    startVelocity: 5,
    elementSize: 25,
    lifetime: 250,
    physics: { gravity: 0.15, wind: 0.2, friction: 0.99 },
    effects: { windDrift: true }
  },
  glitch: {
    particleCount: 25,
    spread: 360,
    startVelocity: 50,
    elementSize: 30,
    lifetime: 80,
    physics: { gravity: 0, wind: 0, friction: 0.9 },
    effects: {}
  },
  magicdust: {
    particleCount: 35,
    spread: 150,
    startVelocity: 8,
    elementSize: 15,
    lifetime: 200,
    physics: { gravity: -0.1, wind: 0.05, friction: 0.995 },
    effects: {}
  },
  crystals: {
    particleCount: 20,
    spread: 120,
    startVelocity: 20,
    elementSize: 25,
    lifetime: 180,
    physics: { gravity: 0.4, wind: 0, friction: 0.98 },
    effects: {}
  }
};

// Simple syntax highlighter
function highlightCode(code: string): JSX.Element {
  const lines = code.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        // First escape HTML entities
        let escapedLine = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        
        let highlightedLine = escapedLine
          // Keywords
          .replace(/\b(import|from|function|const|let|var|return|export|interface|type|async|await|if)\b/g, '<span class="code-keyword">$1</span>')
          // Strings
          .replace(/'([^']*)'|"([^"]*)"/g, '<span class="code-string">\'$1$2\'</span>')
          // Functions
          .replace(/(\w+)\(/g, '<span class="code-function">$1</span>(')
          // Properties
          .replace(/(\w+):/g, '<span class="code-property">$1</span>:')
          // Comments
          .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
          // Numbers
          .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
        
        return <div key={i} dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
      })}
    </>
  );
}

// Syntax highlighter for JSON
function highlightJSON(json: string): JSX.Element {
  let highlighted = json
    // Property names
    .replace(/"([^"]+)":/g, '<span class="code-property">"$1"</span>:')
    // String values
    .replace(/: "([^"]*)"/g, ': <span class="code-string">"$1"</span>')
    // Number values
    .replace(/: (\d+\.?\d*)/g, ': <span class="code-number">$1</span>')
    // Booleans
    .replace(/: (true|false)/g, ': <span class="code-keyword">$1</span>')
    // Array string values
    .replace(/\[([^\]]*)](?!")/g, (match, content) => {
      const highlightedContent = content.replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>');
      return `[${highlightedContent}]`;
    });
    
  return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

function App() {
  const [selectedAnimation, setSelectedAnimation] = useState<keyof typeof defaultConfigs>('confetti');
  const [config, setConfig] = useState<AnimationConfigWithEffects>(defaultConfigs[selectedAnimation]);
  const [colors, setColors] = useState(defaultColors[selectedAnimation]);
  const [showPresets, setShowPresets] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const { reward, isAnimating } = useReward('playground', selectedAnimation as any, {
    ...config,
    colors: colors.length > 0 ? colors : undefined,
  });

  // Hero title animation - cycle through all animation types
  const animationTypes = Object.keys(defaultConfigs) as Array<keyof typeof defaultConfigs>;
  const [heroAnimationIndex, setHeroAnimationIndex] = useState(0);
  const currentHeroAnimation = animationTypes[heroAnimationIndex];

  // Detect mobile for reduced particle counts
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const mobileFactor = isMobile ? 0.5 : 1;
  
  // Create reward hooks for each animation type with mobile optimization
  const heroRewards = {
    confetti: useReward('hero-title', 'confetti', { ...defaultConfigs.confetti, particleCount: Math.floor(40 * mobileFactor), colors: defaultColors.confetti, effects: { flutter: true } }),
    sparkles: useReward('hero-title', 'sparkles', { ...defaultConfigs.sparkles, particleCount: Math.floor(35 * mobileFactor), colors: defaultColors.sparkles }),
    hearts: useReward('hero-title', 'hearts', { ...defaultConfigs.hearts, particleCount: Math.floor(25 * mobileFactor), colors: defaultColors.hearts, effects: { pulse: true } }),
    fireworks: useReward('hero-title', 'fireworks', { ...defaultConfigs.fireworks, particleCount: Math.floor(50 * mobileFactor), colors: defaultColors.fireworks }),
    bubbles: useReward('hero-title', 'bubbles', { ...defaultConfigs.bubbles, particleCount: Math.floor(25 * mobileFactor), colors: defaultColors.bubbles, effects: { wobble: true } }),
    stars: useReward('hero-title', 'stars', { ...defaultConfigs.stars, particleCount: Math.floor(35 * mobileFactor), colors: defaultColors.stars }),
    snow: useReward('hero-title', 'snow', { ...defaultConfigs.snow, particleCount: Math.floor(40 * mobileFactor), colors: defaultColors.snow, effects: { windDrift: true } }),
    emoji: useReward('hero-title', 'emoji', { ...defaultConfigs.emoji, particleCount: Math.floor(25 * mobileFactor), colors: emojiPresets.celebration }),
    coins: useReward('hero-title', 'coins', { ...defaultConfigs.coins, particleCount: Math.floor(25 * mobileFactor), colors: defaultColors.coins, effects: { spin3D: true } }),
    petals: useReward('hero-title', 'petals', { ...defaultConfigs.petals, particleCount: Math.floor(35 * mobileFactor), colors: defaultColors.petals }),
    aurora: useReward('hero-title', 'aurora', { ...defaultConfigs.aurora, particleCount: Math.floor(12 * mobileFactor), colors: defaultColors.aurora }),
    fireflies: useReward('hero-title', 'fireflies', { ...defaultConfigs.fireflies, particleCount: Math.floor(15 * mobileFactor), colors: defaultColors.fireflies }),
    paint: useReward('hero-title', 'paint', { ...defaultConfigs.paint, particleCount: Math.floor(20 * mobileFactor), colors: defaultColors.paint }),
    balloons: useReward('hero-title', 'balloons', { ...defaultConfigs.balloons, particleCount: Math.floor(10 * mobileFactor), colors: defaultColors.balloons }),
    galaxy: useReward('hero-title', 'galaxy', { ...defaultConfigs.galaxy, particleCount: Math.floor(40 * mobileFactor), colors: defaultColors.galaxy }),
    leaves: useReward('hero-title', 'leaves', { ...defaultConfigs.leaves, particleCount: Math.floor(25 * mobileFactor), colors: defaultColors.leaves, effects: { windDrift: true } }),
    glitch: useReward('hero-title', 'glitch', { ...defaultConfigs.glitch, particleCount: Math.floor(20 * mobileFactor), colors: defaultColors.glitch }),
    magicdust: useReward('hero-title', 'magicdust', { ...defaultConfigs.magicdust, particleCount: Math.floor(25 * mobileFactor), colors: defaultColors.magicdust }),
    crystals: useReward('hero-title', 'crystals', { ...defaultConfigs.crystals, particleCount: Math.floor(15 * mobileFactor), colors: defaultColors.crystals })
  };

  const triggerHeroAnimation = () => {
    (heroRewards as any)[currentHeroAnimation].reward();
  };

  // Cycle through animations on the hero title
  React.useEffect(() => {
    let animationIndex = 0;
    let cycleTimer: NodeJS.Timeout | null = null;
    let initialTimer: NodeJS.Timeout | null = null;
    let isScrolled = false;
    let isTabVisible = true;
    
    // Check if user has scrolled down
    const handleScroll = () => {
      const scrolled = window.scrollY > 200; // Stop after 200px scroll
      if (scrolled && !isScrolled) {
        isScrolled = true;
        // Clear timers when scrolled
        if (initialTimer) clearTimeout(initialTimer);
        if (cycleTimer) clearInterval(cycleTimer);
      } else if (!scrolled && isScrolled) {
        isScrolled = false;
        // Restart animations when scrolled back to top (and tab is visible)
        if (isTabVisible) {
          startAnimations();
        }
      }
    };
    
    // Check if tab is visible
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        // Clear timers when tab becomes hidden
        if (initialTimer) clearTimeout(initialTimer);
        if (cycleTimer) clearInterval(cycleTimer);
      } else if (!isScrolled) {
        // Restart animations when tab becomes visible (and not scrolled)
        startAnimations();
      }
    };
    
    const startAnimations = () => {
      // Clear any existing timers
      if (initialTimer) clearTimeout(initialTimer);
      if (cycleTimer) clearInterval(cycleTimer);
      
      // Initial animation after page load
      initialTimer = setTimeout(() => {
        if (!isScrolled && isTabVisible) {
          (heroRewards as any)[animationTypes[0]].reward();
        }
      }, 500);

      // Set up cycling through animations
      cycleTimer = setInterval(() => {
        if (!isScrolled && isTabVisible) {
          animationIndex = (animationIndex + 1) % animationTypes.length;
          setHeroAnimationIndex(animationIndex);
          
          // Wait for the current animation to mostly finish before starting the next
          setTimeout(() => {
            if (!isScrolled && isTabVisible) {
              (heroRewards as any)[animationTypes[animationIndex]].reward();
            }
          }, 100);
        }
      }, 2500); // Fire next animation after 2.5 seconds
    };
    
    // Start animations initially if tab is visible
    if (!document.hidden) {
      startAnimations();
    }
    
    // Add listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Check initial states
    handleScroll();
    isTabVisible = !document.hidden;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (initialTimer) clearTimeout(initialTimer);
      if (cycleTimer) clearInterval(cycleTimer);
    };
  }, []); // Empty deps to run only once

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
    if (selectedAnimation === 'emoji') {
      const defaultEmojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎯', '🎈', '🎁'];
      const newEmoji = defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
      setColors([...colors, newEmoji]);
    } else {
      const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setColors([...colors, newColor]);
    }
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

  const copyConfig = () => {
    const configText = JSON.stringify({ animationType: selectedAnimation, ...config, colors }, null, 2);
    navigator.clipboard.writeText(configText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="App">
      {/* Skip Navigation Link for Accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Hero Section */}
      <section className="hero-section" id="main-content">
        <div className="hero-content">
          <h1 
            className="hero-title" 
            id="hero-title"
            onClick={triggerHeroAnimation}
            style={{ cursor: 'pointer' }}
            title="Click for animation!"
          >
            Partycles
          </h1>
          <p className="hero-subtitle">
            Beautiful particle animations for React
          </p>
          <p className="hero-animation-indicator">
            <span className="animation-type-badge">{currentHeroAnimation}</span>
          </p>
          <p className="hero-description">
            Add delightful animations to your React app with just one hook. 
            Lightweight, customizable, and easy to use.
          </p>
          <div className="hero-buttons">
            <a href="#installation" className="primary-button">
              Get Started
            </a>
            <a 
              href="https://github.com/jonathanleane/partycles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="secondary-button"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="playground-section">
        <div className="section-container">
          <h2>Try it Live</h2>
          <p className="section-subtitle">Customize your animations in real-time!</p>

        <div className="playground-container">
          <div className="controls-panel">
            <h3>Animation Type</h3>
            <AnimationSelector
              selected={selectedAnimation}
              onChange={handleAnimationChange}
            />

            <h3>Basic Parameters</h3>
            <div className="control-group">
              <label title="Number of particles created in each animation burst">
                <span className="param-label">
                  <span>Particle Count</span>
                  <span className="value">{config.particleCount}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Angular spread of particles (0° = straight line, 360° = full circle)">
                <span className="param-label">
                  <span>Spread</span>
                  <span className="value">{config.spread}°</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Initial speed of particles - higher values create more explosive effects">
                <span className="param-label">
                  <span>Start Velocity</span>
                  <span className="value">{config.startVelocity}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Base size of each particle in pixels">
                <span className="param-label">
                  <span>Element Size</span>
                  <span className="value">{config.elementSize}px</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="How long particles live before fading out (in animation frames)">
                <span className="param-label">
                  <span>Lifetime</span>
                  <span className="value">{config.lifetime}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Downward acceleration - positive pulls down, negative makes particles float up">
                <span className="param-label">
                  <span>Gravity</span>
                  <span className="value">{config.physics.gravity.toFixed(2)}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Horizontal force - negative pushes left, positive pushes right">
                <span className="param-label">
                  <span>Wind</span>
                  <span className="value">{config.physics.wind.toFixed(2)}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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
              <label title="Air resistance - lower values slow particles more (0.9 = high friction, 1.0 = no friction)">
                <span className="param-label">
                  <span>Friction</span>
                  <span className="value">{config.physics.friction.toFixed(3)}</span>
                  <span className="tooltip-icon">?</span>
                </span>
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

            {/* Enhanced Effects Section */}
            {(selectedAnimation === 'confetti' || 
              selectedAnimation === 'stars' || 
              selectedAnimation === 'sparkles' || 
              selectedAnimation === 'hearts' || 
              selectedAnimation === 'coins' || 
              selectedAnimation === 'bubbles' || 
              selectedAnimation === 'snow' || 
              selectedAnimation === 'leaves') && (
              <>
                <h3 title="Optional visual enhancements">
                  Enhanced Effects <span className="badge">NEW</span> <span className="tooltip-icon">?</span>
                </h3>
                
                {selectedAnimation === 'confetti' && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.flutter || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, flutter: e.target.checked }
                        }))}
                      />
                      <span>Flutter Effect</span>
                      <span className="hint">Paper-like floating motion</span>
                    </label>
                  </div>
                )}
                
                {(selectedAnimation === 'stars' || selectedAnimation === 'sparkles') && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.twinkle || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, twinkle: e.target.checked }
                        }))}
                      />
                      <span>Twinkle Effect</span>
                      <span className="hint">Brightness variation</span>
                    </label>
                  </div>
                )}
                
                {selectedAnimation === 'hearts' && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.pulse || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, pulse: e.target.checked }
                        }))}
                      />
                      <span>Pulse Effect</span>
                      <span className="hint">Heartbeat animation</span>
                    </label>
                  </div>
                )}
                
                {selectedAnimation === 'coins' && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.spin3D || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, spin3D: e.target.checked }
                        }))}
                      />
                      <span>3D Spin</span>
                      <span className="hint">Realistic coin flip</span>
                    </label>
                  </div>
                )}
                
                {selectedAnimation === 'bubbles' && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.wobble || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, wobble: e.target.checked }
                        }))}
                      />
                      <span>Wobble Effect</span>
                      <span className="hint">Natural bubble movement</span>
                    </label>
                  </div>
                )}
                
                {(selectedAnimation === 'snow' || selectedAnimation === 'leaves') && (
                  <div className="control-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={config.effects?.windDrift || false}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          effects: { ...prev.effects, windDrift: e.target.checked }
                        }))}
                      />
                      <span>Wind Drift</span>
                      <span className="hint">Horizontal floating motion</span>
                    </label>
                  </div>
                )}
              </>
            )}

            {/* Radial Movement Section */}
            <h3 title="Configure particles to burst outward from the trigger point">
              Radial Movement <span className="badge">NEW</span> <span className="tooltip-icon">?</span>
            </h3>
            <div className="control-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={config.radial?.enabled || false}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    radial: { ...prev.radial, enabled: e.target.checked }
                  }))}
                />
                <span>Enable Radial Burst</span>
                <span className="hint">Particles move outward from center</span>
              </label>
            </div>

            {config.radial?.enabled && (
              <>
                <div className="control-group">
                  <label title="Pattern of radial movement">
                    <span className="param-label">
                      <span>Pattern</span>
                      <span className="tooltip-icon">?</span>
                    </span>
                    <select
                      value={config.radial?.pattern || 'circular'}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        radial: { ...prev.radial, pattern: e.target.value as 'circular' | 'cone' | 'random' | 'spiral' | 'vortex' | 'pinwheel' }
                      }))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                      <option value="circular">Circular - Even distribution</option>
                      <option value="cone">Cone - Upward burst</option>
                      <option value="random">Random - Chaotic burst</option>
                      <option value="spiral">Spiral - Rotating outward</option>
                      <option value="vortex">Vortex - Inward spiral drain</option>
                      <option value="pinwheel">Pinwheel - Catherine wheel</option>
                    </select>
                  </label>
                </div>

                <div className="control-group">
                  <label title="Randomness in particle angles (0 = uniform, 1 = very random)">
                    <span className="param-label">
                      <span>Angle Variation</span>
                      <span className="value">{(config.radial?.angleVariation ?? 0.2).toFixed(2)}</span>
                      <span className="tooltip-icon">?</span>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={config.radial?.angleVariation ?? 0.2}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        radial: { ...prev.radial, angleVariation: Number(e.target.value) }
                      }))}
                    />
                  </label>
                </div>

                <div className="control-group">
                  <label title="Randomness in particle velocities (0 = uniform speed, 1 = very varied)">
                    <span className="param-label">
                      <span>Velocity Variation</span>
                      <span className="value">{(config.radial?.velocityVariation ?? 0.3).toFixed(2)}</span>
                      <span className="tooltip-icon">?</span>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={config.radial?.velocityVariation ?? 0.3}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        radial: { ...prev.radial, velocityVariation: Number(e.target.value) }
                      }))}
                    />
                  </label>
                </div>

                {config.radial?.pattern === 'spiral' && (
                  <div className="control-group">
                    <label title="Number of complete rotations in the spiral">
                      <span className="param-label">
                        <span>Spiral Turns</span>
                        <span className="value">{(config.radial?.spiralTurns ?? 2).toFixed(1)}</span>
                        <span className="tooltip-icon">?</span>
                      </span>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={config.radial?.spiralTurns ?? 2}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          radial: { ...prev.radial, spiralTurns: Number(e.target.value) }
                        }))}
                      />
                    </label>
                  </div>
                )}

                {config.radial?.pattern === 'vortex' && (
                  <div className="control-group">
                    <label title="Strength of the inward pull - like a drain or black hole">
                      <span className="param-label">
                        <span>Vortex Pull</span>
                        <span className="value">{(config.radial?.vortexPull ?? 0.02).toFixed(3)}</span>
                        <span className="tooltip-icon">?</span>
                      </span>
                      <input
                        type="range"
                        min="0.005"
                        max="0.1"
                        step="0.005"
                        value={config.radial?.vortexPull ?? 0.02}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          radial: { ...prev.radial, vortexPull: Number(e.target.value) }
                        }))}
                      />
                    </label>
                  </div>
                )}

                {config.radial?.pattern === 'pinwheel' && (
                  <>
                    <div className="control-group">
                      <label title="Number of spinning arms in the pinwheel">
                        <span className="param-label">
                          <span>Pinwheel Arms</span>
                          <span className="value">{config.radial?.pinwheelArms ?? 4}</span>
                          <span className="tooltip-icon">?</span>
                        </span>
                        <input
                          type="range"
                          min="2"
                          max="8"
                          step="1"
                          value={config.radial?.pinwheelArms ?? 4}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            radial: { ...prev.radial, pinwheelArms: Number(e.target.value) }
                          }))}
                        />
                      </label>
                    </div>
                    <div className="control-group">
                      <label title="Speed of rotation">
                        <span className="param-label">
                          <span>Rotation Speed</span>
                          <span className="value">{(config.radial?.rotationSpeed ?? 0.2).toFixed(2)}</span>
                          <span className="tooltip-icon">?</span>
                        </span>
                        <input
                          type="range"
                          min="0.05"
                          max="1"
                          step="0.05"
                          value={config.radial?.rotationSpeed ?? 0.2}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            radial: { ...prev.radial, rotationSpeed: Number(e.target.value) }
                          }))}
                        />
                      </label>
                    </div>
                  </>
                )}
              </>
            )}

            <h3 title={selectedAnimation === 'emoji' ? "Select emoji preset or customize emojis" : "Particles randomly pick from these colors"}>
              {selectedAnimation === 'emoji' ? 'Emojis' : 'Colors'} <span className="tooltip-icon">?</span>
            </h3>
            {selectedAnimation === 'emoji' && (
              <div className="emoji-presets" style={{ marginBottom: '1rem' }}>
                <select 
                  onChange={(e) => {
                    const preset = e.target.value;
                    if (preset && preset !== 'custom') {
                      setColors(emojiPresets[preset as keyof typeof emojiPresets]);
                    }
                  }}
                >
                  <option value="custom">Custom</option>
                  <option value="celebration">🎉 Celebration</option>
                  <option value="love">❤️ Love</option>
                  <option value="happy">😊 Happy</option>
                  <option value="nature">🌸 Nature</option>
                  <option value="food">🍕 Food</option>
                </select>
              </div>
            )}
            <div className="colors-section">
              {colors.map((color, index) => (
                <div key={index} className="color-input">
                  {selectedAnimation === 'emoji' ? (
                    <>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        style={{ width: '60px' }}
                        maxLength={2}
                      />
                      <span className="color-value" style={{ fontSize: '1.5rem' }}>{color}</span>
                    </>
                  ) : (
                    <>
                      <input
                        type="color"
                        value={color.startsWith('rgba') ? '#42a5f5' : color}
                        onChange={(e) => updateColor(index, e.target.value)}
                      />
                      <span className="color-value">{color}</span>
                    </>
                  )}
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
                + Add {selectedAnimation === 'emoji' ? 'Emoji' : 'Color'}
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
              onClick={async () => {
                setAnimationCompleted(false);
                await reward();
                setAnimationCompleted(true);
                setTimeout(() => setAnimationCompleted(false), 2000);
              }}
              disabled={isAnimating}
              aria-label="Trigger particle animation"
              aria-disabled={isAnimating}
            >
              {isAnimating ? 'Animating...' : animationCompleted ? '✓ Animation Complete!' : 'Click to Trigger Animation!'}
            </button>

            <div className="config-display">
              <h4>Current Configuration</h4>
              <button 
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={copyConfig}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
              <pre>{highlightJSON(JSON.stringify({ 
                animationType: selectedAnimation, 
                ...config, 
                colors: colors.length > 3 ? [...colors.slice(0, 3), '...'] : colors 
              }, null, 2))}</pre>
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
                  physics: { gravity: 0.2, wind: 0.1, friction: 0.97 },
                  effects: { flutter: true }
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
                  physics: { gravity: 0.15, wind: 0.05, friction: 0.995 },
                  effects: { pulse: true }
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
                  physics: { gravity: -0.15, wind: 0.1, friction: 0.995 },
                  effects: { wobble: true }
                }}
              />
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="installation-section">
        <div className="section-container">
          <h2>Installation</h2>
          <div className="install-options">
            <div className="install-card">
              <h3>npm</h3>
              <pre><code>npm install partycles</code></pre>
            </div>
            <div className="install-card">
              <h3>yarn</h3>
              <pre><code>yarn add partycles</code></pre>
            </div>
            <div className="install-card">
              <h3>pnpm</h3>
              <pre><code>pnpm add partycles</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quickstart-section">
        <div className="section-container">
          <h2>Quick Start</h2>
          <p className="section-subtitle">Get up and running in seconds</p>
          
          <div className="code-example">
            <button 
              className="code-copy-btn"
              onClick={() => {
                const code = `import { useReward } from 'partycles';

function App() {
  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <button id="rewardId" onClick={reward}>
      Click me!
    </button>
  );
}`;
                navigator.clipboard.writeText(code);
                const btn = document.querySelector('.quickstart-section .code-copy-btn');
                if (btn) {
                  btn.classList.add('copied');
                  btn.textContent = '✓ Copied';
                  setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.textContent = 'Copy';
                  }, 2000);
                }
              }}
            >
              Copy
            </button>
            <pre><code>{highlightCode(`import { useReward } from 'partycles';

function App() {
  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <button id="rewardId" onClick={reward}>
      Click me!
    </button>
  );
}`)}</code></pre>
          </div>

          <h3>With Custom Configuration</h3>
          <div className="code-example">
            <button 
              className="code-copy-btn"
              onClick={() => {
                const code = `const { reward } = useReward('rewardId', 'confetti', {
  particleCount: 100,
  spread: 120,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  physics: {
    gravity: 0.5,
    wind: 0.1
  }
});`;
                navigator.clipboard.writeText(code);
                const btns = document.querySelectorAll('.quickstart-section .code-copy-btn');
                if (btns[1]) {
                  btns[1].classList.add('copied');
                  btns[1].textContent = '✓ Copied';
                  setTimeout(() => {
                    btns[1].classList.remove('copied');
                    btns[1].textContent = 'Copy';
                  }, 2000);
                }
              }}
            >
              Copy
            </button>
            <pre><code>{highlightCode(`const { reward } = useReward('rewardId', 'confetti', {
  particleCount: 100,
  spread: 120,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  physics: {
    gravity: 0.5,
    wind: 0.1
  }
});`)}</code></pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>19 Animation Types</h3>
              <p>Confetti, sparkles, fireworks, hearts, stars, bubbles, snow, emoji, coins, petals, aurora, fireflies, paint, balloons, galaxy, leaves, glitch, magic dust, and crystals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightweight</h3>
              <p>Zero dependencies, &lt;10KB gzipped, optimized performance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Fully Customizable</h3>
              <p>Control particle count, colors, physics, spread, velocity, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Browser Support</h3>
              <p>Chrome 60+ • Firefox 55+ • Safari 11+ • Edge 79+ • All modern mobile browsers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Framework Ready</h3>
              <p>TypeScript support • React 16.8+ • Works with Next.js, Gatsby, CRA, Vite & more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Easy to Use</h3>
              <p>Simple API with just one hook - useReward</p>
            </div>
          </div>
        </div>
      </section>


      {/* Examples Section */}
      <section className="examples-section">
        <div className="section-container">
          <h2>Live Examples</h2>
          <p className="section-subtitle">See how Partycles can enhance your React app</p>
          
          <div className="examples-grid">
            <ExampleCard
              title="Button Success"
              description="Perfect for form submissions and success actions"
              code={`const { reward } = useReward('success-btn', 'confetti', {
  particleCount: 30,
  spread: 60,
  startVelocity: 15,
  effects: { flutter: true }
});

// In your JSX:
<button 
  id="success-btn" 
  onClick={reward}
>
  Save Changes ✓
</button>`}
              animationType="confetti"
              config={{ particleCount: 30, spread: 60, startVelocity: 15, effects: { flutter: true } }}
            />
            
            <ExampleCard
              title="Like Animation"
              description="Engage users with delightful feedback"
              code={`const { reward } = useReward('like-btn', 'hearts', {
  particleCount: 20,
  spread: 50,
  elementSize: 25,
  effects: { pulse: true }
});

// In your JSX:
<button 
  id="like-btn" 
  onClick={reward}
>
  ❤️ Like
</button>`}
              animationType="hearts"
              config={{ particleCount: 20, spread: 50, elementSize: 25, effects: { pulse: true } }}
            />
            
            <ExampleCard
              title="Achievement Unlocked"
              description="Celebrate milestones and achievements"
              code={`const { reward } = useReward('achievement', 'stars', {
  particleCount: 35,
  spread: 120,
  startVelocity: 20,
  lifetime: 200,
  effects: {}
});

<div id="achievement" onClick={reward}>
  🏆 Achievement Unlocked!
</div>`}
              animationType="stars"
              config={{ particleCount: 35, spread: 120, startVelocity: 20, lifetime: 200, effects: { twinkle: true } }}
            />
            
            <ExampleCard
              title="Loading Complete"
              description="Make loading states more enjoyable"
              code={`const { reward } = useReward('load-done', 'sparkles', {
  particleCount: 40,
  spread: 90,
  elementSize: 8,
  effects: {}
});

// Trigger when loading completes
useEffect(() => {
  if (loadingComplete) reward();
}, [loadingComplete]);`}
              animationType="sparkles"
              config={{ particleCount: 40, spread: 90, elementSize: 8, effects: { twinkle: true } }}
            />
            
            <ExampleCard
              title="Purchase Success"
              description="Perfect for e-commerce and financial apps"
              code={`const { reward } = useReward('purchase-btn', 'coins', {
  particleCount: 25,
  spread: 60,
  startVelocity: 20,
  effects: { spin3D: true }
});

<button id="purchase-btn" onClick={handlePurchase}>
  💳 Complete Purchase
</button>`}
              animationType="coins"
              config={{ particleCount: 25, spread: 60, startVelocity: 20, effects: { spin3D: true } }}
            />
          </div>
        </div>
      </section>

      {/* Animation Controls Section */}
      <section className="controls-section">
        <div className="section-container">
          <h2>Animation Controls</h2>
          <p className="section-subtitle">Control your animations with imperative API methods</p>
          
          <ControlsDemo />
          
          <div className="api-card" style={{ marginTop: '2rem' }}>
            <h3>Control Methods</h3>
            <pre><code>{highlightCode(`const { 
  reward,      // Start animation
  pause,       // Pause animation
  resume,      // Resume animation
  replay,      // Replay animation
  isPaused,    // Check if paused
  isAnimating  // Check if animating
} = useReward(ref, 'confetti');`)}</code></pre>
            
            <p style={{ marginTop: '1rem', color: 'rgba(203, 213, 225, 0.9)' }}>
              These methods give you full control over the animation lifecycle,
              perfect for complex interactions and synchronized effects.
            </p>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="api-section">
        <div className="section-container">
          <h2>API Reference</h2>
          
          <div className="api-card">
            <h3>useReward Hook</h3>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(203, 213, 225, 0.9)', lineHeight: 1.6 }}>
              The main hook for creating particle animations. Supports both ref-based and ID-based APIs:
            </p>
            <pre><code>{highlightCode(`// Ref-based API (recommended)
const ref = useRef<HTMLElement>(null);
const { reward, isAnimating, pause, resume, replay, isPaused } = useReward(
  ref,
  animationType: AnimationType,
  config?: AnimationConfig
);

// ID-based API (legacy)
const { reward, isAnimating } = useReward(
  elementId: string,
  animationType: AnimationType,
  config?: AnimationConfig
);`)}</code></pre>

            <h4>Hook Parameters</h4>
            <ul>
              <li><code>elementRef/elementId</code> - React ref or ID of the element to trigger the animation from</li>
              <li><code>animationType</code> - One of: 'confetti', 'sparkles', 'fireworks', 'hearts', 'stars', 'bubbles', 'snow', 'emoji', 'coins', 'lightning', 'petals'</li>
              <li><code>config</code> - Optional configuration object (see below)</li>
            </ul>
            
            <h4>Return Values</h4>
            <ul>
              <li><code>reward()</code> - Triggers the animation, returns a Promise that resolves when complete</li>
              <li><code>isAnimating</code> - Boolean indicating if animation is currently running</li>
              <li><code>pause()</code> - Pauses the current animation</li>
              <li><code>resume()</code> - Resumes a paused animation</li>
              <li><code>replay()</code> - Stops current animation and starts a new one</li>
              <li><code>isPaused</code> - Boolean indicating if animation is paused</li>
              <li><code>targetRef</code> - The ref passed to the hook (ref-based API only)</li>
            </ul>

            <h4>Configuration Options</h4>
            <pre><code>{highlightCode(`interface AnimationConfig {
  particleCount?: number;     // Number of particles (default: varies by animation)
  spread?: number;            // Spread angle in degrees, 0-360 (default: varies)
  startVelocity?: number;     // Initial particle speed (default: varies)
  elementSize?: number;       // Base particle size in pixels (default: varies)
  lifetime?: number;          // Particle lifetime in frames (default: varies)
  colors?: string[];          // Array of colors or emojis (default: varies)
  physics?: {
    gravity?: number;         // Downward acceleration (-2 to 2, default: 0.35)
    wind?: number;            // Horizontal force (-2 to 2, default: 0)
    friction?: number;        // Air resistance (0.9-1, default: 0.98)
  };
}`)}</code></pre>
          </div>

          <div className="api-card">
            <h3>Emoji Presets</h3>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(203, 213, 225, 0.9)', lineHeight: 1.6 }}>
              When using the 'emoji' animation type, you can use predefined emoji sets:
            </p>
            <pre><code>{highlightCode(`import { emojiPresets } from 'partycles';

// Available presets:
emojiPresets.celebration  // 🎉🎊🥳🎈🎁🍾🥂🎆
emojiPresets.love        // ❤️💕💖💝💗💓💞💘
emojiPresets.happy       // 😊😄🥰😍🤗😘😁🤩
emojiPresets.nature      // 🌸🌺🌻🌹🌷🌼🍀🌿
emojiPresets.food        // 🍕🍔🍟🌮🍿🍩🍪🧁`)}</code></pre>
            
            <h4>Usage Example</h4>
            <pre><code>{highlightCode(`const { reward } = useReward('myButton', 'emoji', {
  colors: emojiPresets.celebration,
  particleCount: 40,
  spread: 120
});`)}</code></pre>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="compatibility-section">
        <div className="section-container">
          <h2>Compatibility</h2>
          <div className="compatibility-grid">
            <div className="compatibility-card">
              <h3>Browsers</h3>
              <ul>
                <li>Chrome 60+</li>
                <li>Firefox 55+</li>
                <li>Safari 11+</li>
                <li>Edge 79+</li>
              </ul>
            </div>
            <div className="compatibility-card">
              <h3>React</h3>
              <ul>
                <li>React 16.8+</li>
                <li>React 17.x</li>
                <li>React 18.x</li>
                <li>React Native Web</li>
              </ul>
            </div>
            <div className="compatibility-card">
              <h3>Frameworks</h3>
              <ul>
                <li>Next.js</li>
                <li>Gatsby</li>
                <li>Create React App</li>
                <li>Vite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-list">
            <FAQItem
              question="How does Partycles compare to other animation libraries?"
              answer="Partycles is specifically designed for particle animations in React with zero dependencies. Unlike general animation libraries, it's optimized for celebration effects and weighs less than 10KB gzipped. It provides a simple hook-based API that integrates seamlessly with React's component lifecycle."
            />
            
            <FAQItem
              question="Can I use Partycles with Next.js or other SSR frameworks?"
              answer="Yes! Partycles works great with Next.js, Gatsby, and other SSR frameworks. The animations are triggered client-side, so there are no SSR compatibility issues. Just import and use the hook as you would in any React component."
            />
            
            <FAQItem
              question="How can I trigger animations programmatically?"
              answer="The useReward hook returns a 'reward' function that you can call from anywhere in your component. You can trigger it in useEffect hooks, after API calls, on timers, or any other event. The element just needs to have the ID you specified."
            />
            
            <FAQItem
              question="Can I use multiple animations on the same page?"
              answer="Absolutely! You can use as many useReward hooks as you need, each with different IDs and configurations. Each animation is independent and won't interfere with others."
            />
            
            <FAQItem
              question="How do I customize the physics for realistic effects?"
              answer="Use the physics object in the configuration to control gravity (downward force), wind (horizontal force), and friction (air resistance). For example, negative gravity makes particles float up (great for bubbles), while high friction makes particles slow down quickly."
            />
            
            <FAQItem
              question="Is Partycles accessible?"
              answer="Yes! Partycles animations are decorative and don't interfere with screen readers or keyboard navigation. The animations use aria-hidden particles that don't affect the accessibility tree. Always ensure your trigger elements are properly labeled."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Partycles</h4>
            <p>Beautiful particle animations for React</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <a href="https://github.com/jonathanleane/partycles" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/package/partycles" target="_blank" rel="noopener noreferrer">npm</a>
            <a href="#installation">Documentation</a>
          </div>
          <div className="footer-section">
            <h4>Created by</h4>
            <p>Jonathan Leane</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Partycles. MIT License.</p>
        </div>
      </footer>
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

function ExampleCard({ title, description, code, animationType, config }: {
  title: string;
  description: string;
  code: string;
  animationType: string;
  config: any;
}) {
  const [copied, setCopied] = useState(false);
  const { reward, isAnimating } = useReward(`example-${title}`, animationType as any, config);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="example-card">
      <h3>{title}</h3>
      <p>{description}</p>
      
      <div className="example-demo">
        <button
          className="example-trigger"
          id={`example-${title}`}
          onClick={reward}
          disabled={isAnimating}
        >
          Try it!
        </button>
      </div>
      
      <div className="example-code">
        <button
          className={`code-copy-btn ${copied ? 'copied' : ''}`}
          onClick={copyCode}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <pre><code>{highlightCode(code)}</code></pre>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function AnimationSelector({ selected, onChange }: {
  selected: string;
  onChange: (animation: keyof typeof defaultConfigs) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const animations = {
    celebration: [
      { id: 'confetti', name: 'Confetti', icon: '🎊', desc: 'Classic celebration' },
      { id: 'fireworks', name: 'Fireworks', icon: '🎆', desc: 'Explosive bursts' },
      { id: 'sparkles', name: 'Sparkles', icon: '✨', desc: 'Magical glitter' },
      { id: 'stars', name: 'Stars', icon: '⭐', desc: 'Shining stars' },
      { id: 'balloons', name: 'Balloons', icon: '🎈', desc: 'Floating balloons' },
    ],
    emotions: [
      { id: 'hearts', name: 'Hearts', icon: '💕', desc: 'Love and likes' },
      { id: 'emoji', name: 'Emoji', icon: '🎉', desc: 'Custom expressions' },
    ],
    nature: [
      { id: 'bubbles', name: 'Bubbles', icon: '🫧', desc: 'Floating bubbles' },
      { id: 'snow', name: 'Snow', icon: '❄️', desc: 'Gentle snowfall' },
      { id: 'petals', name: 'Petals', icon: '🌸', desc: 'Flower petals' },
      { id: 'fireflies', name: 'Fireflies', icon: '✨', desc: 'Glowing lights' },
      { id: 'aurora', name: 'Aurora', icon: '🌌', desc: 'Northern lights' },
      { id: 'leaves', name: 'Autumn Leaves', icon: '🍂', desc: 'Falling leaves' },
    ],
    tech: [
      { id: 'glitch', name: 'Glitch', icon: '📺', desc: 'Digital distortion' },
    ],
    magic: [
      { id: 'magicdust', name: 'Magic Dust', icon: '✨', desc: 'Mystical sparkles' },
      { id: 'crystals', name: 'Crystals', icon: '💎', desc: 'Shimmering gems' },
    ],
    rewards: [
      { id: 'coins', name: 'Coins', icon: '🪙', desc: 'Treasure coins' },
      { id: 'paint', name: 'Paint', icon: '🎨', desc: 'Paint splatter' },
      { id: 'galaxy', name: 'Galaxy', icon: '🌌', desc: 'Cosmic particles' },
    ],
  };

  const selectedAnimation = Object.values(animations).flat().find(a => a.id === selected);

  return (
    <div className="animation-selector">
      <div className="animation-dropdown">
        <button
          className={`animation-selected ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="animation-selected-icon">{selectedAnimation?.icon}</span>
            <span>{selectedAnimation?.name}</span>
          </span>
          <span className="animation-dropdown-arrow">▼</span>
        </button>
        
        <div className={`animation-options ${isOpen ? 'open' : ''}`}>
          {Object.entries(animations).map(([category, items]) => (
            <div key={category} className="animation-category">
              <div className="animation-category-title">{category}</div>
              {items.map((animation) => (
                <button
                  key={animation.id}
                  className={`animation-option ${selected === animation.id ? 'active' : ''}`}
                  onClick={() => {
                    onChange(animation.id as keyof typeof defaultConfigs);
                    setIsOpen(false);
                  }}
                >
                  <span className="animation-option-icon">{animation.icon}</span>
                  <div className="animation-option-info">
                    <span className="animation-option-name">{animation.name}</span>
                    <span className="animation-option-desc">{animation.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;