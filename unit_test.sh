#!/usr/bin/env bash

# check if there is environment variable named STAGE
if [ -z ${STAGE} ]; then
    echo
    echo Environment variable STAGE not exists
    echo Usage: STAGE=development bash $0
    echo
    exit 1
fi

# except for STAGE production and staging
if [ ${STAGE} == 'production' ]; then
    echo
    echo You cannot use the stage ${STAGE} for unit tests!
    echo
    exit 0
fi

# unit tests
echo Unit Tests started on `date`
cd resources
python -m unittest discover -v
if [ $? -ne 0 ]; then
    echo "TESTS FAILED"
    exit 1
fi
cd -
