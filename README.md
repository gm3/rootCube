# 🚀 Smart Navigation Cube v2.1.0

**An elegant 3D navigation widget that transforms into an intelligent origami-style interface**

![Smart Navigation Cube Demo](https://via.placeholder.com/800x400/1a1f2e/ffffff?text=Smart+Navigation+Cube+Demo)

## 🎯 Quick Start

### 1. Download & Include Files
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <link rel="stylesheet" href="dist/smart-nav-widget.css">
</head>
<body>
    <!-- Your website content -->
    
    <!-- Widget container (automatically created if missing) -->
    <div id="navWidget"></div>
    
    <!-- Widget script -->
    <script src="dist/smart-nav-widget.js"></script>
</body>
</html>
```

### 2. Basic Configuration
```html
<script>
// Initialize with custom configuration
const config = {
    widget: {
        title: "My Navigation",
        position: "top-right"  // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    },
    cube: {
        icon: "🚀",  // Any emoji or symbol
        size: 60
    },
    sections: [
        {
            id: "navigation",
            title: "🏠 Navigation",
            type: "links",
            expanded: true,
            links: [
                { icon: "🏠", text: "Home", url: "/" },
                { icon: "📖", text: "About", url: "/about" },
                { icon: "📞", text: "Contact", url: "/contact" }
            ]
        }
    ]
};

// Create the widget
SmartNav.init('navWidget', config);
</script>
```

## 📋 Complete Configuration Guide

### Widget Settings
```javascript
const config = {
    widget: {
        title: "Smart Assistant",           // Widget title
        position: "top-right",              // Cube position on screen
        theme: {
            primary: "rgba(0, 0, 0, 0.85)",     // Background color
            accent: "rgba(100, 150, 255, 0.3)", // Accent color
            text: "white",                       // Text color
            border: "rgba(255, 255, 255, 0.2)"  // Border color
        },
        dimensions: {
            defaultWidth: 420,    // Default panel width
            minWidth: 320,        // Minimum width
            minHeight: 250,       // Minimum height
            maxHeight: "85vh"     // Maximum height
        },
        behavior: {
            autoClose: true,      // Close when clicking outside
            rememberState: true,  // Save position/state
            animations: true,     // Enable animations
            allowSticky: true     // Allow sticky mode
        }
    }
};
```

### Cube Customization
```javascript
cube: {
    icon: "🤖",           // Cube face icon (emoji/text)
    size: 60,             // Cube size in pixels
    spinDuration: "8s",   // Animation speed
    hoverScale: 1.1       // Hover zoom effect
}
```

### Section Types

#### 1. Links Section
```javascript
{
    id: "navigation",
    title: "🏠 Navigation",
    type: "links",
    expanded: true,
    links: [
        { icon: "🏠", text: "Home", url: "/" },
        { icon: "📊", text: "Dashboard", url: "/dashboard" },
        { icon: "📞", text: "Contact", url: "/contact" }
    ]
}
```

#### 2. Chat Section
```javascript
{
    id: "chat",
    title: "💬 AI Assistant",
    type: "chat",
    expanded: true,
    config: {
        welcomeMessage: "Hi! How can I help you?",
        placeholder: "Type your question...",
        responses: {
            "help": "I can help you navigate the site!",
            "contact": "You can reach us at hello@example.com",
            "default": "Thanks for your message!"
        }
    }
}
```

#### 3. Tools Section
```javascript
{
    id: "tools",
    title: "🔧 Tools",
    type: "tools",
    expanded: false,
    tools: [
        {
            icon: "🎨",
            text: "Color Picker",
            action: "colorPicker",
            description: "Pick colors from the page"
        },
        {
            icon: "📏",
            text: "Ruler",
            action: "ruler",
            description: "Measure elements"
        }
    ]
}
```

#### 4. Actions Section
```javascript
{
    id: "actions",
    title: "⚡ Quick Actions",
    type: "actions",
    expanded: false,
    actions: [
        { icon: "📞", text: "Call Us", action: "call", url: "tel:+1234567890" },
        { icon: "📧", text: "Email", action: "email", url: "mailto:hello@example.com" },
        { icon: "🌙", text: "Dark Mode", action: "toggleTheme", callback: "toggleDarkMode" }
    ]
}
```

#### 5. Media Section
```javascript
{
    id: "media",
    title: "🎥 Media",
    type: "media",
    expanded: false,
    content: {
        video: {
            title: "Watch Our Demo",
            description: "See how it works",
            url: "https://youtube.com/watch?v=demo"
        },
        advertisement: {
            title: "Special Offer",
            content: "Get 50% OFF today!",
            url: "/offer"
        }
    }
}
```

## 🎨 CSS Customization

### 1. Basic Theme Override
```css
/* Custom theme colors */
.nav-widget {
    --theme-primary: #1a1f2e;
    --theme-accent: #00d4ff;
    --theme-text: #ffffff;
    --theme-border: rgba(255, 255, 255, 0.2);
}
```

### 2. Cube Styling
```css
/* Custom cube appearance */
.cube-face {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%) !important;
    border: 2px solid #00d4ff !important;
    font-size: 28px !important;
}

/* Custom cube animation */
.cube {
    animation-duration: 12s !important;
}

/* Hover effects */
.cube-container:hover {
    transform: scale(1.2) !important;
}
```

### 3. Panel Customization
```css
/* Custom panel background */
.nav-content.origami-mode {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
    border: 2px solid #00d4ff !important;
    border-radius: 15px !important;
}

/* Custom search bar */
.search-input {
    background: rgba(255, 255, 255, 0.2) !important;
    border: 1px solid #00d4ff !important;
    color: #ffffff !important;
}

/* Custom navigation items */
.nav-panel-item {
    background: rgba(255, 255, 255, 0.1) !important;
    border-left: 3px solid transparent !important;
    transition: all 0.3s ease !important;
}

.nav-panel-item:hover {
    background: rgba(0, 212, 255, 0.2) !important;
    border-left-color: #00d4ff !important;
    transform: translateX(5px) !important;
}
```

### 4. Position-Specific Styling
```css
/* Style specific positions differently */
.nav-widget.position-top-left .cube-face {
    background: #ff6b6b !important;
}

.nav-widget.position-bottom-right .cube-face {
    background: #4ecdc4 !important;
}

/* Custom positioning */
.nav-widget.position-top-right {
    top: 10px !important;
    right: 10px !important;
}
```

## 🚀 Advanced Usage

### Multiple Widgets
```javascript
// Create multiple widgets with different configs
const widgets = await SmartNav.createMultiple([
    {
        containerId: 'navWidget1',
        config: {
            cube: { icon: "🏠" },
            widget: { position: "top-left" }
        }
    },
    {
        containerId: 'navWidget2', 
        config: {
            cube: { icon: "💼" },
            widget: { position: "bottom-right" }
        }
    }
]);
```

### Dynamic Control
```javascript
// Get widget instance
const widget = SmartNav.get('navWidget');

// Control programmatically
widget.expand();                    // Open widget
widget.collapse();                  // Close to cube
widget.setPosition('bottom-left');  // Change position
widget.toggleSticky();              // Make it stick

// Update configuration
widget.updateConfig({
    cube: { icon: "🎉" },
    widget: { title: "Updated!" }
});

// Destroy when done
widget.destroy();
```

### Templates
```javascript
// Use pre-built templates
const businessWidget = await SmartNav.fromTemplate('business', 'navWidget');
const minimalWidget = await SmartNav.fromTemplate('minimal', 'navWidget');

// Available templates: 'minimal', 'business', 'developer-tools', 'chat-assistant', 'media-gallery'
```

## 🎯 Real-World Examples

### E-commerce Site
```javascript
const ecommerceConfig = {
    widget: {
        title: "Shop Assistant",
        position: "bottom-right"
    },
    cube: { icon: "🛍️" },
    sections: [
        {
            id: "categories",
            title: "🛍️ Shop Categories",
            type: "links",
            expanded: true,
            links: [
                { icon: "👕", text: "Clothing", url: "/clothing" },
                { icon: "📱", text: "Electronics", url: "/electronics" },
                { icon: "🏠", text: "Home & Garden", url: "/home" }
            ]
        },
        {
            id: "help",
            title: "💬 Shopping Help",
            type: "chat",
            config: {
                welcomeMessage: "Need help finding something?",
                responses: {
                    "shipping": "Free shipping on orders over $50!",
                    "returns": "30-day return policy on all items.",
                    "default": "How can I help you shop today?"
                }
            }
        },
        {
            id: "account",
            title: "👤 My Account",
            type: "actions",
            actions: [
                { icon: "🔐", text: "Login", action: "login", url: "/login" },
                { icon: "🛒", text: "Cart", action: "cart", url: "/cart" },
                { icon: "❤️", text: "Wishlist", action: "wishlist", url: "/wishlist" }
            ]
        }
    ]
};
```

### Business Website
```javascript
const businessConfig = {
    widget: {
        title: "Business Hub",
        position: "top-right",
        theme: {
            primary: "rgba(25, 25, 50, 0.9)",
            accent: "rgba(0, 123, 255, 0.4)"
        }
    },
    cube: { icon: "💼" },
    sections: [
        {
            id: "services",
            title: "🛠️ Our Services",
            type: "links",
            links: [
                { icon: "💻", text: "Web Development", url: "/web-dev" },
                { icon: "📱", text: "Mobile Apps", url: "/mobile" },
                { icon: "🎨", text: "Design", url: "/design" }
            ]
        },
        {
            id: "contact",
            title: "📞 Get In Touch",
            type: "actions",
            actions: [
                { icon: "📞", text: "Call Sales", action: "call", url: "tel:+1234567890" },
                { icon: "📧", text: "Email Us", action: "email", url: "mailto:sales@company.com" },
                { icon: "📅", text: "Book Meeting", action: "meeting", url: "/book-meeting" }
            ]
        }
    ]
};
```

## 🔧 Troubleshooting

### Common Issues

**Widget not appearing:**
```javascript
// Make sure container exists
const container = document.getElementById('navWidget');
if (!container) {
    console.error('Container #navWidget not found!');
}

// Check for JavaScript errors
try {
    await SmartNav.init('navWidget', config);
} catch (error) {
    console.error('Widget initialization failed:', error);
}
```

**Positioning issues:**
```css
/* Ensure proper z-index */
.nav-widget {
    z-index: 9999 !important;
}

/* Check for CSS conflicts */
.nav-widget * {
    box-sizing: border-box !important;
}
```

**Mobile responsiveness:**
```css
/* Custom mobile styling */
@media (max-width: 768px) {
    .nav-widget {
        position: fixed !important;
        top: 10px !important;
        right: 10px !important;
    }
    
    .cube-container {
        width: 50px !important;
        height: 50px !important;
    }
}
```

## 📱 Framework Integration

### React
```jsx
import { useEffect, useRef } from 'react';

function NavigationWidget({ config }) {
    const widgetRef = useRef(null);
    
    useEffect(() => {
        const initWidget = async () => {
            if (widgetRef.current) {
                await window.SmartNav.init(widgetRef.current.id, config);
            }
        };
        
        initWidget();
        
        return () => {
            window.SmartNav.destroy('navWidget');
        };
    }, [config]);
    
    return <div id="navWidget" ref={widgetRef}></div>;
}
```

### Vue
```vue
<template>
    <div id="navWidget" ref="widgetContainer"></div>
</template>

<script>
export default {
    props: ['config'],
    mounted() {
        this.initWidget();
    },
    beforeUnmount() {
        window.SmartNav.destroy('navWidget');
    },
    methods: {
        async initWidget() {
            await window.SmartNav.init('navWidget', this.config);
        }
    }
}
</script>
```

## 🎨 Custom Themes

### Dark Theme
```css
.nav-widget.dark-theme {
    --theme-primary: #1a1a1a;
    --theme-accent: #bb86fc;
    --theme-text: #ffffff;
    --theme-border: rgba(187, 134, 252, 0.3);
}

.nav-widget.dark-theme .cube-face {
    background: linear-gradient(45deg, #2d1b69 0%, #11998e 100%);
}
```

### Neon Theme
```css
.nav-widget.neon-theme {
    --theme-primary: #0a0a0a;
    --theme-accent: #00ffff;
    --theme-text: #00ffff;
    --theme-border: #00ffff;
}

.nav-widget.neon-theme .cube-face {
    background: #000;
    border: 2px solid #00ffff;
    box-shadow: 0 0 20px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1);
    text-shadow: 0 0 10px #00ffff;
}
```

## 📦 Production Deployment

### CDN Usage
```html
<!-- Option 1: Self-hosted -->
<link rel="stylesheet" href="/assets/smart-nav-widget.css">
<script src="/assets/smart-nav-widget.js"></script>

<!-- Option 2: External CDN (when available) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/smart-nav-cube@2.1.0/dist/smart-nav-widget.css">
<script src="https://cdn.jsdelivr.net/npm/smart-nav-cube@2.1.0/dist/smart-nav-widget.js"></script>
```

### Performance Optimization
```html
<!-- Preload for better performance -->
<link rel="preload" href="/assets/smart-nav-widget.css" as="style">
<link rel="preload" href="/assets/smart-nav-widget.js" as="script">

<!-- Async loading -->
<script async src="/assets/smart-nav-widget.js" onload="initWidget()"></script>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes in the `src/` directory
4. Build the project: `npm run build`
5. Test your changes: `npm run demo`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🚀 What's Next?

- [ ] NPM package publication
- [ ] TypeScript definitions
- [ ] More built-in themes
- [ ] Plugin system
- [ ] Advanced analytics
- [ ] Accessibility improvements

---

**Ready to get started?** Copy the `dist/` folder to your project and follow the Quick Start guide above! 🎉 