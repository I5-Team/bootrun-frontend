import styled from 'styled-components';

const Curr = {
  Container: styled.div`
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xl};
    width: 100%;
    overflow: hidden;
  `,
  Chapter: styled.div<{ $isOpen: boolean }>`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    &:last-child {
      border-bottom: none;
    }
    overflow: hidden;
  `,
  ChapterHeaderButton: styled.button`
    width: 100%;
    height: 6rem;
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray100};
  `,
  ToggleIcon: styled.span<{ $isOpen: boolean }>`
    background: ${({ theme }) => theme.colors.white};
    border: none;
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;

    color: ${({ theme }) => theme.colors.gray400};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
    transition: transform 0.3s ease;

    svg {
      width: 50%;
    }
  `,
  ChapterTitleText: styled.span`
    font-weight: 500;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  LectureList: styled.ul`
    background: ${({ theme }) => theme.colors.white};
    transition: height 0.3s ease;
  `,
  LectureItem: styled.li`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding-block: 1.6rem;
    padding-inline: 5.2rem 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary100};
    }

    svg {
      width: 1.4rem;
      height: 1.4rem;
      path {
        fill: ${({ theme }) => theme.colors.gray400};
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
};

export default Curr;
