import React from 'react'
import styled from 'styled-components'
import SvgDelete from "../assets/icons/icon-x.svg?react";


type TagVariant = 'dark' | 'primary' | 'light';

type TagProps = {
  children: React.ReactNode
  variant?: TagVariant
  hasDelete?: boolean
}

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
    : $variant === 'light' ? theme.colors.primary100 
    : theme.colors.primary300};

  color: ${({ $variant, theme }) =>
    $variant === 'light' ? theme.colors.primary300 : theme.colors.white};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }

  svg path {
    fill: currentColor;
  }
`

export const Tag: React.FC<TagProps> = ({ children, variant = 'light', hasDelete }) => {
  return (
    <StyledTag $variant={variant}>
      {children}
      {hasDelete && <SvgDelete/>}
    </StyledTag>
  )
}

export default Tag
