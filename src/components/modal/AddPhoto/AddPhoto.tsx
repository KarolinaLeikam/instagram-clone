import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';
import { Button } from '@/components/ui';
import { usePosts } from '@/context/GetAllPosts';
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { allPostsFetch } = usePosts();

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

  const fetchPost = useCallback(async () => {
    if (!selectedFile) {
      alert('Сначала выберите фото!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const isProfilePage = location.pathname.includes('/profile');
      const isEditPage = location.pathname.includes('/edit');
      if (isProfilePage) {
        const formData = new FormData();
        formData.append('images', selectedFile);
        formData.append('caption', '');
        const response = await fetch('http://localhost:4000/posts', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Ошибка при загрузке поста');
        }
        const data = await response.json();
        console.log('Успешно загружено:', data);
        allPostsFetch();
        handleCloseModal();
      }
      if (isEditPage) {
        if (previewUrl) {
          onFileSelected?.(selectedFile, previewUrl);
        }
        onMyClose();
      }
    } catch (err) {
      console.error(err);
    }
  }, [
    allPostsFetch,
    handleCloseModal,
    onFileSelected,
    onMyClose,
    previewUrl,
    selectedFile,
    location,
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
              <Button onClick={fetchPost}>Загрузить фото</Button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default AddPhoto;
