import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Мокаем реальный useAuth — управляем его ответом сами в каждом тесте.
vi.mock('@/context/AuthContext');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает спиннер, пока идёт загрузка', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: true,
      setUser: vi.fn(),
      logout: vi.fn(),
    });

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
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
      setUser: vi.fn(),
      logout: vi.fn(),
    });

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
      loading: false,
      setUser: vi.fn(),
      logout: vi.fn(),
    });

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
