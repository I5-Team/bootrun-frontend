/**
 * 비디오 플레이어 컴포넌트 - YouTube 및 VOD 재생, 이어보기 기능
 */
import { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import * as S from './styles/VideoPlayer.styled';

interface VideoPlayerProps {
  url: string;
  videoType: 'vod' | 'youtube';
  lastPosition?: number;
  onProgress?: (playedSeconds: number, totalSeconds: number) => void;
  onEnded?: () => void;
}

export default function VideoPlayer({
  url,
  lastPosition = 0,
  onProgress,
  onEnded,
}: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const lastSavedTimeRef = useRef<number>(0);
  const SAVE_INTERVAL = 10; // 10초마다 저장

  // 컴포넌트 언마운트 시 진행률 저장
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      const currentTime = player?.getCurrentTime() || 0;
      const duration = player?.getDuration() || 0;
      if (currentTime > 0 && duration > 0) {
        onProgress?.(currentTime, duration);
      }
    };
  }, [onProgress]);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    const duration = playerRef.current?.getDuration() || 0;

    // 10초마다 진행률 저장
    if (currentTime - lastSavedTimeRef.current >= SAVE_INTERVAL) {
      lastSavedTimeRef.current = currentTime;
      console.log(`[VideoPlayer] 진행률 저장: ${Math.floor(currentTime)}초 / ${Math.floor(duration)}초`);
      onProgress?.(currentTime, duration);
    }
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
