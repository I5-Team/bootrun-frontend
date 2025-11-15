import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 72rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg}; /* 1.2rem */
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
`;
export const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  padding: 2.4rem;
  margin: 0;
`;
export const Container = styled.div`
  display: flex;
  gap: 3.2rem;
  padding: 2.4rem;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;
export const ProfileContainer = styled.div`
  flex-shrink: 0;
`;
export const ImageWrapper = styled.div`
  position: relative; /* ◀ 버튼의 기준점이 됨 */
  width: 12rem;
  height: 12rem;
`;
export const ImagePreview = styled.div`
  width: 12rem;
  height: 12rem;
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
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;

  background: ${({ theme, $isDelete }) =>
    $isDelete ? theme.colors.gray400 : theme.colors.gray400};

  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 700;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const FormContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const FormRow = styled.div`
  display: flex;
  gap: 2rem;
`;
export const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  label {
    font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
    font-weight: 500;
  }

  input,
  select {
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md}; /* 0.8rem */
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  }

  input[type='text'] {
    border-color: ${({ theme }) => theme.colors.primary300};
  }
`;
export const Input = styled.input`
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  min-width: auto;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
    outline: none;
  }

  &[type='text'] {
    border-color: ${({ theme }) => theme.colors.primary300};
  }
`;
export const Select = styled.select`
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  background: white;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary300};
    outline: none;
  }
`;
export const SubmitButtonWrapper = styled.div`
  padding: 2.4rem;
  display: flex;
  justify-content: flex-end;
`;
export const SubmitButton = styled.button`
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
