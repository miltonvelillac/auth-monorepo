import { type FormEvent } from 'react';
import { useSignInController } from '../../hooks/useSignInController';
import { AuthButton } from '../atoms/AuthButton';
import { AuthInput } from '../atoms/AuthInput';
import { FormField } from '../molecules/FormField';

export type SignInFormProps = {
  submitLabel?: string;
  usernameLabel?: string;
  passwordLabel?: string;
};

export function SignInForm({
  submitLabel = 'Sign in',
  usernameLabel = 'Username',
  passwordLabel = 'Password',
}: SignInFormProps) {
  const { state, setUsername, setPassword, submit } = useSignInController();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
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

      <AuthButton type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Signing in...' : submitLabel}
      </AuthButton>
    </form>
  );
}
