import styled from 'styled-components';

export const TypingGameTargetWordStyles = {
  TargetWord: styled.div`
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    margin-bottom: 4rem;

    @media ${({ theme }) => theme.devices.mobile} {
      gap: 0.8rem;
      margin-bottom: 3rem;
    }
  `,

  Letter: styled.div<{ $status: 'pending' | 'correct' | 'current' | 'error' }>`
    font-size: 4rem;
    font-weight: 700;
    color: ${({ $status, theme }) => {
      if ($status === 'correct') return theme.colors.primary300;
      if ($status === 'current') return theme.colors.sub;
      if ($status === 'error') return theme.colors.alert;
      return theme.colors.gray300;
    }};
    text-transform: uppercase;
    transition: all 0.3s ease;
    animation: ${({ $status }) => ($status === 'error' ? 'shake 0.3s' : 'none')};

    ${({ $status }) =>
      $status === 'current' &&
      `
      animation: pulse-letter 1s ease-in-out infinite;
    `}

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-1rem);
      }
      75% {
        transform: translateX(1rem);
      }
    }

    @keyframes pulse-letter {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: 2.5rem;
    }
  `,
};

export default TypingGameTargetWordStyles;
