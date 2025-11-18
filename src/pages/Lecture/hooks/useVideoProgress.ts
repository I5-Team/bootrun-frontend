import { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

/**
 * 비디오 플레이어 진행률 추적 Hook
 * - 비디오 진행 상황을 일정 간격으로 저장
 * - 컴포넌트 언마운트 시 마지막 진행률 저장
 * - 설정 가능한 저장 간격 (기본값: 10초)
 */
export const useVideoProgress = (
  onProgress?: (playedSeconds: number, totalSeconds: number) => void,
  saveInterval: number = 10 // 초 단위
) => {
  const playerRef = useRef<ReactPlayer>(null);
  const lastSavedTimeRef = useRef<number>(0);

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

  // 진행률 업데이트 핸들러
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    const duration = playerRef.current?.getDuration() || 0;

    // 설정된 간격(기본 10초)마다 진행률 저장
    if (currentTime - lastSavedTimeRef.current >= saveInterval) {
      lastSavedTimeRef.current = currentTime;
      console.log(
        `[VideoPlayer] 진행률 저장: ${Math.floor(currentTime)}초 / ${Math.floor(duration)}초`
      );
      onProgress?.(currentTime, duration);
    }
  };

  return { playerRef, handleProgress };
};
