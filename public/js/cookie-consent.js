/**
 * Lightweight Cookie Consent Banner for KHCustomWeb
 * Integrates with Google Analytics and Vercel Analytics
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if consent has already been given
    const hasConsent = getCookie('cookie_consent');
    
    if (!hasConsent) {
        // Create and show the cookie banner if consent hasn't been given
        createCookieBanner();
    } else {
        // If consent was previously given, enable analytics
        enableAnalytics(hasConsent === 'true');
    }
    
    /**
     * Creates and displays the cookie consent banner
     */
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <h3>Deze website gebruikt cookies</h3>
                    <p>Wij gebruiken cookies om je ervaring te verbeteren, websiteverkeer te analyseren en gepersonaliseerde advertenties te tonen. 
                    Door op "Accepteren" te klikken, ga je akkoord met ons gebruik van cookies zoals beschreven in ons <a href="/privacy.html">Privacybeleid</a>.</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accepteren</button>
                    <button id="cookie-decline" class="cookie-btn cookie-btn-secondary">Alleen noodzakelijke</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add event listeners to buttons
        document.getElementById('cookie-accept').addEventListener('click', function() {
            setCookie('cookie_consent', 'true', 365);
            enableAnalytics(true);
            hideBanner();
        });
        
        document.getElementById('cookie-decline').addEventListener('click', function() {
            setCookie('cookie_consent', 'false', 365);
            enableAnalytics(false);
            hideBanner();
        });
        
        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('visible');
        }, 500);
    }
    
    /**
     * Hides the cookie banner with animation
     */
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        banner.classList.remove('visible');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (banner && banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 500);
    }
    
    /**
     * Enables or disables analytics based on consent
     */
    function enableAnalytics(hasConsent) {
        // Set Google consent mode
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        
        // Default consent settings
        gtag('consent', 'default', {
            'analytics_storage': hasConsent ? 'granted' : 'denied',
            'ad_storage': hasConsent ? 'granted' : 'denied',
            'functionality_storage': 'granted', // Always allow functional cookies
            'security_storage': 'granted',      // Always allow security cookies
            'personalization_storage': hasConsent ? 'granted' : 'denied',
        });
        
        // Update consent if needed
        if (hasConsent) {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'personalization_storage': 'granted'
            });
        }
    }
    
    /**
     * Gets a cookie value by name
     */
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return undefined;
    }
    
    /**
     * Sets a cookie with name, value and expiration days
     */
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
    }
});