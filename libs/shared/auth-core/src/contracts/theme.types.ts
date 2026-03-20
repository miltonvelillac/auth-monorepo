export type ColorTokens = {
  primary: string;
  primaryContrast: string;
  surface: string;
  surfaceMuted: string;
  background: string;
  border: string;
  text: string;
  textMuted: string;
  danger: string;
  success: string;
};

export type TypographyTokens = {
  fontFamily: string;
  fontSizeBase: string;
  fontSizeSm: string;
  fontSizeLg: string;
  fontWeightRegular: number;
  fontWeightBold: number;
  lineHeight: number;
};

export type RadiusTokens = {
  sm: string;
  md: string;
  lg: string;
  pill: string;
};

export type ShadowTokens = {
  card: string;
  focus: string;
};

export type SpaceTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type AuthDesignTokens = {
  colors: ColorTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  space: SpaceTokens;
};

export type PartialAuthDesignTokens = {
  colors?: Partial<ColorTokens>;
  typography?: Partial<TypographyTokens>;
  radius?: Partial<RadiusTokens>;
  shadow?: Partial<ShadowTokens>;
  space?: Partial<SpaceTokens>;
};
