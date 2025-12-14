import { AnimatePresence } from 'framer-motion';
import type { Developer } from '../../../types/AboutTeamType';
import S from '../styles/TeamMemberCard.styled';
import Button from '../../../components/Button';
import GithubIcon from '../../../assets/icons/icon-oatuth-github.svg?react';
import LockIcon from '../../../assets/icons/icon-lock.svg?react';

interface TeamMemberCardProps {
  developer: Developer;
  isEasterEggUnlocked: boolean;
}

export default function TeamMemberCard({ developer, isEasterEggUnlocked }: TeamMemberCardProps) {
  return (
    <S.MainCardContainer>
      <AnimatePresence mode="wait">
        <S.MainCard
          key={developer.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.CardName>{developer.name}</S.CardName>
          <S.CardRole>{developer.role}</S.CardRole>
          <S.CardDescription>{developer.description}</S.CardDescription>

          {developer.github && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                as="a"
                to={developer.github}
                variant="primaryDark"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(developer.github, '_blank', 'noopener,noreferrer');
                }}
                iconSvg={<GithubIcon />}
                ariaLabel="GitHub 프로필 보기"
              >
                GitHub 프로필
              </Button>
            </div>
          )}

          <AnimatePresence>
            {isEasterEggUnlocked && developer.story && (
              <S.HiddenSection
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <S.HiddenTitle>숨겨진 개발자 스토리</S.HiddenTitle>
                <S.DeveloperStory>{developer.story}</S.DeveloperStory>
                {developer.story2 && (
                  <S.DeveloperStory style={{ marginTop: '1.6rem' }}>
                    {developer.story2}
                  </S.DeveloperStory>
                )}
                {developer.emojiImage && (
                  <S.EmojiImageContainer>
                    <img src={developer.emojiImage} alt={`${developer.name} 이미지`} />
                  </S.EmojiImageContainer>
                )}
              </S.HiddenSection>
            )}
            {!isEasterEggUnlocked && (
              <S.LockedStoryContainer
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <S.LockIconWrapper>
                  <LockIcon />
                </S.LockIconWrapper>
                <S.LockedText>숨겨진 개발자 스토리</S.LockedText>
                <S.LockedHint>이스터에그를 발견하면 나타납니다</S.LockedHint>
              </S.LockedStoryContainer>
            )}
          </AnimatePresence>
        </S.MainCard>
      </AnimatePresence>
    </S.MainCardContainer>
  );
}
