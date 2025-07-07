# 🚀 Quick Start - Smart Navigation Cube

> **Get the origami grid widget running in 5 minutes**

## ⚡ **Super Quick Setup**

### **Method 1: Instant Inline Setup** ✅ *No server required*
Create a single HTML file and you're done:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Smart Navigation</title>
    <link rel="stylesheet" href="https://cdn.example.com/smart-nav/styles.css">
</head>
<body>
    <!-- Your page content -->
    <h1>Welcome to My Site</h1>
    
    <!-- Widget container -->
    <div id="navWidget"></div>
    
    <!-- Widget script -->
    <script src="https://cdn.example.com/smart-nav/widget-bundle.js"></script>
    <script>
        // Initialize with custom config
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
                { icon: "📧", url: "mailto:hello@yoursite.com", title: "Email" },
                { icon: "🐦", url: "https://twitter.com/yourhandle", title: "Twitter" }
            ],
            sections: [
                {
                    id: "chat",
                    title: "💬 AI Assistant",
                    type: "chat",
                    config: {
                        welcomeMessage: "Hi! How can I help you today?",
                        responses: {
                            "help": "I can help you navigate this site!",
                            "contact": "You can reach us at hello@yoursite.com",
                            "default": ["How can I assist you?", "What would you like to know?"]
                        }
                    }
                },
                {
                    id: "navigation",
                    title: "🏠 Navigation",
                    type: "links", 
                    links: [
                        { icon: "🏠", text: "Home", url: "/" },
                        { icon: "📖", text: "About", url: "/about" },
                        { icon: "💼", text: "Services", url: "/services" },
                        { icon: "📞", text: "Contact", url: "/contact" }
                    ]
                },
                {
                    id: "actions",
                    title: "⚡ Quick Actions",
                    type: "actions",
                    actions: [
                        { icon: "📞", text: "Call Us", url: "tel:+1234567890" },
                        { icon: "📧", text: "Email", url: "mailto:hello@yoursite.com" },
                        { icon: "💬", text: "Live Chat", callback: "openLiveChat" }
                    ]
                }
            ]
        };
        
        // Create the widget
        document.addEventListener('DOMContentLoaded', async () => {
            const widget = await WidgetFactory.createWithConfig('navWidget', config);
            console.log('Smart Navigation Cube ready!');
        });
        
        // Define custom functions
        window.openLiveChat = function() {
            alert('Opening live chat...');
            // Your live chat integration here
        };
    </script>
