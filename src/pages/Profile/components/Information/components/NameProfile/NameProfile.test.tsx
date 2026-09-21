import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '@/context/AuthContext';
import { useGetFriend } from '@/context/GetUserInfo';
import { useParams } from 'react-router-dom';
import NameProfile from './NameProfile';

vi.mock('@/context/AuthContext');
vi.mock('@/context/GetUserInfo');

// react-router-dom нужен ещё и настоящим (Link, MemoryRouter и т.д.),
// поэтому мокаем не весь модуль, а только useParams внутри него.
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('NameProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loading true', () => {
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

    vi.mocked(useGetFriend).mockReturnValue({
      userFriend: null,
      setUserFriend: vi.fn(),
      loading: true,
      logout: vi.fn(),
      fetchUserFriend: vi.fn(),
    });
    // username не важен для этого теста (early return сработает раньше),
    // но раз useParams замокан — типы требуют вернуть хоть что-то
    vi.mocked(useParams).mockReturnValue({});

    render(<NameProfile />);

    expect(screen.getByText(/Загрузка/)).toBeInTheDocument();
  });
  it('have userFriend', () => {
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

    vi.mocked(useGetFriend).mockReturnValue({
      userFriend: {
        id: 'u2',
        username: 'Zabrodskii',
        name: 'Nikita',
        bio: '',
        avatarUrl: '',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
        isFollowing: false,
        isMe: false,
      },
      setUserFriend: vi.fn(),
      loading: false,
      logout: vi.fn(),
      fetchUserFriend: vi.fn(),
    });
    // именно это заставляет компонент выбрать ветку userFriend вместо user —
    // без этой строки тест "проходил бы" по ошибке (см. диалог выше)
    vi.mocked(useParams).mockReturnValue({ username: 'Zabrodskii' });

    render(<NameProfile />);

    expect(screen.getByText(/Nikita/)).toBeInTheDocument();
  });
  it('isMe', () => {
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

    vi.mocked(useGetFriend).mockReturnValue({
      userFriend: null,
      setUserFriend: vi.fn(),
      loading: false,
      logout: vi.fn(),
      fetchUserFriend: vi.fn(),
    });

    vi.mocked(useParams).mockReturnValue({});

    render(<NameProfile />);

    expect(screen.getByText(/Karolina/)).toBeInTheDocument();
  });
});
