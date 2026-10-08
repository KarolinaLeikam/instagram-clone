import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PostType } from '@/types';
import { useAuthMeQuery } from '@/redux/slices/authSlice';
import { useDeletePostMutation } from '@/redux/slices/postsSlice';
import DeleteModal from './DeleteModal';

// Говорим vitest: "везде, где импортируется этот путь — подставь
// автоматически сгенерированную подделку вместо настоящего модуля".
// useAuthMeQuery теперь RTK Query хук (authSlice.ts), не контекст —
// мокаем модуль целиком, тогда реального похода в Redux-стор не
// происходит, и <Provider store={...}> в рендере теста не нужен.
vi.mock('@/redux/slices/authSlice');
vi.mock('@/redux/slices/postsSlice');

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

  // Настоящий useDeletePostMutation() возвращает КОРТЕЖ [trigger, meta].
  // deletePostTrigger — подделка самой trigger-функции.
  const deletePostTrigger = vi.fn();

  // beforeEach выполняется перед КАЖДЫМ it. Здесь мы:
  // 1) очищаем счётчики вызовов моков от предыдущего теста
  //    (иначе toHaveBeenCalledTimes(1) во втором тесте увидит вызовы из первого)
  // 2) заново задаём, что должны возвращать useAuthMeQuery() и useDeletePostMutation(),
  //    когда их вызовет компонент DeleteModal
  beforeEach(() => {
    vi.clearAllMocks();

    // Реальный authMe-эндпоинт возвращает { user: UserType } — то есть
    // data у хука выглядит как { user: {...} }, НЕ как плоский {...}.
    // Мокаем именно эту форму, а не ту, что ожидает компонент — если
    // компонент читает её неправильно, тест должен упасть и показать это.
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
    } as unknown as ReturnType<typeof useAuthMeQuery>);

    // Компонент делает: await deletePost(post.id).unwrap()
    // Значит вызов deletePostTrigger(...) должен вернуть объект
    // с методом .unwrap(), который резолвится успешно.
    deletePostTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });

    // Реальный тип второго элемента кортежа — большой сгенерированный
    // RTK Query тип, который компоненту не нужен (деструктурируется
    // только первый элемент). Поэтому не пытаемся честно воссоздать
    // весь тип — один точечный каст через unknown, а не any (any в
    // проекте запрещён линтером).
    vi.mocked(useDeletePostMutation).mockReturnValue([
      deletePostTrigger,
    ] as unknown as ReturnType<typeof useDeletePostMutation>);
  });

  it('клик по Cancel вызывает onCancel и НЕ удаляет пост', async () => {
    const user = userEvent.setup();
    render(<DeleteModal isOpen onCancel={onCancel} post={mockPost} />);

    await user.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(deletePostTrigger).not.toHaveBeenCalled();
  });

  it('клик по Yes,delete вызывает deletePost и onCancel', async () => {
    const user = userEvent.setup();
    render(<DeleteModal isOpen onCancel={onCancel} post={mockPost} />);

    await user.click(screen.getByText('Yes,delete'));

    expect(deletePostTrigger).toHaveBeenCalledWith('post-1');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
