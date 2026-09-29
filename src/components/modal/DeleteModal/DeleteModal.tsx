import { Button } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDeletePostMutation } from '@/redux/slices/allPosts';
import { type PostType } from '@/types';
import styles from './DeleteModal.module.scss';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  post: PostType;
}

const DeleteModal = ({ isOpen, onCancel, post }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();

  const handleDeletePost = async () => {
    if (!user?.username) return;
    try {
      await deletePost(post.id).unwrap();
      // allPostsFetch() тут раньше стоял вручную. Теперь его нет —
      // invalidatesTags: ['Posts'] у deletePost-мутации (allPosts.ts)
      // сам обновит список везде, где он сейчас показан на экране.
      onCancel();
    } catch (err) {
      console.error(err);
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
