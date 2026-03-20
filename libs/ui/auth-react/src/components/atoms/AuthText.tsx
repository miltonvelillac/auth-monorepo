import { type HTMLAttributes } from 'react';

export type AuthTextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: 'p' | 'span';
};

export function AuthText({ as = 'p', className = '', ...props }: AuthTextProps) {
  const Component = as;
  return <Component className={`auth-ui-copy ${className}`.trim()} {...props} />;
}
