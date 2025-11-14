import axios from 'axios';

// .env에서 VITE_API_BASE_URL 값을 읽어옵니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 관리자 페이지 API 연동을 위한 토큰 추가 코드(채현)
// 요청 인터셉터: 모든 요청에 Bearer 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 처리 (토큰 만료 시)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 localStorage에서 제거
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // 필요하면 로그인 페이지로 리다이렉트
      console.warn('토큰이 만료되었습니다. 다시 로그인해주세요.');
    }
    return Promise.reject(error);
  }
);
