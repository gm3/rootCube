/**
 * Widget Factory
 * Handles creation and management of widget instances
 */

import { SmartNavWidget } from './widget.js';

export class WidgetFactory {
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