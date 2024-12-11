#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Navigate to the server directory and install dependencies
echo "Navigating to the server directory..."
cd server
echo "Installing server dependencies..."
npm install

# Navigate to the client directory and install dependencies
echo "Navigating to the client directory..."
cd ../client
echo "Installing client dependencies..."
npm install

echo "Setup complete! All dependencies have been installed."
