import { useState, useEffect, useCallback, useRef } from 'react';
import type { LetterStatus } from '../../../types/AboutTeamType';
import { TARGET_WORD, KOREAN_KEY_MAP } from '../constants/keyboardLayout';

export function useTypingGame(onSuccess: () => void) {
  const [showTypingGame, setShowTypingGame] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);
  const [letterStatus, setLetterStatus] = useState<LetterStatus[]>(Array(7).fill('pending'));
  const [currentKey, setCurrentKey] = useState('B');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [gameMessage, setGameMessage] = useState('');

  const handleOpenTypingGame = useCallback(() => {
    setShowTypingGame(true);
    setTypingProgress(0);
    const initialStatus = Array(7).fill('pending');
    initialStatus[0] = 'current';
    setLetterStatus(initialStatus);
    setCurrentKey('B');
    setStartTime(Date.now());
    setGameMessage(
      '프로젝트명을 입력하면 숨겨진 개발자들의 TMI가 나옵니다.(힌트: 부트런을 영어로 하면?)'
    );
  }, []);

  const handleCloseTypingGame = useCallback(() => {
    setShowTypingGame(false);
    setTypingProgress(0);
    setStartTime(null);
  }, []);

  const processKeyPress = useCallback(
    (key: string) => {
      const expectedKey = TARGET_WORD[typingProgress];
      const normalizedKey = KOREAN_KEY_MAP[key] || key;

      if (normalizedKey === expectedKey) {
        const newStatus = [...letterStatus];
        newStatus[typingProgress] = 'correct';
        setLetterStatus(newStatus);

        const newProgress = typingProgress + 1;
        setTypingProgress(newProgress);

        if (newProgress < TARGET_WORD.length) {
          const nextStatus = [...newStatus];
          nextStatus[newProgress] = 'current';
          setLetterStatus(nextStatus);
          setCurrentKey(TARGET_WORD[newProgress]);
          setGameMessage('좋아요! 계속하세요!');
        } else {
          const endTime = Date.now();
          const timeTaken = ((endTime - (startTime || endTime)) / 1000).toFixed(2);
          setGameMessage(`성공! ${timeTaken}초 만에 완료했습니다!`);

          setTimeout(() => {
            onSuccess();
            setShowTypingGame(false);
          }, 1500);
        }
      } else {
        // Wrong key
        const newStatus = [...letterStatus];
        newStatus[typingProgress] = 'error';
        setLetterStatus(newStatus);
        setGameMessage('틀렸습니다! 다시 시도하세요!');

        setTimeout(() => {
          const resetStatus = [...newStatus];
          resetStatus[typingProgress] = 'current';
          setLetterStatus(resetStatus);
        }, 300);
      }
    },
    [typingProgress, letterStatus, startTime, onSuccess]
  );

  const handleKeyClick = useCallback(
    (key: string) => {
      if (!showTypingGame) return;
      processKeyPress(key);
    },
    [showTypingGame, processKeyPress]
  );

  useEffect(() => {
    if (!showTypingGame) return;

    const handleTypingGameKey = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (key.match(/^[A-Z]$/) || Object.keys(KOREAN_KEY_MAP).includes(key)) {
        processKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleTypingGameKey);
    return () => window.removeEventListener('keydown', handleTypingGameKey);
  }, [showTypingGame, processKeyPress]);


  return {
    showTypingGame,
    typingProgress,
    letterStatus,
    currentKey,
    gameMessage,
    handleOpenTypingGame,
    handleCloseTypingGame,
    handleKeyClick,
  };
}
