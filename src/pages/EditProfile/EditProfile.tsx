import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthMeQuery, useEditInfoMutation } from '@/redux/slices/authSlice';
import { type IFormValues } from '@/types/index';
import routes from '@/utils/router';
import { AngleLeftIcon } from '@/assets/Icons/GeneralIcons';
import AvatarImg from '@/assets/Images/Avatar.svg';
import { StatusBar } from '@/components/common';
import AddPhoto from '@/components/modal/AddPhoto/AddPhoto';
import styles from './EditProfile.module.scss';

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: authMeData } = useAuthMeQuery();
  const user = authMeData?.user;
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

  const [editInfo] = useEditInfoMutation();

  const onSubmit = async (data: IFormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('bio', data.bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      await editInfo(formData);
      navigate(routes.profileOwn);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <StatusBar />
      <div className={styles.layoutHeader}>
        <Link to={routes.profileOwn}>
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
