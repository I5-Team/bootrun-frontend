import React, { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import ArrowDownIcon from '../assets/icons/icon-arrow-down.svg';
import CalendarIconSvg from '../assets/icons/icon-calendar.svg';
import { Box, Flex } from './Box';
import { Text } from './Typography';

/**
 * InputProfile 컴포넌트의 Props 인터페이스
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
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * 실제 입력 필드 컴포넌트
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
    font-size: ${({ theme }) => theme.fontSize.sm};
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
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
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
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

/**
 * 프로필 입력용 컴포넌트
 * - 텍스트 입력, 셀렉트 박스, 날짜 선택 등 다양한 타입 지원
 * - 디자인 시스템의 Box, Flex, Typography 컴포넌트 활용
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
      id,
      ariaLabel,
      ariaDescribedBy,
    },
    ref
  ) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 고유 ID 생성 (label과 input 연결용)
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const descriptionId = ariaDescribedBy || (error && typeof error === 'string' ? errorId : undefined);

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

    // Border color logic
    const getBorderColor = () => {
      if (error) return theme.colors.alert;
      if (isFocused) return theme.colors.primary300;
      return theme.colors.gray200;
    };

    const getBorderWidth = () => {
      if (isFocused) return '0.2rem';
      return '0.1rem';
    };

    return (
      <Flex
        direction="column"
        gap={8}
        width={fullWidth ? '100%' : '25.7rem'}
        style={{ position: 'relative' }}
        ref={ref}
        className={className}
      >
        {label && (
          <Text
            as="label"
            htmlFor={inputId}
            variant="caption"
            weight="bold"
            color="gray400"
            style={{ lineHeight: '1.6rem' }}
          >
            {label}
          </Text>
        )}

        <div ref={containerRef} style={{ position: 'relative' }}>
          <Box
            width="100%"
            height="4.2rem"
            bg={disabled || readOnly ? 'gray100' : 'white'}
            style={{
              border: `${getBorderWidth()} solid ${getBorderColor()}`,
              borderRadius: '1rem',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
              cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'pointer',
              position: 'relative'
            }}
            onClick={handleToggleDropdown}
          >
            {type === 'text' ? (
              <StyledInput
                id={inputId}
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
                aria-label={!label ? ariaLabel : undefined}
                aria-describedby={descriptionId}
                aria-invalid={error ? true : undefined}
              />
            ) : type === 'select' ? (
              <>
                <DropdownValue
                  id={inputId}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  aria-controls={`${inputId}-listbox`}
                  aria-label={!label ? ariaLabel || placeholder : undefined}
                  aria-describedby={descriptionId}
                  aria-invalid={error ? true : undefined}
                  tabIndex={disabled ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleDropdown();
                    }
                  }}
                  $placeholder={!value}
                  $disabled={disabled}
                >
                  {value || placeholder}
                </DropdownValue>
                <Flex
                  align="center"
                  justify="center"
                  width="1.6rem"
                  height="1.6rem"
                  style={{
                    position: 'absolute',
                    right: '1.2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}
                >
                  <img
                    src={ArrowDownIcon}
                    alt=""
                    style={{
                      width: '1.1rem',
                      height: '0.6rem',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </Flex>
              </>
            ) : (
              <>
                <StyledInput
                  id={inputId}
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
                  aria-label={!label ? ariaLabel || '날짜 선택' : undefined}
                  aria-describedby={descriptionId}
                  aria-invalid={error ? true : undefined}
                />
                <Flex
                  align="center"
                  justify="center"
                  width="1.6rem"
                  height="1.6rem"
                  style={{
                    position: 'absolute',
                    right: '1.2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}
                >
                  <img src={CalendarIconSvg} alt="" style={{ width: '1.6rem', height: '1.6rem' }} />
                </Flex>
              </>
            )}
          </Box>

          {type === 'select' && (
            <Box
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.8rem)',
                left: 0,
                width: '100%',
                backgroundColor: theme.colors.white,
                border: `0.1rem solid ${theme.colors.gray200}`,
                borderRadius: '1rem',
                overflow: 'hidden',
                zIndex: 1000,
                display: isOpen ? 'block' : 'none',
                boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)'
              }}
            >
              <Flex direction="column" style={{ padding: '0.8rem 0', overflowY: 'auto' }} id={`${inputId}-listbox`} role="listbox" aria-label={label || ariaLabel}>
                {options.map((option, index) => (
                  <OptionItem
                    key={index}
                    role="option"
                    aria-selected={value === option}
                    $isSelected={value === option}
                    onClick={() => handleSelectOption(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectOption(option);
                      }
                    }}
                    tabIndex={0}
                  >
                    {option}
                  </OptionItem>
                ))}
              </Flex>
            </Box>
          )}
        </div>
        {error && typeof error === 'string' && (
          <Text id={errorId} variant="caption" color="alert" style={{ lineHeight: '1.6rem', marginTop: '0.4rem' }}>
            {error}
          </Text>
        )}
      </Flex>
    );
  }
);

// React DevTools에서 표시될 컴포넌트 이름 설정
InputProfile.displayName = 'InputProfile';

export default InputProfile;
