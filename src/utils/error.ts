export type AppErrorType =
  | 'network' // Network/connectivity error (no HTTP status, no response, or fetch failure)
  | 'badExternalServiceData' // The app received a valid response but the data is invalid.
  | 'badExternalServiceResponse'; // The app received an invalid response from an external service

const errorMessages: Record<AppErrorType, string> = {
  network: 'Network error',
  badExternalServiceData: 'Invalid external service data in response',
  badExternalServiceResponse: 'Invalid external service response',
};

const errorStatusCodes: Record<AppErrorType, number> = {
  network: 500,
  badExternalServiceData: 502,
  badExternalServiceResponse: 502,
};

export class AppError extends Error {
  statusCode: number;

  constructor(
    public type: AppErrorType,
    public details?: {
      cause?: unknown;
    },
  ) {
    super(errorMessages[type]);
    this.name = this.constructor.name;
    this.statusCode = errorStatusCodes[type];
  }

  static is(error: unknown): error is AppError {
    return error instanceof AppError;
  }
}
