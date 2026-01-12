# Deployment Scripts

Scripts for deploying and managing Amplify applications.

## deploy-and-fix.ps1

Automated deployment and build monitoring script for AWS Amplify.

### Features
- Automatically commits and pushes changes
- Monitors Amplify build status in real-time
- Downloads build logs on failure
- Extracts and displays errors

### Usage

```powershell
.\deploy-and-fix.ps1 -AppId "your-app-id"
```

### Prerequisites
- AWS CLI installed and configured
- Git access to repository
- Amplify App ID

See [AMPLIFY_DEPLOY.md](../../AMPLIFY_DEPLOY.md) for detailed setup instructions.