</body>
</html>
```

## 🎯 **Understanding the Origami System**

When users click your cube, it unfolds into a smart 2-column grid:

### **📋 Left Panel** - Smart Navigation
- **Navigation**: Direct links (🏠 Home, 📞 Contact)
- **Features**: Interactive content (💬 Chat, 🔧 Tools) 
- **Quick Actions**: Immediate actions (📞 Call, 📧 Email)

### **📱 Right Panel** - Dynamic Context
- **Welcome Screen**: Shows by default
- **Chat Interface**: When user clicks "AI Assistant"
- **Tool Interfaces**: When user clicks developer tools
- **Media Content**: When user clicks media sections

### **🔗 Footer** - Always Available
- Social links and contact methods
- Always visible for quick access

## 🎨 **Customization Examples**

### **🏢 Business Website**
```javascript
const businessConfig = {
    widget: {
        title: "Business Hub",
        theme: {
            primary: "rgba(25, 25, 50, 0.9)",
            accent: "rgba(0, 123, 255, 0.4)",
            text: "white"
        }
    },
    cube: { icon: "💼", size: 65 },
    socialLinks: [
        { icon: "💼", url: "https://linkedin.com/company/yourcompany", title: "LinkedIn" },
        { icon: "📞", url: "tel:+1234567890", title: "Call Us" }
    ],
    sections: [
        {
            id: "support",
            title: "🤖 Customer Support",
            type: "chat",
            config: {
                welcomeMessage: "Welcome! How can we help your business today?",
                responses: {
                    "pricing": "Our pricing starts at $99/month. Contact sales for details.",
                    "demo": "I'd be happy to schedule a demo for you!",
                    "support": "Our support team is available 24/7."
                }
            }
        },
        {
            id: "services",
            title: "🛠️ Our Services", 
            type: "links",
            links: [
                { icon: "💻", text: "Consulting", url: "/consulting" },
                { icon: "📊", text: "Analytics", url: "/analytics" },
                { icon: "🔧", text: "Support", url: "/support" }
            ]
        },
        {
            id: "tools",
            title: "🔧 Business Tools",
            type: "tools",
            tools: [
                {
                    icon: "📊",
                    text: "ROI Calculator",
                    action: "roiCalculator",
                    description: "Calculate your return on investment"
                },
                {
                    icon: "📅", 
                    text: "Schedule Meeting",
                    action: "scheduleMeeting",
                    description: "Book a consultation"
                }
            ]
        }
    ]
};
```

### **🛍️ E-commerce Store**
```javascript
const ecommerceConfig = {
    widget: {
        title: "Shop Assistant",
        theme: {
            primary: "rgba(220, 20, 60, 0.9)",
            accent: "rgba(255, 215, 0, 0.4)",
            text: "white"
        }
    },
    cube: { icon: "🛍️", size: 60 },
    sections: [
        {
            id: "shopping-help",
            title: "🛒 Shopping Assistant",
            type: "chat",
            config: {
                welcomeMessage: "Hi! I'm here to help you shop. What are you looking for?",
                responses: {
                    "size": "Our size guide can help you find the perfect fit!",
                    "shipping": "We offer free shipping on orders over $50.",
                    "return": "Easy returns within 30 days, no questions asked."
                }
            }
        },
        {
            id: "shop-nav",
            title: "🏪 Shop Categories",
            type: "links",
            links: [
                { icon: "👔", text: "Men's", url: "/mens" },
                { icon: "👗", text: "Women's", url: "/womens" },
                { icon: "👶", text: "Kids", url: "/kids" },
                { icon: "💍", text: "Accessories", url: "/accessories" }
            ]
        },
        {
            id: "quick-shop",
            title: "⚡ Quick Shop",
            type: "actions",
            actions: [
                { icon: "🛒", text: "View Cart", callback: "openCart" },
                { icon: "❤️", text: "Wishlist", callback: "openWishlist" },
                { icon: "📞", text: "Customer Service", url: "tel:+1234567890" }
            ]
        }
    ]
};
```

## 📱 **Testing Your Widget**

### **🎯 Interaction Testing**
1. **Click the cube** → Should open origami grid
2. **Try navigation links** → Should navigate directly
3. **Click "AI Assistant"** → Should load chat in right panel
4. **Test quick actions** → Should execute or call functions
5. **Click close (×)** → Should return to cube
6. **Try different positions** → Should position correctly

### **📱 Mobile Testing**
- Test on mobile devices
- Verify touch interactions
- Check responsive layout
- Test in portrait/landscape

## 🔧 **Advanced Configuration**

### **🎨 Custom Themes**
```javascript
// Dark theme
theme: {
    primary: "rgba(0, 0, 0, 0.95)",
    accent: "rgba(100, 150, 255, 0.3)",
    text: "white",
    border: "rgba(255, 255, 255, 0.2)"
}

// Light theme  
theme: {
    primary: "rgba(255, 255, 255, 0.95)",
    accent: "rgba(0, 123, 255, 0.3)", 
    text: "#333",
    border: "rgba(0, 0, 0, 0.1)"
}
```

### **⚡ Custom Actions**
```javascript
// Define your custom functions
window.openCart = function() {
    // Your cart logic
    window.location.href = '/cart';
};

window.openWishlist = function() {
    // Your wishlist logic
    showWishlistModal();
};

window.trackEvent = function(eventData) {
    // Your analytics
    gtag('event', 'widget_interaction', eventData);
};
```

### **📊 Analytics Setup**
```javascript
{
    analytics: {
        enabled: true,
        trackEvents: ["open", "close", "chat", "navigation"],
        callback: "trackEvent"
    }
}
```

## 🚨 **Common Issues & Solutions**

### **❌ "WidgetFactory is not defined"**
- Make sure `widget-bundle.js` loads before your initialization script
- Check browser console for loading errors

### **❌ Widget doesn't appear**
- Verify the container element exists: `<div id="navWidget"></div>`
- Check CSS file is loaded properly
- Look for JavaScript errors in console

### **❌ Config not loading**
- For external JSON files, you need a web server (no file:// protocol)
- Use inline config instead, or run a local server

### **❌ Positioning issues**
- Check that position values are valid: "top-right", "top-left", etc.
- Verify CSS is loaded and not conflicting with existing styles

## 🎉 **You're Ready!**

That's it! Your Smart Navigation Cube is now ready. The origami grid system will automatically:

- ✅ Organize sections by type
- ✅ Load content dynamically in the right panel  
- ✅ Handle mobile responsively
- ✅ Provide smooth animations
- ✅ Remember user preferences

**Next Steps:**
- 📖 Check the [full documentation](README.md)
- 🎨 Explore [theming options](README.md#theming)
- 🔧 Learn about [advanced features](README.md#advanced-configuration)
- 🚀 See [deployment guide](DEPLOYMENT.md) 