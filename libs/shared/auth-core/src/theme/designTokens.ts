import {
  type AuthDesignTokens,
  type PartialAuthDesignTokens,
} from '../contracts/theme.types';

export const defaultAuthDesignTokens: AuthDesignTokens = {
  colors: {
    primary: '#1f4b99',
    primaryContrast: '#ffffff',
    surface: '#ffffff',
    surfaceMuted: '#f5f7fb',
    background: '#eef2f9',
    border: '#d7dfef',
    text: '#182235',
    textMuted: '#62708b',
    danger: '#c63d4f',
    success: '#1f8f5f',
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontSizeBase: '16px',
    fontSizeSm: '14px',
    fontSizeLg: '20px',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    lineHeight: 1.5,
  },
  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    pill: '999px',
  },
  shadow: {
    card: '0 18px 48px rgba(24, 34, 53, 0.14)',
    focus: '0 0 0 4px rgba(31, 75, 153, 0.16)',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export function mergeAuthDesignTokens(
  overrides?: PartialAuthDesignTokens,
): AuthDesignTokens {
  return {
    colors: { ...defaultAuthDesignTokens.colors, ...overrides?.colors },
    typography: {
      ...defaultAuthDesignTokens.typography,
      ...overrides?.typography,
    },
    radius: { ...defaultAuthDesignTokens.radius, ...overrides?.radius },
    shadow: { ...defaultAuthDesignTokens.shadow, ...overrides?.shadow },
    space: { ...defaultAuthDesignTokens.space, ...overrides?.space },
  };
}

export function toCssVariables(tokens: AuthDesignTokens) {
  return {
    '--auth-color-primary': tokens.colors.primary,
    '--auth-color-primary-contrast': tokens.colors.primaryContrast,
    '--auth-color-surface': tokens.colors.surface,
    '--auth-color-surface-muted': tokens.colors.surfaceMuted,
    '--auth-color-background': tokens.colors.background,
    '--auth-color-border': tokens.colors.border,
    '--auth-color-text': tokens.colors.text,
    '--auth-color-text-muted': tokens.colors.textMuted,
    '--auth-color-danger': tokens.colors.danger,
    '--auth-color-success': tokens.colors.success,
    '--auth-font-family': tokens.typography.fontFamily,
    '--auth-font-size-base': tokens.typography.fontSizeBase,
    '--auth-font-size-sm': tokens.typography.fontSizeSm,
    '--auth-font-size-lg': tokens.typography.fontSizeLg,
    '--auth-font-weight-regular': String(tokens.typography.fontWeightRegular),
    '--auth-font-weight-bold': String(tokens.typography.fontWeightBold),
    '--auth-line-height': String(tokens.typography.lineHeight),
    '--auth-radius-sm': tokens.radius.sm,
    '--auth-radius-md': tokens.radius.md,
    '--auth-radius-lg': tokens.radius.lg,
    '--auth-radius-pill': tokens.radius.pill,
    '--auth-shadow-card': tokens.shadow.card,
    '--auth-shadow-focus': tokens.shadow.focus,
    '--auth-space-xs': tokens.space.xs,
    '--auth-space-sm': tokens.space.sm,
    '--auth-space-md': tokens.space.md,
    '--auth-space-lg': tokens.space.lg,
    '--auth-space-xl': tokens.space.xl,
  } as Record<string, string>;
}
