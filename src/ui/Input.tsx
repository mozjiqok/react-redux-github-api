import { forwardRef, InputHTMLAttributes } from "react";

// Extend input props to allow for additional customization
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  // Optional custom props can be added here if needed
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        w-full 
        px-3 
        py-2 
        border 
        border-gray-300 
        rounded-md 
        text-gray-700 
        bg-white 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-transparent 
        transition-all 
        duration-200 
        ${className || ''}
      `}
      {...props}
    />
  );
});

Input.displayName = 'StyledInput';

export default Input;
