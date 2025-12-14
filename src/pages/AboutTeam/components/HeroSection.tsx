import { useState } from 'react';
import S from '../styles/HeroSection.styled';
import TooltipI5 from './TooltipI5';
import FloatingEasterEggs from './FloatingEasterEggs';
import rocketImage from '../../../assets/images/easter-egg-rocket.png';

interface HeroSectionProps {
  isEasterEggUnlocked: boolean;
  showFloatingEggs: boolean;
  onRocketClick: () => void;
  onMusicClick: () => void;
  onSpaghettiClick: () => void;
  onKirbyClick: () => void;
  onCatClick: () => void;
}

export default function HeroSection({
  isEasterEggUnlocked,
  showFloatingEggs,
  onRocketClick,
  onMusicClick,
  onSpaghettiClick,
  onKirbyClick,
  onCatClick,
}: HeroSectionProps) {
  const [showI5Tooltip, setShowI5Tooltip] = useState(false);

  return (
    <S.HeroSection>
      {showFloatingEggs && (
        <FloatingEasterEggs
          onRocketClick={onRocketClick}
          onMusicClick={onMusicClick}
          onSpaghettiClick={onSpaghettiClick}
          onKirbyClick={onKirbyClick}
          onCatClick={onCatClick}
        />
      )}

      {isEasterEggUnlocked && (
        <S.RocketImageContainer>
          <S.StaticRocketImage src={rocketImage} alt="부트런 이스터에그" />
        </S.RocketImageContainer>
      )}
      <S.Title>
        <S.TitleText>
          TEAM <S.ClickableI5>I5</S.ClickableI5>
          <TooltipI5 show={showI5Tooltip} onToggle={() => setShowI5Tooltip(!showI5Tooltip)} />
        </S.TitleText>{' '}
        개발자 소개
      </S.Title>
      <S.Subtitle>
        <span>BootRun</span>을 만든 5명의 개발자
      </S.Subtitle>
    </S.HeroSection>
  );
}
