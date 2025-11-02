import 'styled-components';
import type { ColorTypes, DeviceTypes, FontSizeTypes, MobileFontSizeTypes, RadiusTypes } from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme{
    colors: ColorTypes;
    devices: DeviceTypes;
    radius: RadiusTypes;
    fontSize: FontSizeTypes;
    mobileFontSize: MobileFontSizeTypes;
  }
}