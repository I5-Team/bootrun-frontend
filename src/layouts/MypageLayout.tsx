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
    gap: 40px;
    padding: 40px 0;
    max-width: 1190px;
    margin: 0 auto;
  `,
  Nav: styled.nav`
    width: 200px;
    flex-shrink: 0;
    padding: 16px 8px 16px 8px;
    border : 1px solid #E1E4E8;
    border-radius: 16px;
  `,
  NavList: styled.ul`


border-radius: 10px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;

    a {
      text-decoration: none;
      font-size: 1.6rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
      padding: 12px 16px;
      display: block;
      border-radius: 6px;

      /* react-router-dom의 NavLink가 활성화 시 active 클래스 적용 */
      &.active {
        font-weight: 700;
        background-color: #DEE8FF;
      }

      &:hover:not(.active) {
        background-color: #f9f9f9;
      }
    }
  `,
  ContentArea: styled.main`
    flex-grow: 1;
    width: 100%;
    min-width: 0; /* flex 아이템이 줄어들지 않도록 */
  `,
};

export default MyPageLayout;