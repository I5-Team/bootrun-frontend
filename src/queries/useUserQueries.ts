// 관리자 - 사용자 관리 훅 모음
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, fetchUserDetail } from '../api/adminApi';
import type { UserApiParams } from '../types/AdminUserType';
import {
  changePassword,
  deleteAccount,
  deleteProfileImage,
  fetchProfile,
  updateProfile,
  uploadProfileImage,
} from '../api/userApi';
import type {
  AccountDeleteParams,
  PasswordChangePayload,
  ProfileUpdatePayload,
  UserProfile,
} from '../types/UserType';
import { adminUserKeys, userKeys } from './queryKeys';
import type { ResponseError } from '../types/api';

/**
 * [Query] 내 프로필 정보 조회
 */
export const useProfile = () => {
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = Boolean(accessToken);
  return useQuery({
    queryKey: userKeys.me,
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: isLoggedIn, // 로그인 상태에서만 쿼리 활성화
  });
};

/**
 * [Mutation] 프로필 텍스트 정보 수정
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProfileUpdatePayload) => updateProfile(payload),
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(userKeys.me, data.data); // 캐시된 프로필 데이터 갱신
      }
      queryClient.invalidateQueries({ queryKey: userKeys.me }); // 프로필 데이터 재조회
      // 두 기능의 차이점

      alert('프로필이 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

/**
 * POST /users/me/profile-image - 프로필 이미지 업로드
 * [Mutation] 프로필 이미지 업로드
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadProfileImage(formData),
    onSuccess: (data) => {
      const newImageUrl = data.data?.image_url;
      console.log('업로드된 이미지 URL:', newImageUrl);

      queryClient.setQueryData<UserProfile | undefined>(userKeys.me, (oldData) => {
        console.log('기존 프로필 이미지 URL:', oldData?.profile_image);
        if (oldData) {
          return { ...oldData, profile_image: newImageUrl };
        }
        return oldData;
      });
      alert('프로필 이미지가 성공적으로 업로드되었습니다.');
    },
    onError: () => {
      alert('프로필 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

/**
 * DELETE /users/me/profile-image - 프로필 이미지 삭제
 * [Mutation] 프로필 이미지 삭제
 */
export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProfileImage(),
    onSuccess: () => {
      // 1. [즉각적 UX] 'me' 쿼리 캐시에서 이미지 URL을 null 또는 undefined로 제거
      queryClient.setQueryData<UserProfile | undefined>(userKeys.me, (oldData) => {
        if (oldData) {
          return { ...oldData, profile_image: undefined }; // 👈 기본 이미지로
        }
        return oldData;
      });

      // 2. [데이터 동기화] 백그라운드에서 'me' 쿼리 재조회
      queryClient.invalidateQueries({ queryKey: userKeys.me });

      alert('프로필 이미지가 삭제되었습니다.');
    },
    onError: (error: ResponseError) => {
      alert(error.response?.data?.detail?.detail || '이미지 삭제에 실패했습니다.');
    },
  });
};

/**
 * [Mutation] 비밀번호 변경
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: PasswordChangePayload) => changePassword(payload),
  });
};

/**
 * [Mutation] 회원 탈퇴
 */
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (params: AccountDeleteParams) => deleteAccount(params),
  });
};

/**
 * 사용자 목록 조회 쿼리 훅
 */
export const useUserListQuery = (params: UserApiParams) => {
  return useQuery({
    queryKey: adminUserKeys.list(params),
    queryFn: () => fetchUsers(params),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

/**
 * 사용자 상세 조회 쿼리 훅
 */
export const useUserDetailQuery = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });
};
