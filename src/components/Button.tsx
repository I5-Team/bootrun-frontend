import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../styles/theme'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  // 버튼 라벨
  children: React.ReactNode
  // 스타일 변형(채움/아웃라인/고스트)
  variant?: ButtonVariant
  // 버튼 높이 프리셋
  size?: ButtonSize
  // 폭 100% 여부
  fullWidth?: boolean
  // 비활성화 여부
  disabled?: boolean
  // 아이콘 경로 (assets의 svg/png 등)
  iconSrc?: string
  // 아이콘 위치
  iconPosition?: 'left' | 'right'
  // 아이콘 표시 폭(px)
  iconWidth?: number
  // 클릭 핸들러
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  // 버튼 타입
  type?: 'button' | 'submit' | 'reset'
}

// 시안 기준: radius 10px, 폰트 14/20, weight 500
const BaseButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: ${(p: { $fullWidth?: boolean }) => (p.$fullWidth ? '100%' : 'auto')};
  height: ${(p: { $size: ButtonSize }) => theme.size[p.$size]};
  padding: 0 ${theme.spacing.xl};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.body14.size};
  line-height: ${theme.typography.body14.lineHeight};
  font-weight: ${theme.typography.body14.weightMedium};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
  border: 1px solid transparent;

  ${(p: { $variant: ButtonVariant }) =>
    p.$variant === 'primary' &&
    css`
      background: ${theme.colors.primary300};
      color: ${theme.colors.white};
      &:hover:not(:disabled) {
        opacity: 0.92;
      }
      &:active:not(:disabled) {
        opacity: 0.85;
      }
    `}

  ${(p: { $variant: ButtonVariant }) =>
    p.$variant === 'secondary' &&
    css`
      background: ${theme.colors.white};
      color: ${theme.colors.surface};
      border-color: ${theme.colors.gray200};
      &:hover:not(:disabled) {
        background: #f7f8f9;
      }
      &:active:not(:disabled) {
        background: #eff1f3;
      }
    `}

  ${(p: { $variant: ButtonVariant }) =>
    p.$variant === 'ghost' &&
    css`
      background: transparent;
      color: ${theme.colors.surface};
      &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.04);
      }
      &:active:not(:disabled) {
        background: rgba(0, 0, 0, 0.08);
      }
    `}

  &:disabled {
    background: ${theme.colors.gray200};
    color: ${theme.colors.gray300};
    border-color: ${theme.colors.gray200};
    cursor: not-allowed;
    opacity: 1;
  }
`

const Icon = styled.img<{ $pos: 'left' | 'right'; $width: number }>`
  width: ${(p: { $width: number }) => `${p.$width}px`};
  height: ${(p: { $width: number }) => `${p.$width}px`};
  object-fit: contain;
  ${(p: { $pos: 'left' | 'right' }) => (p.$pos === 'left' ? 'order: 0;' : 'order: 2;')}
`

const Label = styled.span`
  order: 1;
`

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  iconSrc,
  iconPosition = 'left',
  iconWidth = 20,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <BaseButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      data-node-id="4017:button-component"
    >
      {/* 아이콘은 옵션 */}
      {iconSrc && iconPosition === 'left' && (
        <Icon src={iconSrc} alt="" aria-hidden $pos="left" $width={iconWidth} />
      )}
      <Label>{children}</Label>
      {iconSrc && iconPosition === 'right' && (
        <Icon src={iconSrc} alt="" aria-hidden $pos="right" $width={iconWidth} />
      )}
    </BaseButton>
  )
}

export default Button


