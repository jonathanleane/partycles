#!/bin/bash

# Deploy demo to GitHub Pages
echo "Building demo..."
npm run build

echo "Deploying to GitHub Pages..."
npx gh-pages -d build

echo "Demo deployed successfully!"
echo "It will be available at: https://jonathanleane.github.io/partycles/"