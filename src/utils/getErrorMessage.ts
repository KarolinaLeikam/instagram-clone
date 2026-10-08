import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const getErrorMessage = (
  error: SerializedError | FetchBaseQueryError
): string => {
  let errorMessage: string;
  if ('status' in error) {
    errorMessage =
      error.status === 'FETCH_ERROR'
        ? 'НЕТ СЕТИ'
        : `Ошибка загрузки (${error.status})`;
  } else {
    errorMessage = error.message ?? 'Что-то пошло не так, попробуйте снова';
  }
  return errorMessage;
};

export default getErrorMessage;
