# 🎯 Smart Navigation Cube - Origami Grid Widget

> **A revolutionary 3D navigation widget that unfolds like origami into an intelligent, multi-panel interface**

Transform your website navigation with a stunning 3D cube that expands into a smart, grid-based interface featuring AI chat, dynamic content panels, and seamless user interactions.

![Widget Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-2.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ **The Origami Experience**

**🎲 Collapsed State**: Elegant spinning 3D cube with smooth animations  
**📋 Expanded State**: Intelligent 2-column grid interface:
- **Left Panel**: Smart navigation organized by type
- **Right Panel**: Dynamic context area that loads content
- **Footer**: Quick access social/contact links

## 🚀 **Key Features**

### 🎨 **Origami Grid System**
- **2-Column Layout**: Navigation + context panels with search bar
- **Smart Organization**: Auto-categorizes sections by type
- **Dynamic Loading**: Right panel loads content based on left selections
- **Collapsible Design**: Right panel can be collapsed/expanded
- **Search Functionality**: Filter navigation items in real-time
- **Status Messages**: Live feedback and interaction status

### 🤖 **AI-Powered Interface**
- **Intelligent Chat**: Context-aware AI assistant
- **Smart Responses**: Keyword-based response system
- **Interactive Tools**: Developer tools, media content, quick actions

### 🎯 **Advanced Positioning**
- **6 Positions**: All corners, top/bottom center
- **Responsive Design**: Mobile-optimized layouts
- **Smart Animations**: Position-aware transitions

### 🛠 **Developer Features**
- **JSON Configuration**: Complete customization via config files
- **Modular Architecture**: Clean, extensible codebase
- **No Dependencies**: Pure JavaScript and CSS
- **Event System**: Comprehensive callbacks and analytics

## 📦 **Quick Start**

### 🎯 **Option 1: Visual Builder (Recommended)**
The easiest way to create your cube - no coding required!

1. **Open the Builder**: Load `cube-builder.html` in your browser
2. **Choose Template**: Select from 5 pre-built templates
3. **Customize**: Edit colors, content, and sections visually
4. **Generate Code**: Copy the generated HTML to your website

**Perfect for**: Designers, content creators, and quick prototyping

### ⚡ **Option 2: Direct Integration**
For developers who prefer code-first approach:

```html
<!-- Include the widget files -->
<link rel="stylesheet" href="styles.css">
<script src="widget-bundle.js"></script>

<!-- Create widget container -->
<div id="navWidget"></div>

<!-- Initialize -->
<script>
document.addEventListener('DOMContentLoaded', async () => {
    const widget = await WidgetFactory.create('navWidget', 'config.json');
});
</script>
```

### 📋 **Option 3: Template-Based**
Start with a pre-built template and customize:

```javascript
// Load a template and customize
const config = await ConfigManager.loadTemplate('business-hub');
config.widget.title = "My Business";
config.socialLinks = [
    { icon: "📧", url: "mailto:hello@mybusiness.com", title: "Email" }
];

const widget = await WidgetFactory.createWithConfig('navWidget', config);
```

### 2. **Custom Configuration**
```javascript
const config = {
    widget: {
        title: "My Smart Hub",
        position: "top-right"
    },
    cube: {
        icon: "🚀",
        size: 60
    },
    socialLinks: [
        { icon: "🐦", url: "https://twitter.com", title: "Twitter" },
        { icon: "📧", url: "mailto:hello@example.com", title: "Email" }
    ],
    sections: [
        {
            id: "chat",
            title: "💬 AI Assistant",
            type: "chat",
            config: {
                welcomeMessage: "Hi! How can I help?",
                responses: {
                    "help": "I'm here to assist you!"
                }
            }
        },
        {
            id: "nav",
            title: "🏠 Navigation", 
            type: "links",
            links: [
                { icon: "🏠", text: "Home", url: "/" },
                { icon: "📊", text: "Dashboard", url: "/dashboard" }
            ]
        }
    ]
};

const widget = await WidgetFactory.createWithConfig('navWidget', config);
```

## 🎯 **Section Types**

### 💬 **Chat Sections**
Interactive AI assistant with customizable responses
```json
{
    "type": "chat",
    "config": {
        "welcomeMessage": "Hello! How can I help?",
        "responses": {
            "help": "I can assist with navigation and questions!",
            "default": ["How can I help?", "What do you need?"]
        }
    }
}
```

### 🔗 **Links Sections** 
Navigation links that open directly
```json
{
    "type": "links",
    "links": [
        { "icon": "🏠", "text": "Home", "url": "/" },
        { "icon": "📞", "text": "Contact", "url": "/contact" }
    ]
}
```

### 🔧 **Tools Sections**
Interactive tools that load in the context panel
```json
{
    "type": "tools",
    "tools": [
        {
            "icon": "🎨",
            "text": "Color Picker",
            "action": "colorPicker",
            "description": "Pick colors from elements"
        }
    ]
}
```

### ⚡ **Actions Sections**
Quick action buttons
```json
{
    "type": "actions", 
    "actions": [
        { "icon": "📧", "text": "Email", "url": "mailto:hello@example.com" },
        { "icon": "💬", "text": "Live Chat", "callback": "openChat" }
    ]
}
```

### 🎬 **Media Sections**
Video and promotional content
```json
{
    "type": "media",
    "content": {
        "video": {
            "title": "Watch Demo",
            "url": "https://youtube.com/watch?v=demo"
        },
        "advertisement": {
            "title": "Special Offer",
            "content": "50% OFF!",
            "url": "/offer"
        }
    }
}
```

## 🎨 **Theming System**

```json
{
    "widget": {
        "theme": {
            "primary": "rgba(0, 0, 0, 0.85)",
            "accent": "rgba(100, 150, 255, 0.3)", 
            "text": "white",
            "border": "rgba(255, 255, 255, 0.2)"
        }
    }
}
```

## 📱 **Responsive Design**

- **Desktop**: Full 2-column grid layout
- **Mobile**: Single column with optimized interactions
- **Touch**: Gesture-friendly controls

## 🔧 **Advanced Configuration**

### **Widget Behavior**
```json
{
    "behavior": {
        "autoClose": true,
        "rememberState": true,
        "animations": true
    }
}
```

### **Social Links**
```json
{
    "socialLinks": [
        { "icon": "🐦", "url": "https://twitter.com", "title": "Twitter" },
        { "icon": "💼", "url": "https://linkedin.com", "title": "LinkedIn" }
    ]
}
```

### **Custom Callbacks**
```javascript
// Define global functions for custom actions
window.openLiveChat = function() {
    // Your live chat integration
};

window.trackEvent = function(eventData) {
    // Your analytics integration
};
```

## 🚀 **Deployment**

### **Static Sites**
```html
<!-- Copy these files to your site -->
- widget-bundle.js
- styles.css  
- config.json (customize as needed)
```

### **CDN Usage**
```html
<link rel="stylesheet" href="https://cdn.example.com/smart-nav-widget/styles.css">
<script src="https://cdn.example.com/smart-nav-widget/widget-bundle.js"></script>
```

### **WordPress Integration**
Add to your theme's `functions.php`:
```php
function add_smart_nav_widget() {
    wp_enqueue_style('smart-nav-css', 'path/to/styles.css');
    wp_enqueue_script('smart-nav-js', 'path/to/widget-bundle.js');
}
add_action('wp_enqueue_scripts', 'add_smart_nav_widget');
```

## 📊 **Analytics Integration**

```json
{
    "analytics": {
        "enabled": true,
        "trackEvents": ["open", "close", "chat", "navigation"],
        "callback": "trackWidgetEvent"
    }
}
```

```javascript
// Your analytics function
window.trackWidgetEvent = function(eventData) {
    gtag('event', 'widget_interaction', eventData);
};
```

## 🔧 **API Reference**

### **Widget Factory**
```javascript
// Create from config file
const widget = await WidgetFactory.create('containerId', 'config.json');

// Create from object
const widget = await WidgetFactory.createWithConfig('containerId', configObject);

// Create from template
const widget = await WidgetFactory.createFromTemplate('minimal', 'containerId');
```

### **Widget Methods**
```javascript
widget.expand();           // Open the widget
widget.collapse();         // Close to cube
widget.setPosition('top-left');  // Change position
widget.updateConfig(newConfig);  // Update configuration
widget.destroy();          // Clean up
```

## 🎯 **Examples**

### **Business Hub**
- AI customer support chat
- Service navigation
- Contact forms and tools
- Promotional content

### **Developer Portal**
- Documentation links
- Code tools and utilities
- Community links
- API references

### **E-commerce Site**
- Product navigation
- Shopping cart access
- Customer support chat
- Promotional offers

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

MIT License - feel free to use in your projects!

## 🚀 **What's New in v2.0**

- ✨ **Origami Grid System**: Revolutionary 2-column layout with search
- 🎯 **Visual Builder**: No-code configuration tool (`cube-builder.html`)
- 🔍 **Smart Search**: Real-time navigation filtering
- 📊 **Status Messages**: Live feedback and interaction status
- 📋 **Template System**: 5 pre-built templates with easy customization
- 🤖 **Enhanced AI Chat**: Smarter, more contextual responses
- 📱 **Mobile Optimization**: Perfect touch interactions
- 🔧 **Developer Tools**: Built-in utilities and inspectors
- 🎨 **Advanced Theming**: Complete visual customization
- ⚡ **Better JSON Validation**: Comprehensive error checking and templates

---

**Ready to transform your navigation?** [Try the live demo](index.html) or [get started with the documentation](QUICK-START.md)! 