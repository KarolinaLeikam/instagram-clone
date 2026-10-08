import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { useForm, type SubmitHandler } from 'react-hook-form';
import getErrorMessage from '@/utils/getErrorMessage';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useLoginMutation } from '@/redux/slices/authSlice';
import routes from '@/utils/router';
import AuthInput from '@/components/common/AuthInput/AuthInput';
import { validationRules } from '@/utils/validation/validation';
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

const LOGIN_ERRORS: Record<string, string> = {
  'Invalid credentials': 'Неверный логин или пароль',
  'Validation failed': 'Проверьте правильность заполнения полей',
};

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

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginForm> = async (
    data: LoginForm
  ): Promise<void> => {
    try {
      const response = await login({
        login: data.userName,
        password: data.password,
      }).unwrap();
      localStorage.setItem('token', response.token);
      navigate(routes.feed);
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;

      const backendCode =
        'status' in err &&
        err.data &&
        typeof err.data === 'object' &&
        'error' in err.data
          ? (err.data as { error?: string }).error
          : undefined;

      const message =
        (backendCode && LOGIN_ERRORS[backendCode]) ?? getErrorMessage(err);

      setError('root', { type: 'custom', message });
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
