import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import useProfileUsername from '@/hooks/useProfileUsername';
import { useGetUserInfoQuery } from '@/redux/slices/userInfoSlice';
import NameProfile from './NameProfile';

// Компонент больше не ветвится сам на "свой профиль / чужой" — эта логика
// теперь внутри useProfileUsername (чей username показывать) и
// useGetUserInfoQuery (данные по этому username). Мокаем оба хука напрямую,
// а не их внутренности (useParams/useAuth) — так тест не зависит от того,
// как именно useProfileUsername устроен внутри.
vi.mock('@/hooks/useProfileUsername');
vi.mock('@/redux/slices/userInfoSlice');

describe('NameProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает текст загрузки, пока isLoading true', () => {
    vi.mocked(useProfileUsername).mockReturnValue('karolina');
    vi.mocked(useGetUserInfoQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useGetUserInfoQuery>);

    render(<NameProfile />);

    expect(screen.getByText(/Загрузка/)).toBeInTheDocument();
  });

  it('показывает name и bio, когда данные загружены', () => {
    vi.mocked(useProfileUsername).mockReturnValue('zabrodskii');
    vi.mocked(useGetUserInfoQuery).mockReturnValue({
      data: {
        id: 'u2',
        username: 'zabrodskii',
        name: 'Nikita',
        bio: 'hello world',
        avatarUrl: '',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
        isFollowing: false,
        isMe: false,
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useGetUserInfoQuery>);

    render(<NameProfile />);

    expect(screen.getByText('Nikita')).toBeInTheDocument();
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('не делает запрос, если username ещё не известен (skip)', () => {
    vi.mocked(useProfileUsername).mockReturnValue(undefined);
    vi.mocked(useGetUserInfoQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetUserInfoQuery>);

    render(<NameProfile />);

    expect(vi.mocked(useGetUserInfoQuery)).toHaveBeenCalledWith(
      '',
      expect.objectContaining({ skip: true })
    );
  });
});
