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

      <S.Title>
        {isEasterEggUnlocked && <S.StaticRocketImage src={rocketImage} alt="BootRun" />}
        TEAM <S.ClickableI5>I5</S.ClickableI5>
        <TooltipI5 show={showI5Tooltip} onToggle={() => setShowI5Tooltip(!showI5Tooltip)} />{' '}
        개발자 소개
      </S.Title>
      <S.Subtitle>
        <span>BootRun</span>을 만든 5명의 개발자
      </S.Subtitle>
    </S.HeroSection>
  );
}
