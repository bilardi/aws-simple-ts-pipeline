/**
 * The class for managing your simple AWS CDK pipeline
 * 
 * The class requires some properties described in the constructor comment.
 * 
 * The class deploys all AWS resources for your pipeline:
 * 
 *   AWS::IAM::Role with your policies
 *   AWS::S3::Bucket for your artifacts
 *   AWS::CodeBuild::Project that it loads your buildspec.yml on LinuxBuildImage.STANDARD_4_0
 *   AWS::CodePipeline::Webhook for triggering your pipeline to start every time github-push occurs
 *   AWS::CodePipeline::Pipeline with the stages named Source, Staging, Manual Approval and Production
 * 
 * **license**: MIT,
 * **support**: https://github.com/bilardi/aws-simple-ts-pipeline/issues
 */
import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";
import * as codebuild from "@aws-cdk/aws-codebuild";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipelineActions from "@aws-cdk/aws-codepipeline-actions";

export class PipelineStack extends cdk.Stack {
  /**
   * All properties are mandatory, except the last two params: buildspecPath and manualApprovalExists.
   * 
   * @param id string of the name of project used for the prefix of the stack name
   * @param stage string of the name of the environment, default is empty
   * @param githubOwner string of the github owner
   * @param githubRepo string of the github repository name
   * @param githubBranch string of the github repository branch
   * @param githubToken AWS SecretValue object with reference like Secrets Manager
   * @param notifyEmails array of strings of emails to notify
   * @param policies array of strings of policies name to add 
   * @param buildspecPath string of path of buildspec file, default: buildspec.yml
   * @param manualApprovalExists boolean if true, then there will be a manual approval stage; default: false
   */
  constructor(scope: cdk.Construct, id: string, stage="", githubOwner: string, githubRepo: string, githubBranch: string, githubToken: cdk.SecretValue, notifyEmails: Array<string>, policies: Array<string>, buildspecPath="buildspec.yml", manualApprovalExists=false, props?: cdk.StackProps) {
    super(scope, id, props);

    if (stage == undefined || stage == "") {
      stage = "";
    } else {
      stage = "-" + stage;
    }

    const role = new iam.Role(this, "role", { assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com") });
    for (const policy of policies) {
      role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policy));
    }

    const artifactBucket = new s3.Bucket(this, "BuildArtifactsBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.KMS_MANAGED,
      versioned: false 
    });

    const project = new codebuild.PipelineProject(this, "Project", {
      buildSpec: codebuild.BuildSpec.fromSourceFilename(buildspecPath),
      cache: codebuild.Cache.bucket(artifactBucket, { prefix: "codebuild-cache" }),
      environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_4_0
      },
      role: role
    });

    const sourceOutput = new codepipeline.Artifact();
    const stagingOutput = new codepipeline.Artifact();
    const productionOutput = new codepipeline.Artifact();

    const stages:codepipeline.StageProps[] = [
      {
        stageName: "Source",
        actions: [new codepipelineActions.GitHubSourceAction({
          actionName: "GitHub",
          owner: githubOwner,
          repo: githubRepo,
          branch: githubBranch,
          oauthToken: githubToken,
          output: sourceOutput
        })]
      },
      {
        stageName: "Staging",
        actions: [new codepipelineActions.CodeBuildAction({
          actionName: "StagingDeploy",
          project: project,
          input: sourceOutput,
          outputs: [stagingOutput],
          environmentVariables: {
            "ENV": {value: "staging" + stage}
          }
        })]
      },
      {
        stageName: "ManualApproval",
        actions: [new codepipelineActions.ManualApprovalAction({
          actionName: "ManualApproval",
          notifyEmails: notifyEmails
        })]
      },
      {
        stageName: "Production",
        actions: [new codepipelineActions.CodeBuildAction({
          actionName: "ProductionDeploy",
          project: project,
          input: sourceOutput,
          outputs: [productionOutput],
          environmentVariables: {
            "ENV": {value: "production" + stage}
          }
        })]
      }
    ];
    if (manualApprovalExists == false) {
      stages.splice(2,1);
    }

    new codepipeline.Pipeline(this, "Pipeline", {
      artifactBucket: artifactBucket,
      stages: stages
    });
  }
}
