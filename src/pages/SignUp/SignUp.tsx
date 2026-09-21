import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import routes from '@/utils/router';
import {
  EyeIcon,
  EyeClosedIcon,
  InstagramIcon,
} from '@/assets/Icons/GeneralIcons';
import AuthInput from '@/components/common/AuthInput/AuthInput';
import { ApiError } from '@/utils/error/classError';
import API from '@/utils/api';
import { useState } from 'react';
import { validationRules } from '@/utils/validation/validation';
import styles from './SignUp.module.scss';

export interface FormInput {
  mail: string;
  fullName: string;
  userName: string;
  password: string;
}

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

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

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const body = {
        email: data.mail,
        username: data.userName,
        name: data.fullName,
        password: data.password,
      };
      const response = await API.signUp(body);
      localStorage.setItem('token', response.token);
      navigate(routes.feed);
    } catch (err) {
      const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
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
