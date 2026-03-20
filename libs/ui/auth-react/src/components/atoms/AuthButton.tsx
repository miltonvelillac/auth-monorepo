import { type ButtonHTMLAttributes } from 'react';

export function AuthButton({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`auth-ui-button ${className}`.trim()} {...props} />;
}
