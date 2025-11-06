import React from 'react';
import styled, { keyframes } from 'styled-components';

// --- 1. 로딩 스피너 ---

export const LoadingSpinner: React.FC = () => (
  <S.SpinnerWrapper>
    <S.Spinner />
  </S.SpinnerWrapper>
);

// --- 2. 오류 메시지 ---

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <S.ErrorWrapper>
    <span role="alert">{message || '데이터를 불러오는데 실패했습니다.'}</span>
  </S.ErrorWrapper>
);


// --- Styles ---

// 로딩 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const S = {
  SpinnerWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 0; // 섹션 내부에서 충분한 공간 확보
    width: 100%;
  `,

  Spinner: styled.div`
    border: 4px solid #f3f5fa; // 배경색
    border-top: 4px solid #2e6ff2; // 메인색
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
  `,

  ErrorWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 0;
    width: 100%;
    
    span {
      color: #ff4d4d; // 에러 색상
      background: #fff0f0;
      border: 1px solid #ffb8b8;
      border-radius: 8px;
      padding: 16px 24px;
      font-weight: 500;
      font-size: 16px;
    }
  `,
};