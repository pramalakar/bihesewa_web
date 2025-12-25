# When to Use Each Script in bihesewa_web

## Quick Decision Tree

```
Need to prepare a new version for release?
  └─> Use create-release.sh

Ready to deploy to production?
  ├─> Deploying from your local machine?
  │   └─> Use deploy-remote.sh (RECOMMENDED)
  │
  └─> Already SSH'd into the server?
      └─> Use deploy.sh
```

---

## 1. create-release.sh

### When to Use

**Use this when you want to prepare a new version for release.**

### Purpose

- Creates a release branch (`release/v1.2.0`)
- Updates version in `package.json`
- Prepares code for production release
- Sets up for Pull Request workflow

### When NOT to Use

- ❌ Don't use for deploying code
- ❌ Don't use for hotfixes (use hotfix branches instead)
- ❌ Don't use for regular deployments

### Example Workflow

```bash
# Step 1: Create release branch
./scripts/create-release.sh 1.2.0 develop main

# This creates:
# - release/v1.2.0 branch
# - Updates package.json version
# - Pushes to remote

# Step 2: Test the release branch
git checkout release/v1.2.0
npm run build
# Test locally

# Step 3: Create Pull Request
# release/v1.2.0 → main (on Bitbucket/GitHub)

# Step 4: After PR approval and merge
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Step 5: Now deploy using deploy-remote.sh
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

### Use Cases

✅ **Use create-release.sh when:**
- Preparing a new version (e.g., 1.2.0 → 1.3.0)
- Features are complete and ready for release
- Need to create a release branch for testing
- Following semantic versioning workflow

---

## 2. deploy-remote.sh

### When to Use

**Use this when deploying from your local machine to a remote server (RECOMMENDED).**

### Purpose

- Checks out version/branch on server
- Builds the app **on the server** (ensures correct environment)
- Installs dependencies on server
- Restarts PM2 application
- **One command does everything**

### When NOT to Use

- ❌ Don't use if you're already SSH'd into the server (use `deploy.sh` instead)
- ❌ Don't use if you don't have SSH access configured
- ❌ Don't use if you want to manually control the build process

### Example Usage

```bash
# Deploy version 1.2.0 to production
./scripts/deploy-remote.sh v1.2.0 production pm2 admin@bihesewa.com /var/www/bihesewa.com

# Deploy main branch to staging
./scripts/deploy-remote.sh main staging pm2 admin@staging.bihesewa.com /var/www/staging

# Deploy release branch to test
./scripts/deploy-remote.sh release/v1.2.0 staging pm2 admin@test.bihesewa.com /var/www/test
```

### What It Does

1. ✅ Tests SSH connection
2. ✅ Checks out version/branch on server
3. ✅ Installs dependencies (`npm ci`)
4. ✅ Builds app on server (`npm run build`)
5. ✅ Restarts PM2 application
6. ✅ Done! Application is live

### Use Cases

✅ **Use deploy-remote.sh when:**
- Deploying from your local development machine
- You have SSH access to the server
- You want the simplest deployment process
- You want to build on the server (ensures correct environment)
- **This is the RECOMMENDED method for most deployments**

---

## 3. deploy.sh

### When to Use

**Use this when you're already SSH'd into the server.**

### Purpose

- Checks out version/branch on server
- Builds the app **on the server**
- Installs dependencies
- Restarts PM2 application

### When NOT to Use

- ❌ Don't use if deploying from local machine (use `deploy-remote.sh` instead)
- ❌ Don't use if you want automatic SSH handling

### Example Usage

```bash
# Step 1: SSH into server
ssh admin@bihesewa.com

# Step 2: Navigate to project
cd ~/bihesewa_web

# Step 3: Run deploy script
./scripts/deploy.sh v1.2.0 production pm2

# This builds and restarts PM2 on server
```

### What It Does

1. ✅ Checks out version/branch on server
2. ✅ Installs dependencies (`npm ci`)
3. ✅ Builds app on server (`npm run build`)
4. ✅ Restarts PM2 application
5. ✅ Done! Application is live

### Use Cases

✅ **Use deploy.sh when:**
- You're already SSH'd into the server
- You want to build on the server
- You need more control over the deployment process
- You're troubleshooting deployment issues

---

## Complete Workflow Example

### Scenario: Release Version 1.2.0 to Production

```bash
# Step 1: Create release branch
./scripts/create-release.sh 1.2.0 develop main

