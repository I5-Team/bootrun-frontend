// 유튜브 비디오 ID를 추출
export const extractVideoId = (url: string): string | null => {
  if (!url) return null;

  try {
    // 1. youtu.be 형식
    const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (youtuBeMatch) {
      return youtuBeMatch[1];
    }

    // 2. youtube.com/watch?v= 형식
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) {
      return watchMatch[1];
    }

    // 3. 비디오 ID만 있는 경우
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
      return url.trim();
    }

    return null;
  } catch {
    return null;
  }
};

// 유튜브 url 정제
// 다양한 유튜브 url 형식을 https://www.youtube.com/watch?v=VIDEO_ID로 통일

export const sanitizeYouTubeUrl = (url: string): string => {
  if (!url) return '';

  try {
    const videoId = extractVideoId(url);

    // 비디오 ID를 찾았으면 표준 형식으로 반환
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }

    // 변환할 수 없는 경우 원본 반환
    console.warn('[videoUtils] YouTube 비디오 ID를 추출할 수 없습니다:', url);
    return url;
  } catch (error) {
    console.error('[videoUtils] YouTube URL 정제 실패:', error);
    return url;
  }
};
