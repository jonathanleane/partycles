const fs = require('fs');
const path = require('path');

const animationsDir = path.join(__dirname, '../src/animations');
const filesToCheck = [
  'balloons.tsx',
  'bubbles.tsx', 
  'coins.tsx',
  'confetti.tsx',
  'crystals.tsx',
  'fireflies.tsx',
  'hearts.tsx',
  'leaves.tsx',
  'paint.tsx',
  'petals.tsx',
  'snow.tsx',
  'sparkles.tsx',
  'stars.tsx'
];

for (const file of filesToCheck) {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file uses createPooledParticles with (i)
  if (!content.includes('createPooledParticles(particleCount, (i)')) {
    console.log(`✓ ${file} doesn't have unused parameter`);
    continue;
  }
  
  // Check if i is actually used in the function body
  const regex = /createPooledParticles\(particleCount, \(i\) => {([\s\S]*?)}\);/;
  const match = content.match(regex);
  
  if (match) {
    const functionBody = match[1];
    // Check if i is used (but not as part of another word)
    if (!functionBody.match(/\bi\b/)) {
      // Replace (i) with ()
      content = content.replace(
        'createPooledParticles(particleCount, (i) => {',
        'createPooledParticles(particleCount, () => {'
      );
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed ${file} - removed unused parameter`);
    } else {
      console.log(`✓ ${file} uses parameter i - no change needed`);
    }
  }
}