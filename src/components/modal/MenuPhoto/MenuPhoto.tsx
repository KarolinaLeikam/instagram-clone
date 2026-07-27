import { Button } from '@/components/ui';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';
import React, { useEffect, useRef, useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal';
import styles from './MenuPhoto.module.scss';

const MenuPhoto = ({ isOpen, onMyClose, post }) => {
  const dialogRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      dialog.showModal();
      console.log('hello');
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
