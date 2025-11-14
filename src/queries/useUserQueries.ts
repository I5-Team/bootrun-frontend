// 관리자 - 사용자 관리 훅 모음

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activateUser, deactivateUser, fetchUsers, fetchUserDetail } from '../api/adminApi';
import type { UserApiParams } from '../types/AdminUserType';

/**
 * 사용자 목록 조회 쿼리 훅
 */
export const useUserListQuery = (params: UserApiParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
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
