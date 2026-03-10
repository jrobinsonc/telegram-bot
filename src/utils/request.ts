export async function jsonRequest<T = any>(method: 'POST' | 'GET', url: string, body?: Record<string, unknown>) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: (method === 'POST' && body !== undefined) ? JSON.stringify(body) : undefined,
  });

  return await response.json() as T
}
