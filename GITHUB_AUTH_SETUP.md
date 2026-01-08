# GitHub Authentication Setup

This guide explains how to create and use a Personal Access Token (PAT) to push to the command-library repository.

## 🔑 Creating a Personal Access Token

### Step 1: Go to GitHub Settings

1. Go to [GitHub.com](https://github.com) and sign in as **iriley-mirabel**
2. Click your profile picture (top right) → **Settings**
3. Scroll down to **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**

### Step 2: Configure the Token

1. **Note**: Give it a name like "Cursor Command Library"
2. **Expiration**: Choose your preference (90 days, 1 year, or no expiration)
3. **Select scopes**: Check these boxes:
   - ✅ `repo` (Full control of private repositories)
     - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - ✅ `workflow` (Update GitHub Action workflows) - optional but recommended

4. Click **Generate token** at the bottom

### Step 3: Copy the Token

⚠️ **IMPORTANT**: Copy the token immediately! You won't be able to see it again.

It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔧 Using the Token

### Method 1: Use Token in Git Remote URL (Recommended)

Update the remote URL to include your token:

```bash
# Replace YOUR_TOKEN with the token you copied
git remote set-url origin https://YOUR_TOKEN@github.com/iriley-mirabel/command-library.git
```

Then push:
```bash
git push -u origin main
```

### Method 2: Use Token as Password

When you push, Git will prompt for credentials:
- **Username**: `iriley-mirabel`
- **Password**: Paste your token (not your GitHub password)

### Method 3: Store Token in Git Credential Manager

**Windows:**
```bash
# Store the token
git credential-manager store
# When prompted:
# Protocol: https
# Host: github.com
# Username: iriley-mirabel
# Password: [paste your token]
```

**Linux/Mac:**
```bash
# Store in credential helper
git config --global credential.helper store
git push -u origin main
# Enter username: iriley-mirabel
# Enter password: [paste your token]
```

## 🔐 Security Best Practices

1. **Never commit tokens** to your repository
2. **Use environment variables** for tokens in scripts
3. **Set expiration dates** on tokens
4. **Revoke tokens** if compromised
5. **Use fine-grained tokens** (newer option) for more control

## 🚀 Quick Setup Script

After creating your token, you can use it like this:

```bash
# Set the remote with token (replace YOUR_TOKEN)
git remote set-url origin https://YOUR_TOKEN@github.com/iriley-mirabel/command-library.git

# Or use environment variable (more secure)
export GITHUB_TOKEN=your_token_here
git remote set-url origin https://$GITHUB_TOKEN@github.com/iriley-mirabel/command-library.git

# Push
git push -u origin main
```

## 🔄 Alternative: Use SSH Instead

If you prefer SSH keys:

1. **Generate SSH key** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to GitHub**:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste and save

3. **Update remote**:
   ```bash
   git remote set-url origin git@github.com:iriley-mirabel/command-library.git
   ```

4. **Push**:
   ```bash
   git push -u origin main
   ```

## ✅ Verify Authentication

Test your authentication:

```bash
# Test HTTPS with token
git ls-remote https://github.com/iriley-mirabel/command-library.git

# Or test SSH
git ls-remote git@github.com:iriley-mirabel/command-library.git
```

## 🆘 Troubleshooting

### "Permission denied" error
- Verify you're using the correct token
- Check token hasn't expired
- Ensure token has `repo` scope

### "Repository not found" error
- Verify repository name: `iriley-mirabel/command-library`
- Check you have access to the repository
- Ensure you're using the correct GitHub account

### Token not working
- Regenerate the token
- Check token scopes include `repo`
- Verify you're signed in as `iriley-mirabel` on GitHub

## 📚 Additional Resources

- [GitHub: Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub: Using a token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

---

**Once you have your token, you can push the repository!**

