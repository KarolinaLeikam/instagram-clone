import { Button } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDeletePostMutation } from '@/redux/slices/postsSlice';
import { type PostType } from '@/types';

import styles from './DeleteModal.module.scss';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  post: PostType;
}

const DeleteModal = ({ isOpen, onCancel, post }: Props) => {
  // const { allPostsFetch } = usePosts();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    if (!user?.username) return;
    try {
      await deletePost(post.id).unwrap();
      // API.deletePost(post.id);
      // allPostsFetch();
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
