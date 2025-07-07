/**
 * Section Renderer
 * Handles rendering of different section types (chat, links, tools, media, actions)
 */

export class SectionRenderer {
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