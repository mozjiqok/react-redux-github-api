import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          px-4 
          py-2 
          bg-blue-500 
          text-white 
          rounded-md 
          hover:bg-blue-600 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:ring-opacity-50 
          cursor-pointer 
          transition-colors 
          duration-200 
          ${className || ''}
        `}
        {...props}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = 'StyledButton';