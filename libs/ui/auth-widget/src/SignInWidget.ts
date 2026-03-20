import {
  createHttpAuthClient,
  createSignInModule,
  mergeAuthDesignTokens,
  toCssVariables,
  type HttpAuthClientOptions,
  type PartialAuthDesignTokens,
  type SignInSession,
  type SignInState,
} from '@auth-monorepo/auth-core';
import { authWidgetStyles } from './styles/widgetStyles';

export type CreateAuthWidgetOptions = {
  mount: string | HTMLElement;
  idProject: string;
  apiBaseUrl: string;
  endpoint?: string;
  theme?: PartialAuthDesignTokens;
  title?: string;
  description?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  submitLabel?: string;
  initialUsername?: string;
  onSuccess?: (session: SignInSession) => void;
  onError?: (message: string) => void;
  transport?: Omit<HttpAuthClientOptions, 'baseUrl' | 'endpoint'>;
};

export type AuthWidgetInstance = {
  destroy: () => void;
  reset: () => void;
  getState: () => SignInState;
};

export function createAuthWidget(options: CreateAuthWidgetOptions): AuthWidgetInstance {
  const mountElement = resolveMount(options.mount);
  injectStyles();

  const theme = mergeAuthDesignTokens(options.theme);
  const authClient = createHttpAuthClient({
    baseUrl: options.apiBaseUrl,
    endpoint: options.endpoint ?? '/login',
    ...options.transport,
  });

  const module = createSignInModule({
    projectId: options.idProject,
    authClient,
    initialCredentials: {
      username: options.initialUsername ?? '',
    },
  });

  mountElement.classList.add('auth-widget-root');
  Object.entries(toCssVariables(theme)).forEach(([key, value]) => {
    mountElement.style.setProperty(key, value);
  });

  mountElement.innerHTML = renderTemplate({
    idProject: options.idProject,
    title: options.title,
    description: options.description,
    usernameLabel: options.usernameLabel,
    passwordLabel: options.passwordLabel,
    submitLabel: options.submitLabel,
  });

  const usernameInput = query<HTMLInputElement>(mountElement, '[data-auth="username"]');
  const passwordInput = query<HTMLInputElement>(mountElement, '[data-auth="password"]');
  const formElement = query<HTMLFormElement>(mountElement, '[data-auth="form"]');
  const submitButton = query<HTMLButtonElement>(mountElement, '[data-auth="submit"]');
  const feedbackElement = query<HTMLDivElement>(mountElement, '[data-auth="feedback"]');
  const sessionElement = query<HTMLDivElement>(mountElement, '[data-auth="session"]');

  const handleUsernameInput = (event: Event) => {
    module.store.setCredential('username', readInputValue(event));
  };

  const handlePasswordInput = (event: Event) => {
    module.store.setCredential('password', readInputValue(event));
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const session = await module.store.submit();

    if (session && options.onSuccess) {
      options.onSuccess(session);
    }

    const currentState = module.store.getState();
    if (currentState.error && options.onError) {
      options.onError(currentState.error);
    }
  };

  usernameInput.addEventListener('input', handleUsernameInput);
  passwordInput.addEventListener('input', handlePasswordInput);
  formElement.addEventListener('submit', handleSubmit);

  const unsubscribe = module.store.subscribe(() => {
    renderState(
      module.store.getState(),
      usernameInput,
      passwordInput,
      submitButton,
      feedbackElement,
      sessionElement,
      options.submitLabel,
    );
  });

  renderState(
    module.store.getState(),
    usernameInput,
    passwordInput,
    submitButton,
    feedbackElement,
    sessionElement,
    options.submitLabel,
  );

  return {
    destroy: () => {
      unsubscribe();
      usernameInput.removeEventListener('input', handleUsernameInput);
      passwordInput.removeEventListener('input', handlePasswordInput);
      formElement.removeEventListener('submit', handleSubmit);
      mountElement.innerHTML = '';
      mountElement.removeAttribute('style');
      mountElement.classList.remove('auth-widget-root');
    },
    reset: () => module.store.reset(),
    getState: () => module.store.getState(),
  };
}

function renderTemplate(options: {
  idProject: string;
  title?: string;
  description?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  submitLabel?: string;
}) {
  return `
    <section class="auth-widget-shell">
      <article class="auth-widget-card">
        <p class="auth-widget-eyebrow">Auth Widget</p>
        <h2 class="auth-widget-title">${options.title ?? 'Access your account'}</h2>
        <p class="auth-widget-copy">${options.description ?? 'Portable sign-in widget with encapsulated UI, state and API integration.'}</p>
        <p class="auth-widget-copy">projectId: <strong>${escapeHtml(options.idProject)}</strong></p>

        <form class="auth-widget-form" data-auth="form">
          <label class="auth-widget-label">
            <span>${options.usernameLabel ?? 'Username'}</span>
            <input class="auth-widget-input" data-auth="username" type="text" autocomplete="username" />
          </label>

          <label class="auth-widget-label">
            <span>${options.passwordLabel ?? 'Password'}</span>
            <input class="auth-widget-input" data-auth="password" type="password" autocomplete="current-password" />
          </label>

          <div class="auth-widget-alert" data-auth="feedback"></div>

          <button class="auth-widget-button" data-auth="submit" type="submit">
            ${options.submitLabel ?? 'Sign in'}
          </button>
        </form>

        <div class="auth-widget-session" data-auth="session"></div>
      </article>
    </section>
  `;
}

function renderState(
  state: SignInState,
  usernameInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  submitButton: HTMLButtonElement,
  feedbackElement: HTMLDivElement,
  sessionElement: HTMLDivElement,
  submitLabel = 'Sign in',
) {
  usernameInput.value = state.credentials.username;
  passwordInput.value = state.credentials.password;
  submitButton.disabled = state.status === 'submitting';
  submitButton.textContent = state.status === 'submitting' ? 'Signing in...' : submitLabel;

  feedbackElement.className = 'auth-widget-alert';
  feedbackElement.textContent = '';

  if (state.status === 'error' && state.error) {
    feedbackElement.classList.add('is-visible', 'is-error');
    feedbackElement.textContent = state.error;
  }

  if (state.status === 'success' && state.session) {
    feedbackElement.classList.add('is-visible', 'is-success');
    feedbackElement.textContent = 'Sign in completed successfully.';
  }

  sessionElement.innerHTML = state.session
    ? `
      <div class="auth-widget-session-item">
        <span class="auth-widget-session-label">Token</span>
        <p class="auth-widget-session-value">${escapeHtml(state.session.accessToken ?? '(not provided)')}</p>
      </div>
      <div class="auth-widget-session-item">
        <span class="auth-widget-session-label">Payload</span>
        <p class="auth-widget-session-value">${escapeHtml(JSON.stringify(state.session.raw ?? state.session, null, 2))}</p>
      </div>
    `
    : '';
}

function resolveMount(mount: string | HTMLElement) {
  if (typeof mount !== 'string') {
    return mount;
  }

  const element = document.querySelector<HTMLElement>(mount);

  if (!element) {
    throw new Error(`Mount element "${mount}" was not found.`);
  }

  return element;
}

function query<T extends HTMLElement>(element: ParentNode, selector: string) {
  const node = element.querySelector<T>(selector);

  if (!node) {
    throw new Error(`Required widget element "${selector}" was not found.`);
  }

  return node;
}

function readInputValue(event: Event) {
  return (event.target as HTMLInputElement).value;
}

function injectStyles() {
  const styleId = 'auth-widget-styles';

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = authWidgetStyles;
  document.head.appendChild(style);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
