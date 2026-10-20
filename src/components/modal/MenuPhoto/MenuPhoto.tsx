import { Button } from '@/components/ui';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';
import { useRef, useState } from 'react';
import { type PostType } from '@/types';
import useClickOutside from '@/hooks/useClickOutside';
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

  useClickOutside({ dialogRef, isOpen });

  // clicks on ::backdrop target the <dialog> itself,
  // clicks on the content target .content or its children
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onMyClose();
    }
  };

  const handleClick = () => {
    setIsModalOpen(true);
    onMyClose();
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* backdrop click is a mouse shortcut; keyboard users close with Esc */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={handleBackdropClick}
      >
        <div className={styles.content}>
          <CrossIcon onClick={() => onMyClose()} />
          <div className={styles.containerBtn}>
            <Button className={styles.button} onClick={handleClick}>
              Delete post
            </Button>
          </div>
        </div>
      </dialog>
      <DeleteModal post={post} isOpen={isModalOpen} onCancel={onCancel} />
    </>
  );
};

export default MenuPhoto;
