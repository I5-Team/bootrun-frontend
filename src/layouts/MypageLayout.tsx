import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SvgArrowDown from '../assets/icons/icon-arrow-down.svg?react';

const navLinks = [
  { to: '/mypage', label: '프로필 설정', end: true },
  { to: '/mypage/orders', label: '결제 내역', end: false },
  { to: '/mypage/account', label: '계정 관리', end: false },
];

const MobileNavDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 현재 활성화된 링크의 텍스트 찾기
  const activeLink = navLinks.find((link) => location.pathname === link.to) || navLinks[0];

  const handleToggle = () => setIsOpen(!isOpen);

  // 링크 클릭 시 드롭다운 닫기
  const handleClose = () => setIsOpen(false);

  const dropdownId = 'mobile-nav-dropdown';

  return (
    <S.MobileNavWrapper as="nav" aria-label="마이페이지 모바일 메뉴">
      <S.MobileNavButton onClick={handleToggle} aria-controls={dropdownId} aria-expanded={isOpen}>
        {activeLink.label}
        <S.ArrowDown $isOpen={isOpen}>
          <SvgArrowDown/>
        </S.ArrowDown>
      </S.MobileNavButton>
      {isOpen && (
        <S.MobileNavDropdownList onClick={handleClose}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </S.MobileNavDropdownList>
      )}
    </S.MobileNavWrapper>
  );
};

const MyPageLayout: React.FC = () => {
  return (
    <>
      <S.MyPageContainer>
        <S.Nav aria-label="마이페이지 데스크탑 메뉴">
          <S.NavList>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </S.NavList>
        </S.Nav>
        <MobileNavDropdown />

        <S.ContentArea>
          <Outlet />
        </S.ContentArea>
      </S.MyPageContainer>
    </>
  );
};

const S = {
  MyPageContainer: styled.div`
    width: 100%;
    margin-top: 4rem;
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 2rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      gap: 3.2rem;
    }
  `,
  Nav: styled.nav`
    width: 24%;
    min-width: 24rem;
    flex-shrink: 0;
    padding: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};


    @media ${({ theme }) => theme.devices.tablet} {
      display: none;
    }
  `,
  NavList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    a {
      text-decoration: none;
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
      padding: 1.4rem 1.6rem;
      display: block;
      border-radius: ${({ theme }) => theme.radius.md};

      &.active {
        color: ${({ theme }) => theme.colors.surface};
        background-color: ${({ theme }) => theme.colors.primary100};
      }

      &:hover:not(.active) {
        background-color: ${({ theme }) => theme.colors.gray100};
      }
    }
  `,
  ContentArea: styled.section`
    flex-grow: 1;
    width: 100%;
    min-width: 0;
  `,

  MobileNavWrapper: styled.div`
    display: none;
    width: 100%;
    position: relative;

    @media ${({ theme }) => theme.devices.tablet} {
      display: block;
    }
  `,

  MobileNavButton: styled.button`
    width: 100%;
    padding-block: 1.6rem;
    padding-inline: 2.2rem 1.4rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  `,

  ArrowDown: styled.span<{ $isOpen: boolean }>`
    width: 3.2rem;
    height: 3.2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.radius.xs};
    color: ${({ theme }) => theme.colors.gray300};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;

    svg {
      width: 100%;
      height: 100%;
    }
  `,

  MobileNavDropdownList: styled.ul`
    list-style: none;
    padding: 0.8rem;
    margin-top: 0.8rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    position: absolute;
    width: 100%;
    z-index: 10;
    box-shadow: ${({ theme }) => theme.colors.shadow};

    /* S.NavList의 'a' 스타일을 그대로 복사 */
    a {
      text-decoration: none;
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
      padding: 1.6rem;
      display: block;
      border-radius: ${({ theme }) => theme.radius.md};

      &.active {
        color: ${({ theme }) => theme.colors.surface};
        background-color: ${({ theme }) => theme.colors.primary100};
      }

      &:hover:not(.active) {
        background-color: ${({ theme }) => theme.colors.gray100};
      }
    }
  `,
};

export default MyPageLayout;
