import { Link } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeClosedIcon } from '@/assets/Icons/GeneralIcons';
import styles from './SignUp.module.scss';
import { useState } from 'react';

interface FormInput {
  mail: string;
  fullName: string;
  userName: string;
  password: string;
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$@?-]).{8,}$/;
const userRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      mail: '',
      fullName: '',
      userName: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {' '}
      <div className={styles.container}>
        {' '}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('mail', {
              required: 'Email обязателен для заполнения',
              pattern: {
                value: emailRegex,
                message: 'Введите корректный адрес (например, user@mail.com)',
              },
            })}
            placeholder="Email"
          />
          {errors.mail && <p>{errors.mail.message}</p>}
          <input
            {...register('fullName', {
              required: 'Fullname обязателен для заполнения',
              minLength: 2,
            })}
            placeholder="Full Name"
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
          <input
            {...register('userName', {
              required: 'userName обязателен для заполнения',
              pattern: {
                value: userRegex,
                message: 'От 3 до 20 символов, латиница и цифры',
              },
            })}
            placeholder="Username"
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <div className={styles.divPassword}>
            {' '}
            <input
              {...register('password', {
                required: 'Password обязателен для заполнения',
                pattern: {
                  value: passwordRegex,
                  message: 'Пароль слишком простой!',
                },
              })}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              className={styles.inputPassword}
            />
            {showPassword ? (
              <EyeClosedIcon
                className={styles.icons}
                onClick={togglePassword}
              />
            ) : (
              <EyeIcon className={styles.icons} onClick={togglePassword} />
            )}
          </div>

          {errors.password && <p>{errors.password.message}</p>}
          <input type="submit" value="Sign up" disabled={!isValid} />
        </form>
        <div>
          <p>Have an account?</p>
          <Link to="/login">Log in.</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
