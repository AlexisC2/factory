import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  error?: string;
  id?: string;
  required?: boolean;
  autoComplete?: string;
  loading?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  ariaLabel,
  error,
  id,
  required = false,
  autoComplete,
  loading = false,
}) => {
  const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400';
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400' : '';
  
  const disabledClasses = (disabled || loading) ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-700' : '';
  
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`} 
        aria-label={ariaLabel}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? "true" : "false"}
        id={id}
        required={required}
        autoComplete={autoComplete}
        aria-disabled={(disabled || loading) ? "true" : "false"}
      />
      {loading && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;