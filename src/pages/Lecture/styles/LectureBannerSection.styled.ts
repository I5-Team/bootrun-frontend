import styled from 'styled-components';

const S = {
  BannerWrapper: styled.section`
    position: relative;
    width: 100%;
    height: 41.6rem;
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray200};
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 6rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ${({ theme }) => theme.devices.tablet} {
      margin-top: 2.4rem;
      aspect-ratio: 342 / 180;
      height: auto;
    }
  `,
};

export default S;
