import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { useForm, type SubmitHandler } from 'react-hook-form';
import routes from '@/utils/router';
import AuthInput from '@/components/common/AuthInput/AuthInput';
import { validationRules } from '@/utils/validation';
import {
  EyeClosedIcon,
  EyeIcon,
  InstagramIcon,
} from '@/assets/Icons/GeneralIcons';

import API from '@/utils/api';
import { ApiError } from '@/utils/classError';
import styles from './Login.module.scss';

interface LoginForm {
  userName: string;
  password: string;
}

const LOGIN_ERRORS: Record<string, string> = {
  'Invalid credentials': 'Неверный логин или пароль',
  'Validation failed': 'Проверьте правильность заполнения полей',
  NETWORK: 'Нет соединения с сервером',
};

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
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
      const response = await API.login(data.userName, data.password);
      localStorage.setItem('token', response.token);
      navigate(routes.feed);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? (LOGIN_ERRORS[err.code] ?? err.code)
          : FALLBACK_ERROR;
      setError('root', { message });
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
            pattern: validationRules.usernameInput,
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
              pattern: validationRules.passwordInput,
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
        {errors.root && (
          <p className={styles.formError}>{errors.root.message}</p>
        )}
        <Button type="submit" className={styles.button}>
          Log in
        </Button>
      </form>
      <div className={styles.layoutText}>
        <p>Dont have an account?</p>

        <Link to={routes.signup} className={styles.link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default Login;
