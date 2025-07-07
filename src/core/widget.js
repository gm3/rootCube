/**
 * Smart Navigation Widget - Core Widget Class
 * Main widget class that orchestrates all the components
 */

import { ConfigManager } from './config.js';
import { SectionRenderer } from './renderer.js';
import { ChatManager } from './chat.js';
import { StateManager } from './state.js';

export class SmartNavWidget {
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