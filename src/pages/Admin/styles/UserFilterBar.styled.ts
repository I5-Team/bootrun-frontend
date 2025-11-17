import styled from 'styled-components';

export const UserFilterBarStyles = {
  CardBox: styled.form`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 2.4rem;
    display: flex;
    flex-wrap: wrap; // 반응형
    gap: 1.6rem;
    align-items: flex-end;
  `,
  FilterGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    label {
      font-size: 1.3rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray400};
    }
  `,
  Input: styled.input`
    height: 4.2rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    width: 25rem; // 너비 조절
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  Select: styled.select`
    height: 4.2rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    width: 15rem; // 너비 조절
    background: white;
  `,
  SubmitButton: styled.button`
    height: 4.2rem;
    padding: 0 2.4rem;
    background: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    margin-left: auto; // 오른쪽 정렬
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
};
