import type {
  BreakpointsTypes,
  ColorTypes,
  DeviceTypes,
  FontSizeTypes,
  MobileFontSizeTypes,
  RadiusTypes,
  SpaceTypes,
  LineHeightTypes,
  FontWeightTypes,
  ZIndexTypes,
  ShadowTypes
} from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
    devices: DeviceTypes;
    radius: RadiusTypes;
    fontSize: FontSizeTypes;
    mobileFontSize: MobileFontSizeTypes;
    breakpoints: BreakpointsTypes;
    space: SpaceTypes;
    lineHeight: LineHeightTypes;
    fontWeight: FontWeightTypes;
    zIndex: ZIndexTypes;
    shadows: ShadowTypes;
  }
}