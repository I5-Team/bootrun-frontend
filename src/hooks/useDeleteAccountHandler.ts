import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDeleteAccount } from '../queries/useUserQueries';
import type { ResponseErrorDeleteAccount } from '../types/api';

interface UseDeleteAccountHandlerProps {
  onClose: () => void; // 모달 닫기 콜백
}

export const useDeleteAccountHandler = ({ onClose }: UseDeleteAccountHandlerProps) => {
  const [password, setPassword] = useState('');
  const [apiMessage, setApiMessage] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const { mutate: deleteAccountMutate, isPending } = useDeleteAccount();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setApiMessage(null);
    if (!password) {
      setApiMessage({ type: 'error', message: '비밀번호를 입력해야 합니다.' });
      return;
    }

    deleteAccountMutate(
      {
        password: password,
        confirm_deletion: true,
      },
      {
        onSuccess: (data) => {
          alert(data.message || '회원 탈퇴가 완료되었습니다.');
          queryClient.clear(); // 모든 캐시 삭제
          localStorage.clear(); // (권장) 스토리지 클리어
          onClose();
          navigate('/'); // 홈으로 이동
        },
        onError: (error) => {
          const errorResponse = error as ResponseErrorDeleteAccount;
          const message = errorResponse.response?.data?.detail.message;
          console.error('회원 탈퇴 오류:', message);
          setApiMessage({
            type: 'error',
            message: message || '회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.',
          });
        },
      }
    );
  };

  return {
    password,
    apiMessage,
    isPending,
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    handleSubmit,
  };
};
