export const authWidgetStyles = `
.auth-widget-root {
  font-family: var(--auth-font-family);
  font-size: var(--auth-font-size-base);
  line-height: var(--auth-line-height);
  color: var(--auth-color-text);
}

.auth-widget-shell {
  display: grid;
  gap: var(--auth-space-lg);
}

.auth-widget-card {
  width: 100%;
  max-width: 420px;
  padding: var(--auth-space-xl);
  border-radius: var(--auth-radius-lg);
  background: var(--auth-color-surface);
  border: 1px solid var(--auth-color-border);
  box-shadow: var(--auth-shadow-card);
}

.auth-widget-eyebrow {
  margin: 0 0 var(--auth-space-sm);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: var(--auth-font-size-sm);
  color: var(--auth-color-text-muted);
}

.auth-widget-title {
  margin: 0 0 var(--auth-space-sm);
  font-size: var(--auth-font-size-lg);
}

.auth-widget-copy {
  margin: 0 0 var(--auth-space-lg);
  color: var(--auth-color-text-muted);
}

.auth-widget-form {
  display: grid;
  gap: var(--auth-space-md);
}

.auth-widget-label {
  display: grid;
  gap: var(--auth-space-xs);
  font-size: var(--auth-font-size-sm);
}

.auth-widget-input {
  width: 100%;
  border: 1px solid var(--auth-color-border);
  border-radius: var(--auth-radius-md);
  padding: 0.9rem 1rem;
  background: var(--auth-color-surface-muted);
  color: var(--auth-color-text);
}

.auth-widget-input:focus {
  outline: none;
  box-shadow: var(--auth-shadow-focus);
  border-color: var(--auth-color-primary);
}

.auth-widget-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: var(--auth-radius-pill);
  padding: 0.95rem 1.15rem;
  font-weight: var(--auth-font-weight-bold);
  color: var(--auth-color-primary-contrast);
  background: var(--auth-color-primary);
  cursor: pointer;
}

.auth-widget-button:disabled {
  opacity: 0.72;
  cursor: wait;
}

.auth-widget-button.is-secondary {
  background: var(--auth-color-surface-muted);
  color: var(--auth-color-text);
  border: 1px solid var(--auth-color-border);
}

.auth-widget-alert {
  display: none;
  padding: var(--auth-space-sm) var(--auth-space-md);
  border-radius: var(--auth-radius-md);
  font-size: var(--auth-font-size-sm);
}

.auth-widget-alert.is-visible {
  display: block;
}

.auth-widget-alert.is-error {
  background: rgba(198, 61, 79, 0.08);
  color: var(--auth-color-danger);
}

.auth-widget-alert.is-success {
  background: rgba(31, 143, 95, 0.08);
  color: var(--auth-color-success);
}

.auth-widget-session {
  display: grid;
  gap: var(--auth-space-sm);
}

.auth-widget-session-item {
  padding: var(--auth-space-sm) var(--auth-space-md);
  border-radius: var(--auth-radius-md);
  background: var(--auth-color-surface-muted);
}

.auth-widget-session-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--auth-font-size-sm);
  color: var(--auth-color-text-muted);
}

.auth-widget-session-value {
  margin: 0;
  word-break: break-word;
}
`;
