import styles from './Post.module.scss';
import PostImg from '../../assets/Post.jpg';

const Post = () => {
  return (
    <div className={styles.post}>
      <img className={styles.img} src={PostImg} alt="" />
    </div>
  );
};
export default Post;
