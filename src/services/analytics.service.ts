import { apiFetch } from '@/services/apiFetch';
import { buildWebsiteAuthHeaders, ensureWebsiteAuth } from '@/lib/website-auth';
import { API_ENDPOINTS } from '@/constants/api';

export type CookieConsentEventPayload = {
  visitorId?: string;
  sessionId?: string;
  eventType: string;
  pageUrl: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  metadata: {
    consentType: 'accept_all' | 'custom' | 'essential_only';
    analyticsEnabled: boolean;
  };
};

const TRACK_ENDPOINT = API_ENDPOINTS.WEBSITE.ANALYTICS.TRACK;
const VISITOR_ID_KEY = 'analyticsVisitorId';
const SESSION_ID_KEY = 'analyticsSessionId';

function createUuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return createUuid();

  let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = createUuid();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return createUuid();

  let sessionId = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = createUuid();
    window.sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export async function trackWebsiteEvent(payload: CookieConsentEventPayload) {
  const auth = await ensureWebsiteAuth();

  const body = {
    visitorId: payload.visitorId ?? getOrCreateVisitorId(),
    sessionId: payload.sessionId ?? getOrCreateSessionId(),
    eventType: payload.eventType,
    pageUrl: payload.pageUrl,
    pageTitle: payload.pageTitle,
    referrer: payload.referrer,
    userAgent: payload.userAgent,
    metadata: payload.metadata,
  };

  return apiFetch<{ success: boolean }>(TRACK_ENDPOINT, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}
