type HTTP_METHODS = 'POST' | 'GET';

export async function makeRequest<T = any>(method: HTTP_METHODS, url: string, args?: { body?: Record<string, unknown>, headers?: Record<string, string> }): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: args?.headers,
    body: (method === 'POST' && args?.body !== undefined) ? JSON.stringify(args.body) : undefined,
  });

  return await response.json() as T
}

export async function makeJsonRequest<T = any>(method: HTTP_METHODS, url: string, body?: Record<string, unknown>): Promise<T> {
  return makeRequest<T>(method, url, {
    body, headers: {
      'Content-Type': 'application/json',
    },
  });
}
