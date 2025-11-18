import { useState } from 'react';
import Button from '../../../components/Button';
import CouponModal from '../components/CouponModal';
import * as S from '../styles/LecturePaymentPage.styled';
import CheckRectActive from '../../../assets/icons/icon-check-rect-active.svg?react';
import CheckRectDefault from '../../../assets/icons/icon-check-rect-default.svg?react';
import tossIcon from '../../../assets/icons/icon-payment-toss.avif';
import { calculateCouponDiscount, formatPrice } from '../../../utils/couponUtils';
import { useCourseDetailQuery } from '../../../queries/useCourseQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryLabel } from '../../../types/CourseType';
import { usePostPayments } from '../../../queries/usePaymentsQueries';
import type { PaymentMethod, PaymentsBodyData } from '../../../types/PaymentsType';
import { ROUTES } from '../../../router/RouteConfig';
import { ErrorMessage } from '../../../components/HelperComponents';
import { getFullImageUrl } from '../../../utils/imageUtils';

export interface Coupon {
  // 기본 정보
  id: number;
  courseId: number | null;
  code: string;
  name: string;
  description: string;

  // 할인 정보
  discountRate?: number;
  discountAmount?: number;

  validFrom: string;
  validUntil: string;
  maxUsage?: number;
  usedCount?: number;
  isActive: boolean;

  // 메타 정보
  createdAt: string;
}
// TODO: API 연동 시 실제 쿠폰 데이터로 대체
const availableCoupons: Coupon[] = [
  {
    id: 1,
    courseId: null,
    code: 'WELCOME10',
    name: '10% 할인 쿠폰',
    description: '전 강의 10% 할인',
    discountRate: 10,
    validFrom: '2025-01-01T00:00:00Z',
    validUntil: '2025-12-31T23:59:59Z',
    maxUsage: 100,
    usedCount: 23,
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    courseId: null,
    code: 'SAVE3000',
    name: '3,000원 할인 쿠폰',
    description: '3만원 이상 구매 시 사용 가능',
    discountAmount: 3000,
    validFrom: '2025-01-01T00:00:00Z',
    validUntil: '2025-12-31T23:59:59Z',
    isActive: true,
    createdAt: '2025-01-01T00:00:00Z',
  },
];

// components
export interface Coupon {
  // 기본 정보
  id: number;
  courseId: number | null;
  code: string;
  name: string;
  description: string;

  // 할인 정보
  discountRate?: number;
  discountAmount?: number;

  validFrom: string;
  validUntil: string;
  maxUsage?: number;
  usedCount?: number;
  isActive: boolean;

  // 메타 정보
  createdAt: string;
}

// PaymentMethodButton
interface PaymentMethodInterface {
  payment_method: PaymentMethod;
  displayName: string;
  icon?: string;
}

const paymentMethodList: PaymentMethodInterface[] = [
  { payment_method: 'toss', displayName: '토스페이', icon: tossIcon },
  { payment_method: 'transfer', displayName: '계좌이체' },
  { payment_method: 'card', displayName: '신용/체크카드' },
];

const PaymentMethodButton = ({
  method,
  selected,
  setSelectedPaymentMethod,
}: {
  method: PaymentMethodInterface;
  selected: boolean;
  setSelectedPaymentMethod: (value: PaymentMethod | null) => void;
}) => {
  const handleToggle = () => {
    setSelectedPaymentMethod(selected ? null : method.payment_method);
  };

  return (
    <S.PaymentMethodOption
      $selected={selected}
      onClick={handleToggle}
      role="radio"
      aria-checked={selected}
      aria-label={`${method.displayName}로 결제`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {method.icon && <S.PaymentMethodIcon src={method.icon} alt="" aria-hidden="true" />}
      {method.displayName}
    </S.PaymentMethodOption>
  );
};

//
export default function LecturePaymentPage() {
  // useState
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  // hooks
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const { data: courseData } = useCourseDetailQuery(courseId);
  const postPaymentMutation = usePostPayments();

  // 데이터 없으면
  if (!courseData) return <ErrorMessage message="불러올 데이터가 없습니다." />;

  // 할인
  const calculateDiscount = (): number => {
    if (!selectedCoupon) return 0;
    return calculateCouponDiscount(selectedCoupon, courseData.price);
  };
  const discount = calculateDiscount();
  const totalPrice = courseData.price - discount;

  // 결제하기 이벤트
  const handlePayment = () => {
    if (!isAgreed) {
      alert('주문 내용 확인 및 정보 제공 동의가 필요합니다.');
      return;
    }
    if (!selectedPaymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }

    const paymentBodyData: PaymentsBodyData = {
      course_id: courseId,
      payment_method: selectedPaymentMethod,
    };

    const resultPath = ROUTES.LECTURE_PAYMENT_RESULT.replace(':id', String(courseId));

    postPaymentMutation.mutate(paymentBodyData, {
      onSuccess: (data) => {
        if (data?.id) {
          const paymentId = data.id;
          navigate({
            pathname: resultPath,
            search: `?paymentId=${paymentId}`,
          });
        }
      },
      onError: (err: any) => {
        console.error('결제 실패', err);
        navigate({
          pathname: resultPath,
          search: `?status=fail`,
        });
      },
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
            <S.SectionTitle as="h2">강의 구매</S.SectionTitle>
            <S.LectureCard>
              <S.LectureThumbnail
                $thumbnailUrl={getFullImageUrl(courseData.thumbnail_url)}
                role="img"
                aria-label={`${courseData.title} 강의 썸네일`}
              />
              <S.LectureInfo>
                <S.CategoryBadge aria-label="카테고리:">
                  {categoryLabel[courseData.category_type]}
                </S.CategoryBadge>
                <S.LectureTitle>{courseData.title}</S.LectureTitle>
                <S.LectureInstructor aria-label="강사:">
                  {courseData.instructor_name}
                </S.LectureInstructor>
                <S.LecturePrice aria-label="강의 가격:">
                  {formatPrice(courseData.price)}
                </S.LecturePrice>
              </S.LectureInfo>
            </S.LectureCard>
          </S.LeftSection>

          <S.RightSection>
            <S.SectionTitle as="h2">최종 결제 정보</S.SectionTitle>

            {/* 결제 정보 카드 */}
            <S.PaymentCard role="region" aria-label="결제 금액 정보">
              <S.PriceSection>
                <S.PriceRow>
                  <S.PriceLabel>상품 금액</S.PriceLabel>
                  <S.PriceValue aria-label="상품 금액">
                    {formatPrice(courseData.price)}
                  </S.PriceValue>
                </S.PriceRow>

                {/* 쿠폰 섹션 */}
                <div>
                  <S.CouponRow>
                    <S.CouponLabel id="coupon-label">쿠폰</S.CouponLabel>
                    <S.CouponButton
                      onClick={() => setIsCouponModalOpen(true)}
                      aria-label={`쿠폰 선택, 사용 가능한 쿠폰 ${availableCoupons.length}개`}
                      aria-describedby="coupon-label"
                    >
                      사용 가능 {availableCoupons.length}
                    </S.CouponButton>
                  </S.CouponRow>
                  {selectedCoupon && (
                    <S.SelectedCouponInfo role="status" aria-live="polite">
                      <S.SelectedCouponText>
                        {selectedCoupon.name} 적용 (-{formatPrice(discount)})
                      </S.SelectedCouponText>
                      <S.RemoveCouponButton
                        onClick={handleRemoveCoupon}
                        aria-label={`${selectedCoupon.name} 쿠폰 적용 취소`}
                      >
                        취소
                      </S.RemoveCouponButton>
                    </S.SelectedCouponInfo>
                  )}
                </div>

                <S.PriceRow>
                  <S.PriceLabel>할인 금액</S.PriceLabel>
                  <S.PriceValue
                    aria-label={`할인 금액 ${discount === 0 ? '없음' : formatPrice(discount)}`}
                  >
                    {discount === 0 ? '-' : `-${formatPrice(discount)}`}
                  </S.PriceValue>
                </S.PriceRow>
              </S.PriceSection>

              <S.Divider role="separator" aria-hidden="true" />

              <S.TotalPriceRow>
                <S.TotalLabel>총 결제 금액</S.TotalLabel>
                <S.TotalPrice aria-label={`총 결제 금액 ${formatPrice(totalPrice)}`}>
                  {formatPrice(totalPrice)}
                </S.TotalPrice>
              </S.TotalPriceRow>
            </S.PaymentCard>

            {/* 결제 수단 및 결제 실행 카드 */}
            <S.SectionTitle as="h2">결제 수단</S.SectionTitle>
            <S.Card role="region" aria-label="결제 수단 선택 및 결제 실행">
              <S.PaymentMethodSection role="radiogroup" aria-label="결제 수단">
                {paymentMethodList.map((method) => (
                  <PaymentMethodButton
                    key={method.payment_method}
                    method={method}
                    selected={selectedPaymentMethod === method.payment_method}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                  />
                ))}
              </S.PaymentMethodSection>

              <S.PaymentDivider role="separator" aria-hidden="true" />

              <S.CheckboxWrapper>
                <S.HiddenCheckbox
                  id="agreement"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  aria-describedby="agreement-label"
                />
                <S.CustomCheckbox $checked={isAgreed} aria-hidden="true">
                  {isAgreed ? <CheckRectActive /> : <CheckRectDefault />}
                </S.CustomCheckbox>
                <S.CheckboxLabel htmlFor="agreement" id="agreement-label">
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
                  ariaLabel={`총 ${formatPrice(totalPrice)} 결제하기${!isAgreed ? ', 동의 필요' : ''}${!selectedPaymentMethod ? ', 결제 수단 선택 필요' : ''}`}
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
        lecturePrice={courseData.price}
      />
    </>
  );
}
