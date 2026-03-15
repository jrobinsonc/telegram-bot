import { afterAll, afterEach, describe, expect, it, jest } from '@jest/globals';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { app } from '../src/app.js';

const mockAgent = new MockAgent();

setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

const telegramMockPool = mockAgent.get('https://api.telegram.org');

afterAll(async () => {
  await app.close();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GET /', () => {
  it('should return hello message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('hello 👋🏻');
  });
});

describe('GET /telegram-webhook', () => {
  it('should return webhook url if successful', async () => {
    telegramMockPool
      .intercept({
        path: /\/getWebhookInfo$/,
        method: 'POST',
      })
      .reply(200, {
        ok: true,
        result: {
          url: 'https://example.com/webhook',
        },
      });

    const response = await app.inject({
      method: 'GET',
      url: '/telegram-webhook',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ data: 'https://example.com/webhook' });
  });

  it('should return error if webhook response is invalid', async () => {
    telegramMockPool
      .intercept({
        path: /\/getWebhookInfo$/,
        method: 'POST',
      })
      .reply(200);

    const response = await app.inject({
      method: 'GET',
      url: '/telegram-webhook',
    });

    expect(response.statusCode).toBe(502);
    expect(response.json()).toEqual({
      error: 'Invalid external service response: Invalid JSON provided.',
    });
  });

  it('should return error if webhook info fails', async () => {
    telegramMockPool
      .intercept({
        path: /\/getWebhookInfo$/,
        method: 'POST',
      })
      .reply(200, {});

    const response = await app.inject({
      method: 'GET',
      url: '/telegram-webhook',
    });

    expect(response.statusCode).toBe(502);
    expect(response.json()).toEqual({
      error: 'Invalid external service data in response',
    });
  });
});
