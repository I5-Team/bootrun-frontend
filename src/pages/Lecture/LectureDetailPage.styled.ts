import styled from 'styled-components';

export const LectureDetailContainer = styled.div`
  margin-top: 6rem;
`;

export const ContentWrapper = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr minmax(34rem, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header infoBox"
    "content infoBox";
  gap: 4rem;
  align-items: start;

  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "infoBox"
      "content";
    gap: 3.2rem;
  }
`;

export const SectionWrapper = styled.div`
  grid-area: 'content';
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// --- SectionTabs 스타일 ---
export const StickyNavWrapper = styled.nav`
  width: 100%;
  height: 5rem;
  
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 0.1rem solid${({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  
  position: sticky;
  top: 7rem;
  @media ${({ theme }) => theme.devices.tablet} {
    top: 5.6rem;
  }
`;

export const NavList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  height: 5rem;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 0;
    justify-content: space-between;
    padding: 0 1.2rem;
  }
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  cursor: pointer;
  padding: 0.4rem 0;
  white-space: nowrap;

  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) => ($active ? theme.colors.surface : theme.colors.gray300)};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const NavCta = styled(NavItem)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary300};

  &:hover {
    opacity: 0.8;
  }
`;

// --- Section 공통 스타일 ---
export const StyledBaseSection = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    max-width: 79rem;
    scroll-margin-top: calc(7rem + 5rem);

    padding-block: 8rem;
    &:not(:nth-last-child(-n+2)) {
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    }

    @media ${({ theme }) => theme.devices.tablet} {
      scroll-margin-top: calc(5.6rem + 5rem);
      padding-block: 4.8rem;
    }
  `,
  SectionHeader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  `,
  SectionTitle: styled.h3`
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.xl};
    color: ${({ theme }) => theme.colors.surface};

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  `,
  SectionSubtitle: styled.p`
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.primary300};
    text-align: center;
    width: 80%;
    line-height: 1.4;
  `,
}