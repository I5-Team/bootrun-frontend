import styled, { css } from 'styled-components';

type ButtonVariant = 'default' | 'dark';

type ButtonProps = {
  ariaLabel: string;
  iconSvg: React.ReactNode,
  iconColor?: string;
  bgColor?: string;

  variant?: ButtonVariant;
  hasAlert?: boolean;
  active?: boolean;
  tooltip?: string;

  className?: string;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

// 아이콘 버튼 스타일 정의 (툴팁 및 알림 닷 기능 포함)
const StyledIconButton = styled.button<{
  $variant?: ButtonVariant;
  $tooltip?: string;
  $active?: boolean;

  $iconColor?: string;
  $bgColor?: string;
  $size?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary300};
  }

  /* size */
  width: 4.2rem;
  height: 4.2rem;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radius.md};
  position: relative;

  /* iconColor */
  color: ${({ theme, $iconColor }) => $iconColor || theme.colors.gray300};

  /* variant */
  ${({ $variant, theme }) =>
    $variant === 'dark' &&
    css`
      background-color: ${theme.colors.gray400};
      color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors.gray400};
      color: ${theme.colors.white};
    }
  `}

  /* tooltip */
  ${({ $tooltip }) =>
    ($tooltip) &&
    css`
      position: relative;

      &::before,
      &::after {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.1s;
      }

      &:hover::before,
      &:hover::after {
        opacity: 1;
        visibility: visible;
      }

      &::after {
        content: '${$tooltip}';
        position: absolute;
        top: 125%;
        left: 50%;
        transform: translateX(-50%);

        white-space: nowrap;
        padding: 0.8rem 1.2rem;
        border-radius: ${({ theme }) => theme.radius.sm};
        background-color: ${({ theme }) => theme.colors.surface};
        color: ${({ theme }) => theme.colors.white};
        font-size: ${({ theme }) => theme.fontSize.caption};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }

      &::before {
        content: '';
        color: ${({ theme }) => theme.colors.surface};

        position: absolute;
        top: 115%;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);

        width: 1rem;
        height: 1rem;

        background-color: ${({ theme }) => theme.colors.surface};
        border-radius: 0.25rem;
      }
    `}
`;

const StyledIcon = styled.span<{ $iconSize?: number, $hasAlert?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: inherit;
  
  /* iconSize */
  width: 2.4rem;
  height: 2.4rem;
  aspect-ratio: 1;

    /* hasAlert */
  ${({ $hasAlert }) => (
    $hasAlert && css`
      &::after {
        content: '';
        position: absolute;
        right: 1px;
        bottom: 2px;
        transform: translate(50%, 50%);
        width: 0.8rem;
        height: 0.8rem;
        background-color: ${({ theme }) => theme.colors.alert};
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      }
    `
  )}

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: translate(50%, 50%) scale(1);
    }
    50% {
      opacity: 0.7;
      transform: translate(50%, 50%) scale(1.1);
    }
  }
`;

// 아이콘 전용 버튼 컴포넌트
const IconButton: React.FC<ButtonProps> = ({
  ariaLabel,
  iconSvg,
  iconColor,
  bgColor,

  variant = 'default',
  hasAlert = false,
  active = false,
  tooltip,

  className,
  onClick,
}: ButtonProps) => {
  return (
    <StyledIconButton
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}

      $bgColor={bgColor}
      $iconColor={iconColor}
      $variant={variant}      
      $active={active}

      $tooltip={tooltip}
    >
      <StyledIcon 
        $hasAlert={hasAlert}
      >
        {iconSvg}
      </StyledIcon>
    </StyledIconButton>
  );
};

export default IconButton;

