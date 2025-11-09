/**
 * 강의 수강 페이지 스타일
 */
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const BreadcrumbBar = styled.div<{ $compact?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 1.3rem 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.sm};
  height: 5rem;
  z-index: 10;

  @media ${({ theme }) => theme.devices.desktop} {
    font-size: ${({ theme, $compact }) => ($compact ? theme.fontSize.caption : theme.fontSize.sm)};
  }
  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.2rem 1.6rem;
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const BreadcrumbItem = styled.span<{ $active?: boolean; $bold?: boolean }>`
  display: inline-flex;
  padding: 0.2rem 0.4rem;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary100 : 'transparent')};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: ${({ $bold }) => ($bold ? '700' : '400')};
  border-radius: 0.4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    display: ${({ $bold }) => ($bold ? 'inline-flex' : 'none')};
  }
`;

export const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.surface};

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const LeftSidebar = styled.aside<{ $isOpen: boolean }>`
  position: ${({ $isOpen }) => ($isOpen ? 'relative' : 'absolute')};
  left: 0;
  width: 32rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  overflow: hidden;
  z-index: 100;

  @media ${({ theme }) => theme.devices.laptop} {
    position: fixed;
    left: 0;
    top: 7rem;
    height: calc(100vh - 7rem);
    width: 32rem;
    z-index: 1000;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    top: 5.6rem;
    height: calc(100vh - 5.6rem);
  }
`;

export const RightSidebar = styled.aside<{ $isOpen: boolean }>`
  position: relative;
  width: ${({ $isOpen }) => ($isOpen ? '32rem' : '0')};
  background-color: ${({ theme }) => theme.colors.white};
  border-left: ${({ $isOpen, theme }) =>
    $isOpen ? `0.1rem solid ${theme.colors.gray200}` : 'none'};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;

  @media ${({ theme }) => theme.devices.laptop} {
    position: fixed;
    right: 0;
    top: 7rem;
    height: calc(100vh - 7rem);
    width: 32rem;
    z-index: 1000;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    transition: transform 0.3s ease;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    top: 5.6rem;
    height: calc(100vh - 5.6rem);
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  height: 5rem;
  flex-shrink: 0;
`;

export const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
`;

export const CloseButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 2.4rem;
    height: 2.4rem;
    transition: transform 0.2s ease;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CenterContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  position: relative;
  padding: 4rem 0rem;
`;

export const ContentArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const VideoPlayerWrapper = styled.div`
  width: 60%;
  max-width: 99rem;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8rem 0 0rem 0;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 80%;
  }
`;

export const TextContentWrapper = styled.div`
  width: 70%;
  max-width: 99rem;
  height: 56.25vh;
  overflow-y: auto;
  padding: 3rem;
  margin: 8rem 0 0 0;
  background-color: ${({ theme }) => theme.colors.white};

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray300};
    border-radius: 0.4rem;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
    padding: 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.6rem;
  }
`;

export const TextContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.surface};
  white-space: pre-wrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const QuizContentWrapper = styled.div`
  width: 70%;
  max-width: 99rem;
  height: 56.25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8rem 0 0 0;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 100%;
  }
`;

export const QuizPlaceholder = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray400};
  font-weight: 500;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

export const BottomNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

export const NavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const NavButton = styled.button<{ $variant?: 'outline' | 'primary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: ${({ $variant }) => ($variant === 'primary' ? '1.3rem 2.2rem 1.3rem 1.2rem' : '1.3rem')};
  background-color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary300 : theme.colors.white};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.white : theme.colors.surface};
  border: ${({ $variant, theme }) =>
    $variant === 'outline' ? `0.1rem solid ${theme.colors.gray200}` : 'none'};
  border-radius: 4.8rem;
  min-width: 5rem;
  height: 5rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant, theme }) =>
      $variant === 'primary' ? theme.colors.primaryDark : theme.colors.gray100};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: ${({ $variant }) => ($variant === 'primary' ? '1.2rem 2rem 1.2rem 1rem' : '1.2rem')};
    min-width: 4.4rem;
    height: 4.4rem;
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const ScrollTopButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  img {
    width: 1.3rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 4.4rem;
    height: 4.4rem;
  }
`;

export const MobileDimBackground = styled.div`
  display: none;

  @media ${({ theme }) => theme.devices.laptop} {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;
