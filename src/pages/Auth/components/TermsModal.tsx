/**
 * 약관 모달 컴포넌트
 * - 이용약관 및 개인정보취급방침 표시
 * - 스크롤 감지 및 확인 버튼 활성화 로직
 */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

// 약관 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const TermsModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  width: 100%;
  max-width: 60rem;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 90vw;
    max-height: 85vh;
  }
`;

const ModalHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  padding: 4rem 4rem 0 4rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
  }
`;

const TermsContent = styled.div`
  padding: 4rem;
  overflow-y: auto;
  flex: 1;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.surface};
    margin: 2rem 0 1rem 0;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 400;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0.8rem 0;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.6rem;

    h3 {
      font-size: ${({ theme }) => theme.mobileFontSize.md};
    }

    p {
      font-size: ${({ theme }) => theme.mobileFontSize.sm};
      line-height: 2rem;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 1.6rem 2rem 2rem 2rem;
`;

const ScrollHint = styled.p`
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.gray400};
  text-align: center;
  margin: 0;
  line-height: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

interface TermsModalProps {
  /** 모달 제목 */
  title: string;
  /** 약관 내용 (HTML 문자열) */
  content: string;
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 약관 확인 완료 핸들러 */
  onConfirm: () => void;
  /** 스크롤 핸들러 */
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  /** 스크롤 끝까지 읽었는지 여부 */
  scrolledToBottom: boolean;
  /** 스크롤이 필요 없을 때 자동으로 활성화하는 콜백 */
  onCheckScrollNeeded?: () => void;
}

/**
 * 약관 모달 컴포넌트
 *
 * 이용약관과 개인정보취급방침을 표시하는 모달입니다.
 * 사용자가 약관을 끝까지 읽어야만 확인 버튼이 활성화됩니다.
 * 컨텐츠가 스크롤 없이 한 페이지에 모두 표시되는 경우 자동으로 버튼이 활성화됩니다.
 */
export const TermsModal: React.FC<TermsModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  onConfirm,
  onScroll,
  scrolledToBottom,
  onCheckScrollNeeded,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // 모달이 열릴 때 스크롤이 필요한지 체크
  useEffect(() => {
    if (isOpen && contentRef.current && onCheckScrollNeeded) {
      // DOM이 렌더링된 후 체크하기 위해 setTimeout 사용
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current;
          // 스크롤이 필요 없는 경우 (컨텐츠 높이가 보이는 영역보다 작거나 같음)
          if (scrollHeight <= clientHeight) {
            onCheckScrollNeeded();
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, content, onCheckScrollNeeded]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <TermsModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton type="button" onClick={onClose} aria-label="닫기">
            ×
          </CloseButton>
        </ModalHeader>

        <TermsContent
          ref={contentRef}
          onScroll={onScroll}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <ModalFooter>
          <Button onClick={onConfirm} disabled={!scrolledToBottom} fullWidth>
            확인했습니다
          </Button>
          {!scrolledToBottom && <ScrollHint>약관을 끝까지 읽어주세요</ScrollHint>}
        </ModalFooter>
      </TermsModalContainer>
    </ModalOverlay>
  );
};
