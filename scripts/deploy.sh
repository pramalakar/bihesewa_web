#!/bin/bash

# Deployment Script for bihesewa_web (Next.js)
# Usage: ./scripts/deploy.sh [version|branch] [environment] [method]
# Example: ./scripts/deploy.sh v1.2.0 production pm2
# Example: ./scripts/deploy.sh main production pm2
# Example: ./scripts/deploy.sh release/v1.2.0 staging pm2

set -e  # Exit on error

VERSION_OR_BRANCH=${1:-"main"}
ENVIRONMENT=${2:-"production"}
METHOD=${3:-"pm2"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Validate inputs
if [ -z "$VERSION_OR_BRANCH" ]; then
    print_error "Version or branch is required"
    echo "Usage: ./scripts/deploy.sh [version|branch] [environment] [method]"
    echo "Example: ./scripts/deploy.sh v1.2.0 production pm2"
    exit 1
fi

if [[ ! "$ENVIRONMENT" =~ ^(production|staging|development)$ ]]; then
    print_error "Invalid environment. Use: production, staging, or development"
    exit 1
fi

if [[ ! "$METHOD" =~ ^(pm2|manual)$ ]]; then
    print_error "Invalid method. Use: pm2 or manual"
    exit 1
fi

print_info "Starting deployment..."
echo "📦 Version/Branch: $VERSION_OR_BRANCH"
echo "🌍 Environment: $ENVIRONMENT"
echo "🚀 Method: $METHOD"
echo ""

# Check if git repository is clean
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Working directory has uncommitted changes"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Check if version is a tag
IS_TAG=false
if git rev-parse "$VERSION_OR_BRANCH" >/dev/null 2>&1; then
    if git tag -l | grep -q "^$VERSION_OR_BRANCH$"; then
        IS_TAG=true
        print_info "Detected tag: $VERSION_OR_BRANCH"
    fi
fi

# Function: Deploy with PM2
deploy_pm2() {
    print_info "Deploying with PM2..."
    
    # Check if PM2 is installed
    if ! command -v pm2 &> /dev/null; then
        print_error "PM2 is not installed. Install with: npm install -g pm2"
        exit 1
    fi
    
    # Backup .env if it exists (before git operations)
    if [ -f ".env.production" ]; then
        print_info "Backing up .env.production file..."
        cp .env.production .env.production.backup
        ENV_BACKED_UP=true
    else
        ENV_BACKED_UP=false
    fi
    
    # Checkout the version/branch
    if [ "$IS_TAG" = true ]; then
        print_info "Checking out tag: $VERSION_OR_BRANCH"
        git fetch --tags
        git checkout "$VERSION_OR_BRANCH"
    else
        print_info "Checking out branch: $VERSION_OR_BRANCH"
        git fetch origin
        git checkout "$VERSION_OR_BRANCH"
        git pull origin "$VERSION_OR_BRANCH"
    fi
    
    # Restore .env if it was backed up
    if [ "$ENV_BACKED_UP" = true ] && [ -f ".env.production.backup" ]; then
        print_info "Restoring .env.production file..."
        mv .env.production.backup .env.production
        print_success ".env.production file preserved"
    fi
    
    # Check for .env.production file
    if [ ! -f ".env.production" ]; then
        print_warning ".env.production file not found"
        if [ -f ".env.production.example" ]; then
            print_info "Creating .env.production from .env.production.example template..."
            cp .env.production.example .env.production
            print_warning "⚠️  IMPORTANT: Edit .env.production file with production values!"
            read -p "Continue deployment? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        else
            print_warning "⚠️  Create .env.production file manually with production configuration"
        fi
    else
        print_success ".env.production file found and preserved"
    fi
    
    # Install dependencies
    print_info "Installing dependencies..."
    npm ci --production=false  # Next.js needs devDependencies for build
    
    # Build the application
    print_info "Building Next.js application for $ENVIRONMENT..."
    export NODE_ENV="$ENVIRONMENT"
    npm run build
    
    # Check if build was successful
    if [ ! -d ".next" ]; then
        print_error "Build failed: .next directory not found"
        exit 1
    fi
    
    print_success "Build completed successfully!"
    print_info "Build output: .next/"
    print_info "Size: $(du -sh .next | cut -f1)"
    
    # Set environment
    export NODE_ENV="$ENVIRONMENT"
    
    # Restart PM2
    print_info "Restarting PM2 application..."
    if pm2 list | grep -q "bihesewa.com"; then
        pm2 restart ecosystem.config.js --env "$ENVIRONMENT" --update-env
        print_success "PM2 application restarted"
    else
        pm2 start ecosystem.config.js --env "$ENVIRONMENT"
        print_success "PM2 application started"
    fi
    
    # Show status
    pm2 status
    pm2 logs bihesewa.com --lines 20
}

# Function: Manual deployment (just build)
deploy_manual() {
    print_info "Preparing manual deployment..."
    
    # Backup .env if it exists (before git operations)
    if [ -f ".env.production" ]; then
        print_info "Backing up .env.production file..."
        cp .env.production .env.production.backup
        ENV_BACKED_UP=true
    else
        ENV_BACKED_UP=false
    fi
    
    # Checkout the version/branch
    if [ "$IS_TAG" = true ]; then
        print_info "Checking out tag: $VERSION_OR_BRANCH"
        git fetch --tags
        git checkout "$VERSION_OR_BRANCH"
    else
        print_info "Checking out branch: $VERSION_OR_BRANCH"
        git fetch origin
        git checkout "$VERSION_OR_BRANCH"
        git pull origin "$VERSION_OR_BRANCH"
    fi
    
    # Restore .env if it was backed up
    if [ "$ENV_BACKED_UP" = true ] && [ -f ".env.production.backup" ]; then
        print_info "Restoring .env.production file..."
        mv .env.production.backup .env.production
        print_success ".env.production file preserved"
    fi
    
    # Install dependencies
    print_info "Installing dependencies..."
    npm ci --production=false
    
    print_success "Code prepared for manual deployment"
    print_info "Next steps:"
    echo "  1. Build: npm run build"
    echo "  2. Start: npm start (or use PM2: pm2 start ecosystem.config.js)"
    echo "  3. Configure web server (nginx) to proxy to Node.js server"
}

# Main deployment logic
case $METHOD in
    pm2)
        deploy_pm2
        ;;
    manual)
        deploy_manual
        ;;
    *)
        print_error "Unknown deployment method: $METHOD"
        exit 1
        ;;
esac

print_success "Deployment completed!"
print_info "Deployed: $VERSION_OR_BRANCH to $ENVIRONMENT using $METHOD"

# Show deployment info
echo ""
echo "📊 Deployment Summary:"
echo "  Version/Branch: $VERSION_OR_BRANCH"
echo "  Environment: $ENVIRONMENT"
echo "  Method: $METHOD"
echo "  Timestamp: $(date)"

