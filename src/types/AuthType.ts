// src/types/AuthType.ts
import type { UserProfile } from './UserType';

/**
 * POST /auth/login
 * 로그인 요청 (Payload)
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * POST /auth/login
 * 로그인 응답 (Data)
 */
export interface TokenResponseData {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  user: UserProfile;
}

/**
 * POST /auth/register
 * 회원가입 요청 (Payload)
 */
export interface RegisterPayload {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  gender?: 'male' | 'female' | 'none' | string;
  birth_date?: string; // 'YYYY-MM-DD'
}
/**
 * POST /auth/email/verification/request
 * 이메일 인증 요청 (Payload)
 */
export interface EmailVerificationRequestPayload {
  email: string;
}

/**
 * POST /auth/email/verification/confirm
 * 이메일 인증 확인 (Payload)
 */
export interface EmailVerificationConfirmPayload {
  email: string;
  verification_code: string;
}
