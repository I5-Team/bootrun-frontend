import { useEffect, useRef } from 'react';

/**
 * 모달/다이얼로그의 포커스 관리 Hook
 * - ESC 키로 모달 닫기
 * - Tab 키로 모달 내에서만 포커스 순환 (포커스 트랩)
 * - 포커스 복원 (모달 오픈 전 활성 요소로 복원)
 */
export const useFocusTrap = (
  modalRef: React.RefObject<HTMLElement>,
  onClose: () => void,
  isOpen: boolean = true
) => {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // 모달 오픈 시 현재 활성 요소 저장
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // ESC 키로 모달 닫기
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        // ESC로 닫을 때 포커스 복원
        setTimeout(() => {
          previousActiveElementRef.current?.focus();
        }, 100);
      }
    };

    // Tab 키 포커스 트랩
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex="0"]'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Shift + Tab (역방향)
      if (e.shiftKey) {
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (정방향)
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose, modalRef]);
};
