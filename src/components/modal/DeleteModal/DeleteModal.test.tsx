import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PostType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useDeletePostMutation } from '@/redux/slices/allPosts';
import DeleteModal from './DeleteModal';

// Говорим vitest: "везде, где импортируется этот путь — подставь
// автоматически сгенерированную подделку вместо настоящего модуля".
// Настоящий useAuth ходит за реальным пользователем через API.authMe() —
// в тесте нам это не нужно и не должно работать, мы хотим управлять
// значением user сами.
vi.mock('@/context/AuthContext');
// useDeletePostMutation — это уже не наш собственный контекст, а хук,
// сгенерированный RTK Query. Мокаем его точно так же — весь модуль
// allPosts.ts подменяется, реального похода в Redux-стор не происходит,
// поэтому <Provider store={...}> в рендере теста не нужен.
vi.mock('@/redux/slices/allPosts');

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

  // Настоящий useDeletePostMutation() возвращает КОРТЕЖ [trigger, meta] —
  // trigger при вызове возвращает не сразу данные, а объект с .unwrap()
  // (см. комментарий в DeleteModal.tsx). deletePostTrigger — наша
  // подделка именно этой trigger-функции.
  const deletePostTrigger = vi.fn();

  // beforeEach выполняется перед КАЖДЫМ it. Здесь мы:
  // 1) очищаем счётчики вызовов моков от предыдущего теста
  //    (иначе toHaveBeenCalledTimes(1) во втором тесте увидит вызовы из первого)
  // 2) заново задаём, что должны возвращать useAuth() и useDeletePostMutation(),
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

    // Компонент делает: await deletePost(post.id).unwrap()
    // Значит вызов deletePostTrigger(...) должен вернуть объект
    // с методом .unwrap(), который резолвится успешно.
    deletePostTrigger.mockReturnValue({ unwrap: () => Promise.resolve() });

    // Реальный тип второго элемента кортежа — большой сгенерированный
    // RTK Query тип (isLoading, reset, originalArgs и т.д.). Компоненту
    // он не нужен вообще (деструктурируется только первый элемент),
    // поэтому не пытаемся честно воссоздать весь тип — один точечный
    // каст через unknown, а не через any (any в проекте запрещён линтером).
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
