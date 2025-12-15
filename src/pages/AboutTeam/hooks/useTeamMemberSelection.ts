import { useState } from 'react';
import { developers } from '../constants/developers';

export function useTeamMemberSelection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentDev = developers[currentIndex];

  return {
    currentIndex,
    currentDev,
    setCurrentIndex,
    developers,
  };
}
