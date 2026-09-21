import { Button } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import API from '@/utils/api';
import { ApiError } from '@/utils/error/classError';
import { type PostType } from '@/types';
import { usePosts } from '@/context/GetAllPosts';
import styles from './DeleteModal.module.scss';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  post: PostType;
}
const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

const DeleteModal = ({ isOpen, onCancel, post }: Props) => {
  const { allPostsFetch } = usePosts();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();

  const handleDeletePost = async () => {
    if (!user?.username) return;
    try {
      await API.deletePost(post.id);
      allPostsFetch();
      onCancel();
    } catch (err) {
      const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
      console.error(message);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.containerBtn}>
        <Button onClick={handleDeletePost} className={styles.btnDelete}>
          Yes,delete
        </Button>
        <Button onClick={() => onCancel()} className={styles.btnCancel}>
          Cancel
        </Button>
      </div>
    </dialog>
  );
};

export default DeleteModal;
