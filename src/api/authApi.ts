import { apiClient } from './client';
import type {
  EmailVerificationConfirmPayload,
  EmailVerificationRequestPayload,
  LoginPayload,
  RegisterPayload,
  TokenResponseData,
} from '../types/AuthType';
import type { UserProfile } from '../types/UserType';
import { API_URL } from '../constants/apiConfig';

/**
 * POST /auth/login
 * 로그인
 */
export const login = async (payload: LoginPayload): Promise<TokenResponseData> => {
  // 실제 API 호출 시도
  const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.LOGIN, payload);
  // [핵심] 토큰 저장
  localStorage.setItem('accessToken', response.data.data.access_token);
  localStorage.setItem('refreshToken', response.data.data.refresh_token);
  localStorage.setItem('role', response.data.data.user.role);
  return response.data.data;
};

/**
 * POST /auth/logout (추정)
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  // 실제 API 호출 시도
  console.log('Logging out user');
  await apiClient.post('/auth/logout');
  // [핵심] 토큰 삭제
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
};

/**
 * GET /auth/verify
 * (앱 로드 시 사용)
 */
export const verifyToken = async (): Promise<UserProfile> => {
  // 실제 API 호출 시도
  const response = await apiClient.get<{ data: UserProfile }>(API_URL.AUTH.VERIFY);
  return response.data.data;
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
  // 실제 API 호출 시도
  const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.REFRESH, {
    refresh_token: currentRefreshToken,
  });
  // [핵심] 토큰 저장
  localStorage.setItem('accessToken', response.data.data.access_token);
  localStorage.setItem('refreshToken', response.data.data.refresh_token);
  return response.data.data;
};

/**
 * POST /auth/register
 * 회원가입
 */
export const register = async (payload: RegisterPayload): Promise<UserProfile> => {
  const response = await apiClient.post<{ data: UserProfile }>(API_URL.AUTH.REGISTER, payload);
  return response.data.data;
};

/**
 * POST /auth/email/verification/request
 * 이메일 인증 코드 요청
 */
export const requestEmailVerification = async (
  payload: EmailVerificationRequestPayload
): Promise<{ message: string; detail: string }> => {
  console.log('Requesting email verification for:', payload);
  const response = await apiClient.post(API_URL.AUTH.EMAIL_VERIFICATION_REQUEST, payload);
  return response.data; // (data.data가 아닌 data로 추정)
};

/**
 * POST /auth/email/verification/confirm
 * 이메일 인증 코드 확인
 */
export const confirmEmailVerification = async (
  payload: EmailVerificationConfirmPayload
): Promise<{ message: string }> => {
  const response = await apiClient.post(API_URL.AUTH.EMAIL_VERIFICATION_CONFIRM, payload);
  return response.data;
};

