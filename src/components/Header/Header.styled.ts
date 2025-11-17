import styled from 'styled-components';

// header
export const StyledHeader = styled.header`
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 7rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.white};

  position: sticky;
  top: 0;
  z-index: 10000;

  @media ${({ theme }) => theme.devices.tablet} {
    height: 5.6rem;
  }
`;

// headerInner
export const StyledHeaderInner = styled.div<{ $isSignup?: boolean }>`
  max-width: ${({ theme }) => theme.breakpoints.desktop};
  width: calc(100% - 3.2rem);
  margin: 0 auto;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHeaderInnerLogo = styled(StyledHeaderInner)`
  justify-content: center;
`;

export const StyledHeaderInnerLecture = styled(StyledHeaderInner)`
  max-width: calc(100% - clamp(3.2rem, 3vw, 4rem));
  justify-content: space-between;
`;

export const StyledHeaderInnerAdmin = styled.div`
  max-width: 1840px;
  width: calc(100% - 4.8rem);
  margin: 0 auto;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// logo
export const StyledLogo = styled.img`
  width: 12.4rem;
  height: auto;
  vertical-align: bottom;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 10rem;
  }
`;

// list
export const StyledNavList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: clamp(2rem, 3vw, 4rem);
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-right: clamp(0rem, 1vw, 2rem);

  li {
    white-space: nowrap;
  }
`;

export const StyledActionList = styled.div`
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0 clamp(1.2rem, 1vw, 2rem);
`;

// button
export const StyledIconBtn = styled.button`
  flex-shrink: 0;
  width: 2.4rem;
  padding: 0.15rem;
  aspect-ratio: 1 / 1;

  svg {
    width: 100%;
    height: 100%;
    vertical-align: bottom;

    path {
      fill: ${({ theme }) => theme.colors.gray400};
      transition: fill 0.1s;
    }
  }

  &:hover {
    cursor: pointer;
    svg path {
      fill: ${({ theme }) => theme.colors.primary300};
    }
  }
`;

export const StyledDevBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;

  /* 'dev' 환경은 주황색 계열, 'local'은 파란색 계열로 구분 */
  background-color: ${({ theme, children }) =>
    children === 'dev' ? theme.colors.alert : theme.colors.primary200};

  color: ${({ theme, children }) =>
    children === 'dev' ? theme.colors.surface : theme.colors.white};

  opacity: 0.7; /* ⭐️ 요청하신 반투명 스타일 */

  text-transform: uppercase;
  pointer-events: none; /* 로고 클릭에 방해되지 않도록 */
`;
