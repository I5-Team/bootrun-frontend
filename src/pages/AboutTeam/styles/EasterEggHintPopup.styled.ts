import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EasterEggHintPopupStyles = {
  PopupOverlay: styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${({ theme }) => theme.zIndex.modal + 4};
  `,

  InitialHintPopup: styled(motion.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface} 0%, #1a1a2e 100%);
    color: ${({ theme }) => theme.colors.white};
    padding: 3rem 4rem;
    border-radius: ${({ theme }) => theme.radius.xxl};
    z-index: ${({ theme }) => theme.zIndex.modal + 5};
    text-align: center;
    border: 0.3rem solid ${({ theme }) => theme.colors.primary300};
    max-width: 50rem;
    margin: 0;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 2.5rem 3rem;
      max-width: 85%;
    }
  `,

  PopupMessage: styled.div`
    font-size: ${({ theme }) => theme.fontSize.lg};
    line-height: 1.6;
    opacity: 0.95;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    span {
      word-break: keep-all;
    }

    @media ${({ theme }) => theme.devices.laptop} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,

  HintWord: styled.span`
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: 700;
  `,

  BlinkingRocket: styled.span`
    display: block;
    font-size: ${({ theme }) => theme.fontSize.headingMd};
    font-weight: 700;

    @media ${({ theme }) => theme.devices.laptop} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,
};

export default EasterEggHintPopupStyles;
