#!/bin/bash

# BiheSewa Web Deployment Script
# Usage: ./deploy.sh [build|deploy|full] [server_user@server_host] [server_path]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_MODE="${1:-full}"  # build, deploy, or full
SERVER="${2:-}"           # server_user@server_host
SERVER_PATH="${3:-/var/www/bihesewa.com}"  # Server deployment path
LOCAL_BUILD_DIR=".next"

# Functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    print_info "Node.js version: $(node -v)"
}

# Build the application
build_app() {
    print_info "Building application for production..."
    
    # Check if .env.production exists
    if [ ! -f ".env.production" ]; then
        print_warn ".env.production not found. Using default environment variables."
    fi
    
    # Clean previous build
    if [ -d "$LOCAL_BUILD_DIR" ]; then
        print_info "Cleaning previous build..."
        rm -rf "$LOCAL_BUILD_DIR"
    fi
    
    # Install dependencies
    print_info "Installing dependencies..."
    npm install
    
    # Build
    print_info "Running production build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_info "Build completed successfully!"
    else
        print_error "Build failed!"
        exit 1
    fi
}

# Deploy to server
deploy_to_server() {
    if [ -z "$SERVER" ]; then
        print_error "Server not specified. Usage: ./deploy.sh deploy user@host [path]"
        exit 1
    fi
    
    print_info "Deploying to server: $SERVER"
    print_info "Server path: $SERVER_PATH"
    
    # Create deployment package (exclude node_modules and .next)
    print_info "Creating deployment package..."
    TEMP_DIR=$(mktemp -d)
    DEPLOY_PACKAGE="$TEMP_DIR/bihesewa_web_deploy.tar.gz"
    
    # Files to include
    tar -czf "$DEPLOY_PACKAGE" \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.git' \
        --exclude='.env.local' \
        --exclude='*.log' \
        --exclude='.DS_Store' \
        app/ components/ public/ src/ \
        package.json package-lock.json \
        next.config.ts tsconfig.json \
        postcss.config.mjs eslint.config.mjs \
        ecosystem.config.js \
        .env.production .env.example \
        README.md
    
    # Copy to server
    print_info "Copying files to server..."
    scp "$DEPLOY_PACKAGE" "$SERVER:/tmp/bihesewa_web_deploy.tar.gz"
    
    # Extract and setup on server
    print_info "Setting up on server..."
    ssh "$SERVER" << EOF
        set -e
        cd $SERVER_PATH
        
        # Check disk space
        echo "Checking disk space..."
        DISK_USAGE=\$(df -h $SERVER_PATH | awk 'NR==2 {print \$5}' | sed 's/%//')
        echo "Disk usage: \${DISK_USAGE}%"
        
        # Clean up old backups if disk space is above 90%
        if [ "\$DISK_USAGE" -gt 90 ]; then
            echo "WARNING: Disk usage is above 90%. Cleaning up old backups..."
            # Keep only the 2 most recent backups
            ls -dt backup_* 2>/dev/null | tail -n +3 | xargs rm -rf 2>/dev/null || true
            # Clean up node_modules from old backups to save space
            for backup in backup_*; do
                if [ -d "\$backup/node_modules" ]; then
                    echo "Removing node_modules from \$backup..."
                    rm -rf "\$backup/node_modules" 2>/dev/null || true
                fi
                if [ -d "\$backup/.next" ]; then
                    echo "Removing .next from \$backup..."
                    rm -rf "\$backup/.next" 2>/dev/null || true
                fi
            done
            # Clean npm cache
            echo "Cleaning npm cache..."
            npm cache clean --force 2>/dev/null || true
        fi
        
        # Check disk space again
        DISK_USAGE=\$(df -h $SERVER_PATH | awk 'NR==2 {print \$5}' | sed 's/%//')
        if [ "\$DISK_USAGE" -gt 95 ]; then
            echo "ERROR: Disk usage is still above 95% (\${DISK_USAGE}%). Please free up space manually."
            exit 1
        fi
        
        # Backup existing deployment (if it exists and is not already a backup)
        if [ -f "package.json" ] || [ -d "app" ] || [ -d "components" ]; then
            echo "Backing up existing deployment..."
            BACKUP_DIR="backup_\$(date +%Y%m%d_%H%M%S)"
            mkdir -p "\$BACKUP_DIR"
            # Move production files to backup (exclude backup folders, node_modules, and .next)
            for item in *; do
                if [ -e "\$item" ] && [[ ! "\$item" =~ ^backup_ ]] && [ "\$item" != "node_modules" ] && [ "\$item" != ".next" ]; then
                    mv "\$item" "\$BACKUP_DIR/" 2>/dev/null || true
                fi
            done
        fi
        
        # Extract files directly to deployment directory (suppress macOS extended attribute warnings)
        echo "Extracting files..."
        tar -xzf /tmp/bihesewa_web_deploy.tar.gz 2>/dev/null || tar -xzf /tmp/bihesewa_web_deploy.tar.gz --warning=no-unknown-keyword
        
        # Install all dependencies (including devDependencies for build)
        echo "Installing dependencies..."
        npm ci
        
        # Build on server
        echo "Building application..."
        npm run build
        
        # Set environment variables
        if [ -f .env.production ]; then
            echo "Environment variables found"
        else
            echo "WARNING: .env.production not found. Make sure to set environment variables on server."
        fi
        
        # Cleanup
        rm /tmp/bihesewa_web_deploy.tar.gz
        
        echo "Deployment completed successfully!"
EOF
    
    # Cleanup local temp
    rm -rf "$TEMP_DIR"
    
    print_info "Deployment completed!"
    print_warn "Don't forget to restart your Next.js process on the server (e.g., pm2 restart bihesewa.com)"
}

