# Automated deployment and build error checking script
# This script pushes to git, monitors Amplify build, and downloads logs on failure
#
# Usage:
#   .\deploy-and-fix.ps1 -AppId "your-app-id"
#   .\deploy-and-fix.ps1 -AppId "your-app-id" -CommitMessage "Custom commit message"
#
# Prerequisites:
#   1. AWS CLI installed and configured (run 'aws configure')
#   2. Git configured with access to the repository
#   3. Amplify App ID (find in AWS Amplify Console → App settings → General)

param(
    [string]$AppId = "",  # Will prompt if not provided
    [string]$CommitMessage = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
    [int]$MaxAttempts = 60, # Increased to allow longer builds
    [int]$PollInterval = 30, # seconds
    [int]$MaxWaitTime = 3600 # 60 minutes max wait
)

$BranchName = "main"
$Region = "us-east-1"  # Change if your Amplify app is in a different region
$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Automated Deploy & Build Monitor" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if AppId is provided, if not, prompt for it
if ([string]::IsNullOrWhiteSpace($AppId)) {
    Write-Host "Amplify App ID not provided." -ForegroundColor Yellow
    Write-Host "To find your App ID:" -ForegroundColor Yellow
    Write-Host "  1. Go to AWS Amplify Console" -ForegroundColor Gray
    Write-Host "  2. Select your app" -ForegroundColor Gray
    Write-Host "  3. Go to App settings → General" -ForegroundColor Gray
    Write-Host "  4. Copy the App ID" -ForegroundColor Gray
    Write-Host ""
    $AppId = Read-Host "Enter your Amplify App ID"
    
    if ([string]::IsNullOrWhiteSpace($AppId)) {
        Write-Host "[ERROR] App ID is required" -ForegroundColor Red
        exit 1
    }
}

# Check if AWS CLI is installed and configured
Write-Host "[0/5] Checking AWS CLI..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "AWS CLI not found"
    }
    Write-Host "[OK] AWS CLI found: $awsVersion" -ForegroundColor Green
    
    # Check if AWS credentials are configured
    $awsIdentity = aws sts get-caller-identity 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[WARNING] AWS credentials not configured or invalid" -ForegroundColor Yellow
        Write-Host "Run 'aws configure' to set up your credentials" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "This script will still attempt to monitor the build, but may fail." -ForegroundColor Yellow
        Write-Host "Press Ctrl+C to cancel, or Enter to continue..." -ForegroundColor Yellow
        Read-Host
    } else {
        $identity = $awsIdentity | ConvertFrom-Json
        Write-Host "[OK] AWS credentials configured for: $($identity.Arn)" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] AWS CLI is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install AWS CLI:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://aws.amazon.com/cli/" -ForegroundColor Gray
    Write-Host "  2. Or use: winget install Amazon.AWSCLI" -ForegroundColor Gray
    Write-Host "  3. Then run: aws configure" -ForegroundColor Gray
    Write-Host ""
    Write-Host "For AWS CLI configuration:" -ForegroundColor Yellow
    Write-Host "  1. Get your Access Key ID and Secret Access Key from AWS IAM" -ForegroundColor Gray
    Write-Host "  2. Run: aws configure" -ForegroundColor Gray
    Write-Host "  3. Enter your credentials and region (e.g., us-east-1)" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host ""

# Step 1: Check git status
Write-Host "[1/5] Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Found uncommitted changes:" -ForegroundColor Yellow
    Write-Host $gitStatus -ForegroundColor Gray
    Write-Host ""
    Write-Host "Staging all changes..." -ForegroundColor Yellow
    git add -A
    Write-Host "Committing with message: $CommitMessage" -ForegroundColor Yellow
    git commit -m $CommitMessage
} else {
    Write-Host "No changes to commit." -ForegroundColor Green
}

# Step 2: Push to repository
Write-Host ""
Write-Host "[2/5] Pushing to repository..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "[OK] Successfully pushed to repository" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Failed to push: $_" -ForegroundColor Red
    exit 1
}

# Step 3: Wait a bit for Amplify to detect the push
Write-Host ""
Write-Host "[3/5] Waiting for Amplify to detect push..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Step 4: Monitor build status
Write-Host ""
Write-Host "[4/5] Monitoring build status..." -ForegroundColor Yellow
Write-Host "App ID: $AppId" -ForegroundColor Gray
Write-Host "Branch: $BranchName" -ForegroundColor Gray
Write-Host "Region: $Region" -ForegroundColor Gray
Write-Host "Polling every $PollInterval seconds (max wait: $MaxWaitTime seconds)" -ForegroundColor Gray
Write-Host ""

$startTime = Get-Date
$buildDetected = $false
$jobId = $null
$attempts = 0

