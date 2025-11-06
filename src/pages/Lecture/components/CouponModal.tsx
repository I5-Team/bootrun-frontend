import { useState } from 'react';
import Button from '../../../components/Button';
import * as S from './CouponModal.styled';
import type { Coupon } from '../LecturePaymentPage';
import { calculateCouponDiscount, isCouponAvailable, formatPrice } from '../../../utils/couponUtils';

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
            const discountAmount = calculateCouponDiscount(coupon, lecturePrice);
            const available = isCouponAvailable(coupon, lecturePrice) && discountAmount > 0;
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
                  {!available && <S.CouponWarning>사용 불가능한 쿠폰입니다</S.CouponWarning>}
                </S.CouponContent>
                <S.DiscountAmount $available={available}>
                  {discountAmount === 0 ? formatPrice(0) : `-${formatPrice(discountAmount)}`}
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
