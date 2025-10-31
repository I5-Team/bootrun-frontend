export const colors = {
  // 브랜드 컬러
  primary100: '#DEE8FF',
  primary200: '#B5CEFF',
  primary300: '#2E6FF2',

  // 그레이 스케일
  gray100: '#F3F5FA',
  gray200: '#D9DBE0',
  gray300: '#8D9299',
  gray400: '#47494D',

  // 표면/텍스트
  surface: '#121314', // ahen --surface 매핑
  white: '#FFFFFF',
  alert: '#FF3440',
} as const;

export type ColorKey = keyof typeof colors;
