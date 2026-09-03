import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '@/utils/router';
import { SearchIcon } from '@/assets/Icons/FooterIcons';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';

import styles from './SearchUsers.module.scss';


interface User {
  id: 'string';
  username: 'string';
  name: 'string';
  avatarUrl: 'string';
}

const SearchUsers = () => {
  const [user, setUser] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState('');

  console.log(user);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!searchResult.trim()) {
        setUser([]);
        return;
      }
      const fetchSearch = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
          const response = await fetch(
            `http://localhost:4000/users/search?q=${encodeURIComponent(searchResult)}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const result = await response.json();
            setUser(result);
          }
        } catch (err) {
          console.log(err);
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
          <Link to={`${routes.profileOwn}${u.username}`}>
            <p key={u.id}>{u.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
