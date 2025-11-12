import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
        <S.ArrowDown $isOpen={isOpen} />
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
    margin-top: 3.2rem;
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 4rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      gap: 3.2rem;
    }
  `,
  Nav: styled.nav`
    width: 20%;
    flex-shrink: 0;

    @media ${({ theme }) => theme.devices.tablet} {
      display: none; /* 모바일 크기에서 숨김 */
    }
  `,
  NavList: styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem; /* 4px */

    a {
      text-decoration: none;
      font-size: 1.6rem; /* 16px */
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray300}; // (테마 가정)
      padding: 1.6rem; /* 16px */
      display: block;
      border-radius: 0.6rem; /* 6px */

      &.active {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.surface}; // (테마 가정)
        background-color: ${({ theme }) => theme.colors.gray100}; // (테마 가정)
      }

      &:hover:not(.active) {
        background-color: #f9f9f9;
      }
    }
  `,
  ContentArea: styled.main`
    flex-grow: 1;
    width: 100%;
    min-width: 0;
  `,

  MobileNavWrapper: styled.div`
    display: none; /* 기본(데스크탑)은 숨김 */
    width: 100%;
    position: relative; /* 드롭다운 리스트의 기준점 */

    @media ${({ theme }) => theme.devices.tablet} {
      display: block; /* 모바일 크기에서 보임 */
    }
  `,

  MobileNavButton: styled.button`
    width: 100%;
    padding: 1.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    background: ${({ theme }) => theme.colors.gray100};
    border: 1px solid ${({ theme }) => theme.colors.gray200}; // (테마 가정)
    border-radius: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  `,

  ArrowDown: styled.span<{ $isOpen: boolean }>`
    &::before {
      content: '▼';
      display: inline-block;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray300};
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease;
    }
  `,

  MobileNavDropdownList: styled.ul`
    list-style: none;
    padding: 0.8rem;
    margin: 0.8rem 0 0;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 0.6rem;
    position: absolute;
    width: 100%;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    /* S.NavList의 'a' 스타일을 그대로 복사 */
    a {
      text-decoration: none;
      font-size: 1.6rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray300};
      padding: 1.6rem;
      display: block;
      border-radius: 0.6rem;

      &.active {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.surface};
        background-color: ${({ theme }) => theme.colors.gray100};
      }

      &:hover:not(.active) {
        background-color: #f9f9f9;
      }
    }
  `,
};

export default MyPageLayout;
