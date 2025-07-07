/**
 * Smart Navigation Widget - Chat Manager
 * Handles chat functionality for chat sections
 */

export class ChatManager {
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