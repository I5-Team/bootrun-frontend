import S from '../styles/TeamIntroSection.styled';
import TeamThumbnailList from './TeamThumbnailList';
import TeamMemberCard from './TeamMemberCard';
import type { Developer } from '../../../types/AboutTeamType';

interface TeamIntroSectionProps {
  isEasterEggUnlocked: boolean;
  developers: Developer[];
  currentIndex: number;
  currentDev: Developer;
  onSelectMember: (index: number) => void;
}

export default function TeamIntroSection({
  isEasterEggUnlocked,
  developers,
  currentIndex,
  currentDev,
  onSelectMember,
}: TeamIntroSectionProps) {
  return (
    <S.CardSection>
      <S.SectionHeader>
        <S.SectionTitleWithHint>
          {!isEasterEggUnlocked ? (
            '개발자'
          ) : (
            <S.UnlockedText>숨겨진 스토리가 포함된 개발자</S.UnlockedText>
          )}{' '}
          소개
        </S.SectionTitleWithHint>
      </S.SectionHeader>
      <S.Container>
        <TeamThumbnailList
          developers={developers}
          currentIndex={currentIndex}
          onSelectMember={onSelectMember}
        />
        <TeamMemberCard developer={currentDev} isEasterEggUnlocked={isEasterEggUnlocked} />
      </S.Container>
    </S.CardSection>
  );
}
