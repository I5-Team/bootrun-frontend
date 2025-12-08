import styled from 'styled-components';
import type { SpaceTypes } from '../styles/theme';

// 레이아웃 구성을 위한 기본 Box 컴포넌트 Props 정의
interface BoxProps {
  m?: keyof SpaceTypes;
  mt?: keyof SpaceTypes;
  mb?: keyof SpaceTypes;
  ml?: keyof SpaceTypes;
  mr?: keyof SpaceTypes;
  mx?: keyof SpaceTypes;
  my?: keyof SpaceTypes;
  p?: keyof SpaceTypes;
  pt?: keyof SpaceTypes;
  pb?: keyof SpaceTypes;
  pl?: keyof SpaceTypes;
  pr?: keyof SpaceTypes;
  px?: keyof SpaceTypes;
  py?: keyof SpaceTypes;
  width?: string;
  height?: string;
  bg?: string;
}

const getSpace = (theme: any, value?: keyof SpaceTypes) => value ? theme.space[value] : undefined;

// styled-components를 사용한 Box 컴포넌트 구현
// theme.space 토큰을 사용하여 마진과 패딩을 적용
export const Box = styled.div<BoxProps>`
  margin: ${({ theme, m }) => getSpace(theme, m)};
  margin-top: ${({ theme, mt, my }) => getSpace(theme, mt) || getSpace(theme, my)};
  margin-bottom: ${({ theme, mb, my }) => getSpace(theme, mb) || getSpace(theme, my)};
  margin-left: ${({ theme, ml, mx }) => getSpace(theme, ml) || getSpace(theme, mx)};
  margin-right: ${({ theme, mr, mx }) => getSpace(theme, mr) || getSpace(theme, mx)};
  
  padding: ${({ theme, p }) => getSpace(theme, p)};
  padding-top: ${({ theme, pt, py }) => getSpace(theme, pt) || getSpace(theme, py)};
  padding-bottom: ${({ theme, pb, py }) => getSpace(theme, pb) || getSpace(theme, py)};
  padding-left: ${({ theme, pl, px }) => getSpace(theme, pl) || getSpace(theme, px)};
  padding-right: ${({ theme, pr, px }) => getSpace(theme, pr) || getSpace(theme, px)};

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme, bg }) => bg && (theme.colors[bg as keyof typeof theme.colors] || bg)};
`;

interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: keyof SpaceTypes;
}

export const Flex = styled(Box) <FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  gap: ${({ theme, gap }) => getSpace(theme, gap)};
`;
