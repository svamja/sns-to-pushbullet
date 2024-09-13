#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..
DIR=$PWD
source $DIR/.env

log_file=$DIR/tmp/upload.log

echo log path: $log_file
echo lambda: $AWS_LAMBDA_NAME

echo "Begin" > $log_file

echo "Cleaning up.."
rm ./tmp/function.zip >> $log_file 2>&1

echo "Creating zip file.."
zip -r ./tmp/function.zip . -x "tmp/*" -x ".git/*" -x ".idea/*" >> $log_file 2>&1

echo "Uploading to AWS.."
aws --profile $AWS_PROFILE lambda $AWS_LAMBDA_NAME \
    --function-name $LAMBDA_NAME \
    --zip-file fileb://tmp/function.zip >> $log_file 2>&1 < /dev/null

