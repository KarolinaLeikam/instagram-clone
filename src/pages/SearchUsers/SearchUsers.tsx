import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '@/utils/api';
import { ApiError } from '@/utils/classError';
import { type UserSearch } from '@/types/index';
import routes from '@/utils/router';
import { SearchIcon } from '@/assets/Icons/FooterIcons';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';

import styles from './SearchUsers.module.scss';

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

const SearchUsers = () => {
  const [user, setUser] = useState<UserSearch[]>([]);
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchResult.trim()) {
        setUser([]);
        return;
      }
      const fetchSearch = async () => {
        try {
          const response = await API.searchUser(searchResult);
          setUser(response);
        } catch (err) {
          const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
          console.error(message);
        }
      };
      fetchSearch();
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchResult]);

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
          <Link to={`${routes.profileOwn}${u.username}`} key={u.id}>
            <p>{u.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
