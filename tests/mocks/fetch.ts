import { jest } from '@jest/globals';

export const mockFetchResponse = (payload: unknown, ok = true) => {
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(payload),
    } as Response),
  );
};
