#!/bin/bash

# Clean cache and node_modules
rm -rf node_modules
rm -rf dist

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the project
npm run build
