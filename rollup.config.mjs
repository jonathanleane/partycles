import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Base configuration shared by all builds
const baseConfig = {
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    })
  ]
};

// Main bundle with all animations
const mainBundle = {
  ...baseConfig,
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ]
};

// Individual animation bundles for better tree-shaking
const animationBundles = [
  'confetti',
  'sparkles',
  'hearts',
  'fireworks',
  'bubbles',
  'stars',
  'snow',
  'emoji'
].map(name => ({
  ...baseConfig,
  input: `src/animations/${name}.tsx`,
  output: [
    {
      file: `dist/animations/${name}.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: `dist/animations/${name}.esm.js`,
      format: 'esm',
      sourcemap: true
    }
  ]
}));

// Export all configurations
export default [mainBundle, ...animationBundles];