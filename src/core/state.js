/**
 * Smart Navigation Widget - State Manager
 * Handles saving and loading widget state using localStorage
 */

export class StateManager {
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