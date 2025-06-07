import React, { useState } from 'react';
import { useReward, emojiPresets } from './react-surprise/index';
import './App.css';

const defaultColors = {
  confetti: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'],
  sparkles: ['#FFD700', '#FFFFFF'],
  hearts: ['#ff1744', '#e91e63', '#ff4569', '#ff6b6b'],
  fireworks: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  bubbles: ['rgba(66, 165, 245, 0.4)', 'rgba(41, 182, 246, 0.4)'],
  stars: ['#FFD700', '#FFA500', '#FF6347'],
  snow: ['#FFFFFF', '#F0F8FF', '#F5F5F5', '#FAFAFA'],
  emoji: ['🎉', '🎊', '🎈', '🎁', '✨', '🌟', '💫', '🎯'],
  coins: ['#FFD700', '#FFA500', '#FFB300', '#FFC700'],
  lightning: ['#FFFF00', '#FFFFFF', '#00FFFF', '#FF00FF'],
  petals: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFF0F5'],
  aurora: ['#00ff88', '#00ffaa', '#00ddff', '#0099ff', '#0066ff', '#9933ff', '#ff00ff'],
  fireflies: ['#FFFF99', '#FFFFCC', '#FFFF66', '#FFFFAA'],
  paint: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4'],
  music: ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#FFBE0B'],
  balloons: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4', '#FF4081'],
  galaxy: ['#FFFFFF', '#FFF9C4', '#BBDEFB', '#C5CAE9', '#D1C4E9', '#FFE082', '#FFCCBC'],
  butterflies: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFDAB9'],
  leaves: ['#D2691E', '#CD853F', '#A0522D', '#8B4513', '#FF8C00', '#FF6347'],
  rain: ['#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD'],
  dandelion: ['#FFFACD', '#FFF8DC', '#FFFFE0', '#FFFFF0', '#F0FFF0', '#F5FFFA'],
  bees: ['#FFD700', '#FFA500', '#000000', '#FFFF00', '#FFC107', '#FFB300'],
  matrix: ['#00FF00', '#00DD00', '#00BB00', '#009900', '#007700', '#005500'],
  pixels: ['#FF0080', '#00FF00', '#00FFFF', '#FFFF00', '#FF00FF', '#0080FF'],
  glitch: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  dice: ['#FFFFFF', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E'],
  levelup: ['#FFD700', '#00FF00', '#00FFFF', '#FF00FF', '#FFFF00', '#FF4500'],
  magicdust: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#FFD700'],
  ghosts: ['#FFFFFF', '#F8F8FF', '#F0F8FF', '#F5F5F5', '#FAFAFA', '#FFF5EE'],
  crystals: ['#E91E63', '#9C27B0', '#3F51B5', '#00BCD4', '#4CAF50', '#FFEB3B'],
  dragons: ['#FF6B35', '#F7931E', '#FFD700', '#FF0000', '#8B0000', '#FF4500'],
  runes: ['#9C27B0', '#673AB7', '#3F51B5', '#1976D2', '#00ACC1', '#00897B'],
  popcorn: ['#FFE5B4', '#FFF8DC', '#FFFACD', '#FFF5EE', '#FFDAB9', '#FFE4B5'],
  champagne: ['#F0E68C', '#FFD700', '#FFF8DC', '#FFFACD', '#FAFAD2', '#EEE8AA'],
  candy: ['#FF1744', '#F50057', '#E91E63', '#D500F9', '#651FFF', '#00E676'],
  donuts: ['#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFC0CB'],
  pizza: ['#FF6347', '#FF4500', '#FFD700', '#228B22', '#8B4513', '#FFF8DC'],
};

const defaultConfigs = {
  confetti: {
    particleCount: 50,
    spread: 90,
    startVelocity: 20,
    elementSize: 20,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  sparkles: {
    particleCount: 35,
    spread: 120,
    startVelocity: 15,
    elementSize: 25,
    lifetime: 120,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  hearts: {
    particleCount: 25,
    spread: 70,
    startVelocity: 12,
    elementSize: 30,
    lifetime: 180,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  fireworks: {
    particleCount: 60,
    spread: 180,
    startVelocity: 25,
    elementSize: 8,
    lifetime: 140,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  bubbles: {
    particleCount: 30,
    spread: 80,
    startVelocity: 3,
    elementSize: 40,
    lifetime: 300,
    physics: { gravity: -0.05, wind: 0.02, friction: 0.995 }
  },
  stars: {
    particleCount: 40,
    spread: 100,
    startVelocity: 18,
    elementSize: 30,
    lifetime: 150,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  snow: {
    particleCount: 50,
    spread: 200,
    startVelocity: 3,
    elementSize: 15,
    lifetime: 300,
    physics: { gravity: 0.05, wind: 0.1, friction: 0.99 }
  },
  emoji: {
    particleCount: 30,
    spread: 100,
    startVelocity: 15,
    elementSize: 35,
    lifetime: 180,
    physics: { gravity: 0.35, wind: 0, friction: 0.98 }
  },
  coins: {
    particleCount: 30,
    spread: 70,
    startVelocity: 25,
    elementSize: 25,
    lifetime: 120,
    physics: { gravity: 0.5, wind: 0, friction: 0.97 }
  },
  lightning: {
    particleCount: 20,
    spread: 360,
    startVelocity: 50,
    elementSize: 30,
    lifetime: 60,
    physics: { gravity: 0.1, wind: 0, friction: 0.95 }
  },
  petals: {
    particleCount: 40,
    spread: 100,
    startVelocity: 8,
    elementSize: 20,
    lifetime: 200,
    physics: { gravity: 0.08, wind: 0.15, friction: 0.99 }
  },
  aurora: {
    particleCount: 15,
    spread: 200,
    startVelocity: 3,
    elementSize: 100,
    lifetime: 250,
    physics: { gravity: -0.2, wind: 0, friction: 0.99 }
  },
  fireflies: {
    particleCount: 20,
    spread: 150,
    startVelocity: 2,
    elementSize: 8,
    lifetime: 300,
    physics: { gravity: 0, wind: 0, friction: 0.99 }
  },
  paint: {
    particleCount: 25,
    spread: 120,
    startVelocity: 35,
    elementSize: 30,
    lifetime: 150,
    physics: { gravity: 0.6, wind: 0, friction: 0.96 }
  },
  music: {
    particleCount: 20,
    spread: 100,
    startVelocity: 3,
    elementSize: 30,
    lifetime: 300,
    physics: { gravity: -0.08, wind: 0.01, friction: 0.995 }
  },
  balloons: {
    particleCount: 15,
    spread: 80,
    startVelocity: 3,
    elementSize: 35,
    lifetime: 400,
    physics: { gravity: -0.05, wind: 0.02, friction: 0.998 }
  },
  galaxy: {
    particleCount: 60,
    spread: 200,
    startVelocity: 15,
    elementSize: 8,
    lifetime: 250,
    physics: { gravity: 0, wind: 0, friction: 0.995 }
  },
  butterflies: {
    particleCount: 20,
    spread: 120,
    startVelocity: 8,
    elementSize: 30,
    lifetime: 200,
    physics: { gravity: -0.05, wind: 0.1, friction: 0.99 }
  },
  leaves: {
    particleCount: 30,
    spread: 150,
    startVelocity: 5,
    elementSize: 25,
    lifetime: 250,
    physics: { gravity: 0.15, wind: 0.2, friction: 0.99 }
  },
  rain: {
    particleCount: 50,
    spread: 100,
    startVelocity: 40,
    elementSize: 15,
    lifetime: 100,
    physics: { gravity: 1.5, wind: 0.1, friction: 0.98 }
  },
  dandelion: {
    particleCount: 25,
    spread: 120,
    startVelocity: 4,
    elementSize: 20,
    lifetime: 300,
    physics: { gravity: 0.02, wind: 0.3, friction: 0.995 }
  },
  bees: {
    particleCount: 15,
    spread: 100,
    startVelocity: 12,
    elementSize: 25,
    lifetime: 250,
    physics: { gravity: 0, wind: 0, friction: 0.99 }
  },
  matrix: {
    particleCount: 40,
    spread: 180,
    startVelocity: 20,
    elementSize: 20,
    lifetime: 150,
    physics: { gravity: 0.5, wind: 0, friction: 0.98 }
  },
  pixels: {
    particleCount: 30,
    spread: 360,
    startVelocity: 30,
    elementSize: 15,
    lifetime: 120,
    physics: { gravity: 0, wind: 0, friction: 0.95 }
  },
  glitch: {
    particleCount: 25,
    spread: 360,
    startVelocity: 50,
    elementSize: 30,
    lifetime: 80,
    physics: { gravity: 0, wind: 0, friction: 0.9 }
  },
  dice: {
    particleCount: 12,
    spread: 90,
    startVelocity: 25,
    elementSize: 35,
    lifetime: 150,
    physics: { gravity: 0.6, wind: 0, friction: 0.97 }
  },
  levelup: {
    particleCount: 20,
    spread: 120,
    startVelocity: 15,
    elementSize: 40,
    lifetime: 180,
    physics: { gravity: -0.2, wind: 0, friction: 0.99 }
  },
  magicdust: {
    particleCount: 35,
    spread: 150,
    startVelocity: 8,
    elementSize: 15,
    lifetime: 200,
    physics: { gravity: -0.1, wind: 0.05, friction: 0.995 }
  },
  ghosts: {
    particleCount: 10,
    spread: 100,
    startVelocity: 6,
    elementSize: 40,
    lifetime: 250,
    physics: { gravity: -0.15, wind: 0.1, friction: 0.99 }
  },
  crystals: {
    particleCount: 20,
    spread: 120,
    startVelocity: 20,
    elementSize: 25,
    lifetime: 180,
    physics: { gravity: 0.4, wind: 0, friction: 0.98 }
  },
  dragons: {
    particleCount: 8,
    spread: 180,
    startVelocity: 15,
    elementSize: 50,
    lifetime: 200,
    physics: { gravity: 0, wind: 0, friction: 0.99 }
  },
  runes: {
    particleCount: 15,
    spread: 120,
    startVelocity: 5,
    elementSize: 35,
    lifetime: 220,
    physics: { gravity: -0.08, wind: 0, friction: 0.995 }
  },
  popcorn: {
    particleCount: 25,
    spread: 120,
    startVelocity: 35,
    elementSize: 30,
    lifetime: 140,
    physics: { gravity: 0.8, wind: 0, friction: 0.96 }
  },
  champagne: {
    particleCount: 40,
    spread: 90,
    startVelocity: 25,
    elementSize: 20,
    lifetime: 180,
    physics: { gravity: -0.3, wind: 0, friction: 0.98 }
  },
  candy: {
    particleCount: 30,
    spread: 100,
    startVelocity: 15,
    elementSize: 35,
    lifetime: 200,
    physics: { gravity: 0.5, wind: 0.05, friction: 0.98 }
  },
  donuts: {
    particleCount: 20,
    spread: 120,
    startVelocity: 20,
    elementSize: 40,
    lifetime: 160,
    physics: { gravity: 0.6, wind: 0, friction: 0.97 }
  },
  pizza: {
    particleCount: 18,
    spread: 100,
    startVelocity: 25,
    elementSize: 45,
    lifetime: 150,
    physics: { gravity: 0.7, wind: 0, friction: 0.96 }
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
  const [config, setConfig] = useState(defaultConfigs[selectedAnimation]);
  const [colors, setColors] = useState(defaultColors[selectedAnimation]);
  const [showPresets, setShowPresets] = useState(false);
  const [copied, setCopied] = useState(false);

  const { reward, isAnimating } = useReward('playground', selectedAnimation, {
    ...config,
    colors: colors.length > 0 ? colors : undefined,
  });

  // Hero title animation - cycle through all animation types
  const animationTypes = Object.keys(defaultConfigs) as Array<keyof typeof defaultConfigs>;
  const [heroAnimationIndex, setHeroAnimationIndex] = useState(0);
  const currentHeroAnimation = animationTypes[heroAnimationIndex];

  // Create reward hooks for each animation type
  const heroRewards = {
    confetti: useReward('hero-title', 'confetti', { ...defaultConfigs.confetti, particleCount: 40, colors: defaultColors.confetti }),
    sparkles: useReward('hero-title', 'sparkles', { ...defaultConfigs.sparkles, particleCount: 35, colors: defaultColors.sparkles }),
    hearts: useReward('hero-title', 'hearts', { ...defaultConfigs.hearts, particleCount: 25, colors: defaultColors.hearts }),
    fireworks: useReward('hero-title', 'fireworks', { ...defaultConfigs.fireworks, particleCount: 50, colors: defaultColors.fireworks }),
    bubbles: useReward('hero-title', 'bubbles', { ...defaultConfigs.bubbles, particleCount: 25, colors: defaultColors.bubbles }),
    stars: useReward('hero-title', 'stars', { ...defaultConfigs.stars, particleCount: 35, colors: defaultColors.stars }),
    snow: useReward('hero-title', 'snow', { ...defaultConfigs.snow, particleCount: 40, colors: defaultColors.snow }),
    emoji: useReward('hero-title', 'emoji', { ...defaultConfigs.emoji, particleCount: 25, colors: emojiPresets.celebration }),
    coins: useReward('hero-title', 'coins', { ...defaultConfigs.coins, particleCount: 25, colors: defaultColors.coins }),
    lightning: useReward('hero-title', 'lightning', { ...defaultConfigs.lightning, particleCount: 15, colors: defaultColors.lightning }),
    petals: useReward('hero-title', 'petals', { ...defaultConfigs.petals, particleCount: 35, colors: defaultColors.petals }),
    aurora: useReward('hero-title', 'aurora', { ...defaultConfigs.aurora, particleCount: 12, colors: defaultColors.aurora }),
    fireflies: useReward('hero-title', 'fireflies', { ...defaultConfigs.fireflies, particleCount: 15, colors: defaultColors.fireflies }),
    paint: useReward('hero-title', 'paint', { ...defaultConfigs.paint, particleCount: 20, colors: defaultColors.paint }),
    music: useReward('hero-title', 'music', { ...defaultConfigs.music, particleCount: 12, colors: defaultColors.music }),
    balloons: useReward('hero-title', 'balloons', { ...defaultConfigs.balloons, particleCount: 10, colors: defaultColors.balloons }),
    galaxy: useReward('hero-title', 'galaxy', { ...defaultConfigs.galaxy, particleCount: 40, colors: defaultColors.galaxy }),
    butterflies: useReward('hero-title', 'butterflies', { ...defaultConfigs.butterflies, particleCount: 15, colors: defaultColors.butterflies }),
    leaves: useReward('hero-title', 'leaves', { ...defaultConfigs.leaves, particleCount: 25, colors: defaultColors.leaves }),
    rain: useReward('hero-title', 'rain', { ...defaultConfigs.rain, particleCount: 35, colors: defaultColors.rain }),
    dandelion: useReward('hero-title', 'dandelion', { ...defaultConfigs.dandelion, particleCount: 20, colors: defaultColors.dandelion }),
    bees: useReward('hero-title', 'bees', { ...defaultConfigs.bees, particleCount: 12, colors: defaultColors.bees }),
    matrix: useReward('hero-title', 'matrix', { ...defaultConfigs.matrix, particleCount: 30, colors: defaultColors.matrix }),
    pixels: useReward('hero-title', 'pixels', { ...defaultConfigs.pixels, particleCount: 25, colors: defaultColors.pixels }),
    glitch: useReward('hero-title', 'glitch', { ...defaultConfigs.glitch, particleCount: 20, colors: defaultColors.glitch }),
    dice: useReward('hero-title', 'dice', { ...defaultConfigs.dice, particleCount: 10, colors: defaultColors.dice }),
    levelup: useReward('hero-title', 'levelup', { ...defaultConfigs.levelup, particleCount: 15, colors: defaultColors.levelup }),
    magicdust: useReward('hero-title', 'magicdust', { ...defaultConfigs.magicdust, particleCount: 25, colors: defaultColors.magicdust }),
    ghosts: useReward('hero-title', 'ghosts', { ...defaultConfigs.ghosts, particleCount: 8, colors: defaultColors.ghosts }),
    crystals: useReward('hero-title', 'crystals', { ...defaultConfigs.crystals, particleCount: 15, colors: defaultColors.crystals }),
    dragons: useReward('hero-title', 'dragons', { ...defaultConfigs.dragons, particleCount: 6, colors: defaultColors.dragons }),
    runes: useReward('hero-title', 'runes', { ...defaultConfigs.runes, particleCount: 12, colors: defaultColors.runes }),
    popcorn: useReward('hero-title', 'popcorn', { ...defaultConfigs.popcorn, particleCount: 20, colors: defaultColors.popcorn }),
    champagne: useReward('hero-title', 'champagne', { ...defaultConfigs.champagne, particleCount: 30, colors: defaultColors.champagne }),
    candy: useReward('hero-title', 'candy', { ...defaultConfigs.candy, particleCount: 25, colors: defaultColors.candy }),
    donuts: useReward('hero-title', 'donuts', { ...defaultConfigs.donuts, particleCount: 15, colors: defaultColors.donuts }),
    pizza: useReward('hero-title', 'pizza', { ...defaultConfigs.pizza, particleCount: 12, colors: defaultColors.pizza }),
  };

  const triggerHeroAnimation = () => {
    heroRewards[currentHeroAnimation].reward();
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
          heroRewards[animationTypes[0]].reward();
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
              heroRewards[animationTypes[animationIndex]].reward();
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
              onClick={reward}
              disabled={isAnimating}
              aria-label="Trigger particle animation"
              aria-disabled={isAnimating}
            >
              Click to Trigger Animation!
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
              <h3>37 Animation Types</h3>
              <p>Confetti, sparkles, fireworks, hearts, stars, bubbles, snow, emoji, coins, lightning, petals, aurora, fireflies, paint, music, balloons, galaxy, butterflies, leaves, rain, dandelion, bees, matrix, pixels, glitch, dice, level up, magic dust, ghosts, crystals, dragons, runes, popcorn, champagne, candy, donuts, and pizza</p>
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
  startVelocity: 15
});

// In your JSX:
<button 
  id="success-btn" 
  onClick={reward}
>
  Save Changes ✓
</button>`}
              animationType="confetti"
              config={{ particleCount: 30, spread: 60, startVelocity: 15 }}
            />
            
            <ExampleCard
              title="Like Animation"
              description="Engage users with delightful feedback"
              code={`const { reward } = useReward('like-btn', 'hearts', {
  particleCount: 20,
  spread: 50,
  elementSize: 25
});

// In your JSX:
<button 
  id="like-btn" 
  onClick={reward}
>
  ❤️ Like
</button>`}
              animationType="hearts"
              config={{ particleCount: 20, spread: 50, elementSize: 25 }}
            />
            
            <ExampleCard
              title="Achievement Unlocked"
              description="Celebrate milestones and achievements"
              code={`const { reward } = useReward('achievement', 'stars', {
  particleCount: 35,
  spread: 120,
  startVelocity: 20,
  lifetime: 200
});

<div id="achievement" onClick={reward}>
  🏆 Achievement Unlocked!
</div>`}
              animationType="stars"
              config={{ particleCount: 35, spread: 120, startVelocity: 20, lifetime: 200 }}
            />
            
            <ExampleCard
              title="Loading Complete"
              description="Make loading states more enjoyable"
              code={`const { reward } = useReward('load-done', 'sparkles', {
  particleCount: 40,
  spread: 90,
  elementSize: 8
});

// Trigger when loading completes
useEffect(() => {
  if (loadingComplete) reward();
}, [loadingComplete]);`}
              animationType="sparkles"
              config={{ particleCount: 40, spread: 90, elementSize: 8 }}
            />
            
            <ExampleCard
              title="Purchase Success"
              description="Perfect for e-commerce and financial apps"
              code={`const { reward } = useReward('purchase-btn', 'coins', {
  particleCount: 25,
  spread: 60,
  startVelocity: 20
});

<button id="purchase-btn" onClick={handlePurchase}>
  💳 Complete Purchase
</button>`}
              animationType="coins"
              config={{ particleCount: 25, spread: 60, startVelocity: 20 }}
            />
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
              The main hook for creating particle animations:
            </p>
            <pre><code>{highlightCode(`const { reward, isAnimating } = useReward(
  elementId: string,
  animationType: AnimationType,
  config?: AnimationConfig
);`)}</code></pre>

            <h4>Hook Parameters</h4>
            <ul>
              <li><code>elementId</code> - The ID of the element to trigger the animation from</li>
              <li><code>animationType</code> - One of: 'confetti', 'sparkles', 'fireworks', 'hearts', 'stars', 'bubbles', 'snow', 'emoji', 'coins', 'lightning', 'petals'</li>
              <li><code>config</code> - Optional configuration object (see below)</li>
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
      { id: 'popcorn', name: 'Popcorn', icon: '🍿', desc: 'Popping kernels' },
      { id: 'champagne', name: 'Champagne', icon: '🍾', desc: 'Fizzy celebration' },
    ],
    emotions: [
      { id: 'hearts', name: 'Hearts', icon: '💕', desc: 'Love and likes' },
      { id: 'emoji', name: 'Emoji', icon: '🎉', desc: 'Custom expressions' },
      { id: 'music', name: 'Music', icon: '🎵', desc: 'Musical notes' },
    ],
    nature: [
      { id: 'bubbles', name: 'Bubbles', icon: '🫧', desc: 'Floating bubbles' },
      { id: 'snow', name: 'Snow', icon: '❄️', desc: 'Gentle snowfall' },
      { id: 'petals', name: 'Petals', icon: '🌸', desc: 'Flower petals' },
      { id: 'fireflies', name: 'Fireflies', icon: '✨', desc: 'Glowing lights' },
      { id: 'aurora', name: 'Aurora', icon: '🌌', desc: 'Northern lights' },
      { id: 'butterflies', name: 'Butterflies', icon: '🦋', desc: 'Fluttering wings' },
      { id: 'leaves', name: 'Autumn Leaves', icon: '🍂', desc: 'Falling leaves' },
      { id: 'rain', name: 'Rain', icon: '🌧️', desc: 'Raindrops falling' },
      { id: 'dandelion', name: 'Dandelion', icon: '🌾', desc: 'Floating seeds' },
      { id: 'bees', name: 'Bees', icon: '🐝', desc: 'Buzzing around' },
    ],
    tech: [
      { id: 'matrix', name: 'Matrix', icon: '💻', desc: 'Digital rain' },
      { id: 'pixels', name: 'Pixels', icon: '🟦', desc: '8-bit explosion' },
      { id: 'glitch', name: 'Glitch', icon: '📺', desc: 'Digital distortion' },
      { id: 'dice', name: 'Dice', icon: '🎲', desc: 'Rolling dice' },
      { id: 'levelup', name: 'Level Up', icon: '🎮', desc: 'Gaming rewards' },
    ],
    magic: [
      { id: 'magicdust', name: 'Magic Dust', icon: '✨', desc: 'Mystical sparkles' },
      { id: 'ghosts', name: 'Ghosts', icon: '👻', desc: 'Spooky spirits' },
      { id: 'crystals', name: 'Crystals', icon: '💎', desc: 'Shimmering gems' },
      { id: 'dragons', name: 'Dragons', icon: '🐉', desc: 'Fire breathing' },
      { id: 'runes', name: 'Runes', icon: '🔮', desc: 'Ancient symbols' },
    ],
    food: [
      { id: 'candy', name: 'Candy', icon: '🍬', desc: 'Sweet treats' },
      { id: 'donuts', name: 'Donuts', icon: '🍩', desc: 'Spinning donuts' },
      { id: 'pizza', name: 'Pizza', icon: '🍕', desc: 'Pizza slices' },
    ],
    special: [
      { id: 'coins', name: 'Coins', icon: '💰', desc: 'Money & rewards' },
      { id: 'lightning', name: 'Lightning', icon: '⚡', desc: 'Electric energy' },
      { id: 'paint', name: 'Paint', icon: '🎨', desc: 'Paint splatter' },
      { id: 'galaxy', name: 'Galaxy', icon: '🌟', desc: 'Spiral stars' },
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