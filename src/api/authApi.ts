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

const useMock = false;
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

  if (!useMock) {
    // 실제 API 호출 시도
    const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.LOGIN, payload);
    // [핵심] 토큰 저장
    localStorage.setItem('accessToken', response.data.data.access_token);
    localStorage.setItem('refreshToken', response.data.data.refresh_token);
    localStorage.setItem('role', response.data.data.user.role);
    return response.data.data;
  } else {
    // 오류 시 목업 반환
    localStorage.setItem('accessToken', mockResponse.access_token);
    localStorage.setItem('refreshToken', mockResponse.refresh_token);
    localStorage.setItem('role', mockResponse.user.role);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};

/**
 * POST /auth/logout (추정)
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  if (!useMock) {
    // 실제 API 호출 시도
    console.log('Logging out user');
    await apiClient.post('/auth/logout');
    // [핵심] 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  } else {
    // 오류 시 로그 출력
    // [핵심] 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  }
};

/**
 * GET /auth/verify
 * (앱 로드 시 사용)
 */
export const verifyToken = async (): Promise<UserProfile> => {
  if (!useMock) {
    // 실제 API 호출 시도
    const response = await apiClient.get<{ data: UserProfile }>(API_URL.AUTH.VERIFY);
    return response.data.data;
  } else {
    // 오류 시 목업 반환
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
  if (!useMock) {
    // 실제 API 호출 시도
    const response = await apiClient.post<{ data: TokenResponseData }>(API_URL.AUTH.REFRESH, {
      refresh_token: currentRefreshToken,
    });
    // [핵심] 토큰 저장
    localStorage.setItem('accessToken', response.data.data.access_token);
    localStorage.setItem('refreshToken', response.data.data.refresh_token);
    return response.data.data;
  } else {
    // 오류 시 목업 반환
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

/**
 * POST /auth/register
 * 회원가입
 */
export const register = async (payload: RegisterPayload): Promise<UserProfile> => {
  // (목업 응답: Swagger의 201 응답 data와 UserProfile을 맞춤)
  const mockUser: UserProfile = {
    id: 2,
    email: payload.email,
    nickname: payload.nickname,
    role: 'student',
    gender: 'none',
    birth_date: '',
    is_active: true,
    is_email_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    social_provider: 'email',
  };

  if (!useMock) {
    const response = await apiClient.post<{ data: UserProfile }>(API_URL.AUTH.REGISTER, payload);
    return response.data.data;
  } else {
    return new Promise((resolve) => setTimeout(() => resolve(mockUser), 500));
  }
};

/**
 * POST /auth/email/verification/request
 * 이메일 인증 코드 요청
 */
export const requestEmailVerification = async (
  payload: EmailVerificationRequestPayload
): Promise<{ message: string; detail: string }> => {
  const mockResponse = {
    success: true,
    message: '인증 코드가 이메일로 발송되었습니다',
    detail: '개발 환경에서 인증 코드: 123456', // (Swagger 예시)
  };

  if (!useMock) {
    console.log('Requesting email verification for:', payload);
    const response = await apiClient.post(API_URL.AUTH.EMAIL_VERIFICATION_REQUEST, payload);
    console.log('Email verification request response:', response);
    return response.data; // (data.data가 아닌 data로 추정)
  } else {
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};

/**
 * POST /auth/email/verification/confirm
 * 이메일 인증 코드 확인
 */
export const confirmEmailVerification = async (
  payload: EmailVerificationConfirmPayload
): Promise<{ message: string }> => {
  const mockResponse = {
    success: true,
    message: '이메일 인증이 완료되었습니다',
  };

  if (!useMock) {
    const response = await apiClient.post(API_URL.AUTH.EMAIL_VERIFICATION_CONFIRM, payload);
    return response.data;
  } else {
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};
