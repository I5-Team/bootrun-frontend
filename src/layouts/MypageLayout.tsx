import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MyPageLayout: React.FC = () => {
  return (
    <S.MyPageContainer>
      <S.Nav>
        <S.NavList>
          <li>
            <NavLink to="/mypage" end>프로필 설정</NavLink>
          </li>
          <li>
            <NavLink to="/mypage/orders">결제 내역</NavLink>
          </li>
          <li>
            <NavLink to="/mypage/account">계정 관리</NavLink>
          </li>
        </S.NavList>
      </S.Nav>
      <S.ContentArea>
        <Outlet />
      </S.ContentArea>
    </S.MyPageContainer>
  );
};

const S = {
  MyPageContainer: styled.div`
    display: flex;
    gap: 4rem; /* 40px */
    padding: 4rem 0; /* 40px */
    max-width: 1190px; /* (가정) */
    margin: 0 auto;
  `,
  Nav: styled.nav`
    width: 20rem; /* 200px */
    flex-shrink: 0;
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
};

export default MyPageLayout;