import { useState } from 'react';
import Button from '../../../components/Button';
import * as S from './CouponModal.styled';
import type { Coupon } from '../LecturePaymentPage';

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

  if (!isOpen) return null;

  const calculateDiscount = (coupon: Coupon): number => {
    if (coupon.discount) {
      return coupon.discount;
    }
    if (coupon.discountRate) {
      const calculatedDiscount = Math.floor(lecturePrice * (coupon.discountRate / 100));
      if (coupon.maxDiscount) {
        return Math.min(calculatedDiscount, coupon.maxDiscount);
      }
      return calculatedDiscount;
    }
    return 0;
  };

  const isAvailable = (coupon: Coupon): boolean => {
    if (coupon.minPrice && lecturePrice < coupon.minPrice) {
      return false;
    }
    return true;
  };

  const handleCouponClick = (coupon: Coupon) => {
    if (!isAvailable(coupon)) return;

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
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>쿠폰 선택</S.ModalTitle>
          <S.CloseButton onClick={onClose} aria-label="모달 닫기">
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        <S.CouponList>
          {coupons.map((coupon) => {
            const available = isAvailable(coupon);
            const discountAmount = calculateDiscount(coupon);
            const isSelected = tempSelectedCoupon?.id === coupon.id;

            return (
              <S.CouponItem
                key={coupon.id}
                $selected={isSelected}
                $available={available}
                onClick={() => handleCouponClick(coupon)}
              >
                <S.RadioWrapper>
                  <S.RadioInput
                    type="radio"
                    name="coupon"
                    checked={isSelected}
                    onChange={() => {}}
                    disabled={!available}
                  />
                </S.RadioWrapper>
                <S.CouponContent>
                  <S.CouponName $available={available}>{coupon.name}</S.CouponName>
                  <S.CouponDescription $available={available}>
                    {coupon.description}
                  </S.CouponDescription>
                  {!available && coupon.minPrice && (
                    <S.CouponWarning>
                      {formatPrice(coupon.minPrice)} 이상 구매 시 사용 가능
                    </S.CouponWarning>
                  )}
                </S.CouponContent>
                <S.DiscountAmount $available={available}>
                  -{formatPrice(discountAmount)}
                </S.DiscountAmount>
              </S.CouponItem>
            );
          })}
        </S.CouponList>

        <S.ModalFooter>
          <Button fullWidth size="md" variant="primary" onClick={handleApply}>
            적용하기
          </Button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );
}
