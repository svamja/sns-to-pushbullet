# AWS Lambda to Forward SNS Messages to Pushbullet


### Prerequisite

1. AWS Account
2. AWS CLI (if you want to upload using ./bin/upload.sh)
3. Pushbullet Account - https://www.pushbullet.com/
4. Registered Pushbullet Device ID

### Setup

1. create .env file by copying .env.sample
2. create lambda function
3. upload the lambda function (you can use ./bin/upload.sh after setting up name in .env file)
4. create sns topic
5. add subscription to sns topic to invoke this lambda

after this any message published on SNS topic will be forwarded to Pushbullet and it alerts on your mobile!

