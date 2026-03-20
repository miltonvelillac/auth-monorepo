import { type ReactNode } from 'react';
import { AuthText } from '../atoms/AuthText';

export type SignInCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function SignInCard({
  title = 'Access your account',
  description = 'A portable sign-in module for shared authentication flows.',
  children,
}: SignInCardProps) {
  return (
    <section className="auth-ui-card auth-ui-stack">
      <header className="auth-ui-stack">
        <h2 className="auth-ui-heading">{title}</h2>
        <AuthText>{description}</AuthText>
      </header>
      {children}
    </section>
  );
}
