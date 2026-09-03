// почитать про классы в ts https://www.youtube.com/watch?v=5KMIGVnzINE&t=170s

import { ApiError } from './classError';

class API {
  private static readonly path = 'http://localhost:4000';

  static async fetchApi(
    method: string,
    url: string,
    body?: Record<string, unknown>,
    token?: string
  ) {
    let response: Response;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      response = await fetch(`${this.path}/${url}`, options);
    } catch {
      throw new ApiError(0, 'NETWORK');
    }

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const code =
        (result as { error?: string } | null)?.error ?? response.statusText;
      throw new ApiError(response.status, code, result);
    }

    return result;
  }

  static async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
  }> {
    const response = await this.fetchApi('POST', 'auth/login', {
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
