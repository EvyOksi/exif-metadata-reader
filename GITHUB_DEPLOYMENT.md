# Deploy to GitHub Pages - Complete Guide

Your EXIF Metadata Reader is ready for GitHub Pages deployment. Follow these exact steps:

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Repository name: `exif-metadata-reader`
4. Description: `Comprehensive EXIF metadata reader with privacy-first design`
5. Set to **Public** (required for free GitHub Pages)
6. **DO NOT** check "Initialize with README" 
7. Click **"Create repository"**

## Step 2: Deploy Your Code

Copy and paste these commands in your terminal (replace YOUR_USERNAME):

```bash
# Initialize git repository
git init

# Add all project files
git add .

# Create initial commit
git commit -m "Initial commit: EXIF Metadata Reader with comprehensive metadata extraction"

# Connect to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/exif-metadata-reader.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. GitHub will automatically start building and deploying

## Step 4: Monitor Deployment

1. Click the **"Actions"** tab in your repository
2. You'll see a workflow called "Deploy to GitHub Pages" running
3. Wait for the green checkmark (usually 2-3 minutes)
4. Your site will be live at: `https://YOUR_USERNAME.github.io/exif-metadata-reader/`

## What Happens Automatically

The GitHub Actions workflow will:
- Install all dependencies
- Build the React application
- Deploy static files to GitHub Pages
- Run on every push to the main branch

## Verification Steps

After deployment, test these features:
1. Upload a photo with EXIF data
2. Check all 5 metadata tabs (Camera, Exposure, Location, Technical, Advanced)
3. If GPS data exists, verify the interactive map works
4. Test the "Download Report" feature

## Future Updates

To update your deployed site:
1. Make changes to your code
2. Run: `git add . && git commit -m "Update: description of changes"`
3. Run: `git push`
4. GitHub will automatically rebuild and redeploy

## Custom Domain (Optional)

To use your own domain:
1. In GitHub repository → Settings → Pages
2. Enter your domain in "Custom domain"
3. Create a CNAME record pointing to `YOUR_USERNAME.github.io`

## Troubleshooting

**Build fails?**
- Check the Actions tab for error details
- Ensure all files were committed and pushed

**404 error?**
- Wait 5-10 minutes for DNS propagation
- Verify the URL format is correct

**EXIF not working?**
- The app loads EXIF.js from CDN - check internet connection
- Try refreshing the page

Your comprehensive EXIF metadata reader will be live and accessible worldwide once deployed!