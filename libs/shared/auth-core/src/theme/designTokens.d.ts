import { type AuthDesignTokens, type PartialAuthDesignTokens } from '../contracts/theme.types';
export declare const defaultAuthDesignTokens: AuthDesignTokens;
export declare function mergeAuthDesignTokens(overrides?: PartialAuthDesignTokens): AuthDesignTokens;
export declare function toCssVariables(tokens: AuthDesignTokens): Record<string, string>;
//# sourceMappingURL=designTokens.d.ts.map