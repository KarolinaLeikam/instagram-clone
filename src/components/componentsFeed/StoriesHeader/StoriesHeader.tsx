import Avatar from '@/components/generalcomponents/Avatar/Avatar';
import StoryFriend from '../StoryFriend/StoryFriend';
import styles from './StoriesHeader.module.scss';

const StoriesHeader = () => (
  <div className={styles.layout}>
    <div className={styles.avatar}>
      <Avatar size={70} />
      <p>Your story</p>
    </div>
    <StoryFriend />
    <StoryFriend />
    <StoryFriend />
    <StoryFriend />
  </div>
);
export default StoriesHeader;
