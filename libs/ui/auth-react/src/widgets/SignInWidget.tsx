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
  signOutLabel?: string;
  onSuccess?: (session: SignInSession) => void;
  onSignOut?: () => void;
};

export function SignInWidget({
  idProject,
  authClient,
  transport,
  theme,
  title,
  description,
  signOutLabel,
  onSuccess,
  onSignOut,
}: SignInWidgetProps) {
  return (
    <SignInProvider
      idProject={idProject}
      authClient={authClient}
      transport={transport}
      theme={theme}
      onSuccess={onSuccess}
      onSignOut={onSignOut}
    >
      <SignInCard title={title} description={description}>
        <SignInForm signOutLabel={signOutLabel} />
      </SignInCard>
    </SignInProvider>
  );
}
