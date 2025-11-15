import type { ApiResponse, ResponseError } from './api';

// 1. GET /users/me (프로필 조회)
export interface UserProfile {
  // 유저 프로필 정보
  id: number;
  email: string;
  nickname: string;
  gender: 'male' | 'female' | 'none' | string;
  birth_date: string; // "YYYY-MM-DD"
  role: string;
  is_active: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
  social_provider: string;
  total_study_time?: number;
  enrollment_expires_at?: string;
  profile_image?: string;
}
export type ProfileResponse = ApiResponse<UserProfile>; // 프로필 조회 응답

// 2. PATCH /users/me (프로필 수정)
export interface ProfileUpdatePayload {
  // 프로필 수정 요청 페이로드
  nickname?: string;
  gender?: 'male' | 'female' | 'none' | string;
  birth_date?: string;
  profile_image?: string; // (참고: 이미지는 별도 API로 처리하는 것이 좋습니다)
  password?: string;
  password_confirm?: string;
}
export type ProfileUpdateResponse = ApiResponse<UserProfile>; // 프로필 수정 응답
export type ProfileUpdateError = ResponseError; // 프로필 수정 오류 응답

// 3. POST /users/me/profile-image (이미지 업로드)
export interface ProfileImageResponseData {
  image_url: string;
  file_size: number;
  uploaded_at: string;
}
export type ProfileImageResponse = ApiResponse<ProfileImageResponseData>; //

// 4. POST /users/me/change-password (비밀번호 변경)
export interface PasswordChangePayload {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

// 5. DELETE /users/me (회원 탈퇴)
export interface AccountDeleteParams {
  password: string;
  confirm_deletion: boolean;
}

// 6. GET /users/me/notifications (알림 목록)
export interface NotificationItem {
  id: number;
  user_id: number;
  type: string;
  title: string;
  content: string;
  is_read: boolean;
  related_url: string;
  created_at: string;
}

// 알림 목록 응답
export interface NotificationsResponse {
  success: boolean;
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: NotificationItem[];
}
