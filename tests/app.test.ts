import { app } from '../src/app.js';
import { jest } from '@jest/globals';

afterAll(async () => {
  await app.close();
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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return webhook url if successful', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            ok: true,
            result: { url: 'https://example.com/webhook' },
          }),
      } as Response),
    );

    const response = await app.inject({
      method: 'GET',
      url: '/telegram-webhook',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('https://example.com/webhook');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return error if webhook info fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            ok: false,
          }),
      } as Response),
    );

    const response = await app.inject({
      method: 'GET',
      url: '/telegram-webhook',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('error');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
