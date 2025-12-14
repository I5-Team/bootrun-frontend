import { AnimatePresence } from 'framer-motion';
import S from '../styles/TypingGameModal.styled';
import TypingGameTargetWord from './TypingGameTargetWord';
import TypingGameKeyboard from './TypingGameKeyboard';
import type { LetterStatus } from '../../../types/AboutTeamType';

interface TypingGameModalProps {
  show: boolean;
  typingProgress: number;
  letterStatus: LetterStatus[];
  currentKey: string;
  gameMessage: string;
  onClose: () => void;
  onKeyClick: (key: string) => void;
}

export default function TypingGameModal({
  show,
  typingProgress,
  letterStatus,
  currentKey,
  gameMessage,
  onClose,
  onKeyClick,
}: TypingGameModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <S.TypingGameOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.TypingGameModal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={onClose}>&times;</S.CloseButton>

            <S.GameTitle>이스터에그 발견!</S.GameTitle>

            <TypingGameTargetWord letterStatus={letterStatus} />

            <TypingGameKeyboard currentKey={currentKey} onKeyClick={onKeyClick} />

            <S.StatusMessage>{gameMessage}</S.StatusMessage>

            {typingProgress === 0 && (
              <S.MobileHint>모바일에서는 화면의 키보드를 터치하세요!</S.MobileHint>
            )}
          </S.TypingGameModal>
        </S.TypingGameOverlay>
      )}
    </AnimatePresence>
  );
}
