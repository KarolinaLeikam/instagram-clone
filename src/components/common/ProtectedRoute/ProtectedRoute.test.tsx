import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthMeQuery } from '@/redux/slices/authSlice';
import ProtectedRoute from './ProtectedRoute';

// Мокаем RTK Query хук — управляем его ответом сами в каждом тесте.
vi.mock('@/redux/slices/authSlice');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает спиннер, пока идёт загрузка', () => {
    vi.mocked(useAuthMeQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useAuthMeQuery>);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Spinner.tsx рендерит текст "Loading..."
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // children в момент загрузки рендерить не должны
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });

  it('не показывает children, если загрузка завершена, а user нет (редирект)', () => {
    vi.mocked(useAuthMeQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useAuthMeQuery>);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // <Navigate> ничего не рендерит на экран — просто проверяем,
    // что children тоже не появились
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });

  it('рендерит children, если user есть', () => {
    vi.mocked(useAuthMeQuery).mockReturnValue({
      data: {
        user: {
          id: 'u1',
          email: 'a@a.com',
          username: 'karolina',
          name: 'Karolina',
          bio: '',
          avatarUrl: '',
          createdAt: '2026-01-01',
        },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useAuthMeQuery>);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>secret</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('secret')).toBeInTheDocument();
  });
});
