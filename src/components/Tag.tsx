import React from 'react'
import styled from 'styled-components'
import SvgDelete from "../assets/icons/icon-x.svg?react";


type TagVariant = 'dark' | 'primary' | 'light';

type TagProps = {
  children: React.ReactNode,
  variant?: TagVariant,
  hasDelete?: boolean,
  ariaHidden?: boolean,
}

// 태그 컴포넌트 스타일 정의 (variant에 따른 색상 변경)
const StyledTag = styled.span<{ $variant: TagVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  gap: 1rem;
  border-radius: ${({ theme }) => theme.radius.xs};

  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  white-space: nowrap;

  background-color: ${({ $variant, theme }) =>
    $variant === 'dark' ? theme.colors.gray400
      : $variant === 'light' ? theme.colors.white
        : theme.colors.primary300};

  color: ${({ $variant, theme }) =>
    $variant === 'dark' ? theme.colors.white
      : $variant === 'light' ? theme.colors.gray400
        : theme.colors.white};

  outline: ${({ $variant, theme }) =>
    $variant === 'dark' ? '0.1rem solid transparent'
      : $variant === 'light' ? '0.1rem solid ' + theme.colors.gray200
        : '0.1rem solid transparent'};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  svg path {
    fill: currentColor;
  }
`

// 공통 태그 컴포넌트
export const Tag: React.FC<TagProps> = ({ children, variant = 'light', hasDelete, ariaHidden }) => {
  return (
    <StyledTag
      $variant={variant}
      aria-hidden={ariaHidden}
    >
      {children}
      {hasDelete && <SvgDelete aria-hidden="true" />}
    </StyledTag>
  )
}

export default Tag;
