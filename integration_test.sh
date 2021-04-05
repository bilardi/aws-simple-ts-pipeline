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
if [ ${STAGE} == 'production' ] || [ ${STAGE} == 'build' ]; then
    echo
    echo You cannot use the stage ${STAGE} for integration tests!
    echo
    exit 0
fi

# integration tests
echo Integration Tests started on `date`
cd resources
#STAGE=$STAGE python -m unittest discover -v -p integration*py
STAGE=$STAGE python -m unittest discover -v -p integration_test_only_cloudformation.py
if [ $? -ne 0 ]; then
    echo "TESTS FAILED"
    exit 1
fi
cd -
