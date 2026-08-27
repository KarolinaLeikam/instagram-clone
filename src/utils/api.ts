// почитать про классы в ts https://www.youtube.com/watch?v=5KMIGVnzINE&t=170s

import { ApiError } from './classError';

class API {
  private static readonly path = 'http://localhost:4000';

  static async fetchApi(
    method: string,
    url: string,
    body: Record<string, unknown>
  ) {
    let response: Response;

    try {
      response = await fetch(`${this.path}/${url}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new ApiError(0, 'NETWORK');
    }

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(response.status, result?.code, result);
    }

    return result;
  }

  static async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
  }> {
    const response = await this.fetchApi('POST', 'auth/api', {
      login: username,
      password,
    });

    return response;
  }

  static async signUp(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    const response = await this.fetchApi('POST', 'auth/register', {
      email,
      login: username,
      password,
    });

    return response;
  }
}

export default API;
