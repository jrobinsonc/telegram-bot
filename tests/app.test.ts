import { app } from '../src/app.js';
import { telegramApi } from '../src/utils/telegram/index.js';
import { env } from '../src/config/env.js';
import { request } from 'undici';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { expect, jest, afterAll, afterEach, it, describe } from '@jest/globals';

const mockAgent = new MockAgent();

setGlobalDispatcher(mockAgent);
mockAgent.disableNetConnect();

const telegramMockPool = mockAgent.get('https://api.telegram.org');

afterAll(async () => {
  await app.close();
});

// const mockRequest: jest.Mock<typeof request> = jest.fn();
// const mockRequest: jest.Mock<any> = jest.fn();

// jest.mock('undici', () => ({
//   // ...jest.requireActual('undici'),
//   request: jest.fn(),
// }));

afterEach(() => {
  jest.restoreAllMocks();
});

// describe('GET /', () => {
//   it('should return hello message', async () => {
//     const response = await app.inject({
//       method: 'GET',
//       url: '/',
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toBe('hello 👋🏻');
//   });
// });

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
    // expect(telegramApi.getWebhookInfo).toHaveBeenCalledTimes(1);
  });

  // it('should return error if webhook info fails', async () => {
  //   jest.spyOn(telegramApi, 'getWebhookInfo').mockResolvedValueOnce({
  //     ok: false,
  //     description: 'Webhook info failed',
  //     error_code: 400,
  //   });

  //   const response = await app.inject({
  //     method: 'GET',
  //     url: '/telegram-webhook',
  //   });

  //   expect(response.statusCode).toBe(502);
  //   expect(response.json()).toEqual({
  //     error: 'Invalid external service data in response',
  //   });
  //   expect(telegramApi.getWebhookInfo).toHaveBeenCalledTimes(1);
  // });
});
