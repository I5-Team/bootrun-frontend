/**
 * 비디오 플레이어 컴포넌트 - YouTube 및 VOD 재생, 이어보기 기능
 */
import ReactPlayer from 'react-player';
import * as S from '../styles/VideoPlayer.styled';
import { useVideoProgress } from '../hooks/useVideoProgress';

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
  // 비디오 진행률 추적 Hook 사용
  const { playerRef, handleProgress } = useVideoProgress(onProgress, 10);

  return (
    <S.Container>
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        muted={false}
        onProgress={handleProgress}
        onEnded={onEnded}
        onReady={() => {
          if (lastPosition > 0) {
            playerRef.current?.seekTo(lastPosition);
          }
        }}
        onError={(e) => {
          console.error('[VideoPlayer] 에러 발생:', e);
        }}
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,
              fs: 1,
              modestbranding: 1,
            },
            onUnstarted: () => {},
          },
        }}
      />
    </S.Container>
  );
}
