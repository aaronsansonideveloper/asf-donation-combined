#!/usr/bin/zsh

# Delete existing dist folder in current directory
echo "Delete existing dist folder in current directory"
rm -rf ./dist

# Run tsc to compile typescript files
echo "compiling source code"
yarn run build main-app && yarn run build webhook

# Run pm2 start ecosystem.config.js
echo "Run pm2 start ecosystem.config.js"
pm2 start ecosystem.config.js

# if no error, then the script is working fine
echo "All clusters started successfully"
