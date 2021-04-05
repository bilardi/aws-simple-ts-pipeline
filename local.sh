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

# except for STAGE production and staging
if [ ${STAGE} == 'production' ] || [ ${STAGE} == 'staging' ]; then
    echo
    echo You cannot use the stage ${STAGE} from your client!
    echo
    exit 0
fi

path=$(dirname $0)
STAGE=${STAGE} bash ${path}/build.sh
STAGE=${STAGE} bash ${path}/unit_test.sh
STAGE=${STAGE} bash ${path}/deploy.sh
STAGE=${STAGE} bash ${path}/integration_test.sh
