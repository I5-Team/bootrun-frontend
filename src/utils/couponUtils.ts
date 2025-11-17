import type { Coupon } from '../pages/Lecture/LecturePaymentPage';

/**
 * 쿠폰의 할인 금액을 계산합니다.
 * @param coupon - 쿠폰 정보
 * @param lecturePrice - 강의 가격
 * @returns 할인 금액
 */
export const calculateCouponDiscount = (coupon: Coupon, lecturePrice: number): number => {
  // 고정 금액 할인
  if (coupon.discountAmount) {
    return coupon.discountAmount;
  }

  // 비율 할인
  if (coupon.discountRate) {
    const calculatedDiscount = Math.floor(lecturePrice * (coupon.discountRate / 100));
    return calculatedDiscount;
  }

  return 0;
};

/**
 * 쿠폰이 목록에 표시되어야 하는지 검증합니다.
 * (기한, 활성화 여부, 사용 횟수, 강의 ID 체크)
 * @param coupon - 쿠폰 정보
 * @param lectureId - 강의 ID (선택적)
 * @returns 표시 가능 여부
 */
export const isCouponVisible = (coupon: Coupon, lectureId?: number): boolean => {
  // 1. 활성화 여부 체크
  if (!coupon.isActive) {
    return false;
  }

  // 2. 유효 기간 체크
  const now = new Date();
  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);

  if (now < validFrom || now > validUntil) {
    return false;
  }

  // 3. 사용 가능 횟수 체크
  if (coupon.maxUsage !== undefined && coupon.usedCount !== undefined) {
    if (coupon.usedCount >= coupon.maxUsage) {
      return false;
    }
  }

  // 4. 특정 강의 전용 쿠폰 체크
  if (coupon.courseId !== null && lectureId !== undefined) {
    if (coupon.courseId !== lectureId) {
      return false;
    }
  }

  return true;
};

/**
 * 쿠폰의 사용 가능 여부를 검증합니다.
 * (표시 가능 여부 + 할인 금액이 0원 이상인지 체크)
 * @param coupon - 쿠폰 정보
 * @param lecturePrice - 강의 가격
 * @param lectureId - 강의 ID (선택적)
 * @returns 사용 가능 여부
 */
export const isCouponAvailable = (
  coupon: Coupon,
  lecturePrice: number,
  lectureId?: number
): boolean => {
  // 1. 표시 가능 여부 체크
  if (!isCouponVisible(coupon, lectureId)) {
    return false;
  }

  // 2. 할인 금액이 0원 이상인지 체크
  const discount = calculateCouponDiscount(coupon, lecturePrice);
  return discount > 0;
};

/**
 * 가격을 한국 원화 포맷으로 변환합니다.
 * @param price - 가격
 * @returns 포맷된 가격 문자열 (예: "50,000원")
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원';
};
