import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Button from './Button';
import Input from './Input';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setError('');
      // Handle successful registration, e.g., redirect
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
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
            />
            <Input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              placeholder="Enter your password"
              ariaLabel="Password"
              error={errors.password?.message}
              id="password"
              className="w-full"
            />
            <Input
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              type="password"
              placeholder="Confirm your password"
              ariaLabel="Confirm password"
              error={errors.confirmPassword?.message}
              id="confirmPassword"
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
              ariaLabel={isLoading ? "Creating account..." : "Create account"}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
          {error && (
            <p className="text-red-600 text-center dark:text-red-400" role="alert" aria-live="polite">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;