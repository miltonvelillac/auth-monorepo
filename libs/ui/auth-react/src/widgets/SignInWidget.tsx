import {
  type AuthClient,
  type HttpAuthClientOptions,
  type PartialAuthDesignTokens,
  type SignInSession,
} from '@auth-monorepo/auth-core';
import { SignInProvider } from '../providers/SignInProvider';
import { SignInForm } from '../components/organisms/SignInForm';
import { SignInCard } from '../components/templates/SignInCard';

export type SignInWidgetProps = {
  idProject: string;
  authClient?: AuthClient;
  transport?: HttpAuthClientOptions;
  theme?: PartialAuthDesignTokens;
  title?: string;
  description?: string;
  onSuccess?: (session: SignInSession) => void;
};

export function SignInWidget({
  idProject,
  authClient,
  transport,
  theme,
  title,
  description,
  onSuccess,
}: SignInWidgetProps) {
  return (
    <SignInProvider
      idProject={idProject}
      authClient={authClient}
      transport={transport}
      theme={theme}
      onSuccess={onSuccess}
    >
      <SignInCard title={title} description={description}>
        <SignInForm />
      </SignInCard>
    </SignInProvider>
  );
}
