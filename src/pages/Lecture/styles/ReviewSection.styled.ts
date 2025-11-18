import styled from 'styled-components';
const Review = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  Card: styled.div`
    width: 100%;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 2.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .date {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: #8d9299;
    }
  `,
  CardAuthor: styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    .name {
      font-weight: 600;
    }
  `,
  Rating: styled.span<{ $size?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: ${({ $size }) => ($size === 'lg' ? 600 : 500)};
    line-height: ${({ $size }) => ($size === 'lg' ? 1.4 : 1)};
    svg {
      position: relative;
      top: -0.5px;
      width: 1.24rem;
      height: auto;
    }
  `,
  CardComent: styled.p`
    color: ${({ theme }) => theme.colors.gray400};
    line-height: 1.4;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
};

export default Review;