# Standalone deployment (copy .next folder)
deploy_standalone() {
    if [ -z "$SERVER" ]; then
        print_error "Server not specified. Usage: ./deploy.sh standalone user@host [path]"
        exit 1
    fi
    
    print_info "Deploying standalone build to server: $SERVER"
    
    if [ ! -d "$LOCAL_BUILD_DIR" ]; then
        print_error "Build not found. Run 'npm run build' first."
        exit 1
    fi
    
    if [ ! -d "$LOCAL_BUILD_DIR/standalone" ]; then
        print_error "Standalone build not found. Make sure next.config.ts has 'output: standalone'"
        exit 1
    fi
    
    print_info "Creating standalone deployment package..."
    TEMP_DIR=$(mktemp -d)
    DEPLOY_PACKAGE="$TEMP_DIR/bihesewa_web_standalone.tar.gz"
    
    # Package standalone build
    tar -czf "$DEPLOY_PACKAGE" \
        -C "$LOCAL_BUILD_DIR" standalone \
        -C "$LOCAL_BUILD_DIR" static \
        -C . public package.json
    
    # Copy to server
    print_info "Copying to server..."
    scp "$DEPLOY_PACKAGE" "$SERVER:/tmp/bihesewa_web_standalone.tar.gz"
    
    # Setup on server
    ssh "$SERVER" << EOF
        set -e
        cd $SERVER_PATH
        
        # Backup existing deployment
        if [ -f "package.json" ] || [ -d ".next" ]; then
            echo "Backing up existing deployment..."
            BACKUP_DIR="backup_\$(date +%Y%m%d_%H%M%S)"
            mkdir -p "\$BACKUP_DIR"
            for item in *; do
                if [ -e "\$item" ] && [[ ! "\$item" =~ ^backup_ ]] && [ "\$item" != "node_modules" ]; then
                    mv "\$item" "\$BACKUP_DIR/" 2>/dev/null || true
                fi
            done
        fi
        
        # Extract directly to deployment directory
        tar -xzf /tmp/bihesewa_web_standalone.tar.gz
        
        # Install only production dependencies
        npm ci --production
        
        rm /tmp/bihesewa_web_standalone.tar.gz
        
        echo "Standalone deployment completed!"
        echo "Start with: node .next/standalone/server.js"
EOF
    
    rm -rf "$TEMP_DIR"
    print_info "Standalone deployment completed!"
}

# Main execution
main() {
    print_info "BiheSewa Web Deployment Script"
    print_info "=============================="
    
    check_node
    
    case "$DEPLOY_MODE" in
        build)
            build_app
            ;;
        deploy)
            deploy_to_server
            ;;
        standalone)
            deploy_standalone
            ;;
        full)
            build_app
            if [ -n "$SERVER" ]; then
                deploy_to_server
            else
                print_warn "Server not specified. Build completed. Use './deploy.sh deploy user@host' to deploy."
            fi
            ;;
        *)
            print_error "Invalid mode: $DEPLOY_MODE"
            echo "Usage: ./deploy.sh [build|deploy|standalone|full] [server_user@server_host] [server_path]"
            echo ""
            echo "Modes:"
            echo "  build      - Build the application locally"
            echo "  deploy     - Deploy to server (builds on server)"
            echo "  standalone - Deploy standalone build (copies .next folder)"
            echo "  full       - Build locally and deploy to server"
            exit 1
            ;;
    esac
}

main

