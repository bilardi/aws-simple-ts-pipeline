import { expect as expectCDK, matchTemplate, MatchStyle } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { PipelineStack } from "../lib/index";
import stackWithoutManualApproval from "./pipelineStack.without.ManualAproval.json";
import stackWithManualApproval from "./pipelineStack.with.ManualAproval.json";
import stackWithBuildspecPathDifferent from "./pipelineStack.with.BuildspecPathDifferent.json";
import stackWithStage from "./pipelineStack.with.Stage.json";

const githubToken = cdk.SecretValue.secretsManager(
  "/aws-simple-pipeline/secrets/github/token",
  { jsonField: "github-token" },
);

test("Stack without Manual Approval", () => {
    const app = new cdk.App();
    const stack = new PipelineStack(app,
      "test",
      "",
      "owner",
      "repo",
      "branch",
      githubToken,
      ["email"],
      ["policy"]
    );
    expectCDK(stack).to(matchTemplate(stackWithoutManualApproval, MatchStyle.EXACT));
});

test("Stack with Buildspec path same", () => {
  const app = new cdk.App();
  const stack = new PipelineStack(app,
    "test",
    "",
    "owner",
    "repo",
    "branch",
    githubToken,
    ["email"],
    ["policy"],
    "buildspec.yml"
  );
  expectCDK(stack).to(matchTemplate(stackWithoutManualApproval, MatchStyle.EXACT));
});

test("Stack with Buildspec path different", () => {
  const app = new cdk.App();
  const stack = new PipelineStack(app,
    "test",
    "",
    "owner",
    "repo",
    "branch",
    githubToken,
    ["email"],
    ["policy"],
    "different/buildspec.yml"
  );
  expectCDK(stack).to(matchTemplate(stackWithBuildspecPathDifferent, MatchStyle.EXACT));
});

test("Stack with Manual Approval", () => {
  const app = new cdk.App();
  const stack = new PipelineStack(app,
    "test",
    "",
    "owner",
    "repo",
    "branch",
    githubToken,
    ["email"],
    ["policy"],
    "buildspec.yml",
    true
  );
  expectCDK(stack).to(matchTemplate(stackWithManualApproval, MatchStyle.EXACT));
});

test("Stack with Stage", () => {
  const app = new cdk.App();
  const stack = new PipelineStack(app,
    "test",
    "sample",
    "owner",
    "repo",
    "branch",
    githubToken,
    ["email"],
    ["policy"]
  );
  expectCDK(stack).to(matchTemplate(stackWithStage, MatchStyle.EXACT));
});
