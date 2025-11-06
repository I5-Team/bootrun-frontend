import React from 'react';
import styled from 'styled-components';

// (가상) 스텁 컴포넌트들.
// TODO: '/components/admin/' 폴더 하위의 실제 파일로 분리해야 합니다.

const StatsCardArea: React.FC = () => (
  <S.StatsGrid>
    <S.CardBox>
      <S.CardTitle>오늘 접속자 수</S.CardTitle>
      <S.CardContentPlaceholder>
        <span>(아이콘 + 숫자 + 전일 대비)</span>
      </S.CardContentPlaceholder>
    </S.CardBox>
    <S.CardBox>
      <S.CardTitle>총 조회수</S.CardTitle>
      <S.CardContentPlaceholder>
        <span>(아이콘 + 숫자 + 전일 대비)</span>
      </S.CardContentPlaceholder>
    </S.CardBox>
    <S.CardBox>
      <S.CardTitle>결제 금액 합계</S.CardTitle>
      <S.CardContentPlaceholder>
        <span>(아이콘 + 숫자 + 전일 대비)</span>
      </S.CardContentPlaceholder>
    </S.CardBox>
    <S.CardBox>
      <S.CardTitle>신규 회원 수</S.CardTitle>
      <S.CardContentPlaceholder>
        <span>(아이콘 + 숫자 + 전일 대비)</span>
      </S.CardContentPlaceholder>
    </S.CardBox>
  </S.StatsGrid>
);

const ChartArea: React.FC = () => (
  <S.ChartGrid>
    <S.CardBox>
      <S.SectionTitle>일별 접속자 수 (LineChart)</S.SectionTitle>
      <S.ChartPlaceholder>[LineChart 영역]</S.ChartPlaceholder>
    </S.CardBox>
    <S.CardBox>
      <S.SectionTitle>일별 조회수 (BarChart)</S.SectionTitle>
      <S.ChartPlaceholder>[BarChart 영역]</S.ChartPlaceholder>
    </S.CardBox>
    <S.CardBox>
      <S.SectionTitle>일별 결제 금액 (LineChart)</S.SectionTitle>
      <S.ChartPlaceholder>[LineChart 영역]</S.ChartPlaceholder>
    </S.CardBox>
  </S.ChartGrid>
);

const ProgressArea: React.FC = () => (
  <S.CardBox>
    <S.SectionTitle>과목별 수강 진행률</S.SectionTitle>
    <S.ChartPlaceholder>
      (PieChart / HorizontalBar / RingChart 등이 이곳에 표시됩니다.)
    </S.ChartPlaceholder>
  </S.CardBox>
);

const TableArea: React.FC = () => (
  <S.CardBox>
    <S.SectionTitle>결제 상세 내역</S.SectionTitle>
    <S.ChartPlaceholder>
      (검색창 + 기간 필터 + 내보내기 버튼 + React Table이 이곳에 표시됩니다.)
    </S.ChartPlaceholder>
  </S.CardBox>
);

// --- 헬퍼 함수 ---
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// --- 관리자 대시보드 메인 페이지 ---

export default function DashboardPage() {
  const todayDate = getTodayDate();

  return (
    <S.PageWrapper>
      {/* 1. 페이지 헤더 */}
      <S.PageHeader>
        <S.PageTitle>관리자 대시보드</S.PageTitle>
        <S.DateDisplay>{todayDate}</S.DateDisplay>
      </S.PageHeader>

      {/* 2. 대시보드 콘텐츠 영역 (프롬프트 순서대로 섹션 배치) */}
      <S.ContentLayout>
        <StatsCardArea />
        <ChartArea />
        <ProgressArea />
        <TableArea />
      </S.ContentLayout>
    </S.PageWrapper>
  );
}

// --- Styles (제공해주신 theme.ts 기반으로 적용) ---
// (styled.d.ts 파일에 전역 테마 타입이 선언되었다고 가정합니다)

const S = {
  PageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 2.4rem;
    background-color: ${({ theme }) => theme.colors.gray100}; // #F3F5FA
    min-height: 100vh;
  `,

  PageHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  PageTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xl}; // 3.2rem
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface}; // #121314
    margin: 0;
  `,
  DateDisplay: styled.span`
    font-size: ${({ theme }) => theme.fontSize.md}; // 1.6rem
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300}; // #8D9299
  `,

  ContentLayout: styled.main`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,

  /** 1. 통계 카드 4개용 그리드 */
  StatsGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    /* 992px 이하에서 2열 */
    @media (${({ theme }) => theme.devices.laptop}) {
      grid-template-columns: repeat(2, 1fr);
    }
    /* 478px 이하에서 1열 */
    @media (${({ theme }) => theme.devices.mobile}) {
      grid-template-columns: 1fr;
    }
  `,

  /** 2. 차트 3개용 그리드 */
  ChartGrid: styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    /* 992px 이하에서 1열 */
    @media (${({ theme }) => theme.devices.laptop}) {
      grid-template-columns: 1fr;
    }
  `,

  /** 모든 섹션의 기본이 되는 카드 스타일 */
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white}; // #FFFFFF
    border-radius: ${({ theme }) => theme.radius.md}; // 1rem
    padding: 2.4rem;
    box-shadow: ${({ theme }) => theme.colors.shadow}; // 0 4px 20px 0 rgba(0, 0, 0, 0.04)
  `,

  /** (StatsCardArea) 통계 카드의 작은 제목 */
  CardTitle: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.md}; // 1.6rem
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray400}; // #47494D
    margin: 0 0 1.6rem 0;
  `,

  /** (Chart/Table) 섹션의 큰 제목 */
  SectionTitle: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.lg}; // 2.4rem
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface}; // #121314
    margin: 0 0 1.6rem 0;
  `,

  /** 통계 카드 내용 자리 표시자 */
  CardContentPlaceholder: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 10rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  
  /** 차트/테이블 영역 자리 표시자 */
  ChartPlaceholder: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 25rem;
    background: ${({ theme }) => theme.colors.primary100}; // #DEE8FF
    border-radius: ${({ theme }) => theme.radius.sm}; // 0.8rem
    color: ${({ theme }) => theme.colors.primary300}; // #2E6FF2
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    line-height: 1.6;
    text-align: center;
  `,
};