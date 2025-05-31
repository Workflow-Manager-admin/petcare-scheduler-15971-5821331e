#!/bin/bash
cd /home/kavia/workspace/code-generation/petcare-scheduler-15971-5821331e/petcare_scheduler
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

