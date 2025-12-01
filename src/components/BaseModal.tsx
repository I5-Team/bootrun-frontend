import React, { useEffect, type ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box, Flex } from './Box';
import { Text } from './Typography';

// (임시) 닫기 아이콘
const CloseIcon = () => <>X</>;

// 기본 모달 컴포넌트 Props 정의
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

// 재사용 가능한 기본 모달 컴포넌트
// Box와 Typography 컴포넌트를 사용하여 디자인 시스템 적용
const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  const theme = useTheme();
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
    <Overlay onClick={handleOverlayClick}>
      <Box
        width="90%"
        bg="white"
        style={{
          maxWidth: '60rem',
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.lg,
          display: 'flex',
          flexDirection: 'column'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Flex justify="space-between" align="center" p={20} style={{ borderBottom: `1px solid ${theme.colors.gray100}` }}>
          <Text id={titleId} variant="lg" weight="bold">{title}</Text>
          <CloseButton onClick={onClose} aria-label="모달 닫기">
            <CloseIcon />
          </CloseButton>
        </Flex>

        {/* 1. 본문(children)이 주입되는 곳 */}
        <Box p={24} style={{ maxHeight: '60vh', overflowY: 'auto' }} id={descriptionId}>
          {children}
        </Box>

        {/* 2. 푸터(footer)가 주입되는 곳 */}
        {footer && (
          <Flex justify="flex-end" gap={12} p={20} style={{ borderTop: `1px solid ${theme.colors.gray100}` }}>
            {footer}
          </Flex>
        )}
      </Box>
    </Overlay>
  );
};

// --- Styles ---
// Overlay needs fixed position which Box doesn't support directly yet without style prop
// 모달 배경 오버레이 스타일 (화면 전체 덮음)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); // 어두운 오버레이
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.gray300};
`;

export default BaseModal;
