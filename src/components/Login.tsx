import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import Button from './Button';
import Input from './Input';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginForm>();
  const [error, setError] = useState<string>('');
  const [resetMessage, setResetMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setError('');
      // Handle successful login, e.g., redirect
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = watch('email');
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    setIsResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent. Check your inbox.');
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} role="form" noValidate>
          <div className="space-y-4">
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="Enter your email"
              ariaLabel="Email address"
              error={errors.email?.message}
              id="email"
              className="w-full"
              autoComplete="email"
            />
            <Input
              {...register('password', { required: 'Password is required' })}
              type="password"
              placeholder="Enter your password"
              ariaLabel="Password"
              error={errors.password?.message}
              id="password"
              className="w-full"
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
              loading={isLoading}
              ariaLabel={isLoading ? "Signing in..." : "Sign in"}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handlePasswordReset}
              className="w-full sm:w-auto"
              disabled={isResetLoading}
              loading={isResetLoading}
              ariaLabel="Forgot password"
            >
              {isResetLoading ? 'Sending...' : 'Forgot Password?'}
            </Button>
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-center" role="alert" aria-live="polite">
              {error}
            </p>
          )}
          {resetMessage && (
            <p className="text-green-600 dark:text-green-400 text-center" role="status" aria-live="polite">
              {resetMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;