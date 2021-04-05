/**
 * @packageDocumentation
 * AWS simple pipeline
 * 
 * This package contains the modules for deploying a simple AWS CDK pipeline on AWS.
 * 
 * It is part of the educational repositories (https://github.com/pandle/materials)
 * to learn how to write stardard code and common uses of the CI/CD.
 * 
 * Package contents one class named PipelineStack that
 * it extended the core.Stack class of aws-cdk package.
 * 
 * # Installation
 * ```
 * npm install aw-simple-pipeline
 * ```
 * 
 * # Usage
 * ```typescript
 * import * as cdk from '@aws-cdk/core';
 * import { PipelineStack } from 'aws-simple-pipeline';
 * const app = new cdk.App();
 * new PipelineStack(app,
 *     'aws-simple-pipeline',
 *     'sample',
 *     'bilardi',
 *     'aws-simple-pipeline',
 *     'master',
 *     cdk.SecretValue.secretsManager('/github/token', { jsonField: 'github-token' }),
 *     [ 'your@email.net' ],
 *     [ 'AdministratorAccess' ],
 *     'buildspec.yml',
 *     true
 * );
 * app.synth();
 * ```
 * 
 * **license**: MIT,
 * **support**: https://github.com/bilardi/aws-simple-ts-pipeline/issues
 */
export { PipelineStack } from "./pipelineStack";