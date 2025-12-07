// LectureForm 관련 유틸 함수

// duration_seconds 시/분/초 단위로 표시
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${secs}초`;
  }
  return `${minutes}분 ${secs}초`;
};
