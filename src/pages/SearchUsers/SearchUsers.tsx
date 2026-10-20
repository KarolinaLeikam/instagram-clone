import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchUserQuery } from '@/redux/slices/userInfoSlice';
import useDebounce from '@/hooks/useDebounce';
import routes from '@/utils/router';
import { SearchIcon } from '@/assets/Icons/FooterIcons';
import { CrossIcon } from '@/assets/Icons/GeneralIcons';

import styles from './SearchUsers.module.scss';

const SearchUsers = () => {
  const [searchResult, setSearchResult] = useState('');

  const debouncedValue = useDebounce(searchResult);

  const { data } = useSearchUserQuery(debouncedValue, {
    skip: !debouncedValue,
  });
  // with skip: true RTK Query keeps the last data, so clear it manually
  const userSearch = debouncedValue ? (data ?? []) : [];

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    if (!e.target.value.trim()) {
      setSearchResult('');
      return;
    }
    setSearchResult(e.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <CrossIcon className={styles.clearIcon} />
      <input
        type="text"
        placeholder="Find user"
        className={styles.input}
        onChange={inputHandler}
      />
      <Link to={routes.profileOwn}>Return</Link>
      <div>
        {userSearch.map((u) => (
          <Link to={`${routes.profileOwn}/${u.username}`} key={u.id}>
            <p>{u.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
