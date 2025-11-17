import styled from 'styled-components';

export const PaymentManagePageStyles = {
  TabContainer: styled.div`
    display: flex;
    gap: 0.4rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0.8rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    margin-bottom: 2rem;
  `,

  Tab: styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 1.2rem 2.4rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary300 : theme.colors.gray100};
    color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.gray400)};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${({ theme, $active }) =>
        $active ? theme.colors.primaryDark : theme.colors.gray100};
    }
  `,
};
