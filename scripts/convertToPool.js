const fs = require('fs');
const path = require('path');

const animationsDir = path.join(__dirname, '../src/animations');
const animationFiles = fs.readdirSync(animationsDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

for (const file of animationFiles) {
  const filePath = path.join(animationsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already converted
  if (content.includes('createPooledParticles')) {
    console.log(`✓ ${file} already uses particle pool`);
    continue;
  }
  
  // Add import
  if (!content.includes("import { createPooledParticles } from '../particlePool';")) {
    const lastImportMatch = content.match(/import.*from.*;\n(?!import)/);
    if (lastImportMatch) {
      const insertPos = lastImportMatch.index + lastImportMatch[0].length - 1;
      content = content.slice(0, insertPos) + "\nimport { createPooledParticles } from '../particlePool';" + content.slice(insertPos);
    }
  }
  
  // Find and convert create functions
  const createFunctionRegex = /export const create\w+Particles[\s\S]*?\n\};\n/g;
  content = content.replace(createFunctionRegex, (match) => {
    // Check if it has a for loop creating particles
    if (match.includes('const particles: Particle[] = []') && match.includes('for (let i = 0; i < particleCount; i++)')) {
      // Extract the loop body
      const loopBodyMatch = match.match(/for \(let i = 0; i < particleCount; i\+\+\) \{([\s\S]*?)\n  \}/);
      if (loopBodyMatch) {
        const loopBody = loopBodyMatch[1];
        
        // Extract what's being pushed
        const pushMatch = loopBody.match(/particles\.push\(\{([\s\S]*?)\}\);/);
        if (pushMatch) {
          const particleProps = pushMatch[1];
          
          // Replace the loop with createPooledParticles
          const newMatch = match.replace(
            /const particles: Particle\[\] = \[\];\n\n  for \(let i = 0; i < particleCount; i\+\+\) \{[\s\S]*?\n  \}\n\n  return particles;/,
            `return createPooledParticles(particleCount, (i) => {${loopBody.replace(/particles\.push\(\{/, 'return {').replace(/\}\);$/, '}')}\n  });`
          );
          
          return newMatch;
        }
      }
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Converted ${file} to use particle pool`);
}