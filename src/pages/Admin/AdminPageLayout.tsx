/**
 * 관리자 페이지 공통 레이아웃 컴포넌트
 * 페이지 제목, 우측 액션 버튼 등을 통일된 형태로 제공
 */
import React from 'react';
import { AdminPageStyles as S } from './AdminPageStyles';

interface AdminPageLayoutProps {
  /** 페이지 제목 */
  title: string;
  /** 페이지 제목 우측에 표시될 요소 (날짜, 버튼 등) */
  rightElement?: React.ReactNode;
  /** 페이지 본문 콘텐츠 */
  children: React.ReactNode;
}

export default function AdminPageLayout({
  title,
  rightElement,
  children,
}: AdminPageLayoutProps) {
  return (
    <S.PageWrapper>
      <S.PageHeader>
        <S.PageTitle id="page-title">{title}</S.PageTitle>
        {rightElement}
      </S.PageHeader>
      <S.ContentLayout role="main" aria-labelledby="page-title">
        {children}
      </S.ContentLayout>
    </S.PageWrapper>
  );
}
