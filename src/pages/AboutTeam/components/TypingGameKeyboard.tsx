import { keyboardLayout } from '../constants/keyboardLayout';
import S from '../styles/TypingGameKeyboard.styled';

interface TypingGameKeyboardProps {
  currentKey: string;
  onKeyClick: (key: string) => void;
}

export default function TypingGameKeyboard({ currentKey, onKeyClick }: TypingGameKeyboardProps) {
  return (
    <S.KeyboardContainer>
      {keyboardLayout.map((row, rowIndex) => (
        <S.KeyboardRow key={rowIndex}>
          {row.map(({ key, color }) => (
            <S.Key
              key={key}
              $colorClass={color}
              $isActive={currentKey === key}
              onClick={() => onKeyClick(key)}
            >
              {key}
            </S.Key>
          ))}
        </S.KeyboardRow>
      ))}
    </S.KeyboardContainer>
  );
}
