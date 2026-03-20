import { createAuthWidget } from '@auth-monorepo/auth-widget';
import './styles.css';

const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Root element not found.');
}

appElement.innerHTML = `
  <main class="demo-shell">
    <section class="demo-panel">
      <p class="demo-eyebrow">Framework-free host app</p>
      <h1 class="demo-title">Auth Core Sign In</h1>
      <p class="demo-copy">
        This demo uses only HTML, CSS and TypeScript. It consumes the full
        auth-widget library, which already contains UI, state management and API integration.
      </p>
      <div class="demo-meta">
        <span class="demo-chip">projectId: web-app</span>
        <span class="demo-chip">endpoint: POST /api/login</span>
      </div>
      <button class="demo-button demo-button-secondary" id="demo-signout" type="button" disabled>
        Sign out from host app
      </button>
    </section>

    <section class="demo-card" id="widget-host"></section>
  </main>
`;

const signOutButton = document.querySelector<HTMLButtonElement>('#demo-signout');

if (!signOutButton) {
  throw new Error('Sign out button not found.');
}

const hostSignOutButton = signOutButton;

const widget = createAuthWidget({
  mount: '#widget-host',
  idProject: 'testapp',
  apiBaseUrl: 'http://localhost:4000/api',
  title: 'Sign in',
  description: 'This widget consumes the local auth API without extra host logic.',
  initialUsername: 'john',
  onSuccess: () => {
    syncSignOutButton();
  },
  onSignOut: () => {
    syncSignOutButton();
  },
  theme: {
    colors: {
      primary: '#145fa3',
      primaryContrast: '#ffffff',
    },
    typography: {
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
    },
  },
});

hostSignOutButton.addEventListener('click', async () => {
  await widget.signOut();
  syncSignOutButton();
});

syncSignOutButton();

function syncSignOutButton() {
  hostSignOutButton.disabled = !widget.getState().session;
}
