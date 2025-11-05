import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  width: 100%;
  max-width: 50rem;
  max-height: 100%;
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2rem 1.6rem;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  line-height: 3.2rem;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
  }
`;

export const CloseButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.surface};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
    border-radius: 0.4rem;
  }
`;

export const CouponList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2rem 1.6rem;
  }
`;

export const CouponItem = styled.div<{ $selected: boolean; $available: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.6rem;
  border: 0.1rem solid
    ${({ theme, $selected, $available }) =>
      !$available
        ? theme.colors.gray200
        : $selected
          ? theme.colors.primary300
          : theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $selected, $available }) =>
    !$available ? theme.colors.gray100 : $selected ? theme.colors.primary100 : theme.colors.white};
  cursor: ${({ $available }) => ($available ? 'pointer' : 'not-allowed')};
  transition: all 0.2s ease;
  opacity: ${({ $available }) => ($available ? 1 : 0.6)};

  &:hover {
    ${({ $available, theme }) => $available && `border-color: ${theme.colors.primary300};`}
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.4rem;
  }
`;

export const RadioWrapper = styled.div`
  flex-shrink: 0;
  padding-top: 0.2rem;
`;

export const RadioInput = styled.input`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
  accent-color: ${({ theme }) => theme.colors.primary300};
  appearance: auto;
  -webkit-appearance: radio;
  -moz-appearance: radio;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.focus};
    outline-offset: 0.2rem;
  }
`;

export const CouponContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

export const CouponName = styled.h3<{ $available: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme, $available }) => ($available ? theme.colors.surface : theme.colors.gray300)};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

export const CouponDescription = styled.p<{ $available: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 2rem;
  color: ${({ theme, $available }) => ($available ? theme.colors.gray400 : theme.colors.gray300)};
  margin: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

export const CouponWarning = styled.span`
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.alert};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.caption};
  }
`;

export const DiscountAmount = styled.span<{ $available: boolean }>`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2.2rem;
  color: ${({ theme, $available }) =>
    $available ? theme.colors.primary300 : theme.colors.gray300};
  white-space: nowrap;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

export const ModalFooter = styled.div`
  padding: 2.4rem;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.gray200};

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2rem 1.6rem;
  }
`;
