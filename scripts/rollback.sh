#!/bin/bash

# Rollback Script for bihesewa_web
# Usage: ./scripts/rollback.sh <tag> [target-branch] [branch-name]
# Example: ./scripts/rollback.sh v1.2.0
# Example: ./scripts/rollback.sh v1.2.0 main hotfix/rollback-ui-issue
# Example: ./scripts/rollback.sh v1.2.0 master

set -e  # Exit on error

TAG=$1
TARGET_BRANCH=${2:-$(git branch --show-current)}
BRANCH_NAME=${3:-"hotfix/rollback-to-$TAG"}

if [ -z "$TAG" ]; then
    echo "❌ Error: Tag is required"
    echo "Usage: ./scripts/rollback.sh <tag> [target-branch] [branch-name]"
    echo "Example: ./scripts/rollback.sh v1.2.0"
    echo "Example: ./scripts/rollback.sh v1.2.0 main hotfix/rollback-ui-issue"
    exit 1
fi

# Validate tag format
if ! [[ "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ Error: Invalid tag format. Use semantic versioning (e.g., v1.2.0)"
    exit 1
fi

echo "🔄 Rolling back to tag: $TAG"
echo "🎯 Target branch: $TARGET_BRANCH"
echo "🌿 Rollback branch: $BRANCH_NAME"
echo ""

# Check if tag exists
if ! git rev-parse "$TAG" >/dev/null 2>&1; then
    echo "❌ Error: Tag '$TAG' does not exist"
    echo "Available tags:"
    git tag -l | tail -10
    exit 1
fi

# Check if target branch exists
if ! git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH" && ! git show-ref --verify --quiet "refs/remotes/origin/$TARGET_BRANCH"; then
    echo "❌ Error: Target branch '$TARGET_BRANCH' does not exist"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to target branch
if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
    echo "📥 Switching to target branch: $TARGET_BRANCH"
    git checkout "$TARGET_BRANCH"
    git pull origin "$TARGET_BRANCH" || echo "⚠️  Warning: Could not pull $TARGET_BRANCH"
fi

# Check if rollback branch already exists
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    echo "⚠️  Warning: Branch $BRANCH_NAME already exists"
    read -p "Do you want to delete and recreate it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git branch -D "$BRANCH_NAME" || true
    else
        exit 1
    fi
fi

# Create rollback branch
echo "🌿 Creating rollback branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

# Reset to tag
echo "🔄 Resetting to tag: $TAG"
git reset --hard "$TAG"

# Push rollback branch
echo "📤 Pushing rollback branch to remote..."
git push -u origin "$BRANCH_NAME" --force

echo ""
echo "✅ Rollback branch created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Test the rollback branch thoroughly"
echo "2. Build and test: npm run build"
echo "3. Create a Pull Request: $BRANCH_NAME → $TARGET_BRANCH"
echo "4. After PR approval and merge, deploy using:"
echo "   ./scripts/deploy-remote.sh $TAG production pm2 user@server.com /var/www/bihesewa.com"
echo ""
echo "🔗 Branch URL: $(git config --get remote.origin.url | sed 's/\.git$//')/branches/$BRANCH_NAME"

