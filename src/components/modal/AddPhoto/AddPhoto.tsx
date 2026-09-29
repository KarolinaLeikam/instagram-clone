import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';
import { Button } from '@/components/ui';
import { useCreatePostMutation } from '@/redux/slices/allPosts';
import routes from '@/utils/router';
import { type StoriesModalProps } from '../Stories/StoriesModal';
import styles from './AddPhoto.module.scss';

interface AllModalProps extends StoriesModalProps {
  onFileSelected?: (file: File, previewUrl: string) => void;
}

const AddPhoto = ({
  isOpen,
  onMyClose,
  onFileSelected = undefined,
}: AllModalProps) => {
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // useCreatePostMutation() — хук, который createApi сгенерировал сам,
  // по имени endpoint'а createPost. Возвращает МАССИВ (кортеж) из двух
  // элементов: [функция-триггер, объект со статусом запроса]. Нам тут
  // нужна только сама функция — вызываем её, когда хотим отправить пост.
  const [createPost] = useCreatePostMutation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files?.length) {
      return;
    }

    const file = files[0];

    if (!file) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
  };

  const handleCloseModal = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setSelectedFile(null);
    }
    onMyClose();
  }, [previewUrl, onMyClose]);

  const isProfilePage = location.pathname.includes(routes.profileOwn);
  const isEditPage = location.pathname.includes(routes.edit);

  const fetchPost = useCallback(async () => {
    if (!selectedFile) {
      alert('Сначала выберите фото!');
      return;
    }

    try {
      if (isProfilePage) {
        const formData = new FormData();
        formData.append('images', selectedFile);
        if (caption) {
          formData.append('caption', caption);
        }

        // createPost(...) — вызов триггера. Он не возвращает готовые
        // данные напрямую, а возвращает "thenable"-объект с методом
        // .unwrap(). Без .unwrap() ошибка запроса не попала бы в catch —
        // мутация "проглатывает" ошибку внутрь своего состояния
        // (isError/error), а .unwrap() снова превращает её в обычный
        // reject промиса, поэтому наш try/catch продолжает работать
        // так же, как работал со старым API.createPost(...).
        await createPost(formData).unwrap();

        // Раньше тут стоял allPostsFetch() — ручной перезапрос списка
        // постов. Теперь он не нужен: invalidatesTags: ['Posts'] в
        // самой мутации (allPosts.ts) сам скажет RTK Query "список
        // постов устарел", и все активные useGetPostsByNameQuery сами
        // перезапросят данные — где бы они сейчас ни были на экране.
        handleCloseModal();
      }
      if (isEditPage) {
        if (previewUrl) {
          onFileSelected?.(selectedFile, previewUrl);
        }
        onMyClose();
      }
    } catch (err) {
      // err тут — уже готовая строка (тот самый err.code/FALLBACK_ERROR,
      // который мы посчитали внутри queryFn в allPosts.ts). Отдельный
      // instanceof ApiError тут больше не нужен — вся эта проверка
      // теперь живёт в одном месте (в слайсе), а не размазана по всем
      // компонентам, которые ходят за постами.
      console.error(err);
    }
  }, [
    createPost,
    handleCloseModal,
    onFileSelected,
    onMyClose,
    previewUrl,
    selectedFile,
    isEditPage,
    isProfilePage,
    caption,
  ]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={handleCloseModal}
    >
      <div className={styles.container}>
        <CrossIcon onClick={handleCloseModal} color="black" />
        <div className={styles.btnContainer}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          {!previewUrl && (
            <Button onClick={() => fileInputRef.current?.click()}>
              Выбрать фото с компьютера
            </Button>
          )}
          {previewUrl && (
            <div className={styles.previewContainer}>
              <img
                src={previewUrl}
                alt="preview"
                className={styles.previewImg}
              />
              {isProfilePage && (
                <div>
                  <textarea
                    placeholder="Добавить описание..."
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
              )}
              <Button onClick={fetchPost}>Загрузить фото</Button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default AddPhoto;
