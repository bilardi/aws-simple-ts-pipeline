# Getting started

AWS simple pipeline package is implemented for deploying a Continuous Deployment or Delivery system (CD) by AWS CodePipeline service.

You can use this simple pipeline for deploying your personal solution in 2 environments: staging and production.

It is part of the [educational repositories](https://github.com/pandle/materials) to learn how to write stardard code and common uses of the TDD, CI and CD.

## Prerequisites

You have to install the [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/) (AWS CDK) for deploying the AWS simple pipeline:

```
npm install -g aws-cdk # for installing AWS CDK
cdk --help # for printing its commands
```

And you need an AWS account, in this repository called **your-account**.

## Installation

The package is not self-consistent. So you have to download the package by github and to install the requirements before to deploy on AWS:

```
git clone https://github.com/bilardi/aws-simple-ts-pipeline
cd aws-simple-ts-pipeline/
npm install
export AWS_PROFILE=your-account
cdk deploy
```

Or you can install by npm:

```
npm install aws-simple-pipeline
```

Read the documentation on [readthedocs](https://aws-simple-ts-pipeline.readthedocs.io/en/latest/) for

* Usage
* Development

## Change Log

See [CHANGELOG.md](https://github.com/bilardi/aws-simple-ts-pipeline/blob/master/CHANGELOG.md) for details.

## License

This package is released under the MIT license.  See [LICENSE](https://github.com/bilardi/aws-simple-ts-pipeline/blob/master/LICENSE) for details.
