import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { useForm, type SubmitHandler } from 'react-hook-form';
import AuthInput from '@/components/common/AuthInput/AuthInput';
import { userRegex, passwordRegex } from '@/utils/validation';
import {
  EyeClosedIcon,
  EyeIcon,
  InstagramIcon,
} from '@/assets/Icons/GeneralIcons';

import styles from './Login.module.scss';

interface LoginForm {
  userName: string;
  password: string;
}

interface LoginForm {
  userName: string;
  password: string;
  age: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (
    data: LoginForm
  ): Promise<void> => {
    try {
      const path = 'http://localhost:4000';
      const body = JSON.stringify({
        login: data.userName,
        password: data.password,
      });

      const response = await fetch(`${path}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!response.ok) {
        throw new Error('Ошибка входа');
      }
      const result = await response.json();

      localStorage.setItem('token', result.token);
      navigate('/main');
    } catch (err) {
      console.error('Ошибка входа:', err);
      alert('Что-то пошло не так, попробуйте снова');
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <InstagramIcon />

      <form className={styles.layoutForm} onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          register={register}
          name="userName"
          rules={{
            pattern: {
              value: userRegex,
              message: 'От 3 до 20 символов, латиница и цифры',
            },
          }}
          placeholder="User Name"
          error={errors.userName}
        />
        <div className={styles.divPassword}>
          {' '}
          <AuthInput
            register={register}
            name="password"
            rules={{
              pattern: {
                value: passwordRegex,
                message: 'Пароль слишком простой!',
              },
            }}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            error={errors.password}
          />
          {showPassword ? (
            <EyeClosedIcon className={styles.icons} onClick={togglePassword} />
          ) : (
            <EyeIcon className={styles.icons} onClick={togglePassword} />
          )}
        </div>
        <Button type="submit" className={styles.button}>
          Log in
        </Button>
      </form>
      <div className={styles.layoutText}>
        <p>Don't have an account?</p>
        <Link to="/signup" className={styles.link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default Login;
