/**
 * 관리자 페이지 공통 스타일
 * DashBoardPage, LectureManagePage, UserManagePage에서 공통으로 사용
 */
import styled from 'styled-components';

export const AdminPageStyles = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: clamp(1.6rem, 3vw, 2.4rem);
    width: 100%;
    min-width: 0;
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.white};
    padding: clamp(1.6rem, 3vw, 2.4rem);
  `,

  PageHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    column-gap: clamp(1.2rem, 2.5vw, 2.4rem);
    row-gap: clamp(0.8rem, 2vw, 1.6rem);

    margin-top: clamp(3.6rem, 3vw, 4.2rem);
    margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
  `,

  PageTitle: styled.h2`
    font-size: clamp(2.2rem, 4vw, ${({ theme }) => theme.fontSize.xl});
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
    line-height: 1.2;
  `,

  DateDisplay: styled.span`
    font-size: clamp(1.3rem, 2.4vw, ${({ theme }) => theme.fontSize.md});
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
    margin-left: auto;
    white-space: nowrap;
    flex-shrink: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-left: 0;
      width: 100%;
      text-align: left;
      white-space: normal;
    }
  `,

  ContentLayout: styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(1.6rem, 3vw, 2.4rem);
    min-height: auto;
    width: 100%;
  `,

  CardBox: styled.section`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: clamp(1.6rem, 3vw, 2.4rem);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  `,

  TableHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface};
  `,

  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    color: ${({ theme }) => theme.colors.gray300};
  `,

  PaginationWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2.4rem;
  `,
};
