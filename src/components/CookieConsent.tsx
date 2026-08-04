'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trackWebsiteEvent } from '@/services/analytics.service';

const COOKIE_CONSENT_KEY = 'cookie_consent_status';
const COOKIE_ANALYTICS_KEY = 'cookie_analytics_enabled';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const consent =
      typeof window !== 'undefined' ? window.localStorage.getItem(COOKIE_CONSENT_KEY) : null;
    const analytics =
      typeof window !== 'undefined' ? window.localStorage.getItem(COOKIE_ANALYTICS_KEY) : null;

    if (!consent || consent === 'dismissed') {
      if (consent !== 'dismissed') {
        setIsVisible(true);
      }
    }

    if (analytics !== null) {
      setAnalyticsEnabled(analytics === 'true');
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    setIsCustomizeOpen(false);
  };

  const getTrackingPayload = (consentType: 'accept_all' | 'custom' | 'essential_only') => ({
    eventType: 'cookie_consent',
    pageUrl: window.location.href,
    pageTitle: document.title,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    metadata: {
      consentType,
      analyticsEnabled:
        consentType === 'accept_all' || (consentType === 'custom' && analyticsEnabled),
    },
  });

  const sendTrackingEvent = async (consentType: 'accept_all' | 'custom' | 'essential_only') => {
    if (consentType === 'essential_only') {
      return;
    }

    try {
      await trackWebsiteEvent(getTrackingPayload(consentType));
    } catch (error) {
      //   console.error('Cookie consent tracking failed', error);
    }
  };

  const handleAcceptAll = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    window.localStorage.setItem(COOKIE_ANALYTICS_KEY, 'true');
    closeBanner();
    void sendTrackingEvent('accept_all');
  };

  const handleEssentialOnly = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    window.localStorage.setItem(COOKIE_ANALYTICS_KEY, 'false');
    closeBanner();
  };

  const handleSavePreferences = () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, 'custom');
    window.localStorage.setItem(COOKIE_ANALYTICS_KEY, String(analyticsEnabled));
    closeBanner();
    if (analyticsEnabled) {
      void sendTrackingEvent('custom');
    }
  };

  const toggleAnalytics = () => {
    setAnalyticsEnabled((current) => !current);
  };

  if (!isVisible && !isCustomizeOpen) {
    return null;
  }

  return (
    <div className="cookie-consent">
      {isCustomizeOpen && (
        <div className="cookie-consent-overlay" onClick={() => setIsCustomizeOpen(false)} />
      )}

      {isCustomizeOpen ? (
        <div
          className="cookie-preferences-panel"
          style={{
            position: 'fixed',
            left: '0',
            right: '0',
            bottom: '0',
            top: 'auto',
            transform: 'none',
            width: '100vw',
            maxWidth: '100vw',
            maxHeight: 'calc(80vh)',
            zIndex: 100000,
          }}
        >
          <div className="cookie-preferences-header">
            <div>
              <p className="cookie-preferences-label">COOKIE PREFERENCES</p>
              <h2>Manage your cookie settings</h2>
            </div>
            <button
              type="button"
              className="cookie-preferences-close"
              onClick={() => setIsCustomizeOpen(false)}
              aria-label="Close cookie preferences"
            >
              ✕
            </button>
          </div>

          <p className="cookie-preferences-description">
            Choose the cookies you want to allow for this website. Essential cookies are always
            active.
          </p>

          <div className="cookie-preferences-grid">
            <div className="cookie-card cookie-card-essential">
              <div className="cookie-card-header">
                <h3>Essential Cookies</h3>
                <span className="cookie-card-pill">Always Active</span>
              </div>
              <p>Required for the website to function properly.</p>
            </div>

            <div className="cookie-card cookie-card-analytics">
              <div className="cookie-card-header">
                <h3>Analytics &amp; Performance Cookies</h3>
                <button
                  type="button"
                  className={`cookie-toggle ${analyticsEnabled ? 'enabled' : ''}`}
                  onClick={toggleAnalytics}
                  aria-pressed={analyticsEnabled}
                >
                  <span className="cookie-toggle-switch" />
                </button>
              </div>
              <p>Help us understand visitor usage and optimize site performance.</p>
            </div>
          </div>

          <div className="cookie-preferences-actions">
            <button
              type="button"
              className="cookie-button cookie-button-link"
              onClick={() => setIsCustomizeOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="cookie-button cookie-button-primary"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>
          </div>
        </div>
      ) : (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <div className="cookie-banner-text">
              <p>
                We use cookies to enhance your browsing experience, personalize your content, and
                understand site performance.
              </p>
              <p>
                Click <strong>Accept all</strong> to agree to cookies that help us deliver better
                content and a smoother browsing experience.
                <br /> View our{' '}
                <Link href="/cookie-policy" className="cookie-policy-link">
                  Cookie Policy
                </Link>{' '}
                to update or disable preferences anytime.
              </p>
            </div>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="cookie-button cookie-button-primary"
                onClick={handleAcceptAll}
              >
                Accept all
              </button>
              <button
                type="button"
                className="cookie-button cookie-button-outline"
                onClick={handleEssentialOnly}
              >
                Essential only
              </button>
              <button
                type="button"
                className="cookie-button cookie-button-customize"
                onClick={() => setIsCustomizeOpen(true)}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
