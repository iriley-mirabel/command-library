# Amplify Deployment Helper Script

This project includes `deploy-and-fix.ps1` to automate deployments and monitor Amplify builds.

## Prerequisites

### 1. AWS CLI Installation

**Windows (PowerShell):**
```powershell
# Option 1: Using winget
winget install Amazon.AWSCLI

# Option 2: Download installer
# Visit: https://aws.amazon.com/cli/
# Download and run the MSI installer
```

**Verify installation:**
```powershell
aws --version
```

### 2. AWS CLI Configuration

Configure AWS credentials:

```powershell
aws configure
```

You'll be prompted for:
- **AWS Access Key ID**: Get from AWS IAM Console → Users → Your User → Security credentials
- **AWS Secret Access Key**: Same location (create if needed)
- **Default region**: `us-east-1` (or your Amplify app's region)
- **Default output format**: `json`

**Verify configuration:**
```powershell
aws sts get-caller-identity
```

This should return your AWS account and user information.

### 3. Get Your Amplify App ID

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your app
3. Go to **App settings** → **General**
4. Copy the **App ID** (looks like: `d217xqm8x4qhsb`)

## Usage

### Basic Usage

```powershell
.\deploy-and-fix.ps1 -AppId "your-app-id-here"
```

The script will:
1. Check git status and commit any uncommitted changes
2. Push to GitHub
3. Wait for Amplify to detect the push
4. Monitor the build status
5. Download build logs if the build fails

### With Custom Commit Message

```powershell
.\deploy-and-fix.ps1 -AppId "your-app-id" -CommitMessage "Fix YAML syntax in amplify.yml"
```

### Interactive Mode (App ID Prompt)

If you don't provide the App ID, the script will prompt you:

```powershell
.\deploy-and-fix.ps1
```

### Advanced Options

```powershell
.\deploy-and-fix.ps1 `
  -AppId "your-app-id" `
  -CommitMessage "Custom message" `
  -MaxAttempts 120 `
  -PollInterval 15 `
  -MaxWaitTime 7200
```

**Parameters:**
- `-AppId`: Your Amplify App ID (required, or will prompt)
- `-CommitMessage`: Git commit message (default: auto-generated timestamp)
- `-MaxAttempts`: Maximum polling attempts (default: 60)
- `-PollInterval`: Seconds between status checks (default: 30)
- `-MaxWaitTime`: Maximum wait time in seconds (default: 3600 = 60 minutes)

## What the Script Does

1. **Pre-flight Checks:**
   - Verifies AWS CLI is installed
   - Checks AWS credentials are configured
   - Prompts for App ID if not provided

2. **Git Operations:**
   - Checks for uncommitted changes
   - Stages and commits changes (if any)
   - Pushes to `origin main`

3. **Build Monitoring:**
   - Waits for Amplify to detect the push
   - Polls build status every 30 seconds
   - Shows real-time build progress

4. **Error Handling:**
   - Downloads build logs on failure
   - Extracts and displays error patterns
   - Saves full log to `amplify-build-log-[jobId].txt`

## Troubleshooting

### AWS CLI Not Found

**Error:** `AWS CLI is not installed or not in PATH`

**Solution:**
1. Install AWS CLI (see Prerequisites above)
2. Restart PowerShell
3. Verify with `aws --version`

### AWS Credentials Not Configured

**Error:** `AWS credentials not configured or invalid`

**Solution:**
1. Run `aws configure`
2. Enter your Access Key ID and Secret Access Key
3. Verify with `aws sts get-caller-identity`

### Cannot Find Build

**Error:** Build never starts or script can't find it

**Possible causes:**
- Wrong App ID
- Wrong branch name (script uses `main`)
- Wrong region (script uses `us-east-1`)

**Solution:**
1. Verify App ID in Amplify Console
2. Check that your branch is `main`
3. Update `$Region` in the script if your app is in a different region

### Build Log Download Fails

**Error:** `Failed to download log`

**Solution:**
- The log URL is displayed - you can manually open it in a browser
- Or check the Amplify Console directly for build logs

## Example Output

```
========================================
Automated Deploy & Build Monitor
========================================

[0/5] Checking AWS CLI...
[OK] AWS CLI found: aws-cli/2.x.x
[OK] AWS credentials configured for: arn:aws:iam::123456789:user/username

[1/5] Checking git status...
No changes to commit.

[2/5] Pushing to repository...
[OK] Successfully pushed to repository

[3/5] Waiting for Amplify to detect push...

[4/5] Monitoring build status...
App ID: d217xqm8x4qhsb
Branch: main
Region: us-east-1
Polling every 30 seconds (max wait: 3600 seconds)

[OK] Build detected! Job ID: 1234567890
  Commit: Fix YAML syntax in amplify.yml
  Status: IN_PROGRESS

Build Status: IN_PROGRESS (45 s elapsed)
Build Status: IN_PROGRESS (75 s elapsed)
Build Status: SUCCEED (120 s elapsed)

========================================
[SUCCESS] BUILD SUCCEEDED!
========================================

Your app is now deployed!
[5/5] Deployment complete!
```

## Tips

1. **Save your App ID:** Create a simple wrapper script:
   ```powershell
   # deploy.ps1
   .\deploy-and-fix.ps1 -AppId "your-app-id-here"
   ```

2. **Different Regions:** If your Amplify app is in a different region, edit the script:
   ```powerscript
   $Region = "us-west-2"  # Change to your region
   ```

3. **Different Branches:** Edit the script if you deploy from a different branch:
   ```powerscript
   $BranchName = "develop"  # Change to your branch
   ```

4. **Quick Deploy:** Add to your PowerShell profile for quick access:
   ```powerscript
   function Deploy-Amplify {
       .\deploy-and-fix.ps1 -AppId "your-app-id"
   }
   ```
