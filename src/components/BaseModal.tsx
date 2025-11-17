// src/components/common/BaseModal.tsx

import React, { useEffect, type ReactNode } from 'react';
import styled from 'styled-components';
// import CloseIcon from '../../assets/icons/icon-close.svg?react';

// (임시) 닫기 아이콘
const CloseIcon = () => <>X</>;

interface BaseModalProps {
  /** 모달의 열림/닫힘 상태 */
  isOpen: boolean;
  /** 닫기 버튼 또는 오버레이 클릭 시 호출될 함수 */
  onClose: () => void;
  /** 모달의 제목 (선택 사항) */
  title: string;
  /** 모달의 본문 내용 (React 컴포넌트) */
  children: ReactNode;
  /** 모달의 하단 버튼 영역 (React 컴포넌트) */
  footer?: ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const titleId = 'base-modal-title';
  const descriptionId = 'base-modal-description';

  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // 오버레이 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <S.Header>
          <S.Title id={titleId}>{title}</S.Title>
          <S.CloseButton onClick={onClose} aria-label="모달 닫기">
            <CloseIcon />
          </S.CloseButton>
        </S.Header>

        {/* 1. 본문(children)이 주입되는 곳 */}
        <S.Content id={descriptionId}>{children}</S.Content>

        {/* 2. 푸터(footer)가 주입되는 곳 */}
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.ModalContainer>
    </S.Overlay>
  );
};

// --- Styles ---
const S = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); // 어두운 오버레이
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ModalContainer: styled.div`
    width: 90%;
    max-width: 60rem; // 최대 너비
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    display: flex;
    flex-direction: column;
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  `,
  Title: styled.h3`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    margin: 0;
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  Content: styled.div`
    padding: 2.4rem;
    // 본문 내용이 길어질 경우 스크롤
    max-height: 60vh;
    overflow-y: auto;
  `,
  Footer: styled.footer`
    padding: 2rem 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    display: flex;
    justify-content: flex-end; // 버튼을 오른쪽 정렬
    gap: 1.2rem;
  `,
};

export default BaseModal;
