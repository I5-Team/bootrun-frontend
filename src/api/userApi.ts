import { apiClient } from './client';
import { API_URL } from '../constants/apiConfig';
import type {
  ProfileResponse,
  ProfileUpdatePayload,
  ProfileImageResponse,
  AccountDeleteParams,
  UserProfile,
  PasswordChangePayload,
} from '../types/UserType';
import type { ApiResponse } from '../types/api';

/**
 * GET /users/me - 내 프로필 정보 조회
 */
export const fetchProfile = async (): Promise<UserProfile> => {
  // 실제 API 호출 시도
  const response = await apiClient.get<ProfileResponse>(API_URL.USER.PROFILE);
  console.log('B, fetchProfile response:', response);
  return response.data.data!;
};

/**
 * PATCH /users/me - 프로필 수정 (텍스트 정보)
 */
export const updateProfile = async (payload: ProfileUpdatePayload): Promise<ProfileResponse> => {
  // 실제 API 호출 시도
  const response = await apiClient.patch<ProfileResponse>(API_URL.USER.UPDATE_PROFILE, payload);
  return response.data;
};

/**
 * POST /users/me/profile-image - 프로필 이미지 업로드
 */
export const uploadProfileImage = async (formData: FormData): Promise<ProfileImageResponse> => {
  // 실제 API 호출 시도
  const response = await apiClient.post<ProfileImageResponse>(
    API_URL.USER.PROFILE_IMAGE,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

/**
 * DELETE /users/me/profile-image - 프로필 이미지 삭제
 */
export const deleteProfileImage = async (): Promise<ApiResponse<null>> => {
  // (ApiResponse<null> 또는 { success: boolean; message: string } 타입을 사용)
  const response = await apiClient.delete<ApiResponse<null>>(API_URL.USER.PROFILE_IMAGE);
  return response.data;
};

/**
 * POST /users/me/change-password - 비밀번호 변경
 */
export const changePassword = async (
  payload: PasswordChangePayload
): Promise<ApiResponse<null>> => {
  // (ApiResponse<null> 또는 { success: boolean; message: string } 타입을 사용)
  const response = await apiClient.post<ApiResponse<null>>(API_URL.USER.CHANGE_PASSWORD, payload);
  return response.data;
};

/**
 * DELETE /users/me - 회원 탈퇴
 */
export const deleteAccount = async (params: AccountDeleteParams): Promise<ApiResponse<null>> => {
  // 실제 API 호출 시도
  const response = await apiClient.delete<ApiResponse<null>>(API_URL.USER.DELETE_ACCOUNT, {
    params,
  });
  return response.data;
};

