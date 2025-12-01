import styled from 'styled-components';
import type { ColorTypes, FontSizeTypes, FontWeightTypes, LineHeightTypes } from '../styles/theme';

// 텍스트 스타일링을 위한 Typography 컴포넌트 Props 정의
export interface TextProps {
  variant?: keyof FontSizeTypes;
  weight?: keyof FontWeightTypes;
  color?: keyof ColorTypes;
  lineHeight?: keyof LineHeightTypes;
  align?: 'left' | 'center' | 'right';
  as?: React.ElementType;
}

// 기본 Text 컴포넌트 (span 태그 기반)
export const Text = styled.span<TextProps>`
  font-size: ${({ theme, variant = 'md' }) => theme.fontSize[variant]};
  font-weight: ${({ theme, weight = 'regular' }) => theme.fontWeight[weight]};
  color: ${({ theme, color = 'surface' }) => theme.colors[color]};
  line-height: ${({ theme, lineHeight = 'normal' }) => theme.lineHeight[lineHeight]};
  text-align: ${({ align }) => align || 'left'};
  
  ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme, variant = 'md' }) => theme.mobileFontSize[variant]};
  }
`;

// Heading 컴포넌트 (h2 태그 기반, bold 스타일)
export const Heading = styled(Text).attrs({ as: 'h2', weight: 'bold' })``;
