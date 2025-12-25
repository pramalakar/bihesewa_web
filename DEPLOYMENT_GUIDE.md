# Deployment Guide for bihesewa_web (Next.js)

## How Production Deployment Works

### Overview

`bihesewa_web` is a **Next.js application** that needs to be:
1. **Built** (compiled) into optimized production code
2. **Deployed** to a server with Node.js
3. **Run** as a Node.js server (using PM2 or npm start)
4. **Served** through a web server (nginx) as a reverse proxy

---

## Deployment Process

### Step-by-Step Flow

```
1. Source Code (Next.js/React)
   ↓
2. Build Process (npm run build)
   ↓
3. Production Build (.next/ folder)
   ↓
4. Deploy to Server (with Node.js)
   ↓
5. Start Node.js Server (PM2 or npm start)
   ↓
6. Web Server (nginx) → Reverse Proxy → Node.js
   ↓
7. Users Access via Browser
```

---

## Build Process

### What Happens During Build

When you run `npm run build`:

1. **Next.js compiles** your React/TypeScript source code
2. **Optimizes** code (minification, tree-shaking, code splitting)
3. **Generates** static pages (if using static generation)
4. **Creates** `.next/` folder with production build
5. **Prepares** server-side rendering (SSR) code

### Build Output Structure

```
.next/
├── server/              # Server-side code
├── static/              # Static assets
├── cache/               # Build cache
└── ...                  # Other build artifacts
```

**Important:** Next.js needs Node.js on the server to run!

---

## Deployment Methods

### Method 1: Deploy from Local Machine (Recommended)

**Use:** `deploy-remote.sh`

**What it does:**
1. ✅ Checks out version/branch locally
2. ✅ Builds the app **on the server** (ensures correct environment)
3. ✅ Installs dependencies on server
4. ✅ Restarts PM2 application
5. ✅ **One command does everything**

**Command:**
```bash
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

**Parameters:**
- `v1.2.0` - Version/tag or branch name
- `production` - Environment (production/staging/development)
- `pm2` - Method (pm2/manual)
- `user@server.com` - SSH server address
- `/var/www/bihesewa.com` - Server deployment path

**Example:**
```bash
# Deploy version 1.2.0 to production
./scripts/deploy-remote.sh v1.2.0 production pm2 admin@bihesewa.com /var/www/bihesewa.com

# Deploy main branch to staging
./scripts/deploy-remote.sh main staging pm2 admin@staging.bihesewa.com /var/www/staging
```

---

### Method 2: Deploy on Server (SSH into server first)

**Use:** `deploy.sh`

**What it does:**
1. ✅ Checks out code on server
2. ✅ Installs dependencies (`npm ci`)
3. ✅ Builds the app on server (`npm run build`)
4. ✅ Creates `.next/` folder on server
5. ✅ Restarts PM2 application

**Command:**
```bash
# SSH into server first
ssh user@server.com
cd ~/bihesewa_web

# Then run deploy script
./scripts/deploy.sh v1.2.0 production pm2
```

---

## Complete Deployment Workflow

### Recommended: Deploy from Local

```bash
# 1. Make sure you're on the correct branch/tag
git checkout main
git pull origin main

# 2. Deploy remotely (builds on server, restarts PM2)
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

**What happens:**
1. Script connects to server via SSH
2. Checks out version/branch on server
3. Installs dependencies (`npm ci`)
4. Builds application (`npm run build`)
5. Restarts PM2 application
6. Application is live!

---

## Web Server Configuration

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name bihesewa.com www.bihesewa.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bihesewa.com www.bihesewa.com;

    # SSL certificates
    ssl_certificate /etc/ssl/certs/bihesewa.com.crt;
    ssl_certificate_key /etc/ssl/private/bihesewa.com.key;

    # Proxy to Next.js server
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Environment Variables

### Build-Time Configuration

Next.js uses environment variables at **build time** and **runtime**.

**Files:**
- `.env.local` - Local development (gitignored)
- `.env.production` - Production values (gitignored)
- `.env.staging` - Staging values (gitignored)

**Example `.env.production`:**
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.bihesewa.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxx
```

**Important:** 
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are server-side only
- Must rebuild if you change environment variables
- `.env.production` should be on the server (not in git)

**Usage in code:**
```typescript
// Client-side (browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side only
const secretKey = process.env.SECRET_KEY;
```

---

## PM2 Configuration

### ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'bihesewa.com',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/bihesewa.com',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: '3001'
    }
  }]
};
```

### PM2 Commands

```bash
# Start application
pm2 start ecosystem.config.js

# Restart application
pm2 restart bihesewa.com

# Stop application
pm2 stop bihesewa.com

# View logs
pm2 logs bihesewa.com

# View status
pm2 status

# Monitor
pm2 monit
```

---

## Deployment Checklist

### Before Deployment

- [ ] Code is committed and pushed to git
- [ ] Version tag is created (if using tags)
- [ ] Environment variables are set correctly on server
- [ ] Server has Node.js 18+ installed
- [ ] Server has PM2 installed
- [ ] SSH access to server is configured
- [ ] Nginx is configured as reverse proxy

### During Deployment

- [ ] Build completes successfully
- [ ] `.next/` folder is created
- [ ] PM2 restarts successfully
- [ ] Application starts without errors

### After Deployment

- [ ] Test the application in browser
- [ ] Check PM2 logs for errors
- [ ] Verify API connections
- [ ] Test critical user flows
- [ ] Monitor server resources

---

## Rollback Process

### Quick Rollback

```bash
# 1. Rollback to previous version
./scripts/rollback.sh v1.1.0

# 2. Rebuild and deploy
./scripts/deploy-remote.sh v1.1.0 production pm2 user@server.com /var/www/bihesewa.com
```

### Manual Rollback

```bash
# 1. SSH into server
ssh user@server.com
cd ~/bihesewa_web

# 2. Checkout previous version
git checkout v1.1.0

# 3. Rebuild and restart
npm ci
npm run build
pm2 restart bihesewa.com
```

---

## Common Issues & Solutions

### Issue 1: Build Fails

**Error:** `npm run build` fails

**Solutions:**
- Check Node.js version (should be 18+)
- Clear `.next` folder: `rm -rf .next`
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm ci`
- Check for TypeScript/ESLint errors
- Verify all dependencies are installed

### Issue 2: Application Won't Start

**Error:** PM2 shows "errored" status

**Solutions:**
- Check PM2 logs: `pm2 logs bihesewa.com`
- Verify `.env.production` exists and has correct values
- Check if port 3001 is available
- Verify Node.js version matches requirements
- Check file permissions

### Issue 3: 502 Bad Gateway

**Error:** Nginx returns 502

**Solutions:**
- Check if Next.js server is running: `pm2 status`
- Verify port in `ecosystem.config.js` matches nginx config
- Check nginx error logs: `tail -f /var/log/nginx/error.log`
- Restart Next.js: `pm2 restart bihesewa.com`

### Issue 4: Environment Variables Not Working

**Error:** Variables not accessible

**Solutions:**
- Rebuild after changing environment variables
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Check `.env.production` file exists on server
- Restart PM2 after environment changes

---

## Best Practices

### 1. Always Use Tags for Production

```bash
# Create release tag
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0

# Deploy using tag
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
```

### 2. Test Build Locally First

```bash
# Build locally to test
npm run build

# Check .next/ folder
ls -la .next/

# Test locally
npm start
```

### 3. Monitor After Deployment

- Check PM2 logs: `pm2 logs bihesewa.com`
- Monitor error tracking (Sentry, etc.)
- Test critical user flows
- Check performance metrics
- Monitor server resources (CPU, memory)

### 4. Use Environment-Specific Builds

```bash
# Production
./scripts/deploy-remote.sh v1.2.0 production pm2 user@prod.com /var/www/bihesewa.com

# Staging
./scripts/deploy-remote.sh main staging pm2 user@staging.com /var/www/staging
```

### 5. Keep .env.production on Server

- `.env.production` should be on the server, not in git
- Create it manually on server with production values
- Script preserves existing `.env.production` during deployments

---

## Summary

### Key Points

1. **Build on server** (or locally, then copy) → Creates `.next/` folder
2. **Run with Node.js** → PM2 or `npm start`
3. **Reverse proxy** → nginx forwards requests to Node.js
4. **Node.js required** → Server must have Node.js 18+

### Recommended Workflow

```bash
# 1. Create release
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# 2. Deploy from local
./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com

# Done! Application is live
```

---

## Questions?

- **Q: Do I need Node.js on the production server?**
  - **A:** Yes! Next.js is a Node.js application and requires Node.js 18+ on the server.

- **Q: Can I build locally and just copy files?**
  - **A:** Yes, but building on the server ensures the correct environment. The script builds on the server by default.

- **Q: How do I update environment variables?**
  - **A:** Edit `.env.production` on the server, then rebuild and restart: `npm run build && pm2 restart bihesewa.com`

- **Q: What if the build fails?**
  - **A:** Check the error message, fix the issue, and rebuild. The old version remains running until you deploy a new one.

- **Q: How do I check if the application is running?**
  - **A:** Use `pm2 status` or `pm2 logs bihesewa.com` to check the application status and logs.

