import { forwardRef, type InputHTMLAttributes } from 'react';

export const AuthInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function AuthInput({ className = '', ...props }, ref) {
  return <input ref={ref} className={`auth-ui-input ${className}`.trim()} {...props} />;
});
