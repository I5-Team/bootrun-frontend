import { TARGET_WORD } from '../constants/keyboardLayout';
import type { LetterStatus } from '../../../types/AboutTeamType';
import S from '../styles/TypingGameTargetWord.styled';

interface TypingGameTargetWordProps {
  letterStatus: LetterStatus[];
}

export default function TypingGameTargetWord({ letterStatus }: TypingGameTargetWordProps) {
  return (
    <S.TargetWord>
      {TARGET_WORD.split('').map((letter, index) => (
        <S.Letter key={index} $status={letterStatus[index]}>
          {letter}
        </S.Letter>
      ))}
    </S.TargetWord>
  );
}
