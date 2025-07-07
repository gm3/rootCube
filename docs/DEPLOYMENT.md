# 🚀 Quick Deployment Guide

## 📦 What You Need

Copy these 3 essential files to your project:

```
📁 Your Website
├── widget.js          # The widget system
├── styles.css         # Widget styling  
└── config.json        # Your configuration
```

## ⚡ Step 1: Include in Your HTML

Add these lines to your HTML page:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Your existing head content -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Your existing page content -->
    
    <!-- Widget container (can be anywhere) -->
    <div id="navWidget"></div>
    
    <!-- Widget script (before closing body tag) -->
    <script src="widget.js"></script>
</body>
</html>
```

## 🎯 Step 2: Configure Your Widget

Edit `config.json` to customize everything:

```json
{
  "widget": {
    "title": "My Website Assistant",
    "theme": {
      "primary": "rgba(0, 0, 0, 0.85)",
      "accent": "rgba(100, 150, 255, 0.3)"
    }
  },
  "cube": {
    "icon": "🚀",
    "size": 60
  },
  "sections": [
    {
      "id": "chat",
      "title": "🤖 Assistant",
      "type": "chat",
      "expanded": true,
      "config": {
        "welcomeMessage": "Hi! How can I help you?"
      }
    },
    {
      "id": "nav",
      "title": "🏠 Navigation",
      "type": "links",
      "links": [
        {"icon": "🏠", "text": "Home", "url": "/"},
        {"icon": "📄", "text": "About", "url": "/about"}
      ]
    }
  ]
}
```

## 🌐 Step 3: Deploy

Upload all files to your web server. The widget will:
- ✅ Auto-initialize from `config.json`
- ✅ Appear as a spinning cube in the top-right corner
- ✅ Work on all modern browsers
- ✅ Remember user preferences

## 🎨 Common Customizations

### Change Colors
```json
{
  "widget": {
    "theme": {
      "primary": "rgba(20, 20, 40, 0.9)",
      "accent": "rgba(255, 100, 100, 0.3)",
      "text": "#ffffff"
    }
  }
}
```

### Add Your Links
```json
{
  "sections": [
    {
      "id": "nav",
      "title": "🏠 My Pages",
      "type": "links",
      "links": [
        {"icon": "🏠", "text": "Home", "url": "/"},
        {"icon": "📦", "text": "Products", "url": "/products"},
        {"icon": "📞", "text": "Contact", "url": "/contact"}
      ]
    }
  ]
}
```

### Customize Chat Responses
```json
{
  "config": {
    "welcomeMessage": "Welcome to my site!",
    "responses": {
      "help": "I can help you find anything on this website!",
      "contact": "You can reach us at hello@yoursite.com",
      "product": "Check out our amazing products section!"
    }
  }
}
```

## 🛠️ Development Workflow

### Using Prepros/Live Server
1. Open your project in Prepros or VS Code with Live Server
2. Start the local server
3. Edit `config.json` and see changes instantly

### Using Node.js
```bash
npx serve .
# Open http://localhost:3000
```

### Using Python
```bash
python -m http.server 8000
# Open http://localhost:8000
```

## 🎯 Section Types Available

| Type | Purpose | Example |
|------|---------|---------|
| `chat` | AI assistant | Customer support, help |
| `links` | Navigation | Menu items, pages |
| `tools` | Interactive tools | Search, cart, account |
| `actions` | Quick actions | Call, email, download |
| `media` | Content | Videos, ads, featured |

## 🚨 Troubleshooting

### Widget not appearing?
- ✅ Check browser console for errors
- ✅ Ensure all 3 files are uploaded
- ✅ Verify `config.json` is valid JSON

### Can't load config.json?
- ✅ Must use web server (not file://)
- ✅ Check file permissions
- ✅ Verify file path is correct

### Drag/resize not working?
- ✅ Check console for JavaScript errors
- ✅ Ensure using modern browser
- ✅ Verify `widget.js` loaded completely

## 📞 Support

- 📖 **Full Documentation**: See `README.md`
- 🛠️ **Setup Guide**: See `INSTALLATION.md`
- 🎯 **Project Overview**: See `PROJECT-OVERVIEW.md`
- 💻 **Demo**: Open `index.html` in a web server

## ✅ Ready to Go!

Your widget should now be working perfectly! Users will see:
1. **Spinning cube** in the top-right corner
2. **Click to expand** into your custom navigation
3. **Drag, resize, and pin** functionality
4. **Smart AI chat** with your responses

**🎉 That's it! Your smart navigation widget is live!** 