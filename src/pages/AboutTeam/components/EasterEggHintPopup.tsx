import { AnimatePresence } from 'framer-motion';
import S from '../styles/EasterEggHintPopup.styled';

interface EasterEggHintPopupProps {
  show: boolean;
  onClose: () => void;
}

export default function EasterEggHintPopup({ show, onClose }: EasterEggHintPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <S.PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <S.InitialHintPopup
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <S.PopupMessage>
              <span>
                이 페이지 어딘가에 <S.HintWord>특별한 이스터에그</S.HintWord>가 숨어 있습니다.
              </span>
              <S.BlinkingRocket>힌트: 🚀</S.BlinkingRocket>
            </S.PopupMessage>
          </S.InitialHintPopup>
        </>
      )}
    </AnimatePresence>
  );
}
