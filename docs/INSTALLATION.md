# 📦 Installation Guide - Smart Navigation Widget

This guide will help you integrate the Smart Navigation Widget into any website in just a few minutes!

## 🚀 Quick Start (5 Minutes)

### Step 1: Download Files
Download these core files from the repository:
- `widget.js` - The modular widget system
- `styles.css` - Core styling
- `config.json` - Default configuration (optional)

### Step 2: Add to Your HTML
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Include the widget styles -->
    <link rel="stylesheet" href="path/to/styles.css">
</head>
<body>
    <!-- Your existing content -->
    <div class="your-content">
        <h1>Your Website</h1>
        <p>Your existing content...</p>
    </div>

    <!-- Add the widget container -->
    <div id="navWidget"></div>

    <!-- Include the widget script -->
    <script src="path/to/widget.js"></script>
</body>
</html>
```

### Step 3: Create config.json
Create a `config.json` file in the same directory:

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
    "icon": "⊞",
    "size": 60
  },
  "sections": [
    {
      "id": "chat",
      "title": "🤖 Assistant",
      "type": "chat",
      "expanded": true,
      "config": {
        "welcomeMessage": "Hi! How can I help you navigate this site?"
      }
    },
    {
      "id": "nav",
      "title": "🏠 Navigation",
      "type": "links",
      "expanded": false,
      "links": [
        {"icon": "🏠", "text": "Home", "url": "/"},
        {"icon": "📄", "text": "About", "url": "/about"},
        {"icon": "📞", "text": "Contact", "url": "/contact"}
      ]
    }
  ]
}
```

### Step 4: Test!
Open your website - you should see a spinning cube in the top-right corner! 🎉

## 🔧 Advanced Configuration

### Multiple Widgets
```javascript
// Create multiple widgets with different configs
const widgets = await WidgetFactory.createMultiple([
  { containerId: 'mainWidget', configPath: 'main-config.json' },
  { containerId: 'helpWidget', configPath: 'help-config.json' }
]);
```

### Programmatic Control
```javascript
// Create with inline config
const config = {
  widget: { title: "Custom Widget" },
  sections: [...]
};
const widget = await WidgetFactory.createWithConfig('myWidget', config);

// Control the widget
widget.expandSection('chat');
widget.togglePin();
widget.setContext('dark');
```

### Custom Callbacks
```javascript
// Define custom functions for actions
window.openLiveChat = function() {
  // Your live chat integration
  console.log('Opening live chat...');
};

window.trackEvent = function(eventData) {
  // Your analytics integration
  gtag('event', 'widget_interaction', eventData);
};
```

## 📋 Configuration Reference

### Widget Settings
```json
{
  "widget": {
    "title": "Your Title",
    "position": "top-right",
    "theme": {
      "primary": "rgba(0, 0, 0, 0.85)",
      "accent": "rgba(100, 150, 255, 0.3)",
      "text": "white",
      "border": "rgba(255, 255, 255, 0.2)"
    },
    "dimensions": {
      "defaultWidth": 400,
      "minWidth": 300,
      "minHeight": 200,
      "maxHeight": "80vh"
    },
    "behavior": {
      "autoClose": true,
      "rememberState": true,
      "soundEffects": false,
      "animations": true
    }
  }
}
```

### Cube Configuration
```json
{
  "cube": {
    "icon": "⊞",      // Any emoji or character
    "size": 60,       // Size in pixels
    "spinDuration": "8s",
    "hoverScale": 1.1
  }
}
```

### Section Types

#### Chat Section
```json
{
  "id": "chat",
  "title": "🤖 AI Assistant",
  "type": "chat",
  "expanded": true,
  "config": {
    "welcomeMessage": "Hello! How can I help?",
    "placeholder": "Ask me anything...",
    "maxHeight": 150,
    "responses": {
      "help": "I can help you navigate!",
      "contact": "Contact us at hello@example.com",
      "default": [
        "How can I help you?",
        "What would you like to know?"
      ]
    }
  }
}
```

#### Links Section
```json
{
  "id": "navigation",
  "title": "🏠 Navigation",
  "type": "links",
  "expanded": false,
  "links": [
    {
      "icon": "🏠",
      "text": "Home",
      "url": "/",
      "target": "_self"
    }
  ]
}
```

#### Tools Section
```json
{
  "id": "tools",
  "title": "🔧 Tools",
  "type": "tools",
  "expanded": false,
  "tools": [
    {
      "icon": "🎨",
      "text": "Color Picker",
      "action": "colorPicker",
      "description": "Pick colors from page elements"
    }
  ]
}
```

#### Actions Section
```json
{
  "id": "actions",
  "title": "⚡ Quick Actions",
  "type": "actions",
  "expanded": false,
  "actions": [
    {
      "icon": "📧",
      "text": "Email Us",
      "action": "email",
      "url": "mailto:hello@example.com"
    },
    {
      "icon": "💬",
      "text": "Live Chat",
      "action": "chat",
      "callback": "openLiveChat"
    }
  ]
}
```

#### Media Section
```json
{
  "id": "media",
  "title": "📺 Featured",
  "type": "media",
  "expanded": false,
  "content": {
    "video": {
      "title": "Watch Demo",
      "thumbnail": "/path/to/thumbnail.jpg",
      "url": "https://youtube.com/watch?v=demo",
      "description": "Check out our latest features"
    },
    "advertisement": {
      "title": "Special Offer",
      "content": "50% OFF First Order!",
      "url": "/special-offer",
      "type": "promotion"
    }
  }
}
```

## 🎨 Styling & Themes

