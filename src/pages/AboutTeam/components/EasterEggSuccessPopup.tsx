import { AnimatePresence } from 'framer-motion';
import S from '../styles/EasterEggSuccessPopup.styled';

interface EasterEggSuccessPopupProps {
  show: boolean;
}

export default function EasterEggSuccessPopup({ show }: EasterEggSuccessPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <S.PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <S.SuccessMessage
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <S.SuccessMessageContent>
              <S.SuccessMessageHighlightedText>이스터에그 해제!</S.SuccessMessageHighlightedText>
              <span>개발자 소개에 숨겨진 스토리가 나타났어요.</span>
            </S.SuccessMessageContent>
          </S.SuccessMessage>
        </>
      )}
    </AnimatePresence>
  );
}
