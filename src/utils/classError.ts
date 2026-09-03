export class ApiError extends Error {
  readonly status: number;

  readonly code: string;

  readonly payload?: unknown;

  constructor(status: number, code = 'UNKNOWN', payload?: unknown) {
    super(code);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

export default ApiError;
