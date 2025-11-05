/**
 * 회원가입 페이지 컴포넌트
 * - 이메일 인증, 비밀번호, 닉네임 입력 폼
 * - 약관 동의 체크박스
 * - 회원가입 버튼
 */
import { useState } from 'react';
import { Button } from '../../components/Button';
import { InputLogin } from '../../components/InputLogin';
import { useSignUpForm, validateEmail } from './hooks/useSignUpForm';
import { useTermsAgreement } from './hooks/useTermsAgreement';
import { EmailVerificationModal } from './components/EmailVerificationModal';
import { TermsModal } from './components/TermsModal';
import { TermsAgreementSection } from './components/TermsAgreementSection';
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from './constants/terms';
import {
  PageContainer,
  ContentWrapper,
  Title,
  FormContainer,
  InputGroup,
  InputWrapper,
  InputLabel,
  EmailInputWrapper,
  VerifyButton,
} from './SignUpPage.styled';

const SignUpPage = () => {
  // 각 입력 필드의 focus 상태 관리
  const [focusState, setFocusState] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    nickName: false,
  });

  // focus 상태 업데이트 함수
  const handleFocus = (field: keyof typeof focusState) => {
    setFocusState((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focusState) => {
    setFocusState((prev) => ({ ...prev, [field]: false }));
  };
  // 회원가입 폼 로직
  const {
    formState,
    errorState,
    emailVerification,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleNickNameChange,
    handleVerificationCodeChange,
    handleEmailVerification,
    handleVerificationCodeSubmit,
    handleResendCode,
    setShowEmailHelp,
    isSignUpEnabled: isFormValid,
    handleSignUp,
  } = useSignUpForm();

  // 약관 동의 로직
  const {
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
    setShowTermsModal,
    setShowPrivacyModal,
    setTermsError,
  } = useTermsAgreement();

  // 회원가입 버튼 활성화 조건 (약관 동의 포함)
  const isSignUpEnabled = isFormValid && agreedToTerms;

  // 회원가입 처리 (약관 동의 확인 포함)
  const handleSignUpWithTerms = () => {
    // 약관 동의 확인
    if (!agreedToTerms) {
      setTermsError(true);
      return;
    }

    handleSignUp();
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>회원가입</Title>

        <FormContainer>
          <InputGroup>
            {/* 이메일 입력 */}
            <InputWrapper>
              <InputLabel
                htmlFor="email"
                $hasError={!!errorState.email}
                $isFocused={focusState.email && !errorState.email}
              >
                이메일
              </InputLabel>
              <EmailInputWrapper>
                <InputLogin
                  id="email"
                  type="email"
                  placeholder=""
                  value={formState.email}
                  onChange={handleEmailChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  error={errorState.email}
                  disabled={emailVerification.isEmailVerified}
                  ariaLabel="이메일 주소를 입력하세요"
                />
                <VerifyButton
                  size="md"
                  disabled={
                    !validateEmail(formState.email) ||
                    emailVerification.isEmailSent ||
                    emailVerification.isEmailVerified
                  }
                  onClick={handleEmailVerification}
                >
                  {emailVerification.isEmailVerified ? '인증 완료' : '인증'}
                </VerifyButton>
              </EmailInputWrapper>

              {/* 인증 코드 입력 섹션 */}
              {emailVerification.isEmailSent && !emailVerification.isEmailVerified && (
                <EmailVerificationModal
                  verificationCode={formState.verificationCode}
                  onVerificationCodeChange={handleVerificationCodeChange}
                  onVerify={handleVerificationCodeSubmit}
                  onResend={handleResendCode}
                  showHelp={emailVerification.showEmailHelp}
                  onToggleHelp={() => setShowEmailHelp(!emailVerification.showEmailHelp)}
                />
              )}
            </InputWrapper>

            {/* 비밀번호 입력 */}
            <InputWrapper>
              <InputLabel
                htmlFor="password"
                $hasError={!!errorState.password}
                $isFocused={focusState.password && !errorState.password}
              >
                비밀번호
              </InputLabel>
              <InputLogin
                id="password"
                type="password"
                placeholder=""
                value={formState.password}
                onChange={handlePasswordChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                error={errorState.password}
                fullWidth
                ariaLabel="비밀번호를 입력하세요"
              />
            </InputWrapper>

            {/* 비밀번호 확인 */}
            <InputWrapper>
              <InputLabel
                htmlFor="password-confirm"
                $hasError={!!errorState.passwordConfirm}
                $isFocused={focusState.passwordConfirm && !errorState.passwordConfirm}
              >
                비밀번호 확인
              </InputLabel>
              <InputLogin
                id="password-confirm"
                type="password"
                placeholder=""
                value={formState.passwordConfirm}
                onChange={handlePasswordConfirmChange}
                onFocus={() => handleFocus('passwordConfirm')}
                onBlur={() => handleBlur('passwordConfirm')}
                error={errorState.passwordConfirm}
                fullWidth
                ariaLabel="비밀번호를 다시 입력하세요"
              />
            </InputWrapper>

            {/* 닉네임 입력 */}
            <InputWrapper>
              <InputLabel
                htmlFor="nickName"
                $hasError={!!errorState.nickName}
                $isFocused={focusState.nickName && !errorState.nickName}
              >
                닉네임
              </InputLabel>
              <InputLogin
                id="nickName"
                type="text"
                placeholder=""
                value={formState.nickName}
                onChange={handleNickNameChange}
                onFocus={() => handleFocus('nickName')}
                onBlur={() => handleBlur('nickName')}
                error={errorState.nickName}
                fullWidth
                ariaLabel="닉네임을 입력하세요"
              />
            </InputWrapper>
          </InputGroup>

          {/* 약관 동의 */}
          <TermsAgreementSection
            agreedToTerms={agreedToTerms}
            termsError={termsError}
            hasViewedTerms={hasViewedTerms}
            hasViewedPrivacy={hasViewedPrivacy}
            onTermsCheckboxChange={handleTermsCheckboxChange}
            onOpenTermsModal={() => setShowTermsModal(true)}
            onOpenPrivacyModal={() => setShowPrivacyModal(true)}
          />

          {/* 가입하기 버튼 */}
          <Button size="lg" fullWidth disabled={!isSignUpEnabled} onClick={handleSignUpWithTerms}>
            회원가입
          </Button>
        </FormContainer>
      </ContentWrapper>

      {/* 이용약관 모달 */}
      <TermsModal
        title="이용 약관"
        content={TERMS_OF_SERVICE}
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onConfirm={handleConfirmTerms}
        onScroll={handleTermsScroll}
        scrolledToBottom={termsScrolledToBottom}
      />

      {/* 개인정보취급방침 모달 */}
      <TermsModal
        title="개인정보취급방침"
        content={PRIVACY_POLICY}
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onConfirm={handleConfirmPrivacy}
        onScroll={handlePrivacyScroll}
        scrolledToBottom={privacyScrolledToBottom}
      />
    </PageContainer>
  );
};

export default SignUpPage;
