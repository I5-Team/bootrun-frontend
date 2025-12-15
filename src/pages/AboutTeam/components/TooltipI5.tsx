import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import S from '../styles/TooltipI5.styled';

interface TooltipI5Props {
  show: boolean;
  onToggle: () => void;
}

export default function TooltipI5({ show, onToggle }: TooltipI5Props) {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onToggle]);

  return (
    <S.QuestionIconWrapper ref={tooltipRef}>
      <S.QuestionIcon onClick={onToggle}>?</S.QuestionIcon>

      <AnimatePresence>
        {show && (
          <S.TooltipAnchor>
            <S.Tooltip
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              팀원 5명 모두 MBTI I 유형입니다.
            </S.Tooltip>
          </S.TooltipAnchor>
        )}
      </AnimatePresence>
    </S.QuestionIconWrapper>
  );
}
