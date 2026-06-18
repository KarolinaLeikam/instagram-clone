import { useState } from 'react';
import StoriesModal from '@/components/modal/Stories/StoriesModal';

import Avatar from '@/components/ui/Avatar/Avatar';
import StoryFriend from './components/StoryFriend/StoryFriend';
import styles from './StoriesHeader.module.scss';

const StoriesHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <div className={styles.avatar}>
        <Avatar size={70} />
        <p>Your story</p>
      </div>
      <StoryFriend onClick={() => setIsModalOpen(true)} />
      <StoryFriend />
      <StoryFriend />
      <StoryFriend />
      <StoryFriend />
      <StoriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default StoriesHeader;
