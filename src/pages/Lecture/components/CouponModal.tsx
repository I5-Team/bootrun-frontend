import { useState, useEffect, useRef } from 'react';
import Button from '../../../components/Button';
import * as S from './CouponModal.styled';
import type { Coupon } from '../LecturePaymentPage';
import {
  calculateCouponDiscount,
  isCouponAvailable,
  isCouponVisible,
  formatPrice,
} from '../../../utils/couponUtils';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  onSelectCoupon: (coupon: Coupon | null) => void;
  lecturePrice: number;
}

export default function CouponModal({
  isOpen,
  onClose,
  coupons,
  selectedCoupon,
  onSelectCoupon,
  lecturePrice,
}: CouponModalProps) {
  const [tempSelectedCoupon, setTempSelectedCoupon] = useState<Coupon | null>(selectedCoupon);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // ESC 키로 모달 닫기, 포커스 트랩, 방향키 네비게이션
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        // ESC로 닫을 때도 포커스 복원
        setTimeout(() => {
          previousActiveElementRef.current?.focus();
        }, 100);
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex="0"]'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('[role="radio"][tabindex="0"]')
      );

      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.findIndex((el) => el === document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        focusableElements[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        focusableElements[prevIndex]?.focus();
      }
    };

    if (isOpen) {
      // 모달 열릴 때 현재 포커스된 요소 저장
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);
      document.addEventListener('keydown', handleArrowKeys);
      // 모달 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';

      // 모달 열릴 때 첫 번째 쿠폰에 포커스
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCouponClick = (coupon: Coupon) => {
    if (!isCouponAvailable(coupon, lecturePrice)) return;

    // 이미 선택된 쿠폰을 다시 클릭하면 선택 취소
    if (tempSelectedCoupon?.id === coupon.id) {
      setTempSelectedCoupon(null);
    } else {
      setTempSelectedCoupon(coupon);
    }
  };

  const handleApply = () => {
    onSelectCoupon(tempSelectedCoupon);
    onClose();

    // 모달 닫힌 후 포커스 복원
    setTimeout(() => {
      previousActiveElementRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    onClose();
    // 모달 닫힌 후 포커스 복원
    setTimeout(() => {
      previousActiveElementRef.current?.focus();
    }, 100);
  };

  const visibleCoupons = coupons.filter((coupon) => isCouponVisible(coupon));

  return (
    <S.Overlay onClick={handleClose} role="presentation">
      <S.ModalContainer
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupon-modal-title"
        aria-describedby="coupon-modal-description"
      >
        <S.ModalHeader>
          <S.ModalTitle id="coupon-modal-title">쿠폰 선택</S.ModalTitle>
          <S.CloseButton onClick={handleClose} aria-label="쿠폰 선택 모달 닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        <S.CouponList role="radiogroup" aria-label="사용 가능한 쿠폰 목록">
          <span id="coupon-modal-description" style={{ position: 'absolute', left: '-10000px' }}>
            사용 가능한 쿠폰을 선택하세요. 방향키나 Tab 키로 이동하고 Enter나 스페이스바로 선택할 수
            있습니다.
          </span>
          {visibleCoupons.map((coupon, index) => {
            const discountAmount = calculateCouponDiscount(coupon, lecturePrice);
            const available = isCouponAvailable(coupon, lecturePrice);
            const isSelected = tempSelectedCoupon?.id === coupon.id;
            const isFirstAvailable = index === 0 && available;

            return (
              <S.CouponItem
                key={coupon.id}
                ref={isFirstAvailable ? firstFocusableRef : null}
                $selected={isSelected}
                $available={available}
                onClick={() => handleCouponClick(coupon)}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={!available}
                aria-label={`${coupon.name}, ${coupon.description}, 할인 금액 ${discountAmount === 0 ? formatPrice(0) : formatPrice(discountAmount)}${!available ? ', 사용 불가능' : ''}`}
                tabIndex={available ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleCouponClick(coupon);
                  }
                }}
              >
                  <S.RadioWrapper>
                    <S.RadioInput
                      type="radio"
                      name="coupon"
                      value={coupon.id}
                      checked={isSelected}
                      onChange={() => {}}
                      disabled={!available}
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  </S.RadioWrapper>
                  <S.CouponContent>
                    <S.CouponName $available={available}>{coupon.name}</S.CouponName>
                    <S.CouponDescription $available={available}>
                      {coupon.description}
                    </S.CouponDescription>
                    {!available && (
                      <S.CouponWarning role="alert" aria-live="polite">
                        사용 불가능한 쿠폰입니다
                      </S.CouponWarning>
                    )}
                  </S.CouponContent>
                  <S.DiscountAmount $available={available} aria-hidden="true">
                    {discountAmount === 0 ? formatPrice(0) : `-${formatPrice(discountAmount)}`}
                  </S.DiscountAmount>
                </S.CouponItem>
              );
            })}
        </S.CouponList>

        <S.ModalFooter>
          <Button
            fullWidth
            size="md"
            variant="primary"
            onClick={handleApply}
            ariaLabel="선택한 쿠폰 적용하기"
          >
            적용하기
          </Button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );
}
