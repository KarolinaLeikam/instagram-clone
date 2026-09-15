import {
  type UserType,
  type PostType,
  type ContextUserFriend,
  type FollowResponse,
  type UserSearch,
} from '@/types';
import { ApiError } from './classError';

class ApiClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetchApi(
    method: string,
    url: string,
    body?: Record<string, unknown> | FormData,
    requiresAuth = false
  ) {
    let response: Response;

    const headers: Record<string, string> = {};

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        throw new ApiError(401, 'NO_TOKEN', { message: 'Токен отсутствует' });
      }
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
      response = await fetch(`${this.baseURL}/${url}`, options);
    } catch {
      throw new ApiError(0, 'NETWORK');
    }

    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    if (!response.ok) {
      const code = result?.error ?? response.statusText;
      if (response.status === 401) {
        localStorage.removeItem('token');
      }
      throw new ApiError(response.status, code, result);
    }

    return result;
  }

  async login(
    username: string,
    password: string
  ): Promise<{
    token: string;
  }> {
    const response = await this.fetchApi('POST', 'auth/login', {
      login: username,
      password,
    });

    return response as { token: string };
  }

  async signUp(userData: {
    email: string;
    username: string;
    name: string;
    password: string;
  }): Promise<{
    token: string;
  }> {
    const response = await this.fetchApi('POST', 'auth/register', userData);

    return response as { token: string };
  }

  async authMe(): Promise<{ user: UserType }> {
    const response = await this.fetchApi('GET', 'auth/me', undefined, true);

    return response as { user: UserType };
  }

  async createPost(formData: FormData): Promise<PostType> {
    const response = await this.fetchApi('POST', 'posts', formData, true);

    return response as PostType;
  }

  async getGridPosts(username?: string): Promise<PostType[]> {
    const response = await this.fetchApi(
      'GET',
      `users/${username}/posts`,
      undefined,
      true
    );

    return response as PostType[];
  }

  async deletePost(id: string): Promise<void> {
    await this.fetchApi('DELETE', `posts/${id}`, undefined, true);
  }

  async getUsernameInfo(username?: string): Promise<ContextUserFriend> {
    const response = await this.fetchApi(
      'GET',
      `users/${username}`,
      undefined,
      true
    );

    return response as ContextUserFriend;
  }

  async editInfo(formData: FormData): Promise<{ user: UserType }> {
    const response = await this.fetchApi('PATCH', `users/me`, formData, true);

    return response as { user: UserType };
  }

  async followUser(method: string, username?: string): Promise<FollowResponse> {
    const response = await this.fetchApi(
      method,
      `users/${username}/follow`,
      undefined,
      true
    );

    return response as FollowResponse;
  }

  async searchUser(searchResult: string): Promise<UserSearch[]> {
    const response = await this.fetchApi(
      'GET',
      `users/search?q=${encodeURIComponent(searchResult)}`,
      undefined,
      true
    );

    return response as UserSearch[];
  }
}

const API = new ApiClient(import.meta.env.VITE_API_URL);

export default API;
