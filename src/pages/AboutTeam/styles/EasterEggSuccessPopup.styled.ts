import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EasterEggSuccessPopupStyles = {
  PopupOverlay: styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${({ theme }) => theme.zIndex.modal + 4};
  `,

  SuccessMessage: styled(motion.div)`
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
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 2.5rem 3rem;
      max-width: 85%;
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  `,

  SuccessMessageHighlightedText: styled.span`
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.primary300};
  `,
};

export default EasterEggSuccessPopupStyles;
