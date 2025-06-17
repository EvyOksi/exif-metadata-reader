# Deployment Guide

This guide will help you deploy your EXIF Metadata Reader to GitHub Pages.

## Quick Deployment Steps

### 1. Create GitHub Repository

1. Go to GitHub and create a new repository
2. Name it `exif-metadata-reader` (or your preferred name)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### 2. Push Your Code

Open terminal in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: EXIF Metadata Reader"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/exif-metadata-reader.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment will start automatically

### 4. Access Your Site

Your site will be available at:
`https://YOUR_USERNAME.github.io/exif-metadata-reader/`

## Automatic Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

- Trigger on every push to the main branch
- Install dependencies
- Build the application
- Deploy to GitHub Pages automatically

## Custom Domain (Optional)

To use a custom domain:

1. In repository Settings → Pages
2. Add your custom domain in the "Custom domain" field
3. Create a CNAME record pointing to `YOUR_USERNAME.github.io`

## Troubleshooting

### Build Failures

If the GitHub Actions build fails:

1. Check the Actions tab in your repository
2. Review the build logs for errors
3. Ensure all dependencies are properly listed in package.json

### 404 Errors

If you get 404 errors after deployment:

1. Wait 5-10 minutes for propagation
2. Check that GitHub Pages is enabled
3. Verify the site URL is correct

### EXIF Library Not Loading

The EXIF.js library is loaded from CDN. If it fails:

1. Check your internet connection
2. Try refreshing the page
3. The app will show an error if the library fails to load

## Local Development

To run locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:5000`

## Environment Differences

The app works entirely client-side, so there are no environment variables or server dependencies to configure for deployment.