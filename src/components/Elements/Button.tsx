import clsx from 'clsx';
import React, { forwardRef } from 'react';

const variants = {
  primary: 'bg-green-600 text-white hover:bg-gray-50:text-green-600',
  inverse: 'bg-white text-green-600 hover:bg-green-600:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
