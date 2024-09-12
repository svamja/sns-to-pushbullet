#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..
DIR=$PWD

log_file=$DIR/tmp/upload.log
LAMBDA_NAME=sns-to-pushbullet

echo path: $DIR
echo log_file: $log_file
echo lambda_name: $LAMBDA_NAME

echo "Begin" > $log_file

echo "Cleaning up.."
rm ./tmp/function.zip >> $log_file 2>&1

echo "Creating zip file.."
zip -r ./tmp/function.zip . -x "tmp/*" -x ".git/*" -x ".idea/*" >> $log_file 2>&1

echo "Uploading to AWS.."
aws --profile svamja lambda update-function-code \
    --function-name $LAMBDA_NAME \
    --zip-file fileb://tmp/function.zip >> $log_file 2>&1 < /dev/null

