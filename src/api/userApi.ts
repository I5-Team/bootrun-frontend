import { apiClient } from './client';
import { API_URL } from '../constants/apiConfig';
import type {
  ProfileResponse,
  ProfileUpdatePayload,
  ProfileImageResponse,
  AccountDeleteParams,
} from '../types/UserType';
import { mockProfileData } from '../data/mockMyPageData';

/**
 * GET /users/me - 내 프로필 정보 조회
 */
export const fetchProfile = async (): Promise<ProfileResponse> => {
  const mockResponse = {
    success: true,
    message: '프로필 조회 성공 (Mock)',
    data: mockProfileData,
  };

  try {
    // 실제 API 호출 시도
    const response = await apiClient.get<ProfileResponse>(API_URL.USER.PROFILE);
    console.log('B, fetchProfile response:', response);
    return response.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.error('C, fetchProfile response: Error fetching profile, returning mock data:', error);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};

/**
 * PATCH /users/me - 프로필 수정 (텍스트 정보)
 */
export const updateProfile = async (payload: ProfileUpdatePayload): Promise<ProfileResponse> => {
  const updatedMockData = { ...mockProfileData, ...payload };
  const mockResponse = {
    success: true,
    message: '프로필 수정 성공 (Mock Fallback)',
    data: updatedMockData,
  };
  try {
    // 실제 API 호출 시도
    const response = await apiClient.patch<ProfileResponse>(API_URL.USER.UPDATE_PROFILE, payload);
    return response.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.warn(`[MOCK FALLBACK] updateProfile 실패. 목업 데이터를 반환합니다.`, error);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500));
  }
};

/**
 * POST /users/me/profile-image - 프로필 이미지 업로드
 */
export const uploadProfileImage = async (formData: FormData): Promise<ProfileImageResponse> => {
  const file = formData.get('file') as File;
  const mockUrl = file ? URL.createObjectURL(file) : '';
  mockProfileData.profileImageUrl = mockUrl;
  const mockResponse = {
    success: true,
    message: '이미지 업로드 성공 (Mock Fallback)',
    data: { image_url: mockUrl, file_size: file?.size || 0, uploaded_at: new Date().toISOString() },
  };

  try {
    // 실제 API 호출 시도
    const response = await apiClient.post<ProfileImageResponse>(
      API_URL.USER.PROFILE_IMAGE,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.warn(`[MOCK FALLBACK] uploadProfileImage 실패. 목업 데이터를 반환합니다.`, error);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 1000));
  }
};

/**
 * DELETE /users/me - 회원 탈퇴
 */
export const deleteAccount = async (params: AccountDeleteParams): Promise<{ message: string }> => {
  const mockResponse = { message: '탈퇴 완료 (Mock Fallback)' };

  try {
    // 실제 API 호출 시도
    const response = await apiClient.delete<{ message: string }>(API_URL.USER.DELETE_ACCOUNT, {
      params,
    });
    return response.data;
  } catch (error) {
    // 오류 시 목업 반환
    console.warn(`[MOCK FALLBACK] deleteAccount 실패. 목업 데이터를 반환합니다.`, error);
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 1500));
  }
};
