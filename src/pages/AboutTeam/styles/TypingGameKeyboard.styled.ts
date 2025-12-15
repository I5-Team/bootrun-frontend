import styled from 'styled-components';

function getKeyColor(colorClass?: string): string {
  switch (colorClass) {
    case 'pinky':
      return 'crimson';
    case 'ring':
      return 'coral';
    case 'middle':
      return 'darkorange';
    case 'pointer1st':
      return 'gold';
    case 'pointer2nd':
      return 'khaki';
    default:
      return 'slategrey';
  }
}

export const TypingGameKeyboardStyles = {
  KeyboardContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 2rem;
  `,

  KeyboardRow: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.4rem;
  `,

  Key: styled.div<{ $isActive?: boolean; $colorClass?: string }>`
    height: 3em;
    width: 3em;
    border-radius: 0.4em;
    line-height: 3em;
    letter-spacing: 0.1em;
    text-align: center;
    font-size: 1em;
    transition: 0.3s;
    cursor: pointer;
    user-select: none;
    color: ${({ $isActive }) => ($isActive ? 'transparent' : 'rgba(0, 0, 0, 0.7)')};
    border: ${({ $isActive, $colorClass }) =>
      $isActive
        ? `0.2rem solid ${getKeyColor($colorClass)}`
        : `0.2rem solid ${getKeyColor($colorClass)}`};
    background: ${({ $isActive, $colorClass }) =>
      $isActive ? 'transparent' : getKeyColor($colorClass)};

    ${({ $isActive, $colorClass }) =>
      $isActive &&
      `
      color: ${getKeyColor($colorClass)};
      animation: vibrate-1 0.3s linear infinite both;
    `}

    &:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    @keyframes vibrate-1 {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-0.2rem, 0.2rem);
      }
      40% {
        transform: translate(-0.2rem, -0.2rem);
      }
      60% {
        transform: translate(0.2rem, 0.2rem);
      }
      80% {
        transform: translate(0.2rem, -0.2rem);
      }
      100% {
        transform: translate(0);
      }
    }

    @media ${({ theme }) => theme.devices.mobile} {
      height: 2.5em;
      width: 2.5em;
      font-size: 0.7em;
    }
  `,
};

export default TypingGameKeyboardStyles;
