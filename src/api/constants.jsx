// Backend URL - set via environment variable or use default
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// WebSocket URL - set via environment variable or derive from BACKEND_URL
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 
    BACKEND_URL.replace(/^http/, 'ws') + '/ws';

export { BACKEND_URL, WEBSOCKET_URL };