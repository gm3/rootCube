/**
 * Configuration Manager
 * Handles loading, parsing, and validation of widget configurations
 */

export class ConfigManager {
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