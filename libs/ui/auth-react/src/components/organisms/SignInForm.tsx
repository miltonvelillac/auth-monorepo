import { type FormEvent } from 'react';
import { useSignInController } from '../../hooks/useSignInController';
import { AuthButton } from '../atoms/AuthButton';
import { AuthInput } from '../atoms/AuthInput';
import { FormField } from '../molecules/FormField';

export type SignInFormProps = {
  submitLabel?: string;
  signOutLabel?: string;
  usernameLabel?: string;
  passwordLabel?: string;
};

export function SignInForm({
  submitLabel = 'Sign in',
  signOutLabel = 'Sign out',
  usernameLabel = 'Username',
  passwordLabel = 'Password',
}: SignInFormProps) {
  const { state, setUsername, setPassword, submit, signOut } = useSignInController();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <form className="auth-ui-stack" onSubmit={handleSubmit}>
      <FormField label={usernameLabel}>
        <AuthInput
          type="text"
          value={state.credentials.username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          placeholder="john.doe"
        />
      </FormField>

      <FormField label={passwordLabel}>
        <AuthInput
          type="password"
          value={state.credentials.password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="Enter your password"
        />
      </FormField>

      {state.error ? (
        <div className="auth-ui-alert auth-ui-alert-error">{state.error}</div>
      ) : null}

      {state.status === 'success' ? (
        <div className="auth-ui-alert auth-ui-alert-success">
          Sign in completed successfully.
        </div>
      ) : null}

      <div className="auth-ui-actions">
        <AuthButton type="submit" disabled={state.status === 'submitting' || state.status === 'signing-out'}>
          {state.status === 'submitting' ? 'Signing in...' : submitLabel}
        </AuthButton>

        {state.session ? (
          <AuthButton
            type="button"
            className="is-secondary"
            onClick={handleSignOut}
            disabled={state.status === 'signing-out'}
          >
            {state.status === 'signing-out' ? 'Signing out...' : signOutLabel}
          </AuthButton>
        ) : null}
      </div>
    </form>
  );
}
