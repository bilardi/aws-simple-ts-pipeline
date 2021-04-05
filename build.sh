#!/usr/bin/env bash

# check if there is environment variable named STAGE
if [ -z ${STAGE} ]; then
    echo
    echo Environment variable STAGE not exists
    echo Usage: STAGE=development bash $0
    echo
    exit 1
fi

# load resources
echo Load resources started on `date`
rm -rf resources
git clone https://github.com/bilardi/aws-saving.git resources
cd resources/
pip3 install --upgrade -r requirements.txt
cd -

# install dependencies
echo Install dependencies started on `date`
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
/usr/bin/python3 get-pip.py --force-reinstall
npm install -g npm@latest
echo Install Serverless Framework
npm install -g serverless@1.74.1
npm install serverless-python-requirements
