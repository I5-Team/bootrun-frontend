import styled from "styled-components";

const MyPage = {
  Form: styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
  `,

  Container: styled.div`
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
  `,

  Title: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.mobileFontSize.xxl};
    }
  `,

  Input: styled.input`
    height: 4.8rem;
    padding: 1.2rem 2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary300};
    }
  `,
  Select: styled.select`
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
  `,
}

export default MyPage;