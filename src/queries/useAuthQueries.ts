import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  confirmEmailVerification,
  login,
  logout,
  register,
  requestEmailVerification,
  verifyToken,
} from '../api/authApi';
import type {
  EmailVerificationConfirmPayload,
  EmailVerificationRequestPayload,
  LoginPayload,
  RegisterPayload,
} from '../types/AuthType';
import type { ResponseError } from '../types/UserType';
import { useNavigate } from 'react-router-dom';
import { authKeys, userKeys } from './queryKeys';

export const useVerifyAuth = () => {
  const queryClient = useQueryClient();
  // 토큰 검증 쿼리

  const query = useQuery({
    queryKey: authKeys.verify, // 고정된 쿼리 키
    queryFn: verifyToken, // API 함수
    retry: false, // 토큰 검증 실패 시 재시도하지 않음
  });

  React.useEffect(() => {
    if (query.data) {
      // 토큰이 유효할 때
      console.log('토큰 검증 성공:', query.data);

      queryClient.setQueryData(userKeys.me, query.data); // 사용자 데이터 캐시에 저장
    }
    if (query.error) {
      // 토큰이 유효하지 않을 때
      console.error('토큰 검증 실패:', query.error);
      queryClient.removeQueries({ queryKey: userKeys.me }); // 사용자 데이터 캐시 삭제
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
      queryClient.setQueryData(userKeys.me, data.user); // 사용자 데이터 캐시에 저장
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

/**
 * [Mutation] 이메일 인증 코드 요청
 */
export const useRequestEmailVerification = () => {
  return useMutation({
    mutationFn: (payload: EmailVerificationRequestPayload) => requestEmailVerification(payload),
    onSuccess: (data) => {
      // (개발 환경) 목업 코드를 alert으로 표시
      if (data.detail) {
        alert(`[개발용 목업] 인증 코드: ${data.detail.split(': ')[1]}`);
      } else {
        alert(data.message);
      }
    },
    onError: (error: ResponseError) => {
      alert(error.response?.data?.detail || '인증 코드 발송에 실패했습니다.');
    },
  });
};

/**
 * [Mutation] 이메일 인증 코드 확인
 */
export const useConfirmEmailVerification = () => {
  return useMutation({
    mutationFn: (payload: EmailVerificationConfirmPayload) => confirmEmailVerification(payload),
    onSuccess: (data) => {
      alert(data.message);
      // (인증 성공 시 로직 추가, 예: isEmailVerified 상태 변경)
    },
    onError: (error: ResponseError) => {
      alert(error.response?.data?.detail || '인증 코드가 올바르지 않습니다.');
    },
  });
};

/**
 * [Mutation] 회원가입
 */
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // ◀ 회원가입 성공 시 로그인 페이지로
    },
    onError: (error: ResponseError) => {
      alert(error.response?.data?.detail || '회원가입에 실패했습니다.');
    },
  });
};
