import styled from 'styled-components';

const FAQ = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  `,
  Item: styled.div<{ $open: boolean }>`
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    transition: all 0.2s ease-out;
    ${({ $open, theme }) => $open && theme.colors.shadow};
  `,
  QuestionButton: styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    padding-left: 2.8rem;
    cursor: pointer;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 1.6rem;
      padding-right: 1.2rem;
    }
  `,
  QuestionTitle: styled.span`
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.md};
    display: flex;
    align-items: center;
    gap: 1.2rem;

    .prefix {
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary300};

      @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.mobileFontSize.xl};
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  ToggleIcon: styled.span<{ $open: boolean }>`
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 50%;

    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
  AnswerWrapper: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: height 0.3s ease;
  `,
  Answer: styled.span`
    display: block;
    width: 100%;

    padding: 0 2.4rem 2.8rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray400};
    white-space: pre-wrap;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding-bottom: 2rem;
    }
  `,
  Anchor: styled.a`
    font-weight: 500;
    cursor: pointer;
  `,
};

export default FAQ;
