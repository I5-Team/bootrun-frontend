import { colors } from './colors';

export const theme = {
  colors,
  radius: {
    md: '10px',
  },
  size: {
    sm: '36px',
    md: '42px',
    lg: '48px',
  },
  spacing: {
    xs: '8px',
    sm: '10px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  typography: {
    // Pretendard 14/20 Medium, SemiBold 기준
    body14: {
      size: '14px',
      lineHeight: '20px',
      weightMedium: 500,
      weightSemiBold: 600,
    },
  },
} as const;

export type AppTheme = typeof theme;
