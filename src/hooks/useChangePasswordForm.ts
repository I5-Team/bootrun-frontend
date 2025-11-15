import { useState, useEffect } from 'react';
import { useChangePassword } from '../queries/useUserQueries';
import type { ResponseError } from '../types/api';
import { validatePassword, removeWhitespace } from '../utils/validation';

interface UseChangePasswordFormProps {
  onClose: () => void; // 모달 닫기 콜백
}

export const useChangePasswordForm = ({ onClose }: UseChangePasswordFormProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [passwordError, setPasswordError] = useState<string | boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | boolean>(false);
  const [apiMessage, setApiMessage] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const { mutate: changePasswordMutate, isPending } = useChangePassword();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeWhitespace(e.target.value);
    setNewPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError('8~32자의 영문 대/소문자, 숫자, 특수문자를 사용해야 합니다.');
    } else {
      setPasswordError(false);
    }
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeWhitespace(e.target.value);
    setNewPasswordConfirm(value);
    if (value && newPassword && value !== newPassword) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError(false);
    }
  };

  useEffect(() => {
    if (newPasswordConfirm && newPassword && newPasswordConfirm !== newPassword) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError(false);
    }
  }, [newPassword, newPasswordConfirm]);

  const handleSubmit = () => {
    setApiMessage(null);
    // 프론트 유효성 검사
    if (!currentPassword) {
      setApiMessage({ type: 'error', message: '현재 비밀번호를 입력해주세요.' });
      return;
    }
    if (!validatePassword(newPassword) || passwordError) {
      setApiMessage({ type: 'error', message: '새 비밀번호 형식이 올바르지 않습니다.' });
      return;
    }
    if (newPassword !== newPasswordConfirm || passwordConfirmError) {
      setApiMessage({ type: 'error', message: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }

    changePasswordMutate(
      {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      },
      {
        onSuccess: (data) => {
          alert(data.message || '비밀번호가 변경되었습니다.');
          onClose(); // 성공 시 모달 닫기
        },
        onError: (error) => {
          const errorResponse = error as ResponseError;
          const detail = errorResponse.response?.data?.detail.detail;
          if (errorResponse.response?.status === 400) {
            setApiMessage({
              type: 'error',
              message: detail || '현재 비밀번호가 일치하지 않습니다.',
            });
          } else {
            setApiMessage({ type: 'error', message: detail || '비밀번호 변경에 실패했습니다.' });
          }
        },
      }
    );
  };

  return {
    formState: { currentPassword, newPassword, newPasswordConfirm },
    errorState: { passwordError, passwordConfirmError },
    apiMessage,
    isPending,
    handleCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setCurrentPassword(removeWhitespace(e.target.value)),
    handleNewPasswordChange: handlePasswordChange,
    handleNewPasswordConfirmChange: handlePasswordConfirmChange,
    handleSubmit,
  };
};
