#!/bin/bash

# Create Release Script for bihesewa_web
# Usage: ./scripts/create-release.sh <version> [source-branch] [target-branch]
# Example: ./scripts/create-release.sh 1.2.0
# Example: ./scripts/create-release.sh 1.2.0 develop main
# Example: ./scripts/create-release.sh 1.2.0 master main

set -e  # Exit on error

VERSION=$1
SOURCE_BRANCH=${2:-$(git branch --show-current)}
TARGET_BRANCH=${3:-"main"}

if [ -z "$VERSION" ]; then
    echo "❌ Error: Version is required"
    echo "Usage: ./scripts/create-release.sh <version> [source-branch] [target-branch]"
    echo "Example: ./scripts/create-release.sh 1.2.0"
    echo "Example: ./scripts/create-release.sh 1.2.0 develop main"
    echo "Example: ./scripts/create-release.sh 1.2.0 master main"
    exit 1
fi

# Validate version format (semantic versioning)
if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "❌ Error: Invalid version format. Use semantic versioning (e.g., 1.2.0)"
    exit 1
fi

RELEASE_BRANCH="release/v$VERSION"
TAG="v$VERSION"

echo "🚀 Creating release $VERSION..."
echo "🌿 Source branch: $SOURCE_BRANCH"
echo "🎯 Target branch: $TARGET_BRANCH"
echo "🌿 Release branch: $RELEASE_BRANCH"
echo "📌 Tag: $TAG"
echo ""

# Check if source branch exists
if ! git show-ref --verify --quiet "refs/heads/$SOURCE_BRANCH" && ! git show-ref --verify --quiet "refs/remotes/origin/$SOURCE_BRANCH"; then
    echo "❌ Error: Source branch '$SOURCE_BRANCH' does not exist"
    echo "Available local branches:"
    git branch
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to source branch if not already on it
if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "📥 Switching to source branch: $SOURCE_BRANCH"
    git checkout "$SOURCE_BRANCH"
fi

# Update source branch
echo "📥 Updating $SOURCE_BRANCH branch..."
git pull origin "$SOURCE_BRANCH" || echo "⚠️  Warning: Could not pull $SOURCE_BRANCH (branch might not exist on remote)"

# Check if release branch already exists
if git show-ref --verify --quiet "refs/heads/$RELEASE_BRANCH"; then
    echo "⚠️  Warning: Release branch $RELEASE_BRANCH already exists"
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create release branch
echo "🌿 Creating release branch: $RELEASE_BRANCH"
git checkout -b "$RELEASE_BRANCH"

# Update version in package.json if it exists
if [ -f "package.json" ]; then
    echo "📝 Updating version in package.json..."
    # Use node to update version
    if command -v node &> /dev/null; then
        node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json')); pkg.version = '$VERSION'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
        git add package.json
        git commit -m "chore: Bump version to $VERSION" || true
    fi
fi

# Push release branch
echo "📤 Pushing release branch to remote..."
git push -u origin "$RELEASE_BRANCH"

echo ""
echo "✅ Release branch created successfully!"
echo ""

# Ask if user wants to build and test
read -p "Do you want to build and test the release now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔨 Building production version..."
    
    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        echo "⚠️  Warning: Node.js is not installed. Skipping build."
    elif ! command -v npm &> /dev/null; then
        echo "⚠️  Warning: npm is not installed. Skipping build."
    else
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            echo "📦 Installing dependencies..."
            npm install
        fi
        
        # Build
        echo "🔨 Running production build..."
        if npm run build; then
            echo ""
            echo "✅ Build completed successfully!"
            echo ""
            echo "🧪 To test the build:"
            echo "   npm start"
            echo "   Then open: http://localhost:3000"
            echo ""
            read -p "Start the production server now? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                echo ""
                echo "🚀 Starting production server..."
                echo "   Open http://localhost:3000 in your browser"
                echo "   Press Ctrl+C to stop the server"
                echo ""
                npm start
            fi
        else
            echo ""
            echo "❌ Build failed! Please check the errors above."
        fi
    fi
fi

echo ""
echo "📋 Next steps:"
echo "1. Test the release branch thoroughly"
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "2. Build and test: npm run build"
    echo "3. Start server: npm start"
    echo "4. Make any final bug fixes if needed"
    echo "5. Create a Pull Request: $RELEASE_BRANCH → $TARGET_BRANCH"
else
    echo "2. Make any final bug fixes if needed"
    echo "3. Create a Pull Request: $RELEASE_BRANCH → $TARGET_BRANCH"
fi
echo "4. After PR approval and merge:"
echo "   - Tag the release: git checkout $TARGET_BRANCH && git tag -a $TAG -m 'Release $TAG'"
echo "   - Push tag: git push origin $TAG"
if [ "$SOURCE_BRANCH" != "$TARGET_BRANCH" ]; then
    echo "   - Merge back to $SOURCE_BRANCH: git checkout $SOURCE_BRANCH && git merge $RELEASE_BRANCH"
fi
echo ""
echo "🔗 Branch URL: $(git config --get remote.origin.url | sed 's/\.git$//')/branches/$RELEASE_BRANCH"

