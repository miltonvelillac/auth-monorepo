import { type ReactNode } from 'react';

export type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="auth-ui-label">
      <span>{label}</span>
      {children}
    </label>
  );
}
