
import qs from 'qs';
import axios, { AxiosError } from 'axios';
import { logout, refreshToken } from './authApi';

// .env에서 VITE_API_BASE_URL 값을 읽어옵니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },

  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

// 요청 인터셉터: 모든 요청에 인증 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 읽기
    // token 이 유효한지 확인
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 추가

    }
    return config;
  },
  (error) => {

    return Promise.reject(error); //
  }
);

// 응답 인터셉터: 401 오류 시 토큰 갱신 자동 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 401 오류 처리
    const originalRequest = error.config;

    const REFRESH_URL = '/auth/refresh';
    const LOGOUT_URL = '/auth/logout';

    if (
      // 401 오류가 아니거나, 이미 재시도했거나, 토큰 갱신 요청일 경우
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === REFRESH_URL ||
      originalRequest?.url === LOGOUT_URL
    ) {
      return Promise.reject(error); // 오류 그대로 반환
    }
    if (originalRequest) {
      originalRequest._retry = true; // 재시도 플래그 설정
    }

    try {
      const newTokens = await refreshToken(); // 토큰 갱신 시도

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access_token}`; // [A] 기본 헤더 갱신
      if (originalRequest) {
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`; // [B] 원본 요청 헤더 갱신
      }

      return apiClient(originalRequest!); // 재시도된 원본 요청 반환
    } catch (refreshError) {
      // 토큰 갱신 실패 시
      console.error('Session expired, logging out.', refreshError);

      try {
        await logout(); // 로컬 토큰 삭제
      } catch (logoutError) {
        console.error('Error during logout:', logoutError);
      }
      return Promise.reject(refreshError); // 갱신 오류 반환
    }

  }
);
