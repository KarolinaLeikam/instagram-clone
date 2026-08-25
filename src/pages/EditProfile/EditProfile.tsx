import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AngleLeftIcon } from '@/assets/Icons/GeneralIcons';
import AvatarImg from '@/assets/Images/Avatar.jpg';
import { StatusBar } from '@/components/common';
import AddPhoto from '@/components/modal/AddPhoto/AddPhoto';
import styles from './EditProfile.module.scss';

interface IFormValues {
  name: string;
  username: string;
  bio: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      username: user?.username,
      name: user?.name,
      bio: user?.bio,
    },
  });

  const handleAvatarSelected = (file: File, previewUrl: string) => {
    setAvatarFile(file);
    setAvatarPreview(previewUrl);
  };

  const onSubmit = async (data: IFormValues) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('bio', data.bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      const response = await fetch('http://localhost:4000/users/me', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setUser(result.user ?? result);
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <StatusBar />
      <div className={styles.layoutHeader}>
        <Link to="/profile">
          <AngleLeftIcon />
        </Link>
        <p className={styles.text}>Edit profile</p>
      </div>
      <div>
        <img
          className={styles.avatar}
          src={
            avatarPreview ||
            (user?.avatarUrl
              ? `http://localhost:4000${user?.avatarUrl}`
              : AvatarImg)
          }
          alt=""
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={styles.editPhoto}
        >
          Edit photo
        </button>
        <AddPhoto
          isOpen={isModalOpen}
          onMyClose={() => setIsModalOpen(false)}
          onFileSelected={handleAvatarSelected}
        />
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div>
            <label htmlFor="nameInput">
              Name:
              <input id="nameInput" {...register('name')} />
            </label>
          </div>
          <hr />
          <div>
            {' '}
            <label htmlFor="userInput">
              Username:
              <input id="userInput" {...register('username')} />
            </label>
          </div>
          <hr />
          <div>
            {' '}
            <label htmlFor="bioInput">
              Bio:
              <input id="bioInput" {...register('bio')} />
            </label>
          </div>
          <hr />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
