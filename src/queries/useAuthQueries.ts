import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout, verifyToken } from '../api/authApi';
import type { LoginPayload } from '../types/AuthType';
import type { ResponseError } from '../types/UserType';
import { useNavigate } from 'react-router-dom';

export const authKeys = {
  all: ['auth'] as const,
  me: ['auth', 'me'] as const,
};

export const useVerifyAuth = () => {
  const queryClient = useQueryClient();
  // 토큰 검증 쿼리

  const query = useQuery({
    queryKey: authKeys.me, // 고정된 쿼리 키
    queryFn: verifyToken, // API 함수
    retry: false, // 토큰 검증 실패 시 재시도하지 않음
  });

  React.useEffect(() => {
    if (query.data) {
      // 토큰이 유효할 때
      console.log('토큰 검증 성공:', query.data);

      queryClient.setQueryData(['users', 'me'], query.data); // 사용자 데이터 캐시에 저장
    }
    if (query.error) {
      // 토큰이 유효하지 않을 때
      console.error('토큰 검증 실패:', query.error);
      queryClient.removeQueries({ queryKey: authKeys.me }); // 사용자 데이터 캐시 삭제
    }
  }, [query.data, query.error, queryClient]);

  return query;
};

/**
 * [Mutation] 로그인
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log('useLogin called', queryClient);

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload), // API 함수
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      queryClient.setQueryData(authKeys.me, data.user); // 사용자 데이터 캐시에 저장
      // TODO: 로그인 후 리다이렉트 처리
      navigate('/'); // 예: 홈 페이지로 이동
    },
    onError: (error: ResponseError) => {
      console.error('로그인 실패:', error);
      alert(error.response?.data?.detail || '로그인에 실패했습니다.');
    },
  });
};

/**
 * [Mutation] 로그아웃
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout, // API 함수
    onSuccess: () => {
      queryClient.clear(); // 모든 캐시 삭제
      navigate('/login'); // 로그아웃 및 로그인 페이지로 이동
    },
  });
};
