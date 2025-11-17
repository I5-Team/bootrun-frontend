/**
 * 약관 동의 섹션 컴포넌트
 * - 이용약관 및 개인정보취급방침 동의 체크박스
 * - 약관 확인 완료 표시 및 에러 메시지
 */
import React from 'react';
import {
  TermsContainer,
  CheckboxWrapper,
  Checkbox,
  CheckboxLabel,
  TermsLink,
  TermsErrorMessage,
  CheckMark,
} from '../styles/SignUpPage.styled';

interface TermsAgreementSectionProps {
  /** 약관 동의 여부 */
  agreedToTerms: boolean;
  /** 약관 에러 여부 */
  termsError: boolean;
  /** 이용약관 확인 완료 여부 */
  hasViewedTerms: boolean;
  /** 개인정보취급방침 확인 완료 여부 */
  hasViewedPrivacy: boolean;
  /** 약관 체크박스 변경 핸들러 */
  onTermsCheckboxChange: () => void;
  /** 이용약관 모달 열기 핸들러 */
  onOpenTermsModal: () => void;
  /** 개인정보취급방침 모달 열기 핸들러 */
  onOpenPrivacyModal: () => void;
}

/**
 * 약관 동의 섹션 컴포넌트
 *
 * 이용약관 및 개인정보취급방침 동의 체크박스를 제공합니다.
 * 약관을 확인하지 않으면 체크가 불가능하며, 확인 후 체크 가능합니다.
 */
export const TermsAgreementSection: React.FC<TermsAgreementSectionProps> = ({
  agreedToTerms,
  termsError,
  hasViewedTerms,
  hasViewedPrivacy,
  onTermsCheckboxChange,
  onOpenTermsModal,
  onOpenPrivacyModal,
}) => {
  return (
    <TermsContainer $hasError={termsError}>
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          id="terms-checkbox"
          checked={agreedToTerms}
          onChange={onTermsCheckboxChange}
          aria-invalid={termsError}
          aria-describedby={termsError ? 'terms-error' : undefined}
        />
        <CheckboxLabel htmlFor="terms-checkbox">
          본인은 만 14세 이상이며, {'부트런'}의<br />
          {hasViewedTerms && <CheckMark aria-label="확인 완료">✓</CheckMark>}
          <TermsLink
            onClick={(e) => {
              e.preventDefault();
              onOpenTermsModal();
            }}
          >
            이용 약관
          </TermsLink>
          , {hasViewedPrivacy && <CheckMark aria-label="확인 완료">✓</CheckMark>}
          <TermsLink
            onClick={(e) => {
              e.preventDefault();
              onOpenPrivacyModal();
            }}
          >
            개인정보취급방침
          </TermsLink>
          을 확인하였습니다.
        </CheckboxLabel>
      </CheckboxWrapper>
      {termsError && (
        <TermsErrorMessage id="terms-error">
          {!hasViewedTerms || !hasViewedPrivacy
            ? '이용 약관과 개인정보취급방침을 클릭해 모두 확인해주세요.'
            : '약관에 동의해주세요.'}
        </TermsErrorMessage>
      )}
    </TermsContainer>
  );
};
