#!/bin/bash

# Remote Deployment Script for bihesewa_web (Next.js) - Run this from your local machine
# Usage: ./scripts/deploy-remote.sh [version|branch] [environment] [method] [server] [server-path] [update-nginx]
# Example: ./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com
# Example: ./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com true
# Example: ./scripts/deploy-remote.sh v1.2.0 production pm2 user@192.168.1.100 /var/www/bihesewa.com false

set -e  # Exit on error

VERSION_OR_BRANCH=${1:-"main"}
ENVIRONMENT=${2:-"production"}
METHOD=${3:-"pm2"}
SERVER=${4:-""}
SERVER_PATH=${5:-"/var/www/bihesewa.com"}
UPDATE_NGINX=${6:-"false"}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Validate server
if [ -z "$SERVER" ]; then
    print_error "Server is required for remote deployment"
    echo "Usage: ./scripts/deploy-remote.sh [version|branch] [environment] [method] [server] [server-path] [update-nginx]"
    echo "Example: ./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com"
    echo "Example: ./scripts/deploy-remote.sh v1.2.0 production pm2 user@server.com /var/www/bihesewa.com true"
    exit 1
fi

print_info "Starting remote deployment..."
echo "📦 Version/Branch: $VERSION_OR_BRANCH"
echo "🌍 Environment: $ENVIRONMENT"
echo "🚀 Method: $METHOD"
echo "🖥️  Server: $SERVER"
echo "📁 Server Path: $SERVER_PATH"
echo "🌐 Update Nginx: $UPDATE_NGINX"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Check if we're in a git repository
if [ ! -d "$PROJECT_DIR/.git" ]; then
    print_error "Not in a git repository. Clone the repo first."
    exit 1
fi

# Check SSH connection
print_info "Testing SSH connection..."
if ! ssh -o ConnectTimeout=5 "$SERVER" "echo 'Connection successful'" &>/dev/null; then
    print_error "Cannot connect to server: $SERVER"
    echo "Make sure:"
    echo "  1. SSH key is set up (ssh-copy-id $SERVER)"
    echo "  2. Server is accessible"
    echo "  3. User has proper permissions"
    exit 1
fi
print_success "SSH connection successful"

# Check if git is available on remote server
print_info "Checking git on remote server..."
if ! ssh "$SERVER" "command -v git" &>/dev/null; then
    print_error "Git is not installed on remote server"
    exit 1
fi

# Check if Node.js is available on remote server
print_info "Checking Node.js on remote server..."
if ! ssh "$SERVER" "command -v node" &>/dev/null; then
    print_error "Node.js is not installed on remote server"
    exit 1
fi

# Check if PM2 is available on remote server (if using pm2 method)
if [ "$METHOD" = "pm2" ]; then
    print_info "Checking PM2 on remote server..."
    if ! ssh "$SERVER" "command -v pm2" &>/dev/null; then
        print_error "PM2 is not installed on remote server"
        print_info "Install with: ssh $SERVER 'npm install -g pm2'"
        exit 1
    fi
fi

# Check if repository exists on server
print_info "Checking repository on server..."
REPO_DIR="~/bihesewa_web"
if ! ssh "$SERVER" "[ -d $REPO_DIR ]" &>/dev/null; then
    print_warning "Repository not found on server. Cloning..."
    # Try to get remote URL
    REMOTE_URL=$(git config --get remote.origin.url || echo "")
    if [ -z "$REMOTE_URL" ]; then
        print_error "Could not determine git remote URL. Please clone manually on server."
        exit 1
    fi
    ssh "$SERVER" "git clone $REMOTE_URL $REPO_DIR"
fi

# Copy deployment script to server
print_info "Copying deployment script to server..."
scp "$SCRIPT_DIR/deploy.sh" "$SERVER:$REPO_DIR/scripts/deploy.sh"
chmod +x "$SCRIPT_DIR/deploy.sh"

# Copy ecosystem.config.js if exists
if [ -f "$PROJECT_DIR/ecosystem.config.js" ]; then
    print_info "Copying ecosystem.config.js to server..."
    ssh "$SERVER" "mkdir -p $REPO_DIR"
    scp "$PROJECT_DIR/ecosystem.config.js" "$SERVER:$REPO_DIR/ecosystem.config.js"
fi

# Check for .env.production on server
print_info "Checking for .env.production file on server..."
if ! ssh "$SERVER" "[ -f $REPO_DIR/.env.production ]" &>/dev/null; then
    print_warning ".env.production file not found on server"
    if [ -f "$PROJECT_DIR/.env.production.example" ]; then
        print_info "Copying .env.production.example to server as .env.production template..."
        scp "$PROJECT_DIR/.env.production.example" "$SERVER:$REPO_DIR/.env.production"
        print_warning "⚠️  IMPORTANT: Edit .env.production on server with production values!"
        print_info "SSH into server and edit: ssh $SERVER 'nano $REPO_DIR/.env.production'"
        read -p "Continue deployment? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        print_error ".env.production file is required for production deployment"
        print_info "Create .env.production file on server manually:"
        print_info "  ssh $SERVER"
        print_info "  cd $REPO_DIR"
        print_info "  nano .env.production"
        exit 1
    fi
