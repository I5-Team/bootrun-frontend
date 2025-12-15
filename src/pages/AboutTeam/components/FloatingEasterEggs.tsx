import styled, { keyframes, css } from 'styled-components';
import bootrunDrawing from '../../../assets/images/easter-egg-rocket.png';
import musicImage from '../../../assets/images/easter-egg-music.png';
import spaghettiImage from '../../../assets/images/easter-egg-spaghetti.png';
import kirbyImage from '../../../assets/images/easter-egg-kirby.png';
import catImage from '../../../assets/images/easter-egg-cat.png';

const float1 = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(100px, -50px) rotate(20deg);
  }
  50% {
    transform: translate(200px, 20px) rotate(-10deg);
  }
  75% {
    transform: translate(100px, 80px) rotate(20deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const float2 = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-120px, 60px) rotate(-20deg);
  }
  50% {
    transform: translate(-80px, -40px) rotate(15deg);
  }
  75% {
    transform: translate(-150px, 30px) rotate(-15deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const float3 = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(80px, 100px) rotate(40deg) scale(1.1);
  }
  66% {
    transform: translate(-60px, -80px) rotate(25deg) scale(0.9);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

const float4 = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  30% {
    transform: translate(-100px, -100px) rotate(30deg);
  }
  60% {
    transform: translate(150px, -50px) rotate(-30deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const float5 = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  30% {
    transform: translate(-120px, -120px) rotate(40deg);
  }
  60% {
    transform: translate(180px, -60px) rotate(-30deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

// 음악 아이콘 애니메이션
const floatMusic = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, -100px) rotate(-15deg);
  }
  50% {
    transform: translate(-80px, 50px) rotate(10deg);
  }
  75% {
    transform: translate(60px, 30px) rotate(-10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

// 스파게티 아이콘 애니메이션
const floatSpaghetti = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-90px, -60px) rotate(25deg);
  }
  50% {
    transform: translate(70px, 80px) rotate(-20deg);
  }
  75% {
    transform: translate(-50px, 40px) rotate(15deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

// 카비 아이콘 애니메이션
const floatKirby = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(70px, -80px) rotate(-20deg);
  }
  50% {
    transform: translate(-50px, 60px) rotate(25deg);
  }
  75% {
    transform: translate(80px, 20px) rotate(-15deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const floatCat = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(100px, -50px) rotate(20deg);
  }
`;
const RocketsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const Rocket = styled.div<{ $index: number }>`
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${({ $index }) => {
    const sizes = [
      { width: '5rem', height: '5rem' },
      { width: '6rem', height: '6rem' },
      { width: '7rem', height: '7rem' },
      { width: '7.5rem', height: '7.5rem' },
      { width: '8rem', height: '8rem' },
    ];

    const animations = [float1, float2, float3, float4, float5];
    const durations = [12, 15, 18, 14, 16];
    const positions = [
      { top: '20%', left: '15%' },
      { top: '40%', right: '20%' },
      { top: '60%', left: '25%' },
      { top: '30%', right: '30%' },
      { top: '70%', left: '35%' },
    ];

    return css`
      width: ${sizes[$index].width};
      height: ${sizes[$index].height};
      animation: ${animations[$index]} ${durations[$index]}s ease-in-out infinite;
      top: ${positions[$index].top};
      ${positions[$index].left
        ? `left: ${positions[$index].left};`
        : `right: ${positions[$index].right};`}
    `;
  }}

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 100, 0.4));
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    ${({ $index }) => {
      const mobileSizes = [
        { width: '4rem', height: '4rem' },
        { width: '4.5rem', height: '4.5rem' },
        { width: '5.5rem', height: '5.5rem' },
        { width: '5rem', height: '5rem' },
        { width: '6rem', height: '6rem' },
      ];

      return css`
        width: ${mobileSizes[$index].width};
        height: ${mobileSizes[$index].height};
      `;
    }}
  }
`;

const MusicIcon = styled.div`
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  width: 5.5rem;
  height: 5.5rem;
  animation: ${floatMusic} 16s ease-in-out infinite;
  top: 50%;
  right: 15%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 100, 0.4));
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 4.5rem;
    height: 4.5rem;
    right: 10%;
  }
`;

// 스파게티 아이콘 스타일
const SpaghettiIcon = styled.div`
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  width: 5rem;
  height: 5rem;
  animation: ${floatSpaghetti} 19s ease-in-out infinite;
  top: 45%;
  left: 12%;

  img {
    width: 7rem;
    height: 7rem;
  }

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 100, 0.4));
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 4rem;
    height: 4rem;
    left: 8%;
  }
`;

// 카비 아이콘 스타일
const KirbyIcon = styled.div`
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  width: 5.2rem;
  height: 5.2rem;
  animation: ${floatKirby} 17s ease-in-out infinite;
  bottom: 15%;
  right: 18%;

  img {
    width: 7rem;
  }

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 100, 0.4));
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 4.2rem;
    height: 4.2rem;
    right: 12%;
    bottom: 20%;
  }
`;

const CatIcon = styled.div`
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  width: 6rem;
  height: 6rem;
  animation: ${floatCat} 17s ease-in-out infinite;
  top: 45%;
  left: 12%;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 100, 0.4));
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 2.8rem;
    height: 2.8rem;
  }
`;
interface FloatingEasterEggsProps {
  onRocketClick: () => void;
  onMusicClick: () => void;
  onSpaghettiClick: () => void;
  onKirbyClick: () => void;
  onCatClick: () => void;
}

export default function FloatingEasterEggs({
  onRocketClick,
  onMusicClick,
  onSpaghettiClick,
  onKirbyClick,
  onCatClick,
}: FloatingEasterEggsProps) {
  const rockets = [0, 3];

  return (
    <RocketsContainer>
      {rockets.map((index) => (
        <Rocket
          key={index}
          $index={index}
          onClick={onRocketClick}
          role="button"
          aria-label="타이핑 게임 시작"
        >
          <img src={bootrunDrawing} alt="부트런 이스터에그" />
        </Rocket>
      ))}

      {/* 음악 플레이리스트 이스터에그 */}
      <MusicIcon onClick={onMusicClick} role="button" aria-label="개발자 플레이리스트">
        <img src={musicImage} alt="음악 플레이리스트 이스터에그" />
      </MusicIcon>

      {/* 스파게티 이스터에그 */}
      <SpaghettiIcon onClick={onSpaghettiClick} role="button" aria-label="스파게티 이스터에그">
        <img src={spaghettiImage} alt="스파게티 이스터에그" />
      </SpaghettiIcon>

      {/* 카비 이스터에그 */}
      <KirbyIcon onClick={onKirbyClick} role="button" aria-label="카비 이스터에그">
        <img src={kirbyImage} alt="커비 이스터에그" />
      </KirbyIcon>

      {/* 고양이 이스터에그 */}
      <CatIcon onClick={onCatClick} role="button" aria-label="고양이 이스터에그">
        <img src={catImage} alt="고양이 이스터에그" />
      </CatIcon>
    </RocketsContainer>
  );
}
