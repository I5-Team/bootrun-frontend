import styled from 'styled-components';

export const TeamThumbnailListStyles = {
  ThumbnailList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    min-width: 28rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: row;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 1.2rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-color: ${({ theme }) => theme.colors.primary300} transparent;
      scrollbar-width: auto;

      &::-webkit-scrollbar {
        height: 1.2rem;
        -webkit-appearance: none;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 0.6rem;
      }

      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.primary300};
        border-radius: 0.6rem;
        min-width: 6rem;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.primary300};
      }

      &::-webkit-scrollbar-thumb:active {
        background: ${({ theme }) => theme.colors.primary300};
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      min-width: auto;
    }
  `,

  Thumbnail: styled.button<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem;
    margin: 1rem 0;
    background: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary300 : theme.colors.white};
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.white : theme.colors.surface)};
    border: 0.2rem solid
      ${({ theme, $isActive }) => ($isActive ? theme.colors.primary300 : theme.colors.gray200)};
    border-radius: ${({ theme }) => theme.radius.lg};
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    min-width: 28rem;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary300};
      transform: translateX(0.4rem);
    }

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      text-align: center;
      min-width: 18rem;

      &:hover {
        transform: translateY(-0.4rem);
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      min-width: 15rem;
      padding: 1.2rem;
    }
  `,

  ThumbnailInfo: styled.div`
    flex: 1;
  `,

  ThumbnailName: styled.div`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    margin-bottom: 0.4rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,

  ThumbnailRole: styled.div<{ $isActive: boolean }>`
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.caption};
    }
  `,
};

export default TeamThumbnailListStyles;
