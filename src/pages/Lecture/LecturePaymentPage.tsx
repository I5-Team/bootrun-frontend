import { useState } from 'react';
import Button from '../../components/Button';
import CouponModal from './components/CouponModal';
import * as S from './LecturePaymentPage.styled';
import thumbPython2 from '../../assets/images/thumb-python2.png';
import CheckRectActive from '../../assets/icons/icon-check-rect-active.svg?react';
import CheckRectDefault from '../../assets/icons/icon-check-rect-default.svg?react';
import tossIcon from '../../assets/icons/icon-payment-toss.avif';

export interface Coupon {
  id: string;
  name: string;
  description: string;
  discount?: number;
  discountRate?: number;
  maxDiscount?: number;
  minPrice?: number;
}

interface LectureData {
  id: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  thumbnailUrl?: string;
}

export default function LecturePaymentPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  // TODO: API 연동 시 실제 데이터로 대체
  const lectureData: LectureData = {
    id: '1',
    title: '견고한 파이썬 부스트 커뮤니티 1기 (디스코드 커뮤니티)',
    instructor: '김민주',
    category: '부스트 커뮤니티',
    price: 50000,
    thumbnailUrl: thumbPython2,
  };

  // TODO: API 연동 시 실제 쿠폰 데이터로 대체
  const availableCoupons: Coupon[] = [
    {
      id: '1',
      name: '10% 할인 쿠폰',
      description: '전 강의 10% 할인',
      discountRate: 10,
      maxDiscount: 20000,
    },
    {
      id: '2',
      name: '5,000원 할인 쿠폰',
      description: '5만원 이상 구매 시',
      discount: 5000,
      minPrice: 50000,
    },
    {
      id: '3',
      name: '15,000원 할인 쿠폰',
      description: '15만원 이상 구매 시',
      discount: 15000,
      minPrice: 150000,
    },
  ];

  const calculateDiscount = (): number => {
    if (!selectedCoupon) return 0;

    if (selectedCoupon.discount) {
      return selectedCoupon.discount;
    }
    if (selectedCoupon.discountRate) {
      const calculatedDiscount = Math.floor(
        lectureData.price * (selectedCoupon.discountRate / 100)
      );
      if (selectedCoupon.maxDiscount) {
        return Math.min(calculatedDiscount, selectedCoupon.maxDiscount);
      }
      return calculatedDiscount;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const totalPrice = lectureData.price - discount;

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const handlePayment = () => {
    // TODO: API 연동 시 결제 로직 구현
    if (!isAgreed) {
      alert('주문 내용 확인 및 정보 제공 동의가 필요합니다.');
      return;
    }
    if (!selectedPaymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }
    console.log('결제 진행:', {
      coupon: selectedCoupon,
      totalPrice,
      paymentMethod: selectedPaymentMethod,
    });
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
  };

  return (
    <>
      <S.PageContainer>
        <S.ContentWrapper>
          <S.LeftSection>
            <S.SectionTitle>강의 구매</S.SectionTitle>
            <S.LectureCard>
              <S.LectureThumbnail
                $thumbnailUrl={lectureData.thumbnailUrl}
                aria-label="강의 썸네일"
                role="img"
              />
              <S.LectureInfo>
                <S.CategoryBadge>{lectureData.category}</S.CategoryBadge>
                <S.LectureTitle>{lectureData.title}</S.LectureTitle>
                <S.LectureInstructor>{lectureData.instructor}</S.LectureInstructor>
                <S.LecturePrice>{formatPrice(lectureData.price)}</S.LecturePrice>
              </S.LectureInfo>
            </S.LectureCard>
          </S.LeftSection>

          <S.RightSection>
            <S.SectionTitle>최종 결제 정보</S.SectionTitle>

            {/* 결제 정보 카드 */}
            <S.PaymentCard>
              <S.PriceSection>
                <S.PriceRow>
                  <S.PriceLabel>상품 금액</S.PriceLabel>
                  <S.PriceValue>{formatPrice(lectureData.price)}</S.PriceValue>
                </S.PriceRow>

                {/* 쿠폰 섹션 */}
                <div>
                  <S.CouponRow>
                    <S.CouponLabel>쿠폰</S.CouponLabel>
                    <S.CouponButton
                      onClick={() => setIsCouponModalOpen(true)}
                      aria-label="쿠폰 선택"
                    >
                      사용 가능 {availableCoupons.length}
                    </S.CouponButton>
                  </S.CouponRow>
                  {selectedCoupon && (
                    <S.SelectedCouponInfo>
                      <S.SelectedCouponText>
                        {selectedCoupon.name} 적용 (-{formatPrice(discount)})
                      </S.SelectedCouponText>
                      <S.RemoveCouponButton onClick={handleRemoveCoupon}>취소</S.RemoveCouponButton>
                    </S.SelectedCouponInfo>
                  )}
                </div>

                <S.PriceRow>
                  <S.PriceLabel>할인 금액</S.PriceLabel>
                  <S.PriceValue>{discount === 0 ? '-' : `-${formatPrice(discount)}`}</S.PriceValue>
                </S.PriceRow>
              </S.PriceSection>

              <S.Divider />

              <S.TotalPriceRow>
                <S.TotalLabel>총 결제 금액</S.TotalLabel>
                <S.TotalPrice>{formatPrice(totalPrice)}</S.TotalPrice>
              </S.TotalPriceRow>
            </S.PaymentCard>

            {/* 결제 수단 및 결제 실행 카드 */}
            <S.SectionTitle>결제 수단</S.SectionTitle>
            <S.Card>
              <S.PaymentMethodSection>
                <S.PaymentMethodOption
                  $selected={selectedPaymentMethod === 'tosspay'}
                  onClick={() =>
                    setSelectedPaymentMethod(selectedPaymentMethod === 'tosspay' ? '' : 'tosspay')
                  }
                >
                  <S.PaymentMethodIcon src={tossIcon} alt="토스페이" />
                  토스페이
                </S.PaymentMethodOption>
              </S.PaymentMethodSection>

              <S.PaymentDivider />

              <S.CheckboxWrapper>
                <S.HiddenCheckbox
                  id="agreement"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  aria-label="주문 내용 확인 및 정보 제공 동의"
                />
                <S.CustomCheckbox $checked={isAgreed}>
                  {isAgreed ? <CheckRectActive /> : <CheckRectDefault />}
                </S.CustomCheckbox>
                <S.CheckboxLabel htmlFor="agreement">
                  주문 내용을 확인하였으며, 정보 제공에 동의합니다.
                </S.CheckboxLabel>
              </S.CheckboxWrapper>

              <S.ButtonWrapper>
                <Button
                  fullWidth
                  size="lg"
                  variant="primary"
                  disabled={!isAgreed || !selectedPaymentMethod}
                  onClick={handlePayment}
                  ariaLabel="결제하기"
                >
                  <span style={{ fontWeight: 600 }}>결제하기</span>
                </Button>
              </S.ButtonWrapper>
            </S.Card>
          </S.RightSection>
        </S.ContentWrapper>
      </S.PageContainer>

      {/* 쿠폰 선택 모달 */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        coupons={availableCoupons}
        selectedCoupon={selectedCoupon}
        onSelectCoupon={setSelectedCoupon}
        lecturePrice={lectureData.price}
      />
    </>
  );
}
