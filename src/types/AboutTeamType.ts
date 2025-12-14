export interface Developer {
  id: number;
  name: string;
  role: string;
  description: string;
  github?: string;
  story?: string;
  story2?: string;
  emojiImage?: string;
}

export type LetterStatus = 'pending' | 'correct' | 'current' | 'error';

export interface KeyboardKey {
  key: string;
  color: 'pinky' | 'ring' | 'middle' | 'pointer1st' | 'pointer2nd';
}
