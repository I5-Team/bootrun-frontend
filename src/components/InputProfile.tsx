import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ArrowDownIcon from '../assets/icons/icon-arrow-down.svg';
import CalendarIconSvg from '../assets/icons/icon-calendar.svg';

/**
 * InputProfile 컴포넌트의 Props 인터페이스
 * @param label - 입력 필드 상단에 표시될 레이블
 * @param placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param value - 현재 선택된 값
 * @param onChange - 값 변경 시 호출되는 콜백 함수
 * @param options - 드롭다운에 표시될 옵션 배열
 * @param disabled - 비활성화 상태 여부
 * @param error - 에러 상태 표시 (boolean) 또는 에러 메시지 (string)
 * @param fullWidth - 전체 너비 사용 여부
 * @param type - 입력 타입: 'text' (일반 입력), 'select' (드롭다운), 'date' (날짜 선택)
 * @param readOnly - 읽기 전용 상태 여부 (이메일 등)
 */
export interface InputProfileProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[];
  disabled?: boolean;
  error?: boolean | string;
  fullWidth?: boolean;
  type?: 'text' | 'select' | 'date';
  readOnly?: boolean;
  className?: string;
}

/**
 * 입력창을 감싸는 컨테이너 컴포넌트
 * - fullWidth prop에 따라 너비 조절
 * - 레이블과 입력 필드를 세로로 배치
 */
const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '25.7rem')};
  position: relative;
`;

/**
 * 레이블 컴포넌트
 * - 12px Bold 스타일
 * - gray400 색상
 */
const Label = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 700;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.gray400};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

/**
 * 입력 필드 컨테이너
 * - 포커스/에러 상태에 따라 테두리 색상 변경
 * - 비활성화 또는 읽기 전용 상태 스타일 적용
 */
const InputContainer = styled.div<{
  $isFocused?: boolean;
  $error?: boolean | string;
  $disabled?: boolean;
  $readOnly?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 4.2rem;
  background-color: ${({ $disabled, $readOnly, theme }) =>
    $disabled || $readOnly ? theme.colors.gray100 : theme.colors.white};
  border: ${({ $isFocused, $error, theme }) => {
    if ($error) return `0.1rem solid ${theme.colors.alert}`;
    if ($isFocused) return `0.2rem solid ${theme.colors.primary300}`;
    return `0.1rem solid ${theme.colors.gray200}`;
  }};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: ${({ $disabled, $readOnly }) =>
    $disabled ? 'not-allowed' : $readOnly ? 'default' : 'pointer'};
`;

/**
 * 실제 입력 필드 컴포넌트
 * - 텍스트 입력용
 */
const StyledInput = styled.input<{ $disabled?: boolean; $readOnly?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 1.1rem 2rem;
  background-color: transparent;
  border: none;
  outline: none;

  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ $disabled, $readOnly, theme }) =>
    $disabled || $readOnly ? theme.colors.gray300 : theme.colors.surface};

  cursor: ${({ $disabled, $readOnly }) =>
    $disabled ? 'not-allowed' : $readOnly ? 'default' : 'text'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

/**
 * 드롭다운 선택된 값 표시 영역
 */
const DropdownValue = styled.div<{ $placeholder?: boolean; $disabled?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ $placeholder, $disabled, theme }) => {
    if ($disabled) return theme.colors.gray300;
    return $placeholder ? theme.colors.gray300 : theme.colors.surface;
  }};
  white-space: pre;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

/**
 * 드롭다운 아이콘 컨테이너
 */
const IconContainer = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

/**
 * 드롭다운 아이콘 (화살표)
 */
const ArrowIcon = styled.img<{ $isOpen?: boolean }>`
  width: 1.1rem;
  height: 0.6rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

/**
 * 달력 아이콘
 */
const CalendarIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

/**
 * 옵션 목록 컨테이너
 */
const OptionsContainer = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
`;

/**
 * 옵션 목록 (스크롤 가능)
 */
const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  overflow-y: auto;
`;

/**
 * 개별 옵션 아이템
 */
const OptionItem = styled.div<{ $isSelected?: boolean; $isHovered?: boolean }>`
  height: 4rem;
  padding: 1.1rem 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  font-family: 'Pretendard', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.surface};
  white-space: pre;

  background-color: ${({ $isSelected, $isHovered, theme }) => {
    if ($isSelected) return theme.colors.primary100;
    if ($isHovered) return theme.colors.gray100;
    return theme.colors.white;
  }};

  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary100 : theme.colors.gray100};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

/**
 * 에러 메시지를 표시하는 컴포넌트
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
 * 프로필 입력용 컴포넌트
 * - 일반 텍스트 입력
 * - 드롭다운 선택
 * - 날짜 선택
 * - 읽기 전용 (이메일 등)
 */
export const InputProfile = React.forwardRef<HTMLDivElement, InputProfileProps>(
  (
    {
      label,
      placeholder,
      value = '',
      onChange,
      options = [],
      disabled = false,
      error,
      fullWidth,
      type = 'text',
      readOnly = false,
      className,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지하여 드롭다운 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setIsFocused(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // 드롭다운 토글
    const handleToggleDropdown = () => {
      if (disabled || readOnly) return;
      if (type === 'select') {
        setIsOpen(!isOpen);
        setIsFocused(!isOpen);
      }
    };

    // 옵션 선택
    const handleSelectOption = (option: string) => {
      onChange?.(option);
      setIsOpen(false);
      setIsFocused(false);
    };

    // 텍스트 입력
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    // 포커스 핸들러
    const handleFocus = () => {
      if (!disabled && !readOnly) {
        setIsFocused(true);
      }
    };

    const handleBlur = () => {
      if (type !== 'select') {
        setIsFocused(false);
      }
    };

    return (
      <InputWrapper ref={ref} $fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <div ref={containerRef} style={{ position: 'relative' }}>
          <InputContainer
            $isFocused={isFocused}
            $error={error}
            $disabled={disabled}
            $readOnly={readOnly}
            onClick={handleToggleDropdown}
          >
            {type === 'text' ? (
              <StyledInput
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                readOnly={readOnly}
                $disabled={disabled}
                $readOnly={readOnly}
              />
            ) : type === 'select' ? (
              <>
                <DropdownValue $placeholder={!value} $disabled={disabled}>
                  {value || placeholder}
                </DropdownValue>
                <IconContainer $isOpen={isOpen}>
                  <ArrowIcon src={ArrowDownIcon} alt="dropdown arrow" $isOpen={isOpen} />
                </IconContainer>
              </>
            ) : (
              <>
                <StyledInput
                  type="text"
                  value={value}
                  placeholder={placeholder}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={disabled}
                  readOnly={readOnly}
                  $disabled={disabled}
                  $readOnly={readOnly}
                />
                <IconContainer>
                  <CalendarIcon src={CalendarIconSvg} alt="calendar icon" />
                </IconContainer>
              </>
            )}
          </InputContainer>

          {type === 'select' && (
            <OptionsContainer $isOpen={isOpen}>
              <OptionsList>
                {options.map((option, index) => (
                  <OptionItem
                    key={index}
                    $isSelected={value === option}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </OptionItem>
                ))}
              </OptionsList>
            </OptionsContainer>
          )}
        </div>
        {error && typeof error === 'string' && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

// React DevTools에서 표시될 컴포넌트 이름 설정
InputProfile.displayName = 'InputProfile';

export default InputProfile;
