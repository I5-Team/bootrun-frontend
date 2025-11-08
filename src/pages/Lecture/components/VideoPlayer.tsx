/**
 * 비디오 플레이어 컴포넌트 - YouTube 및 VOD 재생, 이어보기 기능
 */
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import * as S from './styles/VideoPlayer.styled';

interface VideoPlayerProps {
  url: string;
  videoType: 'vod' | 'youtube';
  lastPosition?: number;
  onProgress?: (played: number) => void;
  onEnded?: () => void;
}

export default function VideoPlayer({
  url,
  lastPosition = 0,
  onProgress,
  onEnded,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    onProgress?.(state.playedSeconds);
  };

  return (
    <S.Container>
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={handleProgress}
        onEnded={onEnded}
        onReady={() => {
          if (lastPosition > 0) {
            playerRef.current?.seekTo(lastPosition);
          }
        }}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
      />
    </S.Container>
  );
}
