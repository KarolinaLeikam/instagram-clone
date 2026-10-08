import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import routes from '@/utils/router';
import {
  EyeIcon,
  EyeClosedIcon,
  InstagramIcon,
} from '@/assets/Icons/GeneralIcons';
import { useSignUpMutation } from '@/redux/slices/authSlice';
import getErrorMessage from '@/utils/getErrorMessage';
import AuthInput from '@/components/common/AuthInput/AuthInput';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { validationRules } from '@/utils/validation/validation';
import styles from './SignUp.module.scss';

export interface FormInput {
  mail: string;
  fullName: string;
  userName: string;
  password: string;
}
const LOGIN_ERRORS: Record<string, string> = {
  'Email or username already taken': 'Такой пользователь уже существует',
  'Validation failed': 'Проверьте правильность заполнения полей',
};
const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
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

  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const body = {
        email: data.mail,
        username: data.userName,
        name: data.fullName,
        password: data.password,
      };
      const response = await signUp(body).unwrap();
      localStorage.setItem('token', response.token);
      navigate(routes.feed);
    } catch (error) {
      const err = error as SerializedError | FetchBaseQueryError;

      const backendCode =
        'status' in err &&
        err.data &&
        typeof err.data === 'object' &&
        'error' in err.data
          ? (err.data as { error?: string }).error
          : undefined;

      const message =
        (backendCode && LOGIN_ERRORS[backendCode]) ?? getErrorMessage(err);

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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          register={register}
          name="mail"
          rules={{
            required: 'Email обязателен для заполнения',
            pattern: validationRules.mailInput,
          }}
          placeholder="Email"
          error={errors.mail}
        />
        <AuthInput
          register={register}
          name="fullName"
          rules={{
            required: 'Fullname обязателен для заполнения',
            minLength: 2,
          }}
          placeholder="Full Name"
          error={errors.fullName}
        />
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
        <input
          type="submit"
          value="Sign up"
          disabled={!isValid}
          className={styles.button}
        />
      </form>
      <div className={styles.layoutText}>
        <p>Have an account?</p>
        <Link className={styles.link} to={routes.login}>
          Log in.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
