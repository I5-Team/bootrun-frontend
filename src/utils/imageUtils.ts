/**
 * 이미지 URL 처리 유틸리티
 *
 * 이미지 URL이 없거나 유효하지 않을 경우 기본 이미지를 반환합니다.
 */

import { DEFAULT_THUMBNAIL_URL, DEFAULT_INSTRUCTOR_IMAGE } from '../constants/apiConfig';

// API 기본 URL (Vite는 import.meta.env 사용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bootrun-backend.duckdns.org';

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

/**
 * 상대 경로 이미지 URL을 전체 URL로 변환
 * - 빈 문자열이면 빈 문자열 반환
 * - https://나 http://로 시작하면 그대로 반환
 * - 그 외에는 API_BASE_URL + url 반환
 */
export const getFullImageUrl = (url?: string | null): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url}`;
};

export const getThumbnailUrl = (url?: string | null): string => {
  if (isInvalidUrl(url)) {
    return DEFAULT_THUMBNAIL_URL;
  }
  return getFullImageUrl(url!);
};

export const getProfileImageUrl = (url?: string | null): string => {
  if (isInvalidUrl(url)) {
    return DEFAULT_INSTRUCTOR_IMAGE;
  }
  return getFullImageUrl(url!);
};
