/**
 * 이메일 인증 코드 입력 모달 컴포넌트
 * - 인증코드 입력 필드
 * - 인증코드 확인 및 재전송 기능
 * - 도움말 툴팁 제공
 */
import React from 'react';
import { InputLogin } from '../../../components/InputLogin';
import { Button } from '../../../components/Button';
import {
  VerificationCodeSection,
  VerificationCodeHeader,
  VerificationCodeTitle,
  VerificationCodeDescription,
  VerificationCodeInputWrapper,
  InputLoginWrapper,
  VerificationHelpWrapper,
  VerificationHelp,
  VerificationHelpText,
  ResendButton,
  HelpIcon,
  HelpTooltip,
  TooltipContent,
  TooltipHeader,
  TooltipTitle,
  TooltipCloseButton,
  TooltipList,
} from '../styles/SignUpPage.styled';

interface EmailVerificationModalProps {
  /** 인증코드 입력값 */
  verificationCode: string;
  /** 인증코드 변경 핸들러 */
  onVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 인증코드 확인 핸들러 */
  onVerify: () => void;
  /** 인증코드 재전송 핸들러 */
  onResend: () => void;
  /** 도움말 표시 여부 */
  showHelp: boolean;
  /** 도움말 표시 토글 핸들러 */
  onToggleHelp: () => void;
}

/**
 * 이메일 인증 코드 입력 컴포넌트
 *
 * 이메일로 전송된 인증코드를 입력받는 섹션입니다.
 * 인증코드 재전송 기능과 도움말 툴팁을 제공합니다.
 */
export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  verificationCode,
  onVerificationCodeChange,
  onVerify,
  onResend,
  showHelp,
  onToggleHelp,
}) => {
  return (
    <VerificationCodeSection>
      <VerificationCodeHeader>
        <VerificationCodeTitle>인증코드 입력</VerificationCodeTitle>
        <VerificationCodeDescription>
          이메일로 전송된 인증코드를 입력해 주세요 :)
        </VerificationCodeDescription>
      </VerificationCodeHeader>

      <VerificationCodeInputWrapper>
        <InputLoginWrapper>
          <InputLogin
            id="verification-code"
            type="text"
            placeholder=""
            value={verificationCode}
            onChange={onVerificationCodeChange}
            ariaLabel="인증 코드를 입력하세요"
            fullWidth
          />
        </InputLoginWrapper>
        <Button size="md" onClick={onVerify} disabled={!verificationCode}>
          확인
        </Button>
      </VerificationCodeInputWrapper>

      <VerificationHelpWrapper>
        <VerificationHelp>
          <HelpIcon onClick={onToggleHelp} role="button" aria-label="도움말" tabIndex={0}>
            ?
          </HelpIcon>
          <VerificationHelpText>
            인증코드를 받지 못하셨나요? <ResendButton onClick={onResend}>재전송</ResendButton>
          </VerificationHelpText>
        </VerificationHelp>

        {showHelp && (
          <HelpTooltip>
            <TooltipContent>
              <TooltipHeader>
                <TooltipTitle>이메일이 수신되지 않나요? :(</TooltipTitle>
                <TooltipCloseButton type="button" onClick={onToggleHelp} aria-label="닫기">
                  ×
                </TooltipCloseButton>
              </TooltipHeader>
              <TooltipList>
                <li>이메일 주소가 정확히 입력되었는지 확인해 주세요.</li>
                <li>스팸 메일함을 확인해 주세요.</li>
              </TooltipList>
            </TooltipContent>
          </HelpTooltip>
        )}
      </VerificationHelpWrapper>
    </VerificationCodeSection>
  );
};
