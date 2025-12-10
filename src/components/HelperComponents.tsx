import React from 'react';
import styled from 'styled-components';
import SvgRocket from "@/assets/icons/icon-rocket.svg?react";

// --- 로딩 스피너 ---
export const LoadingSpinner: React.FC = () => (
  <S.SpinnerContainer role="status" aria-live="polite" aria-label="데이터 로딩 중">
    <S.SpinnerWrapper>
      <S.Spinner/>
      <SvgRocket className="rocket"/>
    </S.SpinnerWrapper>
  </S.SpinnerContainer>
);

// --- 로딩 닷 (...) ---
export const LoadingDots = () => {
  return (
    <S.DotsContainer>
      <S.Dots/>
      <S.Dots/>
      <S.Dots/>
    </S.DotsContainer>
  )
}

// --- 오류 메시지 ---
interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <S.ErrorWrapper>
    <span role="alert">{message || '데이터를 불러오는데 실패했습니다.'}</span>
  </S.ErrorWrapper>
);


// --- Styles ---

const S = {
  // =================
  // LoadingSpinner
  // =================
  SpinnerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 6rem;
    width: 100%;
  `,

  SpinnerWrapper: styled.div`
    width: 4.8rem;
    height: 4.8rem;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    animation: spin 1.25s ease-in-out infinite;

    .rocket {
      width: 2.2rem;
      height: auto;

      position: absolute;
      transform: translateX(100%) rotate(165deg);
    
      .body {
        fill: ${({ theme }) => theme.colors.primary300};
      }

      .wings {
        fill: ${({ theme }) => theme.colors.gray200};
      }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,

  Spinner: styled.span`
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    &::after {
      content: "";
      width: 100%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
      border: 4px solid;
      border-color: ${({ theme }) => theme.colors.primary200} ${({ theme }) => theme.colors.primary200} #0000 #0000;
      border-radius: 50%;
      animation: sweep 1.25s ease-in-out infinite;

      @keyframes sweep {
        0% {
          transform: rotate(120deg);
        }
        20% {
          transform: rotate(120deg);
        }
        60% {
          transform: rotate(-20deg);
        }
        100% {
          transform: rotate(100deg);
        }
      }
    }
  `,

  // =================
  // LoadingDots
  // =================
  DotsContainer: styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0 1.2rem;
    height: 1.8rem;
  `,
  
  Dots: styled.span`
    width: 0.7rem;
    height: 0.7rem;
    background: currentColor;
    border-radius: 50%;
    opacity: 0.2;
    animation: blink 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0ms;
    }
    &:nth-child(2) {
      animation-delay: 200ms;
    }
    &:nth-child(3) {
      animation-delay: 400ms;
    }

    @keyframes blink {
      0% { 
        opacity: 0.2; 
        scale: 0.8;
      }
      20% { 
        opacity: 1; 
        scale: 1;
      }
      100% { 
        opacity: 0.2; 
        scale: 0.8;
      }
    }
  `,

  // =================
  // ErrorMessage
  // =================
  ErrorWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem;
    width: 100%;
    
    span {
      color: ${({ theme }) => theme.colors.alert};
      background: ${({ theme }) => theme.colors.alert}20;
      border: 0.1rem solid ${({ theme }) => theme.colors.alert}80;
      border-radius: ${({ theme }) => theme.radius.md};
      padding: 1.6rem 2.4rem;
      font-weight: 600;
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,
};