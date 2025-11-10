import styled from 'styled-components';

export const LectureDetailContainer = styled.div`
  margin-top: 6rem;
`;

export const LectureMainLayout = styled.div`
  width: 100%;
  margin-top: 3.2rem;

  display: flex;
  justify-content: start;
  align-items: start;
  gap: 4rem;
  flex-wrap: wrap;
`;

export const ContentWrapper = styled.div`
  flex: 1 1 66%;
  width: 66%;
  min-width: 64rem;
  
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > section {
    padding-block: 8rem;
    &:not(:nth-last-child(-n+2)) {
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    }
  }
`

// --- SectionTabs 스타일 ---
export const StickyNavWrapper = styled.nav`
  width: 100%;
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

export const NavContent = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  
  height: 5rem;
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  cursor: pointer;
  padding: 0.4rem 0;
  
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) => ($active ? theme.colors.surface : theme.colors.gray300)};
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
    scroll-margin-top: calc(7rem + 5rem);

    @media ${({ theme }) => theme.devices.tablet} {
      scroll-margin-top: calc(5.6rem + 5rem);
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
  `,
  SectionSubtitle: styled.p`
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.primary300};
  `,
}
