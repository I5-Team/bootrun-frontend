import type { DefaultTheme } from "styled-components";

// 디자인 시스템 색상 팔레트 정의
const colors = {
  primary100: '#FFEAE6',
  primary200: '#FFBAA4',
  primary300: '#FF5B3B',
  primaryDark: '#E94525',
  sub: '#FF9971',

  gray100: '#F2F4F9',
  gray200: '#DCE1E6',
  gray300: '#7E848C',
  gray400: '#303546',

  surface: '#11181C',
  white: '#FFFFFF',
  alert: '#FF3440',
  focus: '#8B38FF',
} as const;

// 반응형 디자인을 위한 브레이크포인트 정의
const breakpoints = {
  desktop: '1190px',
  laptop: '992px',
  tablet: '768px',
  mobile: '478px',
} as const;

const devices = {
  desktop: `screen and (max-width: ${breakpoints.desktop})`,
  laptop: `screen and (max-width: ${breakpoints.laptop})`,
  tablet: `screen and (max-width: ${breakpoints.tablet})`,
  mobile: `screen and (max-width: ${breakpoints.mobile})`,
} as const;

const radius = {
  xs: '0.6rem',
  sm: '0.8rem',
  md: '1rem',
  lg: '1.2rem',
  xl: '1.6rem',
  xxl: '2rem',
} as const;

// 폰트 크기 정의 (rem 단위)
const fontSize = {
  // heading
  headingXl: '4rem',
  headingLg: '3.2rem',
  headingMd: '2.4rem',

  // body
  xl: '2.0rem',
  lg: '1.8rem',
  md: '1.6rem',
  sm: '1.4rem',

  // caption
  caption: '1.2rem',
}

// 간격 시스템 정의 (4px 단위 기본)
const space = {
  0: '0',
  2: '0.2rem',
  4: '0.4rem',
  6: '0.6rem',
  8: '0.8rem',
  10: '1.0rem',
  12: '1.2rem',
  14: '1.4rem',
  16: '1.6rem',
  20: '2.0rem',
  24: '2.4rem',
  32: '3.2rem',
  40: '4.0rem',
  48: '4.8rem',
  64: '6.4rem',
  80: '8.0rem',
  96: '9.6rem',
} as const;

const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  loose: 1.8,
} as const;

const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

const zIndex = {
  // level 0 - 기본
  base: 0,
  // level 1 - 장식, 강조, 드롭다운 
  above: 10,
  dropdown: 50,  // 드롭다운

  // level 2 - 네비게이션 및 고정
  header: 100,  // 헤더
  sticky: 300,  // 고정
  fixed: 310,  // 고정
  sidebar: 400,  // 네비게이션

  // level 3 - 툴팁
  tooltip: 600,

  // level 4 - 모달
  backdrop: 1000,
  modal: 1010,
  confirmBackdrop: 1100,
  confirmModal: 1110,

  // level 5 - 토스트
  toast: 1200,
} as const;

const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

const theme: DefaultTheme = {
  colors,
  devices,
  radius,
  fontSize,
  breakpoints,
  space,
  lineHeight,
  fontWeight,
  zIndex,
  shadows,
} as const;

export type ColorTypes = typeof colors;
export type DeviceTypes = typeof devices;
export type RadiusTypes = typeof radius;
export type FontSizeTypes = typeof fontSize;
export type BreakpointsTypes = typeof breakpoints;
export type SpaceTypes = typeof space;
export type LineHeightTypes = typeof lineHeight;
export type FontWeightTypes = typeof fontWeight;
export type ZIndexTypes = typeof zIndex;
export type ShadowTypes = typeof shadows;

export default theme;