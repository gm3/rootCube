/**
 * Simple Build Script for Smart Navigation Widget
 * Bundles modular source code into a single distribution file
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Building Smart Navigation Widget...');

// Paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const coreDir = path.join(srcDir, 'core');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

/**
 * Read and process a JavaScript file, converting ES6 imports to inline code
 */
function processJSFile(filePath, processedFiles = new Set()) {
    if (processedFiles.has(filePath)) {
        return ''; // Avoid circular dependencies
    }
    processedFiles.add(filePath);

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove import statements and replace with actual code
    const lines = content.split('\n');
    let processedContent = '';
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip import statements - we'll inline the code instead
        if (trimmed.startsWith('import ') && trimmed.includes('from ')) {
            continue;
        }
        
        // Skip export statements at the beginning of lines
        if (trimmed.startsWith('export ')) {
            processedContent += line.replace(/^(\s*)export\s+/, '$1') + '\n';
        } else {
            processedContent += line + '\n';
        }
    }
    
    return processedContent;
}

/**
 * Bundle all core modules into a single file
 */
function bundleJS() {
    console.log('📦 Bundling JavaScript modules...');
    
    // Order matters - dependencies first
    const moduleOrder = [
        'config.js',
        'state.js',
        'chat.js',
        'renderer.js', 
        'widget.js',
        'factory.js'
    ];
    
    let bundledContent = `/**
 * Smart Navigation Widget - Production Bundle
 * Version 2.1.0 - Single file distribution
 * 
 * This file contains all widget functionality bundled for production use.
 * No external dependencies required.
 */

(function() {
    'use strict';

`;

    // Process each module
    const processedFiles = new Set();
    for (const module of moduleOrder) {
        const modulePath = path.join(coreDir, module);
        if (fs.existsSync(modulePath)) {
            console.log(`  📄 Processing ${module}...`);
            const moduleContent = processJSFile(modulePath, processedFiles);
            bundledContent += `    // ============================================================================= \n`;
            bundledContent += `    // ${module.replace('.js', '').toUpperCase()} MODULE\n`;
            bundledContent += `    // ============================================================================= \n`;
            bundledContent += moduleContent + '\n';
        }
    }

    // Add the main initialization code
    bundledContent += `
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
`;

    // Write the bundled file
    const outputPath = path.join(distDir, 'smart-nav-widget.js');
    fs.writeFileSync(outputPath, bundledContent);
    console.log(`✅ JavaScript bundle created: ${outputPath}`);
    
    // Get file size
    const stats = fs.statSync(outputPath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`📊 Bundle size: ${sizeKB}KB`);
}

/**
 * Copy and process CSS files
 */
function bundleCSS() {
    console.log('🎨 Bundling CSS...');
    
    const stylesPath = path.join(__dirname, '../styles.css');
    const outputPath = path.join(distDir, 'smart-nav-widget.css');
    
    if (fs.existsSync(stylesPath)) {
        fs.copyFileSync(stylesPath, outputPath);
        console.log(`✅ CSS bundle created: ${outputPath}`);
        
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`📊 CSS size: ${sizeKB}KB`);
    } else {
        console.log('⚠️  styles.css not found, skipping CSS bundle');
    }
}

/**
 * Copy configuration templates
 */
function copyTemplates() {
    console.log('📋 Copying templates...');
    
    const templatesPath = path.join(__dirname, '../config-templates.json');
    const outputPath = path.join(distDir, 'config-templates.json');
    
    if (fs.existsSync(templatesPath)) {
        fs.copyFileSync(templatesPath, outputPath);
        console.log(`✅ Templates copied: ${outputPath}`);
    } else {
        console.log('⚠️  config-templates.json not found, skipping templates');
    }
}

/**
 * Log completion message
 */
function logCompletion() {
    console.log('📄 Skipping example creation (examples removed)');
}

/**
 * Main build function
 */
function build() {
    try {
        console.log('🚀 Starting build process...\n');
        
        bundleJS();
        bundleCSS();
        copyTemplates();
        logCompletion();
        
        console.log('\n✅ Build completed successfully!');
        console.log('\n📦 Distribution files:');
        console.log('  📄 dist/smart-nav-widget.js');
        console.log('  🎨 dist/smart-nav-widget.css');
        console.log('  📋 dist/config-templates.json');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run the build
build(); 