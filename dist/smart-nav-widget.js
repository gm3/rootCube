/**
 * Smart Navigation Widget - Production Bundle
 * Version 2.1.0 - Single file distribution
 * 
 * This file contains all widget functionality bundled for production use.
 * No external dependencies required.
 */

(function() {
    'use strict';

    // ============================================================================= 
    // CONFIG MODULE
    // ============================================================================= 
/**
 * Configuration Manager
 * Handles loading, parsing, and validation of widget configurations
 */

class ConfigManager {
    constructor(configPath = 'config.json') {
        this.configPath = configPath;
        this.config = null;
    }

    async loadConfig(config = null) {
        try {
            if (config) {
                // Use provided config object
                this.config = { ...this.getDefaultConfig(), ...config };
                console.log('✅ Configuration loaded from object');
                return this.config;
            }

            // Try to load from file (only works on http/https, not file://)
            if (this.configPath && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
                const response = await fetch(this.configPath);
                if (response.ok) {
                    const loadedConfig = await response.json();
                    this.config = { ...this.getDefaultConfig(), ...loadedConfig };
                    console.log('✅ Configuration loaded from file:', this.configPath);
                    return this.config;
                }
            }

            // Check for global config
            if (window.widgetConfig) {
                this.config = { ...this.getDefaultConfig(), ...window.widgetConfig };
                console.log('✅ Configuration loaded from window.widgetConfig');
                return this.config;
            }

            // Fallback to default
            this.config = this.getDefaultConfig();
            console.log('⚠️ Using default configuration');
            return this.config;

        } catch (error) {
            console.warn('⚠️ Config load failed, using defaults:', error.message);
            this.config = this.getDefaultConfig();
            return this.config;
        }
    }

    getDefaultConfig() {
        return {
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
                    defaultWidth: 400,
                    minWidth: 300,
                    minHeight: 200,
                    maxHeight: "80vh"
                },
                behavior: {
                    autoClose: true,
                    rememberState: true,
                    soundEffects: false,
                    animations: true,
                    allowSticky: true
                }
            },
            cube: {
                icon: "⊞",
                size: 60,
                spinDuration: "8s",
                hoverScale: 1.1
            },
            sections: [],
            customization: {
                allowMinimize: true,
                showControls: true,
                customCSS: "",
                customCallbacks: {}
            },
            keyboard: {
                enabled: true,
                shortcuts: {
                    toggle: "Escape",
                    sendChat: "Enter",
                    sendChatAlt: "Ctrl+Enter",
                    toggleSticky: "Tab"
                }
            },
            analytics: {
                enabled: false,
                trackEvents: ["open", "close", "sticky", "chat"],
                callback: null
            }
        };
    }

    get(path) {
        return this.getNestedProperty(this.config, path);
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    validate() {
        if (!this.config) {
            throw new Error('Configuration not loaded');
        }

        const errors = [];

        // Validate widget section
        if (!this.config.widget) {
            errors.push('Widget configuration is required');
        } else {
            if (!this.config.widget.title) {
                errors.push('Widget title is required');
            }
        }

        // Validate cube section
        if (!this.config.cube) {
            errors.push('Cube configuration is required');
        } else {
            if (!this.config.cube.icon) {
                errors.push('Cube icon is required');
            }
        }

        // Validate sections
        if (!this.config.sections || !Array.isArray(this.config.sections)) {
            errors.push('Sections array is required');
        } else {
            this.config.sections.forEach((section, index) => {
                if (!section.id) {
                    errors.push(`Section ${index + 1}: ID is required`);
                }
                if (!section.title) {
                    errors.push(`Section ${index + 1}: Title is required`);
                }
                if (!section.type) {
                    errors.push(`Section ${index + 1}: Type is required`);
                }

                // Type-specific validation
                switch (section.type) {
                    case 'chat':
                        if (!section.config) {
                            errors.push(`Section ${section.id}: Chat config is required`);
                        }
                        break;
                    case 'links':
                        if (!section.links || !Array.isArray(section.links)) {
                            errors.push(`Section ${section.id}: Links array is required`);
                        }
                        break;
                    case 'tools':
                        if (!section.tools || !Array.isArray(section.tools)) {
                            errors.push(`Section ${section.id}: Tools array is required`);
                        }
                        break;
                    case 'actions':
                        if (!section.actions || !Array.isArray(section.actions)) {
                            errors.push(`Section ${section.id}: Actions array is required`);
                        }
                        break;
                    case 'media':
                        if (!section.content) {
                            errors.push(`Section ${section.id}: Content is required`);
                        }
                        break;
                }
            });
        }

        if (errors.length > 0) {
            throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
        }

        return true;
    }

    // Load configuration templates
    async loadTemplate(templateName) {
        try {
            const response = await fetch('config-templates.json');
            if (response.ok) {
                const templates = await response.json();
                const template = templates.templates[templateName];
                if (template) {
                    this.config = { ...this.getDefaultConfig(), ...template.config };
                    console.log(`✅ Template "${templateName}" loaded successfully`);
                    return this.config;
                } else {
                    throw new Error(`Template "${templateName}" not found`);
                }
            } else {
                throw new Error('Failed to load templates');
            }
        } catch (error) {
            console.warn('⚠️ Template load failed:', error.message);
            throw error;
        }
    }

    // Get available templates
    async getAvailableTemplates() {
        try {
            const response = await fetch('config-templates.json');
            if (response.ok) {
                const templates = await response.json();
                return Object.keys(templates.templates).map(key => ({
                    id: key,
                    name: templates.templates[key].name,
                    description: templates.templates[key].description
                }));
            }
            return [];
        } catch (error) {
            console.warn('⚠️ Failed to load template list:', error.message);
            return [];
        }
    }

    // Simplified config builder
    buildSimpleConfig(options = {}) {
        const {
            title = "Smart Assistant",
            position = "top-right",
            theme = "dark",
            sections = []
        } = options;

        const themes = {
            dark: {
                primary: "rgba(0, 0, 0, 0.85)",
                accent: "rgba(100, 150, 255, 0.3)",
                text: "white",
                border: "rgba(255, 255, 255, 0.2)"
            },
            light: {
                primary: "rgba(255, 255, 255, 0.95)",
                accent: "rgba(0, 123, 255, 0.3)",
                text: "#333",
                border: "rgba(0, 0, 0, 0.1)"
            },
            blue: {
                primary: "rgba(25, 25, 50, 0.9)",
                accent: "rgba(0, 123, 255, 0.4)",
                text: "white",
                border: "rgba(255, 255, 255, 0.15)"
            }
        };

        this.config = {
            widget: {
                title,
                position,
                theme: themes[theme] || themes.dark
            },
            cube: {
                icon: "⊞",
                size: 60
            },
            sections: sections.length > 0 ? sections : [
                {
                    id: "nav",
                    title: "🏠 Navigation",
                    type: "links",
                    expanded: true,
                    links: [
                        { icon: "🏠", text: "Home", url: "/" },
                        { icon: "📞", text: "Contact", url: "/contact" }
                    ]
                }
            ]
        };

        return this.config;
    }

    merge(newConfig) {
        if (!this.config) {
            throw new Error('Base configuration not loaded');
        }

        this.config = { ...this.config, ...newConfig };
        return this.config;
    }
} 

    // ============================================================================= 
    // STATE MODULE
    // ============================================================================= 
/**
 * Smart Navigation Widget - State Manager
 * Handles saving and loading widget state using localStorage
 */

class StateManager {
    constructor(containerId) {
        this.containerId = containerId;
        this.storageKey = `smart-nav-widget-${containerId}`;
    }

    /**
     * Save widget state to localStorage
     * @param {Object} state - State object to save
     */
    saveState(state) {
        try {
            const stateData = {
                ...state,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(stateData));
            console.log('🔄 Widget state saved:', state);
        } catch (error) {
            console.warn('⚠️ Failed to save widget state:', error);
        }
    }

    /**
     * Load widget state from localStorage
     * @returns {Object|null} Loaded state or null if not found
     */
    loadState() {
        try {
            const stateData = localStorage.getItem(this.storageKey);
            if (!stateData) return null;

            const state = JSON.parse(stateData);
            console.log('🔄 Widget state loaded:', state);
            return state;
        } catch (error) {
            console.warn('⚠️ Failed to load widget state:', error);
            return null;
        }
    }

    /**
     * Clear saved state
     */
    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('🔄 Widget state cleared');
        } catch (error) {
            console.warn('⚠️ Failed to clear widget state:', error);
        }
    }

    /**
     * Check if state exists
     * @returns {boolean} True if state exists
     */
    hasState() {
        return localStorage.getItem(this.storageKey) !== null;
    }
} 

    // ============================================================================= 
    // CHAT MODULE
    // ============================================================================= 
/**
 * Smart Navigation Widget - Chat Manager
 * Handles chat functionality for chat sections
 */

class ChatManager {
    constructor(config, containerElement) {
        this.config = config || {};
        this.container = containerElement;
        this.messages = [];
        this.isProcessing = false;
    }

    /**
     * Initialize the chat manager
     */
    init() {
        this.setupEventListeners();
        this.loadWelcomeMessage();
        console.log('🔄 Chat manager initialized');
    }

    /**
     * Setup event listeners for chat interactions
     */
    setupEventListeners() {
        const chatInput = this.container.querySelector('#chatInput');
        const sendButton = this.container.querySelector('#sendButton');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
    }

    /**
     * Load welcome message if configured
     */
    loadWelcomeMessage() {
        if (this.config.welcomeMessage) {
            this.addMessage('assistant', this.config.welcomeMessage);
        }
    }

    /**
     * Send a message
     */
    async sendMessage() {
        const chatInput = this.container.querySelector('#chatInput');
        if (!chatInput || this.isProcessing) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // Clear input
        chatInput.value = '';

        // Add user message
        this.addMessage('user', message);

        // Process message
        this.isProcessing = true;
        await this.processMessage(message);
        this.isProcessing = false;
    }

    /**
     * Process a message and generate response
     * @param {string} message - User message
     */
    async processMessage(message) {
        try {
            // Add typing indicator
            this.addTypingIndicator();

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Remove typing indicator
            this.removeTypingIndicator();

            // Generate response based on configuration
            let response = this.generateResponse(message);
            
            // Add assistant response
            this.addMessage('assistant', response);

        } catch (error) {
            console.error('❌ Chat processing error:', error);
            this.removeTypingIndicator();
            this.addMessage('assistant', 'Sorry, I encountered an error processing your message.');
        }
    }

    /**
     * Generate a response based on the message
     * @param {string} message - User message
     * @returns {string} Generated response
     */
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Simple keyword-based responses
        if (lowerMessage.includes('help')) {
            return 'I can help you navigate through the available sections and tools. What would you like to know about?';
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you today?';
        }

        if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        }

        if (lowerMessage.includes('what') && lowerMessage.includes('do')) {
            return 'I can help you navigate through the available sections, provide information about tools, and assist with general questions. Try exploring the different sections in the navigation panel!';
        }

        // Default response
        return 'I understand you\'re asking about "' + message + '". This is a demo chat system. In a real implementation, this would connect to a proper chat API or AI service.';
    }

    /**
     * Add a message to the chat
     * @param {string} type - Message type ('user' or 'assistant')
     * @param {string} content - Message content
     */
    addMessage(type, content) {
        const messagesContainer = this.container.querySelector('.chat-messages');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);
        messagesContainer.appendChild(messageElement);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.messages.push({ type, content, timestamp: Date.now() });
    }

    /**
     * Add typing indicator
     */
    addTypingIndicator() {
        const messagesContainer = this.container.querySelector('.chat-messages');
        if (!messagesContainer) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message assistant-message typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Remove typing indicator
     */
    removeTypingIndicator() {
        const typingIndicator = this.container.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    /**
     * Clear all messages
     */
    clearMessages() {
        const messagesContainer = this.container.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
        this.messages = [];
    }

    /**
     * Get all messages
     * @returns {Array} Array of messages
     */
    getMessages() {
        return [...this.messages];
    }

    /**
     * Destroy the chat manager
     */
    destroy() {
        this.messages = [];
        this.isProcessing = false;
        console.log('🔄 Chat manager destroyed');
    }
} 

    // ============================================================================= 
    // RENDERER MODULE
    // ============================================================================= 
/**
 * Section Renderer
 * Handles rendering of different section types (chat, links, tools, media, actions)
 */

class SectionRenderer {
    static renderSection(section, config) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = `nav-section nav-${section.id}`;
        
        if (section.expanded) {
            sectionDiv.classList.add('expanded');
        }

        const header = this.renderSectionHeader(section);
        const content = this.renderSectionContent(section, config);

        sectionDiv.appendChild(header);
        sectionDiv.appendChild(content);

        return sectionDiv;
    }

    static renderSectionHeader(section) {
        const header = document.createElement('div');
        header.className = 'section-header';

        const title = document.createElement('h3');
        title.textContent = section.title;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = section.expanded ? '−' : '+';

        header.appendChild(title);
        header.appendChild(toggleBtn);

        return header;
    }

    static renderSectionContent(section, config) {
        const content = document.createElement('div');
        content.className = 'section-content';

        switch (section.type) {
            case 'chat':
                content.appendChild(this.renderChatSection(section));
                break;
            case 'links':
                content.appendChild(this.renderLinksSection(section));
                break;
            case 'tools':
                content.appendChild(this.renderToolsSection(section));
                break;
            case 'media':
                content.appendChild(this.renderMediaSection(section));
                break;
            case 'actions':
                content.appendChild(this.renderActionsSection(section));
                break;
            default:
                content.appendChild(this.renderCustomSection(section));
        }

        return content;
    }

    static renderChatSection(section) {
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';

        // Chat messages area
        const messagesDiv = document.createElement('div');
        messagesDiv.className = 'chat-messages';
        messagesDiv.id = `chatMessages-${section.id}`;

        // Welcome message
        if (section.config?.welcomeMessage) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'chat-message bot-message';
            welcomeMsg.innerHTML = `<div class="message-content">${section.config.welcomeMessage}</div>`;
            messagesDiv.appendChild(welcomeMsg);
        }

        // Input container
        const inputContainer = document.createElement('div');
        inputContainer.className = 'chat-input-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'chat-input';
        input.id = 'chatInput';
        input.placeholder = section.config?.placeholder || 'Ask me anything...';

        const sendBtn = document.createElement('button');
        sendBtn.className = 'send-btn';
        sendBtn.textContent = '→';
        sendBtn.id = 'sendBtn';

        inputContainer.appendChild(input);
        inputContainer.appendChild(sendBtn);

        chatContainer.appendChild(messagesDiv);
        chatContainer.appendChild(inputContainer);

        return chatContainer;
    }

    static renderLinksSection(section) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'nav-links';

        if (section.links && section.links.length > 0) {
            section.links.forEach(link => {
                const linkEl = document.createElement('a');
                linkEl.href = link.url;
                linkEl.className = 'nav-link';
                linkEl.target = link.target || '_self';

                if (link.icon) {
                    const icon = document.createElement('span');
                    icon.className = 'nav-icon';
                    icon.textContent = link.icon;
                    linkEl.appendChild(icon);
                }

                const text = document.createElement('span');
                text.textContent = link.text;
                linkEl.appendChild(text);

                linksDiv.appendChild(linkEl);
            });
        }

        return linksDiv;
    }

    static renderToolsSection(section) {
        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'nav-tools';

        if (section.tools && section.tools.length > 0) {
            section.tools.forEach(tool => {
                const toolEl = document.createElement('div');
                toolEl.className = 'tool-link';
                toolEl.setAttribute('data-action', tool.action);
                if (tool.callback) {
                    toolEl.setAttribute('data-callback', tool.callback);
                }

                if (tool.icon) {
                    const icon = document.createElement('span');
                    icon.className = 'tool-icon';
                    icon.textContent = tool.icon;
                    toolEl.appendChild(icon);
                }

                const content = document.createElement('div');
                content.className = 'tool-content';

                const title = document.createElement('div');
                title.className = 'tool-title';
                title.textContent = tool.text;

                const desc = document.createElement('div');
                desc.className = 'tool-description';
                desc.textContent = tool.description;

                content.appendChild(title);
                content.appendChild(desc);
                toolEl.appendChild(content);

                toolsDiv.appendChild(toolEl);
            });
        }

        return toolsDiv;
    }

    static renderMediaSection(section) {
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'media-content';

        if (section.content?.video) {
            const video = section.content.video;
            const videoEl = document.createElement('div');
            videoEl.className = 'video-placeholder';
            
            const playButton = document.createElement('div');
            playButton.className = 'play-button';
            playButton.textContent = '▶';
            
            const title = document.createElement('div');
            title.textContent = video.title;
            
            const description = document.createElement('p');
            description.textContent = video.description;
            
            videoEl.appendChild(playButton);
            videoEl.appendChild(title);
            videoEl.appendChild(description);
            
            if (video.url) {
                videoEl.addEventListener('click', () => {
                    window.open(video.url, '_blank');
                });
            }
            
            mediaDiv.appendChild(videoEl);
        }

        if (section.content?.advertisement) {
            const ad = section.content.advertisement;
            const adEl = document.createElement('div');
            adEl.className = 'ad-space';
            
            const adContent = document.createElement('div');
            adContent.className = 'ad-placeholder';
            adContent.innerHTML = ad.content || 'Advertisement Space';
            
            if (ad.url) {
                adEl.addEventListener('click', () => {
                    window.open(ad.url, '_blank');
                });
                adEl.style.cursor = 'pointer';
            }
            
            adEl.appendChild(adContent);
            mediaDiv.appendChild(adEl);
        }

        return mediaDiv;
    }

    static renderActionsSection(section) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'nav-actions';

        if (section.actions && section.actions.length > 0) {
            section.actions.forEach(action => {
                const actionEl = document.createElement('div');
                actionEl.className = 'action-link';
                actionEl.setAttribute('data-action', action.action);
                
                if (action.callback) {
                    actionEl.setAttribute('data-callback', action.callback);
                }
                
                if (action.url) {
                    actionEl.addEventListener('click', () => {
                        window.open(action.url, action.target || '_self');
                    });
                }

                if (action.icon) {
                    const icon = document.createElement('span');
                    icon.className = 'action-icon';
                    icon.textContent = action.icon;
                    actionEl.appendChild(icon);
                }

                const text = document.createElement('span');
                text.textContent = action.text;
                actionEl.appendChild(text);

                actionsDiv.appendChild(actionEl);
            });
        }

        return actionsDiv;
    }

    static renderCustomSection(section) {
        const customDiv = document.createElement('div');
        customDiv.className = 'custom-content';
        
        if (section.content) {
            if (typeof section.content === 'string') {
                customDiv.innerHTML = section.content;
            } else {
                customDiv.textContent = 'Custom section type not implemented';
            }
        }
        
        return customDiv;
    }

    // Origami Grid Layout Renderer
    static renderOrigamiLayout(sections, config) {
        const origamiContainer = document.createElement('div');
        origamiContainer.className = 'nav-content origami-mode';
        origamiContainer.id = 'navContent';

        // Apply dimensions if specified
        const dimensions = config.widget?.dimensions;
        if (dimensions) {
            if (dimensions.defaultWidth) {
                origamiContainer.style.width = `${Math.max(dimensions.defaultWidth, 500)}px`;
            }
            if (dimensions.maxHeight) {
                origamiContainer.style.maxHeight = dimensions.maxHeight;
            }
        }

        // Search Bar (includes close button)
        const searchBar = this.renderSearchBar();
        origamiContainer.appendChild(searchBar);

        // Navigation Panel (Left)
        const navPanel = this.renderOrigamiNavPanel(sections);
        origamiContainer.appendChild(navPanel);

        // Context Panel (Right)
        const contextPanel = this.renderOrigamiContextPanel();
        origamiContainer.appendChild(contextPanel);

        // Status Messages
        const statusBar = this.renderStatusMessages();
        origamiContainer.appendChild(statusBar);

        return origamiContainer;
    }

    static renderOrigamiHeader(config) {
        const header = document.createElement('div');
        header.className = 'origami-header';

        const title = document.createElement('div');
        title.className = 'nav-title';

        const h2 = document.createElement('h2');
        h2.textContent = config.widget?.title || 'Smart Navigation';

        const controls = document.createElement('div');
        controls.className = 'nav-controls';

        // Control buttons - only close button needed
        if (config.customization?.showControls) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'control-btn close-btn';
            closeBtn.id = 'closeBtn';
            closeBtn.title = 'Close';
            closeBtn.textContent = '×';
            controls.appendChild(closeBtn);
        }

        title.appendChild(h2);
        title.appendChild(controls);
        header.appendChild(title);

        return header;
    }

    static renderOrigamiNavPanel(sections) {
        const navPanel = document.createElement('div');
        navPanel.className = 'origami-nav-panel';

        // Group sections by type for better organization
        const navigationLinks = [];
        const interactiveItems = [];
        const quickActions = [];

        sections.forEach(section => {
            switch (section.type) {
                case 'links':
                    if (section.links) {
                        section.links.forEach(link => {
                            navigationLinks.push({
                                ...link,
                                action: 'navigate',
                                sectionId: section.id
                            });
                        });
                    }
                    break;
                case 'chat':
                case 'tools':
                case 'media':
                    interactiveItems.push({
                        icon: this.getSectionIcon(section),
                        text: section.title.replace(/[^\w\s]/g, '').trim(),
                        action: 'loadContext',
                        sectionId: section.id,
                        type: section.type
                    });
                    break;
                case 'actions':
                    if (section.actions) {
                        section.actions.forEach(action => {
                            quickActions.push({
                                ...action,
                                sectionId: section.id
                            });
                        });
                    }
                    break;
            }
        });

        // Render navigation links
        if (navigationLinks.length > 0) {
            const navSection = this.renderNavPanelSection('Navigation', navigationLinks);
            navPanel.appendChild(navSection);
        }

        // Render interactive items
        if (interactiveItems.length > 0) {
            const interactiveSection = this.renderNavPanelSection('Features', interactiveItems);
            navPanel.appendChild(interactiveSection);
        }

        // Render quick actions
        if (quickActions.length > 0) {
            const actionsSection = this.renderNavPanelSection('Quick Actions', quickActions);
            navPanel.appendChild(actionsSection);
        }

        return navPanel;
    }

    static renderNavPanelSection(title, items) {
        const section = document.createElement('div');
        section.className = 'nav-panel-section';

        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'nav-panel-title';
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);

        items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'nav-panel-item';
            itemEl.setAttribute('data-action', item.action);
            itemEl.setAttribute('data-section-id', item.sectionId);
            
            if (item.url) itemEl.setAttribute('data-url', item.url);
            if (item.type) itemEl.setAttribute('data-type', item.type);
            if (item.callback) itemEl.setAttribute('data-callback', item.callback);

            const icon = document.createElement('span');
            icon.className = 'nav-panel-icon';
            icon.textContent = item.icon || '•';

            const text = document.createElement('span');
            text.textContent = item.text;

            itemEl.appendChild(icon);
            itemEl.appendChild(text);
            section.appendChild(itemEl);
        });

        return section;
    }

    static renderOrigamiContextPanel() {
        const contextPanel = document.createElement('div');
        contextPanel.className = 'origami-context-panel';

        const contextContent = document.createElement('div');
        contextContent.className = 'context-content';

        const contextHeader = document.createElement('div');
        contextHeader.className = 'context-header';

        const contextTitle = document.createElement('h3');
        contextTitle.className = 'context-title';
        contextTitle.textContent = 'Welcome';

        const collapseBtn = document.createElement('button');
        collapseBtn.className = 'context-collapse-btn';
        collapseBtn.id = 'contextCollapseBtn';
        collapseBtn.title = 'Collapse Panel';
        collapseBtn.textContent = '→';

        contextHeader.appendChild(contextTitle);
        contextHeader.appendChild(collapseBtn);

        const contextBody = document.createElement('div');
        contextBody.className = 'context-body';
        contextBody.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: rgba(255, 255, 255, 0.7);">
                <div style="font-size: 48px; margin-bottom: 20px;">👋</div>
                <h4 style="margin: 0 0 10px 0; color: white;">Welcome to Smart Assistant</h4>
                <p style="margin: 0; font-size: 0.9rem;">Select an item from the left panel to get started</p>
            </div>
        `;

        contextContent.appendChild(contextHeader);
        contextContent.appendChild(contextBody);
        contextPanel.appendChild(contextContent);

        return contextPanel;
    }

    static renderSearchBar() {
        const searchBar = document.createElement('div');
        searchBar.className = 'search-bar origami-search-bar';

        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-input-container';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search navigation...';
        searchInput.id = 'navSearchInput';

        const searchIcon = document.createElement('span');
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = '🔍';

        const clearBtn = document.createElement('button');
        clearBtn.className = 'search-clear-btn';
        clearBtn.innerHTML = '×';
        clearBtn.title = 'Clear search';

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(clearBtn);
        searchContainer.appendChild(searchIcon);

        // Add close button to search bar
        const closeBtn = document.createElement('button');
        closeBtn.className = 'search-close-btn';
        closeBtn.id = 'closeBtn';
        closeBtn.innerHTML = '×';
        closeBtn.title = 'Close';

        searchBar.appendChild(searchContainer);
        searchBar.appendChild(closeBtn);

        return searchBar;
    }

    static renderStatusMessages() {
        const statusBar = document.createElement('div');
        statusBar.className = 'status-messages origami-status-bar';

        const statusMessage = document.createElement('div');
        statusMessage.className = 'status-message';
        statusMessage.id = 'navStatusMessage';
        statusMessage.textContent = 'Ready';

        statusBar.appendChild(statusMessage);

        return statusBar;
    }

    static renderOrigamiFooter(config) {
        const footer = document.createElement('div');
        footer.className = 'origami-footer';

        // Default social links - can be customized via config
        const socialLinks = config.socialLinks || [
            { icon: '🐦', url: 'https://twitter.com', title: 'Twitter' },
            { icon: '📧', url: 'mailto:hello@example.com', title: 'Email' }
        ];

        socialLinks.forEach(link => {
            const socialLink = document.createElement('a');
            socialLink.className = 'social-link';
            socialLink.href = link.url;
            socialLink.target = '_blank';
            socialLink.title = link.title;
            socialLink.textContent = link.icon;
            footer.appendChild(socialLink);
        });

        return footer;
    }

    static getSectionIcon(section) {
        const iconMap = {
            'chat': '💬',
            'tools': '🔧',
            'media': '🎬',
            'actions': '⚡',
            'links': '🔗'
        };
        
        // Try to extract emoji from title first
        const emojiMatch = section.title.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
        if (emojiMatch) {
            return emojiMatch[0];
        }
        
        return iconMap[section.type] || '📄';
    }
} 

    // ============================================================================= 
    // WIDGET MODULE
    // ============================================================================= 
/**
 * Smart Navigation Widget - Core Widget Class
 * Main widget class that orchestrates all the components
 */


class SmartNavWidget {
    constructor(containerId = 'navWidget', configPath = 'config.json') {
        this.containerId = containerId;
        this.container = null;
        this.configManager = new ConfigManager(configPath);
        this.stateManager = new StateManager(containerId);
        this.chatManagers = [];
        
        // State
        this.isExpanded = false;
        this.isAnimating = false;
        this.isMinimized = false;
        this.isSticky = false;
        this.position = null; // Will be set from config or state
        
        // Configuration
        this.config = null;
    }

    async init(customConfig = null) {
        try {
            // Load configuration
            this.config = await this.configManager.loadConfig(customConfig);
            this.configManager.validate();
            
            // Create container and build widget
            this.createContainer();
            await this.build();
            
            // Setup interactions and apply settings
            this.setupEventListeners();
            this.applySmartPositioning();
            this.applyTheme();
            this.initDefaultState();
            
            // Load saved state
            this.loadState();
            
            console.log('🚀 Smart Navigation Widget initialized successfully');
            
        } catch (error) {
            console.error('❌ Widget initialization failed:', error);
            throw error;
        }
    }

    createContainer() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = this.containerId;
            document.body.appendChild(this.container);
        }
        this.container.className = 'nav-widget';
    }

    async build() {
        this.container.innerHTML = '';
        
        // Create cube
        const cube = this.createCube();
        this.container.appendChild(cube);
        
        // Create navigation content
        const navContent = await this.createNavContent();
        this.container.appendChild(navContent);
    }

    createCube() {
        const cubeContainer = document.createElement('div');
        cubeContainer.className = 'cube-container';
        cubeContainer.id = 'cubeContainer';

        const cube = document.createElement('div');
        cube.className = 'cube';

        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        faces.forEach(face => {
            const faceDiv = document.createElement('div');
            faceDiv.className = `cube-face cube-face-${face}`;
            faceDiv.textContent = this.config.cube?.icon || '⊞';
            cube.appendChild(faceDiv);
        });

        cubeContainer.appendChild(cube);
        return cubeContainer;
    }

    async createNavContent() {
        // Use the new origami layout by default
        const navContent = SectionRenderer.renderOrigamiLayout(this.config.sections, this.config);
        
        // Store reference to context panel for interactions
        this.contextPanel = navContent.querySelector('.origami-context-panel');
        this.contextTitle = navContent.querySelector('.context-title');
        this.contextBody = navContent.querySelector('.context-body');
        
        return navContent;
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'nav-header';

        const title = document.createElement('div');
        title.className = 'nav-title';

        const h2 = document.createElement('h2');
        h2.textContent = this.config.widget?.title || 'Smart Navigation';

        const controls = document.createElement('div');
        controls.className = 'nav-controls';

        // Control buttons - removed sticky/pin functionality
        if (this.config.customization?.showControls) {
            if (this.config.customization?.allowMinimize) {
                const minimizeBtn = document.createElement('button');
                minimizeBtn.className = 'control-btn minimize-btn';
                minimizeBtn.id = 'minimizeBtn';
                minimizeBtn.title = 'Minimize';
                minimizeBtn.textContent = '−';
                controls.appendChild(minimizeBtn);
            }

            const closeBtn = document.createElement('button');
            closeBtn.className = 'control-btn close-btn';
            closeBtn.id = 'closeBtn';
            closeBtn.title = 'Close';
            closeBtn.textContent = '×';
            controls.appendChild(closeBtn);
        }

        title.appendChild(h2);
        title.appendChild(controls);
        header.appendChild(title);

        return header;
    }

    async createSectionsGrid() {
        const grid = document.createElement('div');
        grid.className = 'nav-grid';

        // Render sections
        if (this.config.sections) {
            for (const section of this.config.sections) {
                const sectionElement = SectionRenderer.renderSection(section, this.config);
                grid.appendChild(sectionElement);

                // Initialize chat managers for chat sections
                if (section.type === 'chat') {
                    const chatManager = new ChatManager(section.config, sectionElement);
                    chatManager.init();
                    this.chatManagers.push(chatManager);
                }
            }
        }

        return grid;
    }

    // Smart Positioning System
    applySmartPositioning() {
        if (!this.position) {
            this.position = this.config.widget?.position || 'top-right';
        }
        
        const navContent = this.container.querySelector('.nav-content');
        
        // Remove all position classes from main container
        const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'];
        positions.forEach(pos => {
            this.container.classList.remove(`position-${pos}`);
            if (navContent) {
                navContent.classList.remove(`position-${pos}`);
            }
        });
        
        // Add current position class to main container
        this.container.classList.add(`position-${this.position}`);
        
        // Also add to nav content for content-specific positioning
        if (navContent) {
            navContent.classList.add(`position-${this.position}`);
            
            // Set transform origin for animations
            const transformOrigins = {
                'top-right': 'top right',
                'top-left': 'top left', 
                'bottom-right': 'bottom right',
                'bottom-left': 'bottom left',
                'top-center': 'top center',
                'bottom-center': 'bottom center'
            };
            
            navContent.style.transformOrigin = transformOrigins[this.position];
        }
        
        this.handleMobilePositioning();
    }

    handleMobilePositioning() {
        const isMobile = window.innerWidth <= 768;
        const navContent = this.container.querySelector('.nav-content');
        
        if (isMobile && navContent) {
            navContent.classList.add('mobile-mode');
        } else {
            navContent.classList.remove('mobile-mode');
        }
    }

    // Event System
    setupEventListeners() {
        // Cube click
        const cubeContainer = this.container.querySelector('#cubeContainer');
        if (cubeContainer) {
            cubeContainer.addEventListener('click', (e) => this.handleCubeClick(e));
        }

        // Control buttons
        const closeBtn = this.container.querySelector('#closeBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => this.handleCloseClick(e));
        }

        const minimizeBtn = this.container.querySelector('#minimizeBtn');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => this.handleMinimizeClick(e));
        }

        // Context panel collapse button
        const contextCollapseBtn = this.container.querySelector('#contextCollapseBtn');
        if (contextCollapseBtn) {
            contextCollapseBtn.addEventListener('click', (e) => this.handleContextCollapseClick(e));
        }

        // Navigation panel items
        const navPanelItems = this.container.querySelectorAll('.nav-panel-item');
        navPanelItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavPanelClick(e));
        });

        // Keyboard events
        if (this.config.keyboard?.enabled) {
            document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        }

        // Click outside to close
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Animation end
        const navContent = this.container.querySelector('#navContent');
        if (navContent) {
            navContent.addEventListener('transitionend', () => this.handleAnimationEnd());
        }

        // Window resize for mobile handling
        window.addEventListener('resize', () => this.handleMobilePositioning());
    }

    // Event Handlers
    handleCubeClick(e) {
        e.stopPropagation();
        if (!this.isAnimating) {
            this.expand();
        }
    }

    handleCloseClick(e) {
        e.stopPropagation();
        if (!this.isAnimating) {
            this.collapse();
        }
    }

    handleMinimizeClick(e) {
        e.stopPropagation();
        this.toggleMinimize();
    }

    handleActionClick(e) {
        e.preventDefault();
        const action = e.currentTarget.getAttribute('data-action');
        const callback = e.currentTarget.getAttribute('data-callback');

        if (callback && window[callback]) {
            window[callback](action, e.currentTarget);
        } else {
            this.executeAction(action, e.currentTarget);
        }
    }

    handleKeyDown(e) {
        if (!this.isExpanded) return;

        const shortcuts = this.config.keyboard?.shortcuts;
        if (!shortcuts) return;

        const key = e.key;
        const modifier = e.ctrlKey ? 'Ctrl+' : e.shiftKey ? 'Shift+' : '';
        const keyCombo = modifier + key;

        switch (keyCombo) {
            case shortcuts.toggle:
                if (!this.isAnimating) this.collapse();
                break;
            case shortcuts.sendChatAlt:
                this.sendChatMessage();
                break;
            case shortcuts.toggleSticky:
                this.toggleSticky();
                e.preventDefault();
                break;
        }
    }

    handleOutsideClick(e) {
        if (this.isExpanded && !this.container.contains(e.target) && !this.isAnimating && !this.isSticky) {
            this.collapse();
        }
    }

    handleAnimationEnd() {
        this.isAnimating = false;
        
        if (this.isExpanded) {
            const navContent = this.container.querySelector('.nav-content');
            navContent.style.transform = 'scale(1) rotateX(0deg)';
        }
    }

    // Core Actions
    expand() {
        if (this.isExpanded || this.isAnimating) return;

        this.isAnimating = true;
        this.isExpanded = true;

        this.container.classList.add('expanded');

        if (this.isMinimized) {
            this.isMinimized = false;
            const navContent = this.container.querySelector('.nav-content');
            navContent.classList.remove('minimized');
        }

        // Ensure proper positioning classes are applied
        this.applySmartPositioning();

        if (!this.isSticky && this.config.widget?.behavior?.autoClose) {
            document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        }

        this.trackEvent('open');
        console.log('Smart assistant expanded');
    }

    collapse() {
        if (!this.isExpanded || this.isAnimating) return;

        this.isAnimating = true;
        this.isExpanded = false;
        this.isMinimized = false;

        this.container.classList.remove('expanded');
        const navContent = this.container.querySelector('.nav-content');
        navContent.classList.remove('minimized');

        document.body.style.backgroundColor = '';

        this.trackEvent('close');
        console.log('Smart assistant collapsed');
    }



    toggleSticky() {
        this.isSticky = !this.isSticky;
        const stickyBtn = this.container.querySelector('#stickyBtn');
        const navContent = this.container.querySelector('.nav-content');
        
        if (stickyBtn) {
            stickyBtn.classList.toggle('sticky-active', this.isSticky);
        }

        if (navContent) {
            navContent.classList.toggle('sticky-mode', this.isSticky);
            navContent.classList.toggle(`sticky-${this.position}`, this.isSticky);
        }

        this.trackEvent('sticky');
        this.saveState();
        console.log(this.isSticky ? `Sticky mode enabled at ${this.position}` : 'Sticky mode disabled');
    }

    toggleMinimize() {
        if (!this.isExpanded) return;

        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            // When minimizing, hide the nav content and show the cube
            this.container.classList.remove('expanded');
            const navContent = this.container.querySelector('.nav-content');
            navContent.classList.add('minimized');
            
            // Make sure cube is visible
            const cubeContainer = this.container.querySelector('.cube-container');
            if (cubeContainer) {
                cubeContainer.style.opacity = '1';
                cubeContainer.style.visibility = 'visible';
                cubeContainer.style.transform = 'scale(1)';
            }
        } else {
            // When restoring, show the nav content and hide the cube
            this.container.classList.add('expanded');
            const navContent = this.container.querySelector('.nav-content');
            navContent.classList.remove('minimized');
        }

        this.saveState();
        console.log(this.isMinimized ? 'Minimized to cube' : 'Restored from cube');
    }

    setPosition(newPosition) {
        const validPositions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'];
        
        if (!validPositions.includes(newPosition)) {
            console.warn(`Invalid position: ${newPosition}. Valid positions:`, validPositions);
            return;
        }

        this.position = newPosition;
        this.applySmartPositioning();
        this.saveState();
        console.log(`Position changed to ${this.position}`);
    }

    toggleSection(e) {
        const header = e.currentTarget;
        const section = header.closest('.nav-section');
        const isExpanded = section.classList.contains('expanded');
        const toggleBtn = header.querySelector('.toggle-btn');

        if (isExpanded) {
            section.classList.remove('expanded');
            toggleBtn.textContent = '+';
        } else {
            section.classList.add('expanded');
            toggleBtn.textContent = '−';
        }

        this.saveState();
    }

    executeAction(action, element) {
        switch (action) {
            case 'colorPicker':
                console.log('Color picker tool activated');
                break;
            case 'ruler':
                console.log('Ruler tool activated');
                break;
            case 'inspector':
                console.log('Page inspector activated');
                break;
            case 'responsive':
                console.log('Responsive preview activated');
                break;
            case 'toggleTheme':
                document.body.classList.toggle('dark-mode');
                break;
            default:
                console.log(`Action executed: ${action}`);
        }
    }

    sendChatMessage() {
        const chatInput = this.container.querySelector('#chatInput');
        if (chatInput && this.chatManagers.length > 0) {
            this.chatManagers[0].sendMessage();
        }
    }

    // Theming
    applyTheme() {
        const theme = this.config.widget?.theme;
        if (!theme) return;

        const navContent = this.container.querySelector('.nav-content');
        if (navContent) {
            navContent.style.setProperty('--theme-primary', theme.primary);
            navContent.style.setProperty('--theme-accent', theme.accent);
            navContent.style.setProperty('--theme-text', theme.text);
            navContent.style.setProperty('--theme-border', theme.border);
        }

        if (this.config.customization?.customCSS) {
            const style = document.createElement('style');
            style.textContent = this.config.customization.customCSS;
            document.head.appendChild(style);
        }
    }

    initDefaultState() {
        this.config.sections?.forEach(section => {
            if (section.expanded) {
                const sectionEl = this.container.querySelector(`.nav-${section.id}`);
                if (sectionEl) {
                    sectionEl.classList.add('expanded');
                }
            }
        });
    }

    // Public API
    expandSection(sectionId) {
        const section = this.container.querySelector(`.nav-${sectionId}`);
        if (section && !section.classList.contains('expanded')) {
            section.classList.add('expanded');
            const toggleBtn = section.querySelector('.toggle-btn');
            if (toggleBtn) toggleBtn.textContent = '−';
            this.saveState();
        }
    }

    collapseSection(sectionId) {
        const section = this.container.querySelector(`.nav-${sectionId}`);
        if (section && section.classList.contains('expanded')) {
            section.classList.remove('expanded');
            const toggleBtn = section.querySelector('.toggle-btn');
            if (toggleBtn) toggleBtn.textContent = '+';
            this.saveState();
        }
    }

    toggle() {
        if (this.isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.rebuild();
    }

    async rebuild() {
        await this.build();
        this.setupEventListeners();
        this.applySmartPositioning();
        this.applyTheme();
        this.initDefaultState();
    }

    getPosition() {
        return this.position;
    }

    // State Management
    saveState() {
        if (!this.config.widget?.behavior?.rememberState) return;

        const state = {
            isExpanded: this.isExpanded,
            isSticky: this.isSticky,
            isMinimized: this.isMinimized,
            position: this.position,
            expandedSections: this.getExpandedSections()
        };

        this.stateManager.saveState(state);
    }

    loadState() {
        if (!this.config.widget?.behavior?.rememberState) return;

        const state = this.stateManager.loadState();
        if (!state) return;

        if (state.position) {
            this.position = state.position;
            this.applySmartPositioning();
        }

        if (state.isSticky) {
            this.toggleSticky();
        }

        if (state.expandedSections) {
            state.expandedSections.forEach(sectionId => {
                this.expandSection(sectionId);
            });
        }
    }

    getExpandedSections() {
        const expandedSections = [];
        this.container.querySelectorAll('.nav-section.expanded').forEach(section => {
            const classes = section.className.split(' ');
            const navClass = classes.find(cls => cls.startsWith('nav-'));
            if (navClass) {
                expandedSections.push(navClass.replace('nav-', ''));
            }
        });
        return expandedSections;
    }

    // Analytics
    trackEvent(event) {
        if (!this.config.analytics?.enabled) return;

        const eventData = {
            event,
            timestamp: Date.now(),
            widget: this.containerId
        };

        if (this.config.analytics.callback && typeof window[this.config.analytics.callback] === 'function') {
            window[this.config.analytics.callback](eventData);
        }

        console.log('Widget event:', eventData);
    }

    // Cleanup
    destroy() {
        if (this.container) {
            this.container.remove();
        }
        this.chatManagers = [];
        console.log('Smart Navigation Widget destroyed');
    }

    // New event handlers for origami interactions
    handleNavPanelClick(e) {
        e.stopPropagation();
        
        const item = e.currentTarget;
        const action = item.getAttribute('data-action');
        const sectionId = item.getAttribute('data-section-id');
        const url = item.getAttribute('data-url');
        const type = item.getAttribute('data-type');
        
        // Remove active class from all items
        this.container.querySelectorAll('.nav-panel-item').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        switch (action) {
            case 'navigate':
                // Direct navigation - just open the URL
                if (url) {
                    window.open(url, '_self');
                }
                break;
                
            case 'loadContext':
                // Load content into the right context panel
                this.loadContextContent(sectionId, type);
                break;
                
            default:
                // Handle other actions (callbacks, etc.)
                this.handleActionClick(e);
                break;
        }
    }

    handleContextCollapseClick(e) {
        e.stopPropagation();
        
        const contextPanel = this.container.querySelector('.origami-context-panel');
        const isCollapsed = contextPanel.classList.contains('collapsed');
        
        if (isCollapsed) {
            contextPanel.classList.remove('collapsed');
            e.target.textContent = '→';
            e.target.title = 'Collapse Panel';
        } else {
            contextPanel.classList.add('collapsed');
            e.target.textContent = '←';
            e.target.title = 'Expand Panel';
        }
    }

    loadContextContent(sectionId, type) {
        const section = this.config.sections.find(s => s.id === sectionId);
        if (!section) return;
        
        // Update context panel title
        this.contextTitle.textContent = section.title.replace(/[^\w\s]/g, '').trim();
        
        // Load appropriate content based on section type
        switch (type) {
            case 'chat':
                this.loadChatContext(section);
                break;
            case 'tools':
                this.loadToolsContext(section);
                break;
            case 'media':
                this.loadMediaContext(section);
                break;
            default:
                this.loadDefaultContext(section);
                break;
        }
    }

    loadChatContext(section) {
        this.contextBody.innerHTML = '';
        const chatContainer = SectionRenderer.renderChatSection(section);
        this.contextBody.appendChild(chatContainer);
        
        // Initialize chat manager for this section
        const chatManager = new ChatManager(section.config, this.contextBody);
        chatManager.init();
        this.chatManagers.push(chatManager);
    }

    loadToolsContext(section) {
        this.contextBody.innerHTML = '';
        const toolsContainer = SectionRenderer.renderToolsSection(section);
        this.contextBody.appendChild(toolsContainer);
        
        // Add event listeners for tool interactions
        const toolLinks = this.contextBody.querySelectorAll('.tool-link');
        toolLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleActionClick(e));
        });
    }

    loadMediaContext(section) {
        this.contextBody.innerHTML = '';
        const mediaContainer = SectionRenderer.renderMediaSection(section);
        this.contextBody.appendChild(mediaContainer);
    }

    loadDefaultContext(section) {
        this.contextBody.innerHTML = `
            <div style="padding: 20px; text-align: center; color: rgba(255, 255, 255, 0.7);">
                <div style="font-size: 32px; margin-bottom: 15px;">${SectionRenderer.getSectionIcon(section)}</div>
                <h4 style="margin: 0 0 10px 0; color: white;">${section.title}</h4>
                <p style="margin: 0; font-size: 0.9rem;">This section type is not yet implemented in the context panel.</p>
            </div>
        `;
    }
} 

    // ============================================================================= 
    // FACTORY MODULE
    // ============================================================================= 
/**
 * Widget Factory
 * Handles creation and management of widget instances
 */


class WidgetFactory {
    static instances = new Map();

    static async create(containerId = 'navWidget', configPath = 'config.json') {
        try {
            const widget = new SmartNavWidget(containerId, configPath);
            await widget.init();
            
            // Store instance for management
            this.instances.set(containerId, widget);
            
            return widget;
        } catch (error) {
            console.error(`Failed to create widget ${containerId}:`, error);
            throw error;
        }
    }

    static async createWithConfig(containerId = 'navWidget', config = null) {
        try {
            const widget = new SmartNavWidget(containerId);
            await widget.init(config);
            
            // Store instance for management
            this.instances.set(containerId, widget);
            
            return widget;
        } catch (error) {
            console.error(`Failed to create widget ${containerId}:`, error);
            throw error;
        }
    }

    static async createMultiple(widgets = []) {
        const promises = widgets.map(({ containerId, configPath, config }) => {
            if (config) {
                return this.createWithConfig(containerId, config);
            } else {
                return this.create(containerId, configPath);
            }
        });

        try {
            const results = await Promise.all(promises);
            console.log(`✅ Created ${results.length} widget instances`);
            return results;
        } catch (error) {
            console.error('Failed to create multiple widgets:', error);
            throw error;
        }
    }

    static get(containerId) {
        return this.instances.get(containerId);
    }

    static has(containerId) {
        return this.instances.has(containerId);
    }

    static destroy(containerId) {
        const widget = this.instances.get(containerId);
        if (widget) {
            widget.destroy();
            this.instances.delete(containerId);
            console.log(`🗑️ Widget ${containerId} destroyed`);
            return true;
        }
        return false;
    }

    static destroyAll() {
        const count = this.instances.size;
        this.instances.forEach((widget, containerId) => {
            widget.destroy();
        });
        this.instances.clear();
        console.log(`🗑️ Destroyed ${count} widget instances`);
    }

    static getAll() {
        return Array.from(this.instances.values());
    }

    static getAllIds() {
        return Array.from(this.instances.keys());
    }

    static getCount() {
        return this.instances.size;
    }

    static async recreate(containerId, configPath = null, config = null) {
        // Destroy existing instance
        this.destroy(containerId);
        
        // Create new instance
        if (config) {
            return await this.createWithConfig(containerId, config);
        } else {
            return await this.create(containerId, configPath);
        }
    }

    static async updateAll(newConfig) {
        const promises = Array.from(this.instances.values()).map(widget => {
            return widget.updateConfig(newConfig);
        });

        try {
            await Promise.all(promises);
            console.log(`✅ Updated ${this.instances.size} widget instances`);
        } catch (error) {
            console.error('Failed to update all widgets:', error);
            throw error;
        }
    }

    static getStatistics() {
        return {
            totalInstances: this.instances.size,
            instances: Array.from(this.instances.keys()),
            memoryUsage: this.estimateMemoryUsage()
        };
    }

    static estimateMemoryUsage() {
        // Rough estimation in bytes
        const baseInstanceSize = 50000; // ~50KB per instance
        return this.instances.size * baseInstanceSize;
    }

    static validateContainer(containerId) {
        if (!containerId || typeof containerId !== 'string') {
            throw new Error('Container ID must be a non-empty string');
        }

        if (document.getElementById(containerId) && this.instances.has(containerId)) {
            console.warn(`⚠️ Widget ${containerId} already exists. Consider using recreate() instead.`);
        }

        return true;
    }

    static async createFromTemplate(templateName, containerId, overrides = {}) {
        const templates = {
            minimal: {
                widget: {
                    title: "Menu",
                    position: "top-right",
                    theme: {
                        primary: "rgba(255, 255, 255, 0.95)",
                        accent: "rgba(0, 0, 0, 0.1)",
                        text: "#333",
                        border: "rgba(0, 0, 0, 0.1)"
                    }
                },
                cube: { icon: "☰", size: 50 },
                sections: [
                    {
                        id: "nav",
                        title: "Navigation",
                        type: "links",
                        expanded: true,
                        links: [
                            { icon: "●", text: "Home", url: "/" },
                            { icon: "●", text: "About", url: "/about" },
                            { icon: "●", text: "Contact", url: "/contact" }
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
                    }
                },
                cube: { icon: "💼", size: 65 },
                sections: [
                    {
                        id: "services",
                        title: "🛠️ Our Services",
                        type: "links",
                        expanded: true,
                        links: [
                            { icon: "💻", text: "Consulting", url: "/consulting" },
                            { icon: "📊", text: "Analytics", url: "/analytics" },
                            { icon: "🔧", text: "Support", url: "/support" }
                        ]
                    }
                ]
            }
        };

        const template = templates[templateName];
        if (!template) {
            throw new Error(`Template "${templateName}" not found. Available templates: ${Object.keys(templates).join(', ')}`);
        }

        const config = { ...template, ...overrides };
        return await this.createWithConfig(containerId, config);
    }
} 


    // =============================================================================
    // AUTO-INITIALIZATION AND GLOBAL API
    // =============================================================================
    
    // Auto-initialization for existing users (skip if demo is present)
    document.addEventListener('DOMContentLoaded', async () => {
        const defaultContainer = document.getElementById('navWidget');
        const isDemo = document.querySelector('.demo-controls') || window.DemoControls;
        
        if (defaultContainer && !isDemo) {
            try {
                window.smartNavWidget = await WidgetFactory.create();
                console.log('🚀 Smart Navigation Widget auto-initialized!');
            } catch (error) {
                console.error('Failed to auto-initialize widget:', error);
            }
        }
    });

    // Export to global scope
    window.SmartNavWidget = SmartNavWidget;
    window.WidgetFactory = WidgetFactory;
    window.ConfigManager = ConfigManager;
    window.SectionRenderer = SectionRenderer;
    window.StateManager = StateManager;
    window.ChatManager = ChatManager;

    // Convenience API
    window.SmartNav = {
        init: (containerId = 'navWidget', config = null) => {
            if (config) {
                return WidgetFactory.createWithConfig(containerId, config);
            }
            return WidgetFactory.create(containerId);
        },
        fromTemplate: (templateName, containerId = 'navWidget') => {
            return WidgetFactory.createFromTemplate(templateName, containerId);
        },
        createMultiple: (widgets) => {
            return WidgetFactory.createMultiple(widgets);
        },
        get: (containerId) => {
            return WidgetFactory.get(containerId);
        },
        destroy: (containerId) => {
            return WidgetFactory.destroy(containerId);
        },
        destroyAll: () => {
            return WidgetFactory.destroyAll();
        }
    };

    console.log('🚀 Smart Navigation Widget v2.1.0 loaded');

})();
