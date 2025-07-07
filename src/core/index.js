/**
 * Smart Navigation Widget - Main Entry Point
 * Version 2.1.0 - Refactored for scalability and clean deployment
 * 
 * This is the single entry point for the Smart Navigation Widget.
 * It provides both module exports and global API for maximum compatibility.
 */

import { ConfigManager } from './config.js';
import { SectionRenderer } from './renderer.js';
import { SmartNavWidget } from './widget.js';
import { WidgetFactory } from './factory.js';
import { StateManager } from './state.js';
import { ChatManager } from './chat.js';

// =============================================================================
// Main Widget Class (Re-export for direct usage)
// =============================================================================
export { SmartNavWidget, WidgetFactory, ConfigManager, SectionRenderer, StateManager, ChatManager };

// =============================================================================
// Global API for Browser Usage (Backward Compatibility)
// =============================================================================
if (typeof window !== 'undefined') {
    // Auto-initialization for existing users
    document.addEventListener('DOMContentLoaded', async () => {
        const defaultContainer = document.getElementById('navWidget');
        if (defaultContainer) {
            try {
                window.smartNavWidget = await WidgetFactory.create();
                console.log('🚀 Smart Navigation Widget auto-initialized!');
            } catch (error) {
                console.error('Failed to auto-initialize widget:', error);
            }
        }
    });

    // Export to global scope for backward compatibility
    window.SmartNavWidget = SmartNavWidget;
    window.WidgetFactory = WidgetFactory;
    window.ConfigManager = ConfigManager;
    window.SectionRenderer = SectionRenderer;
    window.StateManager = StateManager;
    window.ChatManager = ChatManager;

    // Convenience methods for common use cases
    window.SmartNav = {
        // Quick initialization
        init: (containerId = 'navWidget', config = null) => {
            if (config) {
                return WidgetFactory.createWithConfig(containerId, config);
            }
            return WidgetFactory.create(containerId);
        },

        // Template-based creation
        fromTemplate: (templateName, containerId = 'navWidget') => {
            return WidgetFactory.createFromTemplate(templateName, containerId);
        },

        // Multi-widget management
        createMultiple: (widgets) => {
            return WidgetFactory.createMultiple(widgets);
        },

        // Get existing widget
        get: (containerId) => {
            return WidgetFactory.get(containerId);
        },

        // Cleanup
        destroy: (containerId) => {
            return WidgetFactory.destroy(containerId);
        },

        destroyAll: () => {
            return WidgetFactory.destroyAll();
        }
    };

    console.log('🚀 Smart Navigation Widget v2.1.0 loaded');
}

// =============================================================================
// Default Export for Module Usage
// =============================================================================
export default {
    SmartNavWidget,
    WidgetFactory,
    ConfigManager,
    SectionRenderer,
    StateManager,
    ChatManager,
    
    // Convenience methods
    init: (containerId = 'navWidget', config = null) => {
        if (config) {
            return WidgetFactory.createWithConfig(containerId, config);
        }
        return WidgetFactory.create(containerId);
    },

    fromTemplate: (templateName, containerId = 'navWidget') => {
        return WidgetFactory.createFromTemplate(templateName, containerId);
    }
}; 