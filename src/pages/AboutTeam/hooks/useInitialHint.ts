import { useState, useEffect } from 'react';

export function useInitialHint(isEasterEggUnlocked: boolean) {
  const [showInitialHint, setShowInitialHint] = useState(false);

  useEffect(() => {
    if (!isEasterEggUnlocked) {
      const showTimer = setTimeout(() => {
        setShowInitialHint(true);
      }, 2000);

      const hideTimer = setTimeout(() => {
        setShowInitialHint(false);
      }, 5000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isEasterEggUnlocked]);

  return { showInitialHint, setShowInitialHint };
}
