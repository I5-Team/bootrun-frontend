import React, { useEffect, type ReactNode } from 'react';
import styled from 'styled-components';
import SvgClose from "@/assets/icons/icon-x.svg?react";

// 기본 모달 컴포넌트 Props 정의
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  hasCloseBtn?: boolean;
  zIndex?: number;
}

// 재사용 가능한 기본 모달 컴포넌트
// Box와 Typography 컴포넌트를 사용하여 디자인 시스템 적용
const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  hasCloseBtn = true,
  zIndex,
}) => {
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
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose} $zIndex={zIndex}>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >

        <ModalHeader>
          {hasCloseBtn && (
            <CloseButton type="button" onClick={onClose} aria-label="닫기">
              <SvgClose />
            </CloseButton>
          )}
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>

        <ModalMain>
          {children}
        </ModalMain>

        {footer && (
          <ModalFooter>{footer}</ModalFooter>
        )}
      </ModalContainer>
    </Overlay>
  );
};

// --- Styles ---
// 모달 배경 오버레이 스타일 (화면 전체 덮음)
const Overlay = styled.div<{ $zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); // 어두운 오버레이
  z-index: ${({ theme, $zIndex }) => $zIndex ?? theme.zIndex.backdrop};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  z-index: ${({ theme }) => theme.zIndex.modal};

  width: fit-content;
  max-width: 80vw;
  min-width: 35vw;
  max-height: 80vh;
  padding: 2.8rem 3.2rem;

  display: flex;
  flex-direction: column;
  position: relative;

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 90vw;
    max-height: 85vh;
  }
`;

const ModalHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: end;
  flex-direction: column;
  padding-block: 1.2rem;
`;

const ModalTitle = styled.h2`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: ${({ theme }) => theme.lineHeight.normal};
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
`;

const ModalMain = styled.main`
  padding-block: 2rem;
`;

const ModalFooter = styled.footer`
  padding-top: 1.2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.8rem;
  border-radius: ${({ theme }) => theme.radius.xs};
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  svg { 
    width: 100%;
    height: 100%;
    path {
      fill: currentColor;
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
  }
`;

export default BaseModal;
