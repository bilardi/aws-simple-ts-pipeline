#!/usr/bin/env bash

# check if there is environment variable named STAGE
if [ -z ${STAGE} ]; then
    echo
    echo Environment variable STAGE not exists
    echo Usage: STAGE=development bash $0
    echo
    exit 1
fi

# local
if [ -d /Users ]; then
    if [ -z ${AWS_PROFILE} ]; then
        echo
        echo Environment variable AWS_PROFILE not exists
        echo Usage: export AWS_PROFILE=your-account
        echo
        exit 1
    fi
fi

# deploy stage
echo Deploy stage started on `date`
cd resources
if [ ${STAGE} == 'staging' ]; then
    serverless deploy --stage deleteme
fi
serverless deploy --stage ${STAGE}
#cdk deploy '*' -c stage=${STAGE} --require-approval never 
if [ $? -ne 0 ]; then
    echo "DEPLOY stage ${STAGE} FAILED"
    exit 1
fi
cd -
