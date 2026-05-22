import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export function initGA() {
    if (!GA_MEASUREMENT_ID) {
        console.log('Google Analytics not configured (VITE_GA_MEASUREMENT_ID not set)');
        return;
    }

    // Add gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

// Track page views
export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: location.pathname + location.search,
        });
    }, [location]);
}

// Track custom events
export function trackEvent(action, category, label, value) {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
}

// Game-specific events
export const GameEvents = {
    lobbyCreated: (playerCount) => trackEvent('lobby_created', 'game', 'players', playerCount),
    lobbyJoined: () => trackEvent('lobby_joined', 'game'),
    gameStarted: (playerCount) => trackEvent('game_started', 'game', 'players', playerCount),
    gameEnded: (winner) => trackEvent('game_ended', 'game', 'winner', winner),
    actionPerformed: (action) => trackEvent('action_performed', 'gameplay', action),
};
