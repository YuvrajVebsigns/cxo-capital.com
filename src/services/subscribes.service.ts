import { API_ENDPOINTS } from '@/constants/api';
import { apiFetch } from '@/services/apiFetch';
import { WebsiteAuth, getWebsiteDomain, readStoredWebsiteAuth } from '@/lib/website-auth';

type WebsiteTokenResponse = {
  token?: string;
  websiteId?: string;
  id?: string;
  website?: {
    id?: string;
    token?: string;
  };
  data?: {
    token?: string;
    websiteId?: string;
    id?: string;
    website?: {
      id?: string;
      token?: string;
    };
    data?: {
      token?: string;
      websiteId?: string;
      id?: string;
      website?: {
        id?: string;
        token?: string;
      };
    };
  };
};

export type SubscribePayload = {
  email: string;
};

type SubscribeResponse = {
  success?: boolean;
  message?: string;
  data?: {
    email?: string;
    subscribedAt?: string;
    isVerified?: boolean;
    id?: string;
  };
};

function extractWebsiteToken(response: WebsiteTokenResponse): string | null {
  return (
    response.token ??
    response.data?.token ??
    response.data?.data?.token ??
    response.data?.website?.token ??
    response.data?.data?.website?.token ??
    response.website?.token ??
    null
  );
}

function extractWebsiteId(response: WebsiteTokenResponse): string | null {
  return (
    response.websiteId ??
    response.website?.id ??
    response.data?.website?.id ??
    response.data?.websiteId ??
    response.data?.data?.websiteId ??
    response.data?.data?.website?.id ??
    response.data?.data?.id ??
    response.data?.id ??
    response.id ??
    null
  );
}

async function ensureWebsiteAuth(domain: string) {
  if (typeof window === 'undefined') return null;

  const stored = readStoredWebsiteAuth();
  if (stored) return stored;

  const tokenRes = await apiFetch<WebsiteTokenResponse>(
    `/api/v1/website/token?domain=${encodeURIComponent(domain)}`,
    {
      method: 'POST',
      requireAuth: false,
      headers: {
        'Content-Type': 'application/json',
        'x-website-domain': domain,
      },
      body: JSON.stringify({ domain }),
    },
  );

  const token = extractWebsiteToken(tokenRes);
  const websiteId = extractWebsiteId(tokenRes);

  if (token && websiteId) {
    const value: WebsiteAuth = { token, websiteId };
    window.localStorage.setItem('websiteAuth', JSON.stringify(value));
    return value;
  }

  return null;
}

function getApiErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const statusCode = (error as { statusCode?: unknown }).statusCode;
    return typeof statusCode === 'number' ? statusCode : Number(statusCode);
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;
    return typeof status === 'number' ? status : Number(status);
  }

  return undefined;
}

export async function submitWebsiteSubscribe(payload: SubscribePayload) {
  const domain = getWebsiteDomain();
  const auth = await ensureWebsiteAuth(domain);

  const headers: Record<string, string> = {};
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.websiteId) headers['x-website-id'] = auth.websiteId;

  try {
    const response = await apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
      method: 'POST',
      requireAuth: false,
      headers,
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('websiteAuth');

      const freshAuth = await ensureWebsiteAuth(domain);

      if (freshAuth?.token) {
        const retryHeaders: Record<string, string> = {
          Authorization: `Bearer ${freshAuth.token}`,
          'x-website-id': freshAuth.websiteId,
        };

        return apiFetch<SubscribeResponse>(API_ENDPOINTS.WEBSITE.SUBSCRIBES, {
          method: 'POST',
          requireAuth: false,
          headers: retryHeaders,
          body: JSON.stringify(payload),
        });
      }
    }

    throw error;
  }
}
