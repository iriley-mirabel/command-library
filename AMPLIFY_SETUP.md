# AWS Amplify Setup Guide

This guide explains how to deploy the Cursor Command Library web portal to AWS Amplify.

## Repository Structure

The web portal is located in `app/web-portal/`. The entire repository contains:
- `.cursor/commands/` - The command library (source of truth)
- `app/web-portal/` - The React web portal application
- `scripts/` - Setup scripts for developers
- Documentation files

## Amplify Configuration Options

### Option 1: Deploy from Root (Recommended)

If you configure Amplify to deploy from the root directory, use the `amplify.yml` file in the root. This file:
- Changes to `app/web-portal/` directory
- Runs `npm ci` and `npm run build`
- Serves from `app/web-portal/dist`

**Amplify Console Settings:**
- **App root:** `/` (root of repository)
- **Build settings:** Use `amplify.yml` from root

### Option 2: Deploy from Subdirectory

If Amplify supports deploying from a subdirectory, you can:
- Set **App root** to `app/web-portal`
- Use the `app/web-portal/.amplify.yml` file

**Amplify Console Settings:**
- **App root:** `/app/web-portal`
- **Build settings:** Use `.amplify.yml` from `app/web-portal/`

## Setup Steps

1. **Connect Repository to Amplify:**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your GitHub repository: `iriley-mirabel/command-library`
   - Select branch: `main`

2. **Configure Build Settings:**
   - If deploying from root: Use the `amplify.yml` file (auto-detected)
   - If deploying from subdirectory: Set app root to `app/web-portal` and use `.amplify.yml`

3. **Environment Variables:**
   - No environment variables needed for this app

4. **Deploy:**
   - Amplify will automatically build and deploy
   - The app will be available at: `https://[app-id].amplifyapp.com`

## Keeping Commands in Sync

Since commands are copied to `app/web-portal/public/commands/` for the web portal:

**Option A: Manual Sync (Current)**
- When commands are updated, run:
  ```bash
  Copy-Item .cursor/commands/*.md app/web-portal/public/commands/ -Force
  Copy-Item library/commands-index.json app/web-portal/public/commands/index.json -Force
  git add app/web-portal/public/commands/
  git commit -m "Update web portal commands"
  git push
  ```

**Option B: Automated Sync (Future)**
- Add a pre-build script in `amplify.yml` to copy commands:
  ```yaml
  preBuild:
    commands:
      - cp -r .cursor/commands/*.md app/web-portal/public/commands/
      - cp library/commands-index.json app/web-portal/public/commands/index.json
      - cd app/web-portal
      - npm ci
  ```

## Custom Domain

After deployment, you can add a custom domain in Amplify Console:
- Settings → Domain management
- Add your domain (e.g., `commands.yourdomain.com`)

## Monitoring

- **Build logs:** Available in Amplify Console
- **Deployment history:** Track all deployments
- **Performance:** Use AWS CloudWatch for monitoring

## Troubleshooting

**Build fails:**
- Check that `app/web-portal/package.json` has all dependencies
- Verify Node.js version (Amplify defaults to Node 18+)

**Commands not showing:**
- Ensure `app/web-portal/public/commands/` directory exists
- Check that `index.json` is present
- Verify file paths in browser console

**404 errors:**
- Configure redirects in Amplify for React Router:
  - Settings → Rewrites and redirects
  - Add: `/* /index.html 200` (for SPA routing)
