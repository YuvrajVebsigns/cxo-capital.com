import { API_BASE_URL } from '@/constants/api';

export class ApiError extends Error {
  public statusCode: number;
  public data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * Centralized API fetcher
 * Handles headers, generic JSON parsing, and central error throwing.
 */
export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = true, headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // If credentials are required, we include them so cookies are sent automatically.
  if (requireAuth) {
    config.credentials = 'include';
  }

  const url = `${API_BASE_URL}${endpoint}`;

  // Conditional debug: capture request/response for CXO network endpoint to aid troubleshooting.
  const shouldDebugCxo =
    endpoint.includes('/attendees/cxo-network') || endpoint.includes('cxo-network');
  if (shouldDebugCxo) {
    try {
      // eslint-disable-next-line no-console
      // console.log('apiFetch DEBUG - CXO request ->', url);
      // eslint-disable-next-line no-console
      // console.log('apiFetch DEBUG - request headers:', JSON.stringify(config.headers, null, 2));
      // eslint-disable-next-line no-console
      if ((config as unknown as { body?: unknown }).body) {
        // eslint-disable-next-line no-console
        console.log(
          'apiFetch DEBUG - request body:',
          (config as unknown as { body?: unknown }).body,
        );
      }
    } catch (e) {
      void e;
    }
  }

  try {
    const response = await fetch(url, config);

    // We try to parse the response body, but handle empty bodies
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const responseMessage =
        typeof data === 'string'
          ? data
          : data?.message || data?.error || response.statusText || 'An error occurred';

      if (shouldDebugCxo) {
        try {
          // eslint-disable-next-line no-console
          // console.error('apiFetch DEBUG - CXO response status:', response.status);
          // eslint-disable-next-line no-console
          // console.error('apiFetch DEBUG - CXO response body:', JSON.stringify(data, null, 2));
        } catch (e) {
          void e;
        }
      }

      throw new ApiError(responseMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors or other unexpected errors
    throw new ApiError(error instanceof Error ? error.message : 'Network error', 500);
  }
}
