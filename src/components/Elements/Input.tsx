import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  LeadingIcon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  className?: string;
  handleChange?: (value: number) => void;
  value: string | number;
};

export const Input = ({ type, LeadingIcon, handleChange, value, ...props }: InputProps) => {
  return (
    <div className="relative rounded-md">
      {LeadingIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LeadingIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
        </div>
      )}
      <input
        type={type}
        className={
          'focus:border-green-700 block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md'
        }
        onChange={(e) => {
          handleChange?.(+e.target.value);
        }}
        value={value}
        {...props}
      />
    </div>
  );
};
