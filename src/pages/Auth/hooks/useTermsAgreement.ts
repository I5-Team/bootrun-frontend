/**
 * 약관 동의 로직을 관리하는 커스텀 훅
 * - 약관 동의 체크박스 상태 관리
 * - 이용약관 및 개인정보취급방침 모달 표시 상태
 * - 약관 확인 완료 상태 및 스크롤 감지
 */
import { useState } from 'react';

// useTermsAgreement 훅의 반환 타입
interface UseTermsAgreementReturn {
  // 약관 동의 상태
  agreedToTerms: boolean;
  termsError: boolean;
  showTermsModal: boolean;
  showPrivacyModal: boolean;
  hasViewedTerms: boolean;
  hasViewedPrivacy: boolean;
  termsScrolledToBottom: boolean;
  privacyScrolledToBottom: boolean;

  // 핸들러 함수들
  handleTermsCheckboxChange: () => void;
  handleConfirmTerms: () => void;
  handleConfirmPrivacy: () => void;
  handleTermsScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handlePrivacyScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  handleCheckTermsScrollNeeded: () => void;
  handleCheckPrivacyScrollNeeded: () => void;
  setShowTermsModal: (show: boolean) => void;
  setShowPrivacyModal: (show: boolean) => void;
  setTermsError: (error: boolean) => void;
}

/**
 * 약관 동의 로직을 관리하는 커스텀 훅
 *
 * 이 훅은 다음을 관리합니다:
 * - 약관 동의 체크박스 상태
 * - 이용약관 및 개인정보취급방침 모달 표시 상태
 * - 약관 확인 완료 상태 (읽었는지 여부)
 * - 약관 스크롤 상태 (끝까지 읽었는지 여부)
 * - 약관 동의 에러 상태
 */
export const useTermsAgreement = (): UseTermsAgreementReturn => {
  // 약관 동의 상태
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // 약관 확인 상태
  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [hasViewedPrivacy, setHasViewedPrivacy] = useState(false);

  // 모달 스크롤 상태
  const [termsScrolledToBottom, setTermsScrolledToBottom] = useState(false);
  const [privacyScrolledToBottom, setPrivacyScrolledToBottom] = useState(false);

  // 약관 동의 체크박스 토글
  const handleTermsCheckboxChange = () => {
    // 약관을 확인하지 않았을 때
    if (!hasViewedTerms || !hasViewedPrivacy) {
      setTermsError(true);
      // 약관을 읽지 않았을 때는 체크를 허용하지 않음
      return;
    }
    // 약관을 모두 확인했을 때만 체크/해제 가능
    setAgreedToTerms(!agreedToTerms);
    if (termsError) {
      setTermsError(false);
    }
  };

  // 이용약관 확인 완료
  const handleConfirmTerms = () => {
    setHasViewedTerms(true);
    setShowTermsModal(false);
    setTermsScrolledToBottom(false);

    // 두 약관 모두 확인했으면 자동 체크
    if (hasViewedPrivacy) {
      setAgreedToTerms(true);
    }

    if (termsError) {
      setTermsError(false);
    }
  };

  // 개인정보취급방침 확인 완료
  const handleConfirmPrivacy = () => {
    setHasViewedPrivacy(true);
    setShowPrivacyModal(false);
    setPrivacyScrolledToBottom(false);

    // 두 약관 모두 확인했으면 자동 체크
    if (hasViewedTerms) {
      setAgreedToTerms(true);
    }

    if (termsError) {
      setTermsError(false);
    }
  };

  // 스크롤 감지 핸들러
  // 약관 모달에서 사용자가 끝까지 스크롤했는지 확인하는 함수
  // e: React.UIEvent<HTMLDivElement> - 스크롤 이벤트 객체
  //   - React.UIEvent: React의 UI 이벤트 타입 (스크롤, 클릭, 마우스 이동 등)
  //   - <HTMLDivElement>: 제네릭 타입으로, div 요소에 대한 이벤트임을 지정
  const handleTermsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 이미 끝까지 스크롤했다면 더 이상 체크하지 않음 (한 번 읽으면 계속 활성화 유지)
    if (termsScrolledToBottom) return;

    // 스크롤 이벤트가 발생한 요소 (약관 모달의 스크롤 영역)
    const target = e.currentTarget;

    // 끝까지 스크롤했는지 계산
    // 남은 높이가 보이는 높이 + 10px 이하이면 끝까지 도달한 것으로 판단
    const scrolledToBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

    // 끝까지 도달한 경우에만 상태 업데이트 (한 번 true가 되면 다시 false로 바뀌지 않음)
    if (scrolledToBottom) {
      setTermsScrolledToBottom(true);
    }
  };

  // 개인정보처리방침 모달의 스크롤 감지 핸들러 (이용약관과 동일한 로직)
  const handlePrivacyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 이미 끝까지 스크롤했다면 더 이상 체크하지 않음 (한 번 읽으면 계속 활성화 유지)
    if (privacyScrolledToBottom) return;

    // 스크롤 이벤트가 발생한 요소 (개인정보처리방침 모달의 스크롤 영역)
    const target = e.currentTarget;

    // 끝까지 스크롤했는지 계산 (이용약관과 동일한 계산식)
    const scrolledToBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 10;

    // 끝까지 도달한 경우에만 상태 업데이트 (한 번 true가 되면 다시 false로 바뀌지 않음)
    if (scrolledToBottom) {
      setPrivacyScrolledToBottom(true);
    }
  };

  // 이용약관 모달에서 스크롤이 필요 없는 경우 자동으로 활성화
  const handleCheckTermsScrollNeeded = () => {
    setTermsScrolledToBottom(true);
  };

  // 개인정보처리방침 모달에서 스크롤이 필요 없는 경우 자동으로 활성화
  const handleCheckPrivacyScrollNeeded = () => {
    setPrivacyScrolledToBottom(true);
  };

  return {
    agreedToTerms,
    termsError,
    showTermsModal,
    showPrivacyModal,
    hasViewedTerms,
    hasViewedPrivacy,
    termsScrolledToBottom,
    privacyScrolledToBottom,
    handleTermsCheckboxChange,
    handleConfirmTerms,
    handleConfirmPrivacy,
    handleTermsScroll,
    handlePrivacyScroll,
    handleCheckTermsScrollNeeded,
    handleCheckPrivacyScrollNeeded,
    setShowTermsModal,
    setShowPrivacyModal,
    setTermsError,
  };
};
