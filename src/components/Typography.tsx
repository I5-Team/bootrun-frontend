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
    font-size: ${({ theme, variant = 'md' }) => theme.fontSize[variant]};
  }
`;

// Heading1 컴포넌트
export const Heading1 = styled.h2<{ marginTop?: number }>`
  font-size: ${({ theme }) => theme.fontSize.headingXl};
  font-weight: 600;
  line-height: ${({ theme }) => theme.lineHeight.normal};
  margin-top: ${({ marginTop }) => `${marginTop ?? 0}rem`};
  word-break: keep-all;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.headingLg};
  }
`;

// Heading2 컴포넌트
export const Heading2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.headingLg};
  font-weight: 600;
  line-height: ${({theme }) => theme.lineHeight.normal};
  word-break: keep-all;

  @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
  }

  @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

// Heading3 컴포넌트
export const Heading3 = styled.h3`
  font-weight: 600;
  line-height: ${({ theme }) => theme.lineHeight.normal};
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  width: 100%;
  min-width: 0;

  word-break: break-all;
  overflow-wrap: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${({ theme }) => theme.fontSize.headingMd};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const Heading4 = styled(Heading3)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

