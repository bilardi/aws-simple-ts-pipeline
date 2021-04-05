Development
===========

The environments for development can be many: you can organize a **CI/CD system** with your favorite software.
The primary features of your CI/CD are: having a **complete environment for**

* **development** for each developer, to implement something and for running unit tests 
* **staging** for running unit and integration tests, to check everything before release
* **production**

With AWS CDK system, you can create an AWS CodePipeline for each environment!

Run tests
#########

For running the unit tests, you need only your client: you can use a `virtual environment <https://simple-sample.readthedocs.io/en/latest/howtomake.html>`_ 

.. code-block:: bash

    cd aws-simple-ts-pipeline/
    make ltest # npm install + npm run build + npm run test + npm run lint

Deploy on AWS
#############

AWS CDK system allows you to create an AWS CodePipeline for each environment by adding a contextual string parameter (in the sample is **stage**) !

.. code-block:: bash

    cd aws-simple-ts-pipeline/
    export AWS_PROFILE=your-account
    export STAGE=my-development
    cdk deploy '*' -c stage=${STAGE}

Remove on AWS
#############

You can destroy the resources with a simple command

.. code-block:: bash

    cd aws-simple-pipeline/
    export AWS_PROFILE=your-account
    export STAGE=my-development
    cdk destroy '*' -c stage=${STAGE}

If you want to see other sample of AWS CDK commands, you can see

* the repository named `aws-tool-comparison <https://github.com/bilardi/aws-tool-comparison>`_ or its `documentation <https://aws-tool-comparison.readthedocs.io/en/latest/cdk.html>`_
