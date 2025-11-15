/**
 * SignUpPage의 스타일 컴포넌트 모음
 * - 페이지 레이아웃, 폼, 입력 필드, 약관 동의 관련 스타일
 */
import styled from 'styled-components';
import { Button } from '../../components/Button';

// 페이지 레이아웃 스타일
export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8rem;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.devices.mobile} {
    padding-top: 4rem;
    padding-left: 3.4rem;
    padding-right: 3.4rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 32.2rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 6rem;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

// 폼 관련 스타일
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const InputLabel = styled.label<{ $hasError?: boolean; $isFocused?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme, $hasError, $isFocused }) => {
    if ($hasError) return theme.colors.alert;
    if ($isFocused) return theme.colors.primary300;
    return theme.colors.gray400;
  }};
  transition: color 0.2s ease;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

export const EmailInputWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  width: 100%;

  & > div {
    flex: 1;
  }
`;

export const VerifyButton = styled(Button)`
  width: 8rem;
  flex-shrink: 0;
`;

// 인증 코드 입력 섹션 스타일
export const VerificationCodeSection = styled.div`
  margin-top: 1.6rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.6rem;
    margin-top: 1.2rem;
  }
`;

export const VerificationCodeHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const VerificationCodeTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const VerificationCodeDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const VerificationCodeInputWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
`;

export const InputLoginWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const VerificationHelpWrapper = styled.div`
  position: relative;
`;

export const VerificationHelp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const VerificationHelpText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray400};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary300};
  font-size: inherit;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    border-radius: 0.2rem;
  }
`;

export const HelpIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
  }
`;

export const HelpTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1rem;
  z-index: 10;
`;

export const TooltipContent = styled.div`
  background-color: ${({ theme }) => theme.colors.gray400};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 2rem;
  min-width: 27.2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -0.6rem;
    left: 1rem;
    width: 0;
    height: 0;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-bottom: 0.6rem solid ${({ theme }) => theme.colors.gray400};
  }
`;

export const TooltipHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
`;

export const TooltipTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

export const TooltipCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray200};
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
  }
`;

export const TooltipList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  letter-spacing: -0.04rem;

  li {
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: 400;
    line-height: 1.6rem;
    color: ${({ theme }) => theme.colors.white};
    position: relative;
    padding-left: 1.2rem;

    &::before {
      content: '-';
      position: absolute;
      left: 0;
    }
  }
`;

// 약관 동의 관련 스타일
export const TermsContainer = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  animation: ${({ $hasError }) => ($hasError ? 'shake 0.3s' : 'none')};

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-0.5rem);
    }
    75% {
      transform: translateX(0.5rem);
    }
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.xs};
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  margin-top: 0.2rem;
  transition: all 0.2s ease;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary300};
    border-color: ${({ theme }) => theme.colors.primary300};
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.4rem;
    font-weight: bold;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.gray200};
    cursor: not-allowed;
  }

  &:disabled:checked {
    background-color: ${({ theme }) => theme.colors.gray200};
    border-color: ${({ theme }) => theme.colors.gray200};
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.alert};
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;
  flex: 1;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const TermsLink = styled.button`
  color: ${({ theme }) => theme.colors.primary300};
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  cursor: pointer;
  display: inline;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline-offset: 0.1rem;
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    border-radius: 0.2rem;
  }
`;

export const TermsErrorMessage = styled.span`
  margin-left: 2.8rem;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.alert};
  line-height: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

export const CheckMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.4rem;
  color: ${({ theme }) => theme.colors.primary300};
  font-size: 1.4rem;
  font-weight: bold;
`;
export const HelperMessage = styled.div<{ $type: 'error' | 'success' | null }>`
  font-size: 1.4rem;
  margin-top: 0.8rem;
  padding-left: 0.4rem;

  color: ${({ $type, theme }) =>
    $type === 'error'
      ? theme.colors.alert
      : $type === 'success'
        ? theme.colors.primary300
        : theme.colors.gray400};
`;
