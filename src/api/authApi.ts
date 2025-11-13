import { apiClient } from './client';
import type { LoginPayload, TokenResponseData } from '../types/AuthType';
import type { UserProfile } from '../types/UserType';
import { API_URL } from '../constants/apiConfig';

/**
 * POST /auth/login
 * 로그인
 */
export const login = async (payload: LoginPayload): Promise<TokenResponseData> => {
  const mockResponse: TokenResponseData = {
    access_token: 'mock-access-token-12345',
    refresh_token: 'mock-refresh-token-67890',
    token_type: 'bearer',
    user: {
      id: 1,
      email: payload.email,
      nickname: '목업유저',
      role: 'student',
      gender: 'none',
      birth_date: '1990-01-01',
      is_active: true,
      is_email_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      social_provider: 'local',
    },
  };

  try {
    // 실제 API 호출 시도
    const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.LOGIN, payload);
    // [핵심] 토큰 저장
    localStorage.setItem('accessToken', response.data.data.access_token);
    localStorage.setItem('refreshToken', response.data.data.refresh_token);
    return response.data.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.error('Error during login, returning mock response:', error);
    localStorage.setItem('accessToken', mockResponse.access_token);
    localStorage.setItem('refreshToken', mockResponse.refresh_token);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};

/**
 * POST /auth/logout (추정)
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  try {
    // 실제 API 호출 시도
    console.log('Logging out user');
    await apiClient.post('/auth/logout');
    // [핵심] 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    // 오류 시 로그 출력
    console.error('Error during logout:', error);
    // [핵심] 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

/**
 * GET /auth/verify
 * (앱 로드 시 사용)
 */
export const verifyToken = async (): Promise<UserProfile> => {
  try {
    // 실제 API 호출 시도
    const response = await apiClient.get<{ data: UserProfile }>(API_URL.AUTH.VERIFY);
    return response.data.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.error('Error during token verification:', error);
    const mockUser: UserProfile = {
      id: 1,
      email: 'mockuser@example.com',
      nickname: '목업유저',
      role: 'student',
      gender: 'none',
      birth_date: '1990-01-01',
      is_active: true,
      is_email_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      social_provider: 'local',
    };
    return new Promise((resolve) => setTimeout(() => resolve(mockUser), 500));
  }
};

/**
 * POST /auth/refresh
 * (axios 인터셉터에서 사용됨)
 */
export const refreshToken = async (): Promise<TokenResponseData> => {
  const currentRefreshToken = localStorage.getItem('refreshToken');
  if (!currentRefreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }
  try {
    // 실제 API 호출 시도
    const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.REFRESH, {
      refresh_token: currentRefreshToken,
    });
    // [핵심] 토큰 저장
    localStorage.setItem('accessToken', response.data.data.access_token);
    localStorage.setItem('refreshToken', response.data.data.refresh_token);
    return response.data.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.error('Error during token refresh:', error);
    const mockResponse: TokenResponseData = {
      access_token: 'mock-access-token-12345',
      refresh_token: 'mock-refresh-token-67890',
      token_type: 'bearer',
      user: {
        id: 1,
        email: 'mockuser@example.com',
        nickname: '목업유저',
        role: 'student',
        gender: 'none',
        birth_date: '1990-01-01',
        is_active: true,
        is_email_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        social_provider: 'local',
      },
    };
    localStorage.setItem('accessToken', mockResponse.access_token);
    localStorage.setItem('refreshToken', mockResponse.refresh_token);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};
