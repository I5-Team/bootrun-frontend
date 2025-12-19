import S from '../styles/AboutTeamPage.styled';
import HeroSection from '../components/HeroSection';
import TeamIntroSection from '../components/TeamIntroSection';
import TeamStatsSection from '../components/TeamStatsSection';
import TypingGameModal from '../components/TypingGameModal';
import EasterEggHintPopup from '../components/EasterEggHintPopup';
import EasterEggSuccessPopup from '../components/EasterEggSuccessPopup';
import ScrollToTopButton from '../../../components/ScrollToTopButton';

import { useEasterEgg } from '../hooks/useEasterEgg';
import { useTypingGame } from '../hooks/useTypingGame';
import { useTeamMemberSelection } from '../hooks/useTeamMemberSelection';
import { useInitialHint } from '../hooks/useInitialHint';

export default function AboutTeamPage() {
  const { isEasterEggUnlocked, showConfetti, unlockEasterEgg } = useEasterEgg();
  const typingGame = useTypingGame(unlockEasterEgg);
  const { currentIndex, currentDev, setCurrentIndex, developers } = useTeamMemberSelection();
  const { showInitialHint, setShowInitialHint } = useInitialHint(isEasterEggUnlocked);

  const handleMusicClick = () => {
    window.open(
      'https://youtu.be/YFbdeL5_7ME?si=r3cdB3ptbMPWGhIO',
      '_blank',
      'noopener,noreferrer'
    );
    alert('이 페이지를 제작한 개발자의 플레이리스트를 재생! 이스터에그를 다시 찾아보세요!');
  };

  const handleSpaghettiClick = () => {
    window.open(
      'https://youtu.be/TvVtYaqCni8?si=6x7VZ6aUBuTa9-Np',
      '_blank',
      'noopener,noreferrer'
    );
    alert('팀원 중 한 명이 좋아하는 노래! 이스터에그를 다시 찾아보세요!');
  };

  const handleKirbyClick = () => {
    alert('귀여운 커비 보고 힘내세요! 이스터에그를 다시 찾아보세요!');
  };

  const handleCatClick = () => {
    alert('화가 조금 난 고양이입니다! 이스터에그를 다시 찾아보세요!');
  };

  return (
    <S.Page>
      <HeroSection
        isEasterEggUnlocked={isEasterEggUnlocked}
        showFloatingEggs={!isEasterEggUnlocked}
        onRocketClick={typingGame.handleOpenTypingGame}
        onMusicClick={handleMusicClick}
        onSpaghettiClick={handleSpaghettiClick}
        onKirbyClick={handleKirbyClick}
        onCatClick={handleCatClick}
      />

      <TeamIntroSection
        isEasterEggUnlocked={isEasterEggUnlocked}
        developers={developers}
        currentIndex={currentIndex}
        currentDev={currentDev}
        onSelectMember={setCurrentIndex}
      />

      <TeamStatsSection />

      <ScrollToTopButton />

      <EasterEggHintPopup show={showInitialHint} onClose={() => setShowInitialHint(false)} />

      <TypingGameModal
        show={typingGame.showTypingGame}
        typingProgress={typingGame.typingProgress}
        letterStatus={typingGame.letterStatus}
        currentKey={typingGame.currentKey}
        gameMessage={typingGame.gameMessage}
        onClose={typingGame.handleCloseTypingGame}
        onKeyClick={typingGame.handleKeyClick}
      />

      <EasterEggSuccessPopup show={showConfetti} />
    </S.Page>
  );
}