while ($attempts -lt $MaxAttempts) {
    $elapsed = (Get-Date) - $startTime
    if ($elapsed.TotalSeconds -gt $MaxWaitTime) {
        Write-Host "[ERROR] Maximum wait time exceeded" -ForegroundColor Red
        exit 1
    }

    try {
        # Get latest jobs
        $jobsJson = aws amplify list-jobs --app-id $AppId --branch-name $BranchName --region $Region --max-results 1 --output json 2>&1
        if ($LASTEXITCODE -ne 0) {
            $elapsedSeconds = [math]::Round($elapsed.TotalSeconds)
            Write-Host "Waiting for build to start... ($elapsedSeconds s elapsed)" -ForegroundColor Gray
            Write-Host "  (If this persists, check that App ID, Branch, and Region are correct)" -ForegroundColor DarkGray
            Start-Sleep -Seconds $PollInterval
            continue
        }

        $jobs = $jobsJson | ConvertFrom-Json
        
        if ($jobs.jobSummaries.Count -eq 0) {
            $elapsedSeconds = [math]::Round($elapsed.TotalSeconds)
            Write-Host "Waiting for build to start... ($elapsedSeconds s elapsed)" -ForegroundColor Gray
            Start-Sleep -Seconds $PollInterval
            continue
        }

        $latestJob = $jobs.jobSummaries[0]
        
        if (-not $buildDetected) {
            $buildDetected = $true
            $jobId = $latestJob.jobId
            Write-Host "[OK] Build detected! Job ID: $jobId" -ForegroundColor Green
            Write-Host "  Commit: $($latestJob.commitMessage)" -ForegroundColor Gray
            Write-Host "  Status: $($latestJob.status)" -ForegroundColor Gray
            Write-Host ""
        }

        # Get detailed job status
        $jobJson = aws amplify get-job --app-id $AppId --branch-name $BranchName --job-id $jobId --region $Region --output json 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error getting job details: $jobJson" -ForegroundColor Red
            Start-Sleep -Seconds $PollInterval
            continue
        }

        $job = $jobJson | ConvertFrom-Json
        $status = $job.job.summary.status
        $elapsedBuild = (Get-Date) - [DateTime]::Parse($job.job.summary.startTime)
        $elapsedBuildSeconds = [math]::Round($elapsedBuild.TotalSeconds)

        Write-Host "Build Status: $status ($elapsedBuildSeconds s elapsed)" -ForegroundColor $(if ($status -eq "SUCCEED") { "Green" } elseif ($status -eq "FAILED") { "Red" } else { "Yellow" })

        if ($status -eq "SUCCEED") {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "[SUCCESS] BUILD SUCCEEDED!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "Your app is now deployed!" -ForegroundColor Green
            Write-Host "[5/5] Deployment complete!" -ForegroundColor Green
            exit 0
        }

        if ($status -eq "FAILED") {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Red
            Write-Host "[FAILED] BUILD FAILED" -ForegroundColor Red
            Write-Host "========================================" -ForegroundColor Red
            Write-Host ""

            # Download build log
            $buildStep = $job.job.steps | Where-Object { $_.stepName -eq "BUILD" }
            if ($buildStep -and $buildStep.logUrl) {
                $logFile = "amplify-build-log-$jobId.txt"
                Write-Host "[5/5] Downloading build log to: $logFile" -ForegroundColor Yellow
                try {
                    Invoke-WebRequest -Uri $buildStep.logUrl -OutFile $logFile -ErrorAction Stop
                    Write-Host "[OK] Log downloaded successfully" -ForegroundColor Green
                    Write-Host ""
                    
                    # Extract and display errors
                    Write-Host "--- BUILD ERRORS ---" -ForegroundColor Red
                    $logContent = Get-Content $logFile -Raw
                    $errorLines = $logContent -split "`n" | Where-Object { $_ -match "error TS|ERROR|Build failed|FAILED|malformed" }
                    
                    if ($errorLines.Count -gt 0) {
                        $errorLines | Select-Object -First 30 | ForEach-Object {
                            Write-Host $_ -ForegroundColor Red
                        }
                        if ($errorLines.Count -gt 30) {
                            Write-Host "... and $($errorLines.Count - 30) more error lines" -ForegroundColor Gray
                        }
                    } else {
                        Write-Host "No specific error patterns found. Check the full log file: $logFile" -ForegroundColor Yellow
                    }
                    
                    Write-Host ""
                    Write-Host "Full log saved to: $logFile" -ForegroundColor Cyan
                    Write-Host ""
                    Write-Host "Next steps:" -ForegroundColor Yellow
                    Write-Host "1. Review the errors above or in $logFile" -ForegroundColor White
                    Write-Host "2. Share the errors with Cursor AI to get fixes" -ForegroundColor White
                    Write-Host "3. Or manually fix the issues and run this script again" -ForegroundColor White
                    
                } catch {
                    Write-Host "[ERROR] Failed to download log: $_" -ForegroundColor Red
                    Write-Host "Log URL: $($buildStep.logUrl)" -ForegroundColor Gray
                }
            } else {
                Write-Host "No build log URL available" -ForegroundColor Yellow
                Write-Host "Check the Amplify Console for build logs" -ForegroundColor Yellow
            }
            
            exit 1
        }

        # Still in progress
        Start-Sleep -Seconds $PollInterval
        $attempts++
        
    } catch {
        Write-Host "Error checking build status: $_" -ForegroundColor Red
        Start-Sleep -Seconds $PollInterval
        $attempts++
    }
}

Write-Host ""
Write-Host "[ERROR] Maximum polling attempts reached" -ForegroundColor Red
exit 1
