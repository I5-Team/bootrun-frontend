import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 100%;
  padding: 5.2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 3.2rem;
  }
`;

export const MainContainer = styled(Container)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.4rem */
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface};
  }
`;

export const FormLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.surface};
`;

export const EmailInput = styled.input`
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const GithubLink = styled.a`
  background: none;
  border: none;
  padding: 0;
  text-align: left;

  /* 기존 <a> 스타일 적용 */
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary300};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const GithubLinked = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  span {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.surface};
  }

  button {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray300};
    background: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const PasswordButton = styled.button`
  width: fit-content;
  padding: 1.4rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary300};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const DangerZone = styled.details`
  z-index: 1;
  position: relative;
  top: -0.5px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-bottom-left-radius: ${({ theme }) => theme.radius.md};
  border-bottom-right-radius: ${({ theme }) => theme.radius.md};

  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    list-style: none;
  }

  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  border-bottom-left-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};

  &[open] {
    background: #fffafa;
  }
`;

export const DangerSummary = styled.summary`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.alert};

  details[open] & {
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
export const ArrowIcon = styled.span.attrs({
  'aria-hidden': 'true',
})`
  &::before {
    content: '▼';
    display: inline-block;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray300};
    transition: transform 0.2s ease;

    /* details[open] 상태일 때 <summary> 내부의 화살표 회전 */
    details[open] & {
      transform: rotate(180deg);
    }
  }
`;
export const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;

  label {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
export const ModalInput = styled.input`
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1.6rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
    outline: none;
  }
`;
export const ModalErrorMessage = styled.p<{ $type?: 'error' | 'success' }>`
  font-size: 1.4rem;
  color: ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.primary300 : theme.colors.alert};
  margin: -0.8rem 0 1.6rem 0;
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.4rem;
`;

export const ModalButton = styled.button<{ $danger?: boolean; $primary?: boolean }>`
  padding: 1rem 1.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  cursor: pointer;

  // 기본 버튼 (취소)
  color: ${({ theme }) => theme.colors.gray400};
  background: ${({ theme }) => theme.colors.white};

  // 확인 버튼 (Primary)
  ${({ theme, $primary }) =>
    $primary &&
    `
      background: ${theme.colors.primary300};
      border-color: ${theme.colors.primary300};
      color: ${theme.colors.white};
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryDark}; // (테마에 primary400이 있다고 가정)
      }
    `}

  // 위험 버튼 (Danger)
    ${({ theme, $danger }) =>
    $danger &&
    `
      background: ${theme.colors.alert};
      border-color: ${theme.colors.alert};
      color: ${theme.colors.white};
      &:hover:not(:disabled) {
        opacity: 0.8;
      }
    `}

    &:hover:not(:disabled) {
    background: ${({ theme, $primary, $danger }) =>
      !$primary && !$danger ? theme.colors.gray100 : 'auto'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DangerContent = styled.div`
  padding: 2.4rem;
  padding-top: 0;

  button {
    background-color: ${({ theme }) => theme.colors.alert};

    &:hover:not(:disabled),
    &:active:not(:disabled) {
      background-color: #e22531 !important;
    }
  }
`;
export const DangerTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.alert}; // ◀ Red
  margin: 0 0 0.8rem 0;
`;
export const DangerDescription = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray400};
  margin-bottom: 1.6rem;
`;
export const DangerButton = styled.button`
  width: fit-content;
  padding: 1.2rem 2rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.alert}; // ◀ Red
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  min-height: 12rem; /* 모달 내용 최소 높이 */

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
