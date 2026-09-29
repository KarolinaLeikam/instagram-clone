import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useGetPostsByNameQuery } from '@/redux/slices/allPosts';
import Picture from './components/Post/Picture';
import styles from './GridPosts.module.scss';

const GridPosts = () => {
  // Раньше "какой username грузить, если его нет в URL" решалось
  // ВНУТРИ контекста (username || user?.username). Теперь этой магии
  // неоткуда взяться — RTK Query просто берёт то, что ты ему передашь
  // аргументом. Значит дефолт переезжает сюда, в компонент.
  const { username: routeUsername } = useParams();
  const { user } = useAuth();
  const username = routeUsername || user?.username;

  // useGetPostsByNameQuery сам делает запрос при монтировании компонента
  // И сам делает повторный запрос, если username между рендерами
  // поменяется — весь useEffect, который раньше был тут, просто не нужен.
  // { skip: !username } — "не отправляй запрос, пока username не готов"
  // (пока useAuth() ещё грузит пользователя, например).
  const { data: posts = [] } = useGetPostsByNameQuery(username, {
    skip: !username,
  });

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Picture post={post} key={post.id} />
      ))}
    </div>
  );
};
export default GridPosts;
