import React, { useEffect, useRef, useState } from 'react';
import { MenuDotsIcon, CrossIcon } from '@/assets/Icons/GeneralIcons';
import FriendFoto from '@/assets/Images/Post.jpg';
import { HeartIcon, PlaneIcon } from '@/assets/Icons/InterectionIcons';
import StoryPicture from '@/assets/Images/StoryPicture.jpg';
import { StatusBar } from '@/components/common';

import styles from './StoriesModal.module.scss';

interface StoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoriesModal = ({ isOpen, onClose }: StoriesModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [key, setKey] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let timerId = undefined;

    if (isOpen) {
      dialog.showModal();
      setKey((prev) => {
        prev + 1;
      });
      timerId = setTimeout(() => {
        onClose();
      }, 14000);
    } else {
      dialog.close();
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className={styles.dialog}>
      <div className={styles.container}>
        <StatusBar />
        <div className={styles.containerStory}>
          <div className={styles.containerHeader}>
            <div className={styles.progressBarBackground}>
              <div key={key} className={styles.progressBarLine}></div>
            </div>
            <div className={styles.layoutHeader}>
              <div className={styles.containerAvatarName}>
                <img className={styles.friendAvatar} src={FriendFoto} alt="" />
                <h3>FriendName</h3>
                <p>57 min</p>
              </div>
              <div className={styles.layoutHeaderIcons}>
                <MenuDotsIcon />
                <CrossIcon onClick={onClose} />
              </div>
            </div>
          </div>
          <img src={StoryPicture} alt="" className={styles.storyPicture} />
        </div>
        <div className={styles.footer}>
          <div className={styles.layoutFooter}>
            <input
              type="text"
              className={styles.input}
              placeholder="Send message..."
            />
            <HeartIcon />
            <PlaneIcon />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default StoriesModal;
