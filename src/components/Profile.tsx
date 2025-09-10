import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Button from './Button';
import Input from './Input';

interface ProfileForm {
  displayName: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileForm>();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setValue('displayName', user.displayName || '');
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    setIsUpdating(true);
    try {
      await updateProfile(user, { displayName: data.displayName });
      setMessage('Profile updated successfully');
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-4 dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-300 rounded w-32 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            User Profile
          </h2>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white" aria-label="User email">
              {user.email}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} role="form" noValidate>
            <div className="space-y-4">
              <Input
                {...register('displayName', { required: 'Display name is required' })}
                placeholder="Enter display name"
                ariaLabel="Display name"
                error={errors.displayName?.message}
                id="displayName"
                className="w-full"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isUpdating}
                ariaLabel={isUpdating ? "Updating profile..." : "Update profile"}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
            {message && (
              <p
                className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;