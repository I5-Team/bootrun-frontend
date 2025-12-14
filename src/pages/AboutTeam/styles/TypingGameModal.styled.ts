import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TypingGameModalStyles = {
  TypingGameOverlay: styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${({ theme }) => theme.zIndex.modal + 10};
    padding: 2rem;
  `,

  TypingGameModal: styled(motion.div)`
    background: #000;
    border-radius: ${({ theme }) => theme.radius.xxl};
    padding: 4rem;
    max-width: 90rem;
    width: 100%;
    position: relative;
    box-shadow: 0 0 5rem rgba(255, 215, 0, 0.3);

    @media ${({ theme }) => theme.devices.mobile} {
      padding: 2rem;
      max-width: 95%;
    }
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: transparent;
    border: none;
    color: mintcream;
    font-size: 2.4rem;
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 50%;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: rotate(90deg);
    }

    @media ${({ theme }) => theme.devices.mobile} {
      top: 1rem;
      right: 1rem;
      width: 3rem;
      height: 3rem;
      font-size: 2rem;
    }
  `,

  GameTitle: styled.h2`
    color: mintcream;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.headingLg};
    font-weight: 700;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.headingMd};
      margin-bottom: 2rem;
      letter-spacing: 0.2em;
    }
  `,

  StatusMessage: styled.div`
    text-align: center;
    color: mintcream;
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin-bottom: 1rem;
    min-height: 3rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  `,

  MobileHint: styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-top: 1rem;
    display: none;

    @media ${({ theme }) => theme.devices.mobile} {
      display: block;
    }
  `,
};

export default TypingGameModalStyles;
