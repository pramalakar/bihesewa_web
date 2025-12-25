# Git Branching Strategy for bihesewa_web

## Overview

This document outlines the Git branching strategy for managing features, bug fixes, production deployments, and rollbacks for the Next.js web frontend.

---

## Branch Structure

### Main Branches

1. **`main`** (or `master`)
   - Production-ready code
   - Always stable and deployable
   - Protected branch (requires PR/merge)
   - Only merged from `develop` or hotfix branches

2. **`develop`**
   - Integration branch for features
   - Latest development changes
   - Merged into `main` for releases

---

## Branch Types

### 1. Feature Branches
**Naming**: `feature/description-of-feature` or `feat/description`

**Purpose**: New features, enhancements

**Workflow**:
```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-landing-page

# Work on feature, commit changes
git add .
git commit -m "feat: Add new landing page design"

# Push to remote
git push -u origin feature/new-landing-page

# When complete, create Pull Request to develop
# After PR approval and merge, delete local branch
git checkout develop
git pull origin develop
git branch -d feature/new-landing-page
```

**Example names**:
- `feature/user-authentication`
- `feature/contact-form`
- `feat/privacy-policy-update`

---

### 2. Bug Fix Branches
**Naming**: `bugfix/description` or `fix/description`

**Purpose**: Fix bugs in develop or main

**Workflow**:
```bash
# Create bugfix branch from develop (or main if urgent)
git checkout develop
git pull origin develop
git checkout -b bugfix/mobile-responsive-issue

# Fix the bug, commit
git add .
git commit -m "fix: Resolve mobile responsive layout issue"

# Push and create PR
git push -u origin bugfix/mobile-responsive-issue
```

---

### 3. Hotfix Branches
**Naming**: `hotfix/description`

**Purpose**: Critical fixes for production (main branch)

**Workflow**:
```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-seo-issue

# Fix the issue
git add .
git commit -m "hotfix: Fix critical SEO meta tags"

# Push and create PR to main
git push -u origin hotfix/critical-seo-issue

# After merge to main, also merge to develop
git checkout develop
git pull origin develop
git merge hotfix/critical-seo-issue
git push origin develop
```

---

### 4. Release Branches
**Naming**: `release/v1.2.0` or `release/2024-12-24`

**Purpose**: Prepare for production release

**Workflow**:
```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Final testing, bug fixes, version bumps
# Update version in package.json
git add .
git commit -m "chore: Bump version to 1.2.0"

# Build and test
npm run build

# Push and create PR to main
git push -u origin release/v1.2.0

# After merge to main, tag the release
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0

# Merge back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop
```

---

## Recommended Workflow

### Daily Development

```bash
# 1. Start your day - sync with develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/my-new-feature

# 3. Work and commit frequently
git add .
git commit -m "feat: Add new feature component"

# 4. Push regularly
git push -u origin feature/my-new-feature

# 5. When feature is complete, create PR to develop
```

### Production Deployment

```bash
# Option 1: From current branch
./scripts/create-release.sh 1.3.0

# Option 2: From specific source branch to target branch
./scripts/create-release.sh 1.3.0 develop main

# Option 3: From any branch
./scripts/create-release.sh 1.3.0 master main

# After PR merge and tagging:
# 1. Tag the release
git checkout main
git pull origin main
git tag -a v1.3.0 -m "Release v1.3.0: New features and bug fixes"
git push origin v1.3.0

# 2. Deploy to production
./scripts/deploy-remote.sh v1.3.0 production pm2 user@server.com /var/www/bihesewa.com
```

### Production Rollback

#### Option 1: Use Rollback Script (Recommended)

```bash
# Rollback current branch to a tag
./scripts/rollback.sh v1.2.0

# Rollback specific branch (e.g., main) to a tag
./scripts/rollback.sh v1.2.0 main

# Rollback with custom branch name
./scripts/rollback.sh v1.2.0 main hotfix/rollback-ui-issue
```

#### Option 2: Revert the Commit

