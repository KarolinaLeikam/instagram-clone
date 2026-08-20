import { useState, useEffect } from 'react';
import { SearchIcon } from '@/assets/Icons/FooterIcons';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';

import styles from './SearchUsers.module.scss';
import { Link } from 'react-router-dom';

interface User {
  id: 'string';
  username: 'string';
  name: 'string';
  avatarUrl: 'string';
}

const SearchUsers = () => {
  const [user, setUser] = useState([]);
  const [searchResult, setSearchResult] = useState('');

  useEffect(() => {
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
    setTimeout(() => {
      fetchSearch();
    }, 300);
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
      <Link to="/profile">Return</Link>
      <div>
        {user.map((u) => (
          <p key={u.id}>{u.name}</p>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