else
    print_success ".env.production file exists on server (will not be overwritten)"
fi

# Execute deployment on remote server
print_info "Executing deployment on remote server..."
ssh "$SERVER" "cd $REPO_DIR && chmod +x scripts/deploy.sh && ./scripts/deploy.sh $VERSION_OR_BRANCH $ENVIRONMENT $METHOD"

# Handle nginx configuration
if [ "$UPDATE_NGINX" = "true" ] || [ "$UPDATE_NGINX" = "yes" ] || [ "$UPDATE_NGINX" = "1" ]; then
    print_info "Updating nginx configuration..."
    
    # Check if nginx config file exists locally
    NGINX_CONFIG_FILE=""
    if [ -f "$PROJECT_DIR/bihesewa.com.conf" ]; then
        NGINX_CONFIG_FILE="bihesewa.com.conf"
    elif [ -f "$PROJECT_DIR/nginx.conf" ]; then
        NGINX_CONFIG_FILE="nginx.conf"
    elif [ -f "$PROJECT_DIR/nginx/bihesewa.com.conf" ]; then
        NGINX_CONFIG_FILE="nginx/bihesewa.com.conf"
    fi
    
    if [ -n "$NGINX_CONFIG_FILE" ]; then
        print_info "Found nginx config: $NGINX_CONFIG_FILE"
        
        # Check if nginx is installed on server
        if ssh "$SERVER" "command -v nginx" &>/dev/null; then
            # Determine nginx config directory
            NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
            NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
            
            # Check if sites-available exists, otherwise use conf.d
            if ! ssh "$SERVER" "[ -d $NGINX_SITES_AVAILABLE ]" &>/dev/null; then
                NGINX_SITES_AVAILABLE="/etc/nginx/conf.d"
                NGINX_SITES_ENABLED="/etc/nginx/conf.d"
            fi
            
            # Backup existing config
            CONFIG_NAME="bihesewa.com"
            print_info "Backing up existing nginx config..."
            ssh "$SERVER" "sudo cp $NGINX_SITES_AVAILABLE/$CONFIG_NAME.conf $NGINX_SITES_AVAILABLE/$CONFIG_NAME.conf.backup.\$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"
            
            # Copy new config to server
            print_info "Copying nginx config to server..."
            scp "$PROJECT_DIR/$NGINX_CONFIG_FILE" "$SERVER:/tmp/$CONFIG_NAME.conf"
            
            # Move to nginx directory (requires sudo)
            print_info "Installing nginx config..."
            ssh "$SERVER" "sudo mv /tmp/$CONFIG_NAME.conf $NGINX_SITES_AVAILABLE/$CONFIG_NAME.conf"
            
            # Create symlink if using sites-available/sites-enabled
            if [ "$NGINX_SITES_AVAILABLE" != "$NGINX_SITES_ENABLED" ]; then
                print_info "Enabling nginx site..."
                ssh "$SERVER" "sudo ln -sf $NGINX_SITES_AVAILABLE/$CONFIG_NAME.conf $NGINX_SITES_ENABLED/$CONFIG_NAME.conf"
            fi
            
            # Test nginx configuration
            print_info "Testing nginx configuration..."
            if ssh "$SERVER" "sudo nginx -t" &>/dev/null; then
                print_success "Nginx configuration is valid"
                
                # Ask for confirmation before reloading
                read -p "Reload nginx to apply changes? (y/n) " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    print_info "Reloading nginx..."
                    ssh "$SERVER" "sudo systemctl reload nginx || sudo service nginx reload"
                    print_success "Nginx reloaded successfully"
                else
                    print_warning "Nginx configuration updated but not reloaded"
                    print_info "Reload manually: ssh $SERVER 'sudo systemctl reload nginx'"
                fi
            else
                print_error "Nginx configuration test failed!"
                print_warning "Configuration not applied. Please check manually."
                print_info "Test manually: ssh $SERVER 'sudo nginx -t'"
            fi
        else
            print_warning "Nginx is not installed on server. Skipping nginx configuration."
        fi
    else
        print_warning "Nginx config file not found in project. Skipping nginx update."
        print_info "Expected files: bihesewa.com.conf, nginx.conf, or nginx/bihesewa.com.conf"
    fi
else
    print_info "Skipping nginx configuration update (set 6th parameter to 'true' to update)"
fi

print_success "Remote deployment completed!"
print_info "Application deployed to: $SERVER:$SERVER_PATH"
if [ "$METHOD" = "pm2" ]; then
    print_info "Check server logs: ssh $SERVER 'pm2 logs bihesewa.com'"
    print_info "Check PM2 status: ssh $SERVER 'pm2 status'"
fi

