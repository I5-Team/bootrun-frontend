import { useState, useCallback } from 'react';

export function useEasterEgg() {
  const [isEasterEggUnlocked, setIsEasterEggUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const unlockEasterEgg = useCallback(() => {
    setIsEasterEggUnlocked(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return {
    isEasterEggUnlocked,
    showConfetti,
    unlockEasterEgg,
  };
}