### Custom CSS
```json
{
  "customization": {
    "customCSS": ".nav-widget { border-radius: 25px; } .cube-face { border-radius: 8px; }",
    "allowDrag": true,
    "allowResize": true,
    "allowPin": true,
    "allowMinimize": true,
    "showControls": true
  }
}
```

### Theme Presets
```json
{
  "widget": {
    "theme": {
      // Dark theme
      "primary": "rgba(20, 20, 40, 0.9)",
      "accent": "rgba(100, 200, 255, 0.4)",
      "text": "#ffffff",
      "border": "rgba(255, 255, 255, 0.15)"
    }
  }
}
```

```json
{
  "widget": {
    "theme": {
      // Light theme
      "primary": "rgba(255, 255, 255, 0.95)",
      "accent": "rgba(0, 123, 255, 0.2)",
      "text": "#333333",
      "border": "rgba(0, 0, 0, 0.1)"
    }
  }
}
```

## ⌨️ Keyboard Shortcuts

```json
{
  "keyboard": {
    "enabled": true,
    "shortcuts": {
      "toggle": "Escape",
      "sendChat": "Enter",
      "sendChatAlt": "Ctrl+Enter",
      "cyclePinForward": "Tab",
      "cyclePinBackward": "Shift+Tab"
    }
  }
}
```

## 📊 Analytics Integration

```json
{
  "analytics": {
    "enabled": true,
    "trackEvents": ["open", "close", "pin", "drag", "resize", "chat", "click"],
    "callback": "trackWidgetEvent"
  }
}
```

```javascript
// Implement the callback function
window.trackWidgetEvent = function(eventData) {
  // Google Analytics 4
  gtag('event', 'widget_interaction', {
    'widget_event': eventData.event,
    'widget_id': eventData.widget,
    'timestamp': eventData.timestamp
  });
  
  // Adobe Analytics
  s.tl(true, 'o', 'Widget ' + eventData.event);
  
  // Custom analytics
  yourAnalytics.track('widget_' + eventData.event, eventData);
};
```

## 🔧 Framework Integration

### React
```jsx
import { useEffect, useRef } from 'react';

function MyComponent() {
  const widgetRef = useRef();

  useEffect(() => {
    const initWidget = async () => {
      const { WidgetFactory } = await import('./widget.js');
      const widget = await WidgetFactory.create('my-widget', 'config.json');
      widgetRef.current = widget;
    };
    initWidget();

    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, []);

  return <div id="my-widget"></div>;
}
```

### Vue
```vue
<template>
  <div id="my-widget"></div>
</template>

<script>
export default {
  async mounted() {
    const { WidgetFactory } = await import('./widget.js');
    this.widget = await WidgetFactory.create('my-widget', 'config.json');
  },
  beforeDestroy() {
    if (this.widget) {
      this.widget.destroy();
    }
  }
}
</script>
```

### Angular
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: '<div id="my-widget"></div>'
})
export class WidgetComponent implements OnInit, OnDestroy {
  private widget: any;

  async ngOnInit() {
    const { WidgetFactory } = await import('./widget.js');
    this.widget = await WidgetFactory.create('my-widget', 'config.json');
  }

  ngOnDestroy() {
    if (this.widget) {
      this.widget.destroy();
    }
  }
}
```

## 🐛 Troubleshooting

### Widget Not Appearing
1. Check console for errors
2. Ensure `styles.css` is loaded
3. Verify container element exists
4. Check `config.json` is valid JSON

### Configuration Not Loading
1. Verify `config.json` path is correct
2. Check file permissions
3. Test with inline config first
4. Use browser developer tools to debug

### Animations Not Working
1. Check CSS `transform-style: preserve-3d` support
2. Verify browser supports backdrop-filter
3. Disable animations in config if needed

### Mobile Issues
1. Test viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Check touch event handling
3. Verify responsive CSS is working

## 📱 Browser Support

- **Minimum**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Recommended**: Latest versions for best performance
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: Requires CSS 3D transforms, backdrop-filter, ES6+ JavaScript

## 🔒 Security Considerations

1. **Sanitize User Input**: The widget sanitizes chat messages
2. **CSP Headers**: May need to allow inline styles for custom CSS
3. **CORS**: Config files must be served from same origin or with proper CORS headers
4. **XSS Prevention**: Avoid user-generated content in config without sanitization

## 📦 CDN Integration

### jsDelivr
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yourusername/cube-nav@main/styles.css">
<script src="https://cdn.jsdelivr.net/gh/yourusername/cube-nav@main/widget.js"></script>
```

### unpkg
```html
<link rel="stylesheet" href="https://unpkg.com/cube-nav@latest/styles.css">
<script src="https://unpkg.com/cube-nav@latest/widget.js"></script>
```

## 🚀 Performance Tips

1. **Lazy Loading**: Load widget script after main content
2. **Configuration Caching**: Cache config.json on your CDN
3. **Minimize Animations**: Reduce for low-end devices
4. **Bundle Size**: Only include features you need

## ✅ Checklist

- [ ] Files downloaded and included
- [ ] Container element added to HTML
- [ ] config.json created and customized
- [ ] Widget appears and functions correctly
- [ ] Mobile testing completed
- [ ] Analytics integration working (if needed)
- [ ] Custom callbacks implemented (if needed)
- [ ] Performance tested

## 🎉 You're Done!

Your smart navigation widget should now be working perfectly! 

**Need help?** Check out:
- `modular-demo.html` - Interactive examples
- `integration-example.html` - Simple integration example
- `example-config.json` - Comprehensive configuration example

**Questions?** Open an issue on GitHub or check the documentation.

---

*Happy widget building! 🚀* 