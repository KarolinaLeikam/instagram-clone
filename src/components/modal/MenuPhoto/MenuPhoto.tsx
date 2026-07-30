import { Button } from '@/components/ui';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';
import { useEffect, useRef, useState } from 'react';
import type { PostType } from '@/context/GetAllPosts';
import DeleteModal from '../DeleteModal/DeleteModal';

import styles from './MenuPhoto.module.scss';

interface MenuType {
  isOpen: boolean;
  onMyClose: () => void;
  post: PostType;
}

const MenuPhoto: React.FC<MenuType> = ({ isOpen, onMyClose, post }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsModalOpen(true);
    onMyClose();
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <dialog ref={dialogRef} className={styles.dialog}>
        <CrossIcon onClick={() => onMyClose()} />
        <div className={styles.containerBtn}>
          <Button className={styles.button} onClick={handleClick}>
            Delete post
          </Button>
        </div>
      </dialog>
      <DeleteModal post={post} isOpen={isModalOpen} onCancel={onCancel} />
    </>
  );
};

export default MenuPhoto;
