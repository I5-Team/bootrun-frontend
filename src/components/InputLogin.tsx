import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * InputLogin 컴포넌트의 Props 인터페이스
 * @param error - 에러 상태 표시 (boolean) 또는 에러 메시지 (string)
 * @param fullWidth - 전체 너비 사용 여부
 * @param ariaLabel - 레이블이 없을 때 사용할 접근성 레이블
 */
export interface InputLoginProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * 입력창을 감싸는 컨테이너 컴포넌트
 * - fullWidth prop에 따라 너비 조절 (100% 또는 auto)
 * - 에러 메시지 위치 지정을 위해 position: relative 사용
 */
const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  position: relative;
`;

/**
 * 실제 입력 필드 컴포넌트
 * - 배경색: 포커스/값 있을 때 gray100, 없을 때 white
 * - 하단 테두리: 에러(red) > 포커스(primary) > 기본(gray)
 * - 모바일 환경에서 폰트 크기 자동 조절
 */
const StyledInput = styled.input<{
  $error?: boolean | string;
  $hasValue?: boolean;
  $isFocused?: boolean;
}>`
  width: 100%;
  height: 4.2rem;
  padding: 1rem 0.8rem;
  // 포커스되거나 값이 입력되었을 때 배경색 변경
  background-color: ${({ $isFocused, $hasValue, theme }) =>
    $isFocused || $hasValue ? theme.colors.gray100 : theme.colors.white};
  border: none;
  // 에러 > 포커스 > 기본 순서로 테두리 색상 결정
  border-bottom: 0.2rem solid
    ${({ $error, $isFocused, theme }) => {
      if ($error) return theme.colors.alert;
      if ($isFocused) return theme.colors.primary300;
      return theme.colors.gray200;
    }};

  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 400;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.surface};

  // 모든 스타일 변경에 0.2초 전환 효과 적용
  transition: all 0.2s ease;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  // 비활성화 상태 스타일
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
    border-bottom-color: ${({ theme }) => theme.colors.gray200};
  }

  // 모바일 환경에서 폰트 크기 축소
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

/**
 * 에러 메시지를 표시하는 컴포넌트
 * - 빨간색으로 에러 메시지 표시
 * - 모바일 환경 고려한 폰트 크기
 */
const ErrorMessage = styled.span`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.caption};
  color: ${({ theme }) => theme.colors.alert};
  line-height: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

/**
 * 로그인용 입력창 컴포넌트
 * - 포커스/값 상태에 따른 배경색 변경
 * - 에러 메시지 표시 기능
 * - 제어/비제어 컴포넌트 모두 지원
 */
export const InputLogin = React.forwardRef<HTMLInputElement, InputLoginProps>(
  ({ error, fullWidth, className, value, defaultValue, ariaLabel, ...props }, ref) => {
    // 포커스 상태 관리
    const [isFocused, setIsFocused] = useState(false);
    // 비제어 컴포넌트를 위한 내부 상태 관리
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    // 고유 ID 생성 (에러 메시지와 연결용) - Hook은 항상 최상위에서 호출
    const generatedId = React.useId();
    const inputId = props.id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;

    // value가 제공되면 제어 컴포넌트, 아니면 비제어 컴포넌트
    const currentValue = value !== undefined ? value : internalValue;
    // 값이 입력되었는지 확인 (빈 문자열 체크 포함)
    const hasValue = Boolean(currentValue);

    // 포커스 시 상태 업데이트 및 부모의 onFocus 이벤트 호출
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    // 포커스 해제 시 상태 업데이트 및 부모의 onBlur 이벤트 호출
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    // 값 변경 시 처리
    // - 비제어 컴포넌트면 내부 상태 업데이트
    // - 부모의 onChange 이벤트 호출
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };

    return (
      <InputWrapper $fullWidth={fullWidth} className={className}>
        <StyledInput
          ref={ref}
          id={inputId}
          $error={error}
          $hasValue={hasValue}
          $isFocused={isFocused}
          value={currentValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-describedby={error && typeof error === 'string' ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {/* error가 문자열일 때만 에러 메시지 표시 */}
        {error && typeof error === 'string' && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

// React DevTools에서 표시될 컴포넌트 이름 설정
InputLogin.displayName = 'InputLogin';

export default InputLogin;
