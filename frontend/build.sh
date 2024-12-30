#!/bin/bash

# Clean cache and node_modules
rm -rf node_modules
rm -rf dist
rm -f package-lock.json

# Install dependencies
npm install --legacy-peer-deps

# Build the project
npm run build
