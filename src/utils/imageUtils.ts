/**
 * 이미지 URL 처리 유틸리티
 *
 * 이미지 URL이 없거나 유효하지 않을 경우 기본 이미지를 반환합니다.
 */

import { DEFAULT_THUMBNAIL_URL, DEFAULT_INSTRUCTOR_IMAGE } from '../constants/apiConfig';

/**
 * URL이 유효한지 검사
 * - null, undefined, 빈 문자열, 공백, "null", "undefined" 문자열 모두 무효로 처리
 */
const isInvalidUrl = (url?: string | null): boolean => {
  if (!url || url.trim() === '') return true;
  const lowerUrl = url.toLowerCase().trim();
  if (lowerUrl === 'null' || lowerUrl === 'undefined') return true;
  return false;
};

export const getThumbnailUrl = (url?: string | null): string => {
  if (isInvalidUrl(url)) {
    return DEFAULT_THUMBNAIL_URL;
  }
  return url!;
};

export const getProfileImageUrl = (url?: string | null): string => {
  if (isInvalidUrl(url)) {
    return DEFAULT_INSTRUCTOR_IMAGE;
  }
  return url!;
};
