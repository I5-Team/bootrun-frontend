import styled from 'styled-components';

export const ProfileFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  gap: clamp(2.4rem, 4vw, 5.2rem);

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfileContainer = styled.div`
  flex-shrink: 0;
  position: relative; /* ◀ 버튼의 기준점이 됨 */
  width: 14.6rem;
  height: 14.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray100};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ImagePreview = styled.div`
  width: 14.6rem;
  height: 14.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.gray300};
  border-radius: 50%;
`;
export const ImageActionButton = styled.button<{ $isDelete?: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 4.6rem;
  height: 4.6rem;
  padding: 1.2rem;
  border-radius: 50%;

  background: ${({ theme, $isDelete }) =>
    $isDelete ? theme.colors.gray400 : theme.colors.gray400};

  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const FormContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const FormGroup = styled.div`
  flex-grow: 1;
  min-width: 16.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`;

export const SubmitButtonWrapper = styled.div`
  width: 24rem;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
`;

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

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
  }
`;

export const Input = styled.input`
  height: 4.8rem;
  padding: 1.2rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary300};
  }
`;
export const Select = styled.select`
  height: 4.8rem;
  padding: 1.2rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary300};
    outline-offset: 0;
  }
`;
