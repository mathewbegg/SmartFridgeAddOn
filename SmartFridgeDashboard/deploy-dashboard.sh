#!/bin/bash
distributionID=E2X11VJI7ITL9R
sourceDirectory=./dist/SmartFridgeDashboard
destinationDirectory=s3://whats.inmyfridge.info

ECHO =================================
ECHO Intalling Dependencies
ECHO =================================
npm install

ECHO =================================
ECHO Building Project
ECHO =================================
ng build --prod

ECHO =================================
ECHO Syncing to s3
ECHO =================================
aws s3 sync $sourceDirectory $destinationDirectory --delete

ECHO =================================
ECHO Invalidating Index.html in Cloudfront Distribution
ECHO =================================
aws cloudfront create-invalidation --distribution-id $distributionID --paths //index.html