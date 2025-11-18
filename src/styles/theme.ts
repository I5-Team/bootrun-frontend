import type { DefaultTheme } from "styled-components";

const colors = {
  primary100: '#FFEAE6',
  primary200: '#FFBAA4',
  primary300: '#FF5B3B',
  primaryDark: '#E94525',

  gray100: '#F8F9FA',
  gray200: '#ECEEF0',
  gray300: '#8D949E',
  gray400: '#303546',

  surface: '#11181C',
  white: '#FFFFFF',
  alert: '#FF3440',
  focus: '#8B38FF',

  shadow: '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
} as const;

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

const fontSize = {
  xxl: '4rem',
  xl: '3.2rem',
  lg: '2.4rem',
  md: '1.6rem',
  sm: '1.4rem',
  caption: '1.2rem',
}

const mobileFontSize = {
  xxl: '2.0rem',
  xl: '1.8rem',
  lg: '1.6rem',
  md: '1.4rem',
  sm: '1.2rem',
  caption: '1.2rem',
}


const theme: DefaultTheme = {
  colors,
  devices,
  radius,
  fontSize,
  mobileFontSize,
  breakpoints,
} as const;

export type ColorTypes = typeof colors;
export type DeviceTypes = typeof devices;
export type RadiusTypes = typeof radius;
export type FontSizeTypes = typeof fontSize;
export type MobileFontSizeTypes = typeof mobileFontSize;
export type BreakpointsTypes = typeof breakpoints;


export default theme;