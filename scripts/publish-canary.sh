#!/bin/bash

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Echo every command being executed
set -x

make build

# Get 2FA when not CI
otp=""
if [ -z $CI ]; then
  echo "Please enter npm two-factor auth code: "
  read otp
fi

NPM_CONFIG_OTP="$otp" make publish-canary
