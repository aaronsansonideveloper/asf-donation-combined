#!/bin/bash

# Variables
LOCAL_DIR="/home/avarile/CodeRepo/scaling-frontend/packages/newNext"  # Replace with the path to your local project folder
TARGET_SERVER="ubuntu@ec2-54-206-21-96.ap-southeast-2.compute.amazonaws.com"
# KEY_FILE="/home/avarile/Documents/Depolyment/AWSTest/ScalingTest/ScalingTesServerKey.pem"
KEY_FILE="/home/avarile/Deployments/Scaling/Scaling-live-temp.pem"
REMOTE_DIR="/home/ubuntu/project/scaling-frontend/packages/newNext"
VERSION="0.0.8"
COMMIT_CONTENT="feat: deploy to prod server"

# Git add / commit / push
echo "Git add / commit / push"
cd $LOCAL_DIR
git add .
git commit -m "$COMMIT_CONTENT -- $VERSION"

# Build
cd $LOCAL_DIR
pnpm run build

# after build complete, delete the remote fold and ,copy dist folder to server
echo "Deploying the change to the demo server:uploading  folder to $TARGET_SERVER:$REMOTE_DIR"
scp -i "$KEY_FILE" -r "$LOCAL_DIR/.next" "$TARGET_SERVER:$REMOTE_DIR"

# run tests from postman webhook
# echo "Running tests from postman webhook"

# after copy complete, ssh to server and restart pm2
echo "Restarting pm2 on $TARGET_SERVER"
# ssh -i "$KEY_FILE" "$SERVER" "cd $REMOTE_DIR && pm2 restart all --env demo"
ssh -i "$KEY_FILE" "$TARGET_SERVER" && "cd $REMOTE_DIR" && pm2 start pnpm --name "market frontend" -- run start"

# to run this script, use the following command:
# export VERSION=0.0.1 COMMIT_CONTENT=testing:statistics && bash ./deploy_prod.sh 