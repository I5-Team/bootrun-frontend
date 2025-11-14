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
