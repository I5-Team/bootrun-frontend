import React from 'react'
import styled, { css } from 'styled-components'

type ButtonVariant = 'primary' | 'outline'

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  iconSrc?: string

  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  type?: 'button' | 'submit' | 'reset'
}

const buttonPadding: Record<ButtonSize, {padding: string}> = {
  lg: { padding: "1.4rem 2rem"},
  md: { padding: "1.1rem 2rem"},
  sm: { padding: "1rem 1.6rem"},
}

const StyledBaseButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  width: ${(p) => (p.$fullWidth ? '100%' : 'fit-content')};
  padding: ${(p) => buttonPadding[p.$size].padding};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;

  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 100%;
  font-weight: 400;

  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  ${(p) =>
    p.$variant === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary300};
      color: ${({ theme }) => theme.colors.white};

      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: ${({theme}) => theme.colors.primaryDark};
        border-color: ${({theme}) => theme.colors.gray200}
      }
  `}

  ${(p) =>
    p.$variant === 'outline' &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.gray200};

      &:hover:not(:disabled),
      &:active:not(:disabled)  {
        background-color: ${({ theme }) => theme.colors.gray200};
      }
    `}

  &:disabled {
    background: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
  }
`

const StyledIcon = styled.img`
  width: auto;
  height: 1.75rem;
  fill: ${({theme}) => theme.colors.white};
  object-fit: contain;
`
const StyledLabel = styled.span`
  height: 1.8rem;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  iconSrc,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <StyledBaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      data-node-id="4017:button-component"
    >
      {iconSrc && <StyledIcon src={iconSrc} alt="" />}
      
      <StyledLabel>{children}</StyledLabel>

     
    </StyledBaseButton>
  )
}

export default Button


