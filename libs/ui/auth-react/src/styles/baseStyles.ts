export const authReactBaseStyles = `
.auth-ui-root {
  font-family: var(--auth-font-family);
  font-size: var(--auth-font-size-base);
  line-height: var(--auth-line-height);
  color: var(--auth-color-text);
}

.auth-ui-card {
  width: 100%;
  max-width: 420px;
  padding: var(--auth-space-xl);
  border-radius: var(--auth-radius-lg);
  background: var(--auth-color-surface);
  border: 1px solid var(--auth-color-border);
  box-shadow: var(--auth-shadow-card);
}

.auth-ui-stack {
  display: grid;
  gap: var(--auth-space-md);
}

.auth-ui-heading {
  margin: 0;
  font-size: var(--auth-font-size-lg);
  font-weight: var(--auth-font-weight-bold);
  color: var(--auth-color-text);
}

.auth-ui-copy {
  margin: 0;
  color: var(--auth-color-text-muted);
  font-size: var(--auth-font-size-sm);
}

.auth-ui-label {
  display: grid;
  gap: var(--auth-space-xs);
  color: var(--auth-color-text);
  font-size: var(--auth-font-size-sm);
}

.auth-ui-input {
  width: 100%;
  border: 1px solid var(--auth-color-border);
  border-radius: var(--auth-radius-md);
  padding: 0.85rem 1rem;
  background: var(--auth-color-surface-muted);
  color: var(--auth-color-text);
}

.auth-ui-input:focus {
  outline: none;
  box-shadow: var(--auth-shadow-focus);
  border-color: var(--auth-color-primary);
}

.auth-ui-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--auth-space-sm);
  border: 0;
  border-radius: var(--auth-radius-pill);
  padding: 0.9rem 1.15rem;
  background: var(--auth-color-primary);
  color: var(--auth-color-primary-contrast);
  font-weight: var(--auth-font-weight-bold);
  cursor: pointer;
}

.auth-ui-button:disabled {
  opacity: 0.72;
  cursor: wait;
}

.auth-ui-alert {
  padding: var(--auth-space-sm) var(--auth-space-md);
  border-radius: var(--auth-radius-md);
  font-size: var(--auth-font-size-sm);
  background: var(--auth-color-surface-muted);
}

.auth-ui-alert-error {
  border: 1px solid color-mix(in srgb, var(--auth-color-danger) 35%, white);
  color: var(--auth-color-danger);
}

.auth-ui-alert-success {
  border: 1px solid color-mix(in srgb, var(--auth-color-success) 35%, white);
  color: var(--auth-color-success);
}
`;