# Step 2: Test release branch
git checkout release/v1.2.0
npm run build
# Test locally

# Step 3: Create Pull Request (on Bitbucket/GitHub)
# release/v1.2.0 → main

# Step 4: After PR approval and merge
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Step 5: Deploy to production (from local machine)
./scripts/deploy-remote.sh v1.2.0 production pm2 admin@bihesewa.com /var/www/bihesewa.com

# Done! Application is live
```

---

## Comparison Table

| Script | When to Use | Builds Where | Restarts PM2 | Best For |
|--------|-------------|--------------|--------------|----------|
| **create-release.sh** | Preparing new version | N/A | N/A | Version management |
| **deploy-remote.sh** | Deploy from local | Server | ✅ Automatic | **Most deployments** |
| **deploy.sh** | Deploy on server | Server | ✅ Automatic | Server-side deployments |

---

## Common Scenarios

### Scenario 1: Regular Production Deployment

**Situation:** You have a new version ready to deploy

**Steps:**
1. ✅ Tag the version: `git tag -a v1.2.0 -m "Release v1.2.0"`
2. ✅ Push tag: `git push origin v1.2.0`
3. ✅ Deploy: `./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com`

**Script Used:** `deploy-remote.sh`

---

### Scenario 2: Quick Hotfix Deployment

**Situation:** Critical bug needs immediate fix

**Steps:**
1. ✅ Create hotfix branch: `git checkout -b hotfix/critical-bug main`
2. ✅ Fix bug and commit
3. ✅ Merge to main and tag: `git tag -a v1.2.1 -m "Hotfix"`
4. ✅ Deploy immediately: `./scripts/deploy-remote.sh v1.2.1 production pm2 user@server.com /var/www/bihesewa.com`

**Script Used:** `deploy-remote.sh` (skip `create-release.sh` for urgent fixes)

---

### Scenario 3: Testing Release Branch

**Situation:** Want to test a release branch before merging

**Steps:**
1. ✅ Create release: `./scripts/create-release.sh 1.2.0 develop main`
2. ✅ Deploy to staging: `./scripts/deploy-remote.sh release/v1.2.0 staging pm2 user@staging.com /var/www/staging`
3. ✅ Test on staging
4. ✅ If good, merge PR and deploy to production

**Scripts Used:** `create-release.sh` + `deploy-remote.sh`

---

### Scenario 4: Server-Side Deployment

**Situation:** Already on the server, want to deploy directly

**Steps:**
1. ✅ SSH into server: `ssh user@server.com`
2. ✅ Navigate: `cd ~/bihesewa_web`
3. ✅ Deploy: `./scripts/deploy.sh v1.2.0 production pm2`

**Script Used:** `deploy.sh`

---

## Summary

### Most Common Workflow (Recommended)

```bash
# 1. Create release (when preparing new version)
./scripts/create-release.sh 1.2.0 develop main

# 2. After PR merge and tagging
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

### Quick Deployment (No Release Branch)

```bash
# Just deploy directly
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

### Server-Side Deployment

```bash
# SSH into server first
ssh user@server.com
cd ~/bihesewa_web
./scripts/deploy.sh v1.2.0 production pm2
```

---

## Quick Reference

| Need | Script | Command |
|------|--------|---------|
| Prepare new version | `create-release.sh` | `./scripts/create-release.sh 1.2.0` |
| Deploy from local | `deploy-remote.sh` | `./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com` |
| Deploy on server | `deploy.sh` | `./scripts/deploy.sh v1.2.0 production pm2` |

---

## Tips

1. **Most deployments:** Use `deploy-remote.sh` (simplest, recommended)
2. **Version management:** Use `create-release.sh` for organized releases
3. **Server builds:** Use `deploy.sh` only if you're already on the server
4. **Always tag:** Create git tags for production deployments
5. **Test first:** Deploy to staging before production
6. **Monitor logs:** Check PM2 logs after deployment: `pm2 logs bihesewa.com`

