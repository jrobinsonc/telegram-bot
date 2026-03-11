import { AppError } from './error.js';

type HTTP_METHODS = 'POST' | 'GET';

export async function makeRequest<T = unknown>(
  method: HTTP_METHODS,
  url: string,
  args?: { body?: Record<string, unknown>; headers?: Record<string, string> },
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers: args?.headers,
      body:
        method === 'POST' && args?.body !== undefined
          ? JSON.stringify(args.body)
          : undefined,
    });
  } catch (error: unknown) {
    throw new AppError('network', {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new AppError('badExternalServiceResponse', {
      cause: {
        method,
        // TODO: For some reason, someone on Telegram thought it was a good idea
        // to include the token in the URL. So, I don't feel comfortable
        // logging the URL and only logging the host.
        // url,
        host: new URL(url).host,
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      },
    });
  }

  return (await response.json()) as T;
}

export async function makeJsonRequest<T = unknown>(
  method: HTTP_METHODS,
  url: string,
  body?: Record<string, unknown>,
): Promise<T> {
  return makeRequest<T>(method, url, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
