import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PostType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/GetAllPosts';
import API from '@/utils/api';
import DeleteModal from './DeleteModal';

// Говорим vitest: "везде, где импортируется этот путь — подставь
// автоматически сгенерированную подделку вместо настоящего модуля".
// Настоящий useAuth ходит за реальным пользователем через API.authMe() —
// в тесте нам это не нужно и не должно работать, мы хотим управлять
// значением user сами.
vi.mock('@/context/AuthContext');
vi.mock('@/context/GetAllPosts');
vi.mock('@/utils/api');

// Минимальный объект PostType — DeleteModal использует только post.id,
// но TypeScript требует все обязательные поля типа.
const mockPost: PostType = {
  id: 'post-1',
  caption: 'test caption',
  createdAt: '2026-01-01',
  author: { id: 'u1', username: 'karolina', name: 'Karolina', avatarUrl: '' },
  images: [],
  likeCount: 0,
  commentCount: 0,
  liked: false,
};

describe('DeleteModal', () => {
  const onCancel = vi.fn();
  const allPostsFetch = vi.fn();

  // beforeEach выполняется перед КАЖДЫМ it. Здесь мы:
  // 1) очищаем счётчики вызовов моков от предыдущего теста
  //    (иначе toHaveBeenCalledTimes(1) во втором тесте увидит вызовы из первого)
  // 2) заново задаём, что должны возвращать useAuth() и usePosts(),
  //    когда их вызовет компонент DeleteModal
  beforeEach(() => {
    vi.clearAllMocks();

    // vi.mocked(...) — это просто подсказка TypeScript'у "здесь мокнутая функция",
    // чтобы дать методы .mockReturnValue и т.п. с проверкой типов.
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: 'u1',
        email: 'a@a.com',
        username: 'karolina',
        name: 'Karolina',
        bio: '',
        avatarUrl: '',
        createdAt: '2026-01-01',
      },
      setUser: vi.fn(),
      loading: false,
      logout: vi.fn(),
    });

    vi.mocked(usePosts).mockReturnValue({
      allPostsFetch,
      posts: [],
    });
  });

  it('клик по Cancel вызывает onCancel и НЕ удаляет пост', async () => {
    const user = userEvent.setup();
    render(<DeleteModal isOpen onCancel={onCancel} post={mockPost} />);

    await user.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(API.deletePost).not.toHaveBeenCalled();
  });

  it('клик по Yes,delete вызывает API.deletePost, allPostsFetch и onCancel', async () => {
    const user = userEvent.setup();
    render(<DeleteModal isOpen onCancel={onCancel} post={mockPost} />);

    await user.click(screen.getByText('Yes,delete'));

    expect(API.deletePost).toHaveBeenCalledWith('post-1');
    expect(allPostsFetch).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
