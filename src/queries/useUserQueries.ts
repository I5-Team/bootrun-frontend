import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activateUser, deactivateUser, fetchUsers } from '../api/adminApi';
import type { UserApiParams } from '../types/AdminUserType';


/**
 * 사용자 목록 조회 쿼리 훅
 */
export const useUserListQuery = (params: UserApiParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
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
}

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
}