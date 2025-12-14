import type { KeyboardKey } from '../../../types/AboutTeamType';

export const keyboardLayout: KeyboardKey[][] = [
  [
    { key: 'Q', color: 'pinky' },
    { key: 'W', color: 'ring' },
    { key: 'E', color: 'middle' },
    { key: 'R', color: 'pointer1st' },
    { key: 'T', color: 'pointer2nd' },
    { key: 'Y', color: 'pointer2nd' },
    { key: 'U', color: 'pointer1st' },
    { key: 'I', color: 'middle' },
    { key: 'O', color: 'ring' },
    { key: 'P', color: 'pinky' },
  ],
  [
    { key: 'A', color: 'pinky' },
    { key: 'S', color: 'ring' },
    { key: 'D', color: 'middle' },
    { key: 'F', color: 'pointer1st' },
    { key: 'G', color: 'pointer2nd' },
    { key: 'H', color: 'pointer2nd' },
    { key: 'J', color: 'pointer1st' },
    { key: 'K', color: 'middle' },
    { key: 'L', color: 'ring' },
  ],
  [
    { key: 'Z', color: 'pinky' },
    { key: 'X', color: 'ring' },
    { key: 'C', color: 'middle' },
    { key: 'V', color: 'pointer1st' },
    { key: 'B', color: 'pointer2nd' },
    { key: 'N', color: 'pointer2nd' },
    { key: 'M', color: 'pointer1st' },
  ],
];

export const TARGET_WORD = 'BOOTRUN';

export const KOREAN_KEY_MAP: Record<string, string> = {
  ㅠ: 'B',
  ㅐ: 'O',
  ㅅ: 'T',
  ㄱ: 'R',
  ㅕ: 'U',
  ㅜ: 'N',
};
