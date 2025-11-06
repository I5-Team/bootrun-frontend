import React from 'react'
import styled from 'styled-components'

type TagVariant = 'dark' | 'primary'

type TagProps = {
  children: React.ReactNode
  variant?: TagVariant
}

const StyledTag = styled.span<{ $variant: TagVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.xs};

  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  white-space: nowrap;

  background-color: ${({ $variant, theme }) =>
    $variant === 'dark' ? theme.colors.gray400 : theme.colors.primary100};
  color: ${({ $variant, theme }) =>
    $variant === 'dark' ? theme.colors.white : theme.colors.primary300};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`

export const Tag: React.FC<TagProps> = ({ children, variant = 'primary' }) => {
  return <StyledTag $variant={variant}>{children}</StyledTag>
}

export default Tag
