import { Button } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { PostType } from '@/context/GetAllPosts';
import { usePosts } from '@/context/GetAllPosts';
import styles from './DeleteModal.module.scss';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  post: PostType;
}

const DeleteModal = ({ isOpen, onCancel, post }: Props) => {
  const { allPostsFetch } = usePosts();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();

  const handleDeletePost = async () => {
    if (!user?.username) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      allPostsFetch();
      onCancel();
    } catch (err) {
      console.log(err);
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
