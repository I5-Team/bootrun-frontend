import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activateUser, deactivateUser, fetchUsers } from '../api/adminApi';
import type { UserApiParams } from '../types/AdminUserType';
import { deleteAccount, fetchProfile, updateProfile, uploadProfileImage } from '../api/userApi';
import type { ProfileUpdatePayload, UserProfile } from '../types/UserType';
import { useNavigate } from 'react-router-dom';

export const userKeys = {
  all: ['users'] as const,
  profile: ['users', 'profile'] as const,
};

/**
 * [Query] 내 프로필 정보 조회
 */
export const useProfile = () => {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
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
      queryClient.setQueryData(userKeys.profile, data.data);
      alert('프로필이 성공적으로 업데이트되었습니다.');
    },
    onError: () => {
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

/**
 * [Mutation] 프로필 이미지 업로드
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => uploadProfileImage(formData),
    onSuccess: (data) => {
      // 프로필 이미지 URL을 프로필 데이터에 반영
      queryClient.setQueryData<UserProfile | undefined>(userKeys.profile, (oldData) => {
        if (oldData) {
          return { ...oldData, profileImageUrl: data.data?.image_url };
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
 * [Mutation] 회원 탈퇴
 */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: { password: string; confirm_deletion: boolean }) => deleteAccount(params),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.clear(); // 모든 캐시 삭제
      navigate('/'); // 홈으로 이동
    },
    onError: () => {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

/**
 * 사용자 목록 조회 쿼리 훅
 */
export const useUserListQuery = (params: UserApiParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

/**
 * 사용자 활성화/비활성화 훅
 */
export const useActivateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('사용자 활성화 실패:', error);
    },
  });
};

export const useDeactivateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('사용자 비활성화 실패:', error);
    },
  });
};
