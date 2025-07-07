/**
 * Demo Controls Module
 * Handles demo widget functionality and position/configuration switching
 */

(function() {
    'use strict';
    
    console.log('🚀 Demo Controls module loading...');
    
    let currentWidget = null;
    
    // Comprehensive configuration presets showcasing all features
    const configs = {
        default: {
            widget: {
                title: "Smart Assistant",
                position: "top-right",
                theme: {
                    primary: "rgba(0, 0, 0, 0.85)",
                    accent: "rgba(100, 150, 255, 0.3)",
                    text: "white",
                    border: "rgba(255, 255, 255, 0.2)"
                },
                dimensions: {
                    defaultWidth: 420,
                    minWidth: 320,
                    minHeight: 250,
                    maxHeight: "85vh"
                },
                behavior: { autoClose: true, rememberState: true, animations: true, allowSticky: true }
            },
            cube: { icon: "🤖", size: 60, spinDuration: "8s", hoverScale: 1.1 },
            socialLinks: [
                { icon: "🐦", url: "https://twitter.com", title: "Twitter" },
                { icon: "📧", url: "mailto:hello@example.com", title: "Email" }
            ],
            customization: {
                showControls: true
            },
            sections: [
                {
                    id: "chat-assistant", 
                    title: "💬 AI Assistant", 
                    type: "chat", 
                    expanded: true,
                    config: {
                        welcomeMessage: "Hi! I'm your smart assistant. Ask me anything!",
                        placeholder: "Type your question here...",
                        responses: {
                            "help": "I can help you navigate, find information, or answer questions about our services!",
                            "contact": "You can reach us at support@example.com or call (555) 123-4567",
                            "features": "Our platform offers AI assistance, smart navigation, real-time chat, and much more!",
                            "pricing": "Check out our pricing page for detailed information about our plans and features.",
                            "demo": "Would you like to see a demo? I can show you around our key features!",
                            "default": [
                                "How can I help you today?",
                                "What would you like to know?",
                                "I'm here to assist you!",
                                "Feel free to ask me anything!"
                            ]
                        }
                    }
                },
                {
                    id: "navigation", 
                    title: "🏠 Navigation", 
                    type: "links", 
                    expanded: false,
                    links: [
                        { icon: "🏠", text: "Home", url: "/" },
                        { icon: "📊", text: "Dashboard", url: "/dashboard" },
                        { icon: "🛍️", text: "Products", url: "/products" },
                        { icon: "📚", text: "Documentation", url: "/docs" },
                        { icon: "📞", text: "Contact", url: "/contact" },
                        { icon: "👤", text: "Profile", url: "/profile" }
                    ]
                },
                {
                    id: "quick-actions",
                    title: "⚡ Quick Actions",
                    type: "actions",
                    expanded: false,
                    actions: [
                        { icon: "📞", text: "Call Support", action: "call", url: "tel:+1234567890" },
                        { icon: "💬", text: "Live Chat", action: "livechat", callback: "openLiveChat" },
                        { icon: "📧", text: "Email Us", action: "email", url: "mailto:hello@example.com" },
                        { icon: "🌙", text: "Dark Mode", action: "darkmode", callback: "toggleDarkMode" }
                    ]
                }
            ]
        },
        
        business: {
            widget: {
                title: "Business Hub",
                position: "top-right",
                theme: {
                    primary: "rgba(25, 25, 50, 0.9)",
                    accent: "rgba(0, 123, 255, 0.4)",
                    text: "white",
                    border: "rgba(255, 255, 255, 0.2)"
                },
                dimensions: {
                    defaultWidth: 450,
                    minWidth: 350,
                    minHeight: 300,
                    maxHeight: "90vh"
                },
                behavior: { autoClose: false, rememberState: true, animations: true, allowSticky: true }
            },
            cube: { icon: "💼", size: 65, spinDuration: "10s", hoverScale: 1.15 },
            socialLinks: [
                { icon: "💼", url: "https://linkedin.com/company/example", title: "LinkedIn" },
                { icon: "📞", url: "tel:+1234567890", title: "Call Us" }
            ],
            customization: {
                showControls: true
            },
            sections: [
                {
                    id: "business-chat",
                    title: "🤖 Business Assistant",
                    type: "chat",
                    expanded: true,
                    config: {
                        welcomeMessage: "Welcome to our business portal! How can I help you today?",
                        placeholder: "Ask about our services, pricing, or schedule a meeting...",
                        responses: {
                            "services": "We offer consulting, analytics, support, and custom development services.",
                            "pricing": "Our pricing starts at $99/month for basic plans. Contact us for enterprise pricing.",
                            "meeting": "I'd be happy to schedule a meeting! Please use our calendar link or call us directly.",
                            "consulting": "Our consulting services include strategy, implementation, and optimization.",
                            "analytics": "We provide comprehensive analytics and reporting solutions for your business.",
                            "support": "Our support team is available 24/7 to help with any technical issues.",
                            "demo": "Would you like to see a demo of our business solutions?",
                            "default": [
                                "How can I help your business grow?",
                                "What business solution are you looking for?",
                                "I'm here to help with your business needs!"
                            ]
                        }
                    }
                },
                {
                    id: "services", 
                    title: "🛠️ Our Services", 
                    type: "links", 
                    expanded: false,
                    links: [
                        { icon: "💻", text: "Consulting", url: "/consulting" },
                        { icon: "📊", text: "Analytics", url: "/analytics" },
                        { icon: "🔧", text: "Support", url: "/support" },
                        { icon: "🚀", text: "Development", url: "/development" },
                        { icon: "📈", text: "Marketing", url: "/marketing" },
                        { icon: "🎯", text: "Strategy", url: "/strategy" }
                    ]
                },
                {
                    id: "business-tools",
                    title: "🔧 Business Tools",
                    type: "tools",
                    expanded: false,
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
                            description: "Book a consultation with our team"
                        },
                        {
                            icon: "💰",
                            text: "Cost Estimator",
                            action: "costEstimator",
                            description: "Get an estimate for your project"
                        },
                        {
                            icon: "📋",
                            text: "Business Audit",
                            action: "businessAudit",
                            description: "Free assessment of your current setup"
                        }
                    ]
                },
                {
                    id: "featured-content",
                    title: "🎯 Featured Content",
                    type: "media",
                    expanded: false,
                    content: {
                        video: {
                            title: "Watch Our Success Stories",
                            description: "See how we've helped businesses grow",
                            url: "https://youtube.com/watch?v=business-demo"
                        },
                        advertisement: {
                            title: "Special Offer",
                            content: "Get 30% OFF your first project!<br>Limited time offer",
                            url: "/business-offer"
                        }
                    }
                },
                {
                    id: "contact-actions",
                    title: "📞 Get In Touch",
                    type: "actions",
                    expanded: false,
                    actions: [
                        { icon: "📞", text: "Call Sales", action: "call", url: "tel:+1234567890" },
                        { icon: "📧", text: "Email Sales", action: "email", url: "mailto:sales@business.com" },
                        { icon: "📅", text: "Book Demo", action: "demo", callback: "bookDemo" },
                        { icon: "💬", text: "Live Chat", action: "chat", callback: "openBusinessChat" },
                        { icon: "📄", text: "Get Quote", action: "quote", url: "/get-quote" }
                    ]
                }
            ]
        },
        
        minimal: {
            widget: {
                title: "Quick Menu",
                position: "top-right",
                theme: {
                    primary: "rgba(255, 255, 255, 0.95)",
                    accent: "rgba(0, 0, 0, 0.1)",
                    text: "#333",
                    border: "rgba(0, 0, 0, 0.1)"
                },
                dimensions: {
                    defaultWidth: 320,
                    minWidth: 280,
                    minHeight: 200,
                    maxHeight: "70vh"
                },
                behavior: { autoClose: true, rememberState: false, animations: true, allowSticky: false }
            },
            cube: { icon: "☰", size: 50, spinDuration: "6s", hoverScale: 1.05 },
            socialLinks: [
                { icon: "🌐", url: "https://example.com", title: "Website" },
                { icon: "📧", url: "mailto:info@example.com", title: "Email" }
            ],
            customization: {
                showControls: true
            },
            sections: [
                {
                    id: "simple-nav", 
                    title: "📋 Quick Links", 
                    type: "links", 
                    expanded: true,
                    links: [
                        { icon: "🏠", text: "Home", url: "/" },
                        { icon: "📖", text: "About", url: "/about" },
                        { icon: "💼", text: "Services", url: "/services" },
                        { icon: "📞", text: "Contact", url: "/contact" },
                        { icon: "📝", text: "Blog", url: "/blog" }
                    ]
                },
                {
                    id: "simple-actions",
                    title: "⚡ Quick Actions",
                    type: "actions",
                    expanded: false,
                    actions: [
                        { icon: "📞", text: "Call", action: "call", url: "tel:+1234567890" },
                        { icon: "📧", text: "Email", action: "email", url: "mailto:info@example.com" },
                        { icon: "🌐", text: "Website", action: "website", url: "https://example.com" }
                    ]
                }
            ]
        }
    };
    
    // Initialize demo widget with comprehensive debugging
    async function initWidget(configName) {
        configName = configName || 'default';
        
        try {
            console.log('🔄 Initializing widget with config:', configName);
            
            // Validate config exists
            if (!configs[configName]) {
                throw new Error(`Config "${configName}" not found. Available: ${Object.keys(configs).join(', ')}`);
            }
            
            // Destroy existing widget and clear state
            if (currentWidget) {
                console.log('🗑️ Destroying existing widget');
                try {
                    // Clear saved state to prevent position conflicts
                    if (currentWidget.stateManager) {
                        currentWidget.stateManager.clearState();
                    }
                    WidgetFactory.destroy('navWidget');
                    currentWidget = null;
                } catch (destroyError) {
                    console.warn('⚠️ Error destroying widget:', destroyError);
                }
            }
            
            // Deep clone config to avoid mutations
            const config = JSON.parse(JSON.stringify(configs[configName]));
            
            // Preserve user-selected position across config changes
            const currentPosition = getCurrentSelectedPosition();
            if (currentPosition) {
                config.widget.position = currentPosition;
                console.log('🎯 Preserving user position:', currentPosition);
            }
            
            console.log('📝 Using config:', config);
            
            // Validate config structure
            if (!config.widget) {
                throw new Error('Config missing widget section');
            }
            if (!config.cube) {
                throw new Error('Config missing cube section');
            }
            if (!config.sections || !Array.isArray(config.sections)) {
                throw new Error('Config missing or invalid sections array');
            }
            
            // Create widget
            console.log('🏗️ Creating widget...');
            currentWidget = await WidgetFactory.createWithConfig('navWidget', config);
            
            console.log('✅ Successfully loaded ' + configName + ' configuration');
            console.log('🎯 Widget created:', currentWidget);
            console.log('📍 Widget position:', currentWidget.position);
            
            // Debug DOM state
            setTimeout(() => {
                const container = document.getElementById('navWidget');
                if (container) {
                    console.log('🏷️ Widget DOM classes:', container.className);
                    console.log('📐 Widget computed styles:', {
                        position: window.getComputedStyle(container).position,
                        top: window.getComputedStyle(container).top,
                        left: window.getComputedStyle(container).left,
                        right: window.getComputedStyle(container).right,
                        bottom: window.getComputedStyle(container).bottom,
                        transform: window.getComputedStyle(container).transform
                    });
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Failed to load widget:', error);
            console.error('📋 Error details:', error.stack);
            console.error('🔍 Config name:', configName);
            console.error('🔍 Available configs:', Object.keys(configs));
            
            // Fallback to minimal if default fails
            if (configName !== 'minimal') {
                console.log('🔄 Falling back to minimal config...');
                await initWidget('minimal');
            }
        }
    }
    
    // Get currently selected position from UI
    function getCurrentSelectedPosition() {
        const activePositionBtn = document.querySelector('.position-btn.active');
        if (activePositionBtn) {
            const position = activePositionBtn.dataset.position;
            console.log('📍 Current UI position:', position);
            return position;
        }
        return null;
    }
    
    // Toggle sticky mode
    function toggleSticky() {
        if (currentWidget && currentWidget.toggleSticky) {
            currentWidget.toggleSticky();
            console.log('🔄 Toggled sticky mode');
        } else {
            console.warn('⚠️ No widget available or sticky not supported');
        }
    }
    
    // Reset widget to default
    function resetWidget() {
        console.log('🔄 Resetting widget to default configuration');
        
        // Reset UI state first
        document.querySelectorAll('.config-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.config-btn[data-config="default"]')?.classList.add('active');
        
        document.querySelectorAll('.position-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.position-btn[data-position="top-right"]')?.classList.add('active');
        
        // Then reset widget
        initWidget('default');
        
        console.log('✅ Reset to default configuration complete');
    }
    
    // Setup event listeners when DOM is ready
    function initEventListeners() {
        // Configuration switching
        document.querySelectorAll('.config-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const config = btn.dataset.config;
                
                // Update UI
                document.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Load new config
                initWidget(config);
            });
        });
        
        // Position switching
        document.querySelectorAll('.position-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const position = btn.dataset.position;
                console.log('🎯 Position button clicked:', position);
                
                // Update UI
                document.querySelectorAll('.position-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update widget position
                if (currentWidget) {
                    console.log('🔄 Updating widget position to:', position);
                    const activeConfig = document.querySelector('.config-btn.active').dataset.config;
                    const config = JSON.parse(JSON.stringify(configs[activeConfig]));
                    config.widget.position = position;
                    
                    console.log('📝 New config with position:', config);
                    
                    WidgetFactory.destroy('navWidget');
                    WidgetFactory.createWithConfig('navWidget', config).then(widget => {
                        currentWidget = widget;
                        console.log('✅ Position successfully changed to ' + position);
                        console.log('🎯 Widget at new position:', widget);
                        
                        // Debug: Check applied classes
                        const container = document.getElementById('navWidget');
                        if (container) {
                            console.log('📋 Widget container classes:', container.className);
                            console.log('📍 Widget container computed position:', 
                                window.getComputedStyle(container).position,
                                window.getComputedStyle(container).top,
                                window.getComputedStyle(container).right,
                                window.getComputedStyle(container).bottom,
                                window.getComputedStyle(container).left
                            );
                        }
                    }).catch(error => {
                        console.error('❌ Failed to change position:', error);
                    });
                } else {
                    console.warn('⚠️ No current widget to reposition');
                }
            });
        });
        
        // Control buttons
        const toggleStickyBtn = document.getElementById('toggleSticky');
        if (toggleStickyBtn) {
            toggleStickyBtn.addEventListener('click', toggleSticky);
        }
        
        const resetBtn = document.getElementById('resetWidget');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetWidget);
        }
    }
    
    // Wait for WidgetFactory to be available
    function waitForWidgetFactory() {
        return new Promise((resolve) => {
            if (typeof WidgetFactory !== 'undefined') {
                console.log('✅ WidgetFactory already available');
                resolve();
            } else {
                console.log('⏳ Waiting for WidgetFactory...');
                const checkInterval = setInterval(() => {
                    if (typeof WidgetFactory !== 'undefined') {
                        console.log('✅ WidgetFactory now available');
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            }
        });
    }
    
    // Initialize when DOM and WidgetFactory are ready
    async function initialize() {
        console.log('🎯 Demo Controls initializing...');
        await waitForWidgetFactory();
        console.log('🎮 Setting up event listeners...');
        initEventListeners();
        console.log('🎲 Creating default widget...');
        
        // Small delay to ensure DOM is fully ready
        setTimeout(async () => {
            // Set default active states
            document.querySelector('.config-btn[data-config="default"]')?.classList.add('active');
            document.querySelector('.position-btn[data-position="top-right"]')?.classList.add('active');
            
            await initWidget('default');
        }, 100);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for potential external use
    window.DemoControls = {
        initWidget,
        toggleSticky,
        resetWidget,
        getCurrentWidget: () => currentWidget
    };
    
})(); 