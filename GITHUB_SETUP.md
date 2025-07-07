# 🚀 GitHub Setup Guide

This guide will help you set up the Smart Navigation Cube project on GitHub with automatic deployment to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js installed (optional, for local development)

## 🎯 Step 1: Create GitHub Repository

1. **Go to GitHub** and create a new repository:
   - Repository name: `cube-nav` (or your preferred name)
   - Description: "Smart Navigation Cube - 3D widget with origami-style expansion"
   - Make it **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
   - Choose MIT License

2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/cube-nav.git
   cd cube-nav
   ```

## 📁 Step 2: Upload Project Files

1. **Copy all project files** into the cloned repository folder
2. **Update configuration files** with your GitHub username:

### Update `package.json`:
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/cube-nav",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR-USERNAME/cube-nav.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR-USERNAME/cube-nav/issues"
  },
  "author": "Your Name <your.email@example.com>"
}
```

### Update `_config.yml`:
```yaml
url: "https://YOUR-USERNAME.github.io"
baseurl: "/cube-nav"
author: "Your Name"
github_username: YOUR-USERNAME
repository: YOUR-USERNAME/cube-nav
```

## 🔧 Step 3: Install Dependencies (Optional)

If you want to develop locally:

```bash
npm install
```

This installs the `gh-pages` package for manual deployment.

## 📤 Step 4: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Smart Navigation Cube v2.1.0"

# Push to GitHub
git push origin main
```

## 🌐 Step 5: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click Settings** tab
3. **Scroll down to "Pages"** in the left sidebar
4. **Under "Source"**, select:
   - Source: **GitHub Actions**
5. **Save the settings**

## 🚀 Step 6: Automatic Deployment

The GitHub Actions workflow will automatically:
- ✅ Build the project when you push changes
- ✅ Deploy to GitHub Pages
- ✅ Make your demo available at: `https://YOUR-USERNAME.github.io/cube-nav`

### First Deployment:
1. The workflow runs automatically after your first push
2. Check the "Actions" tab to see the deployment progress
3. Once complete, your site will be live!

## 🎮 Step 7: Access Your Live Demo

After deployment, your project will be available at:

- **Main Page**: `https://YOUR-USERNAME.github.io/cube-nav`
- **Live Demo**: `https://YOUR-USERNAME.github.io/cube-nav/demo/`
- **Documentation**: `https://YOUR-USERNAME.github.io/cube-nav/docs/`

## 🔄 Step 8: Making Updates

To update your project:

```bash
# Make your changes
# Then commit and push:
git add .
git commit -m "Update: description of changes"
git push origin main
```

The GitHub Actions workflow will automatically rebuild and redeploy your site!

## 📊 Project Structure for GitHub Pages

```
cube-nav/
├── 📄 index.html                    ← Landing page (auto-served by GitHub Pages)
├── 📁 demo/                         ← Live demo
│   ├── index.html                   ← Interactive demo
│   ├── demo.js                      ← Demo controls
│   └── demo.css                     ← Demo styling
├── 📁 dist/                         ← Production files
│   ├── smart-nav-widget.js          ← Main widget bundle
│   ├── smart-nav-widget.css         ← Widget styles
│   └── config-templates.json        ← Configuration templates
├── 📁 docs/                         ← Documentation
├── 📁 src/                          ← Source code (for development)
├── 📄 README.md                     ← Project documentation
├── 📄 package.json                  ← Node.js configuration
├── 📄 _config.yml                   ← GitHub Pages configuration
├── 📄 .gitignore                    ← Git ignore rules
└── 📁 .github/workflows/            ← GitHub Actions
    └── deploy.yml                   ← Auto-deployment workflow
```

## 🛠️ Local Development

For local development and testing:

```bash
# Build the project
npm run build

# Start local server
npm run serve
# Opens at http://localhost:8000

# Start demo server
npm run demo  
# Opens at http://localhost:8001
```

## 🎯 Manual Deployment (Alternative)

If you prefer manual deployment instead of GitHub Actions:

```bash
# Build and deploy manually
npm run deploy
```

This uses the `gh-pages` package to deploy to the `gh-pages` branch.

## 🔧 Troubleshooting

### Issue: GitHub Pages not working
**Solution**: 
1. Check that your repository is **Public**
2. Verify GitHub Pages is enabled in Settings
3. Check the Actions tab for build errors

### Issue: 404 errors on demo pages
**Solution**: 
1. Make sure all files are committed and pushed
2. Check that paths in `_config.yml` are correct
3. Verify the baseurl matches your repository name

### Issue: Build failing
**Solution**:
1. Check the Actions tab for error details
2. Ensure `package.json` has correct repository URLs
3. Make sure Node.js version is compatible (>=14.0.0)

### Issue: Demo not loading widget
**Solution**:
1. Check browser console for errors
2. Verify all files in `dist/` are present
3. Check that paths in demo files are correct

## 🎉 Success!

Once set up, you'll have:

- ✅ **Version Control**: Full Git history and collaboration
- ✅ **Live Demo**: Automatically updated demo site
- ✅ **Professional URL**: Clean GitHub Pages URL
- ✅ **Automatic Deployment**: Push to deploy
- ✅ **Documentation**: Hosted docs and guides
- ✅ **Issue Tracking**: GitHub Issues for bug reports
- ✅ **Collaboration**: Pull requests and contributions

Your Smart Navigation Cube is now live and ready to share with the world! 🚀

## 📞 Need Help?

- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review the [GitHub Actions documentation](https://docs.github.com/en/actions)
- Open an issue in your repository for project-specific help 