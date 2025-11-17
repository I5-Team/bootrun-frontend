/**
 * 자료 탭 스타일
 */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

export const InfoBanner = styled.div<{ $empty?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem;
  background-color: ${({ theme, $empty }) =>
    $empty ? theme.colors.gray100 : theme.colors.primary100};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const InfoIcon = styled.span`
  font-size: 2rem;
  flex-shrink: 0;
`;

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.surface};
  line-height: 1.5;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const NavigateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.6rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.primary300};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
    padding: 1.4rem 2rem;
  }
`;

export const Arrow = styled.span`
  font-size: 2rem;
  transition: transform 0.2s ease;

  ${NavigateButton}:hover & {
    transform: translateX(0.4rem);
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1.6;
  text-align: center;
  padding: 0 1.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;
