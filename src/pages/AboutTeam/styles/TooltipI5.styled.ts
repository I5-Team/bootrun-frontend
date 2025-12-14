import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TooltipI5Styles = {
  QuestionIconWrapper: styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  `,

  QuestionIcon: styled.span`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    background: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    font-weight: 700;
    animation: pulse 2s ease-in-out infinite;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover {
      opacity: 0.8;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      width: 1.4rem;
      height: 1.4rem;
      font-size: ${({ theme }) => theme.fontSize.caption};
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }
  `,

  TooltipAnchor: styled.span`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 1.2rem;
    z-index: ${({ theme }) => theme.zIndex.tooltip};
    pointer-events: none;
  `,

  Tooltip: styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.2rem 1.6rem;
    border-radius: ${({ theme }) => theme.radius.lg};
    font-size: ${({ theme }) => theme.fontSize.sm};
    white-space: nowrap;
    box-shadow: ${({ theme }) => theme.shadows.xl};
    font-weight: 400;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 0.8rem solid transparent;
      border-right: 0.8rem solid transparent;
      border-bottom: 0.8rem solid ${({ theme }) => theme.colors.surface};
    }

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding: 1.2rem 1.6rem;
      white-space: normal;
      max-width: calc(100vw - 4rem);
      width: max-content;
      text-align: center;
      line-height: 1.5;
    }
  `,
};

export default TooltipI5Styles;
