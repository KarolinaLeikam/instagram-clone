import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchUserQuery } from '@/redux/slices/userInfoSlice';
import { type UserSearch } from '@/types/index';
import routes from '@/utils/router';
import { SearchIcon } from '@/assets/Icons/FooterIcons';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';

import styles from './SearchUsers.module.scss';

const SearchUsers = () => {
  const [user, setUser] = useState<UserSearch[]>([]);
  const [searchResult, setSearchResult] = useState('');

  const { data: userSearch = [] } = useSearchUserQuery(searchResult);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchResult.trim()) {
        setUser([]);
        return;
      }
      setUser(userSearch);
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchResult, userSearch]);

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <CrossIcon className={styles.clearIcon} />
      <input
        type="text"
        placeholder="Find user"
        className={styles.input}
        onChange={(e) => {
          setSearchResult(e.target.value);
        }}
      />
      <Link to={routes.profileOwn}>Return</Link>
      <div>
        {user.map((u) => (
          <Link to={`${routes.profileOwn}/${u.username}`} key={u.id}>
            <p>{u.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
