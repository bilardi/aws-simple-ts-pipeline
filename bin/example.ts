#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { PipelineStack } from "aws-simple-pipeline";

const projectName = "aws-simple-pipeline";
const githubOwner = "bilardi";
const githubRepo = "aws-simple-ts-pipeline";
const githubBranch = "master";
const githubToken = cdk.SecretValue.secretsManager(
    "/aws-simple-pipeline/secrets/github/token",
    { jsonField: "github-token" },
);
const notifyEmails = [ "your@email.net" ];
const policies = [
    // 'AdministratorAccess", // avoid in production
    "AWSLambda_FullAccess",
    "AWSCloudFormationFullAccess",
    "CloudWatchLogsFullAccess",
    "CloudWatchEventsFullAccess",
    "AmazonS3FullAccess",
    "IAMFullAccess",
];
//const buildspecPath = 'buildspec.yml';
//const manualApprovalExists = true;

const app = new cdk.App();
const stage = app.node.tryGetContext("stage")
new PipelineStack(app,
    projectName,
    stage,
    githubOwner,
    githubRepo,
    githubBranch,
    githubToken,
    notifyEmails,
    policies,
//    buildspecPath,
//    manualApprovalExists,
);

app.synth();