```bash
# 1. Find the problematic commit
git log --oneline main

# 2. Revert the commit (creates new commit that undoes changes)
git checkout main
git pull origin main
git revert <commit-hash>

# 3. Push the revert
git push origin main

# 4. Build and deploy
npm run build
./scripts/deploy-remote.sh main production pm2 user@server.com /var/www/bihesewa.com
```

---

## Next.js-Specific Deployment

### Build Process

```bash
# 1. Build the application
npm run build

# This creates .next/ folder with:
# - server/ (server-side code)
# - static/ (static assets)
# - cache/ (build cache)
```

### Deployment Methods

#### Method 1: Deploy on Server (SSH into server first)
```bash
# SSH into production server
ssh user@your-server.com

# Navigate to project directory
cd ~/bihesewa_web

# Pull latest changes
git pull origin main

# Build and deploy
./scripts/deploy.sh v1.2.0 production pm2
```

#### Method 2: Deploy from Local Machine (via SSH)
```bash
# Deploy remotely from your local machine
./scripts/deploy-remote.sh v1.2.0 production pm2 user@your-server.com /var/www/bihesewa.com
```

This script:
- Checks out version/branch on server
- Builds the application on server
- Installs dependencies
- Restarts PM2 application
- Deploys to specified server path

---

## Commit Message Convention

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `hotfix`: Critical production fix
- `refactor`: Code refactoring
- `chore`: Maintenance tasks
- `docs`: Documentation
- `style`: UI/styling changes
- `perf`: Performance improvements

**Examples**:
```bash
git commit -m "feat(web): Add new landing page design"
git commit -m "fix(ui): Resolve mobile responsive issue"
git commit -m "hotfix(seo): Fix meta tags for better SEO"
git commit -m "style(components): Update button styling"
```

---

## Tagging Strategy

### Semantic Versioning: `vMAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

**Examples**:
- `v1.0.0` - Initial release
- `v1.1.0` - New features added
- `v1.1.1` - Bug fixes
- `v2.0.0` - Major breaking changes

**Tagging Commands**:
```bash
# Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0: New landing page and SEO improvements"

# Push tag to remote
git push origin v1.2.0

# List all tags
git tag -l

# Show tag details
git show v1.2.0
```

---

## Quick Reference Commands

```bash
# Create feature branch
git checkout -b feature/my-feature develop

# Create bugfix branch
git checkout -b bugfix/fix-issue develop

# Create hotfix branch
git checkout -b hotfix/critical-fix main

# Create release branch
./scripts/create-release.sh 1.2.0 develop main

# Deploy to production
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com

# Rollback to previous version
./scripts/rollback.sh v1.1.0 main

# View branch structure
git log --oneline --graph --all --decorate

# Clean up merged branches
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d
```

---

## Best Practices

1. **Always create branches from the correct base**
   - Features from `develop`
   - Hotfixes from `main`

2. **Keep branches small and focused**
   - One feature per branch
   - Regular commits

3. **Test before merging**
   - Build locally: `npm run build`
   - Test functionality
   - Check for errors

4. **Use descriptive commit messages**
   - Follow conventional commits
   - Be specific about changes

5. **Regularly sync with base branch**
   - Pull latest changes
   - Resolve conflicts early

6. **Delete merged branches**
   - Clean up local branches
   - Keep repository tidy

7. **Tag releases**
   - Always tag production releases
   - Use semantic versioning
   - Include release notes

---

## Troubleshooting

### Branch Conflicts

```bash
# Update your branch with latest changes
git checkout feature/my-feature
git pull origin develop  # or main
git rebase develop       # or merge

# Resolve conflicts, then continue
git add .
git rebase --continue    # or git commit
```

### Undo Last Commit

```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes, undo commit
git reset --hard HEAD~1
```

### Force Push (Use with caution!)

```bash
# Only use on feature branches, never on main/develop
git push --force-with-lease origin feature/my-feature
```

---

## Summary

This branching strategy provides:
- ✅ Clear workflow for features, bugs, and releases
- ✅ Safe production deployments
- ✅ Easy rollback process
- ✅ Organized code management
- ✅ Team collaboration support

Follow these guidelines to maintain a clean, organized, and efficient development workflow.

