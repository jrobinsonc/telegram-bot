import { request, type Dispatcher } from 'undici';
import { AppError } from './error.js';

type HTTP_METHODS = 'POST' | 'GET';

export async function makeRequest<TData = unknown>(
  method: HTTP_METHODS,
  url: string,
  args?: { body?: Record<string, unknown>; headers?: Record<string, string> },
): Promise<TData> {
  let response: Dispatcher.ResponseData;

  try {
    response = await request(url, {
      method,
      headers: args?.headers,
      body:
        method === 'POST' && args?.body !== undefined
          ? JSON.stringify(args.body)
          : null,
    });
  } catch (error: unknown) {
    throw new AppError('network', {
      cause: error,
    });
  }

  if (response.statusCode < 200 || response.statusCode > 299) {
    throw new AppError('badExternalServiceResponse', {
      cause: {
        method,
        // TODO: For some reason, someone on Telegram thought it was a good idea
        // to include the token in the URL. So, I don't feel comfortable
        // logging the URL and only logging the host.
        // url,
        host: new URL(url).host,
        status: response.statusCode,
        statusText: response.statusText,
        body: await response.body.text(),
      },
    });
  }

  return (await response.body.json()) as TData;
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
