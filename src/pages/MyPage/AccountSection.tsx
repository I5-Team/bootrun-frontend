import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';
import BaseModal from '../../components/BaseModal';
import { useDeleteAccountHandler } from '../../hooks/useDeleteAccountHandler';
import { useChangePasswordForm } from '../../hooks/useChangePasswordForm';
import { useProfile } from '../../queries/useUserQueries';
import Button from '../../components/Button';
import MyPage from './MyPage.styled';

const AccountSection: React.FC = () => {
  const { data, isLoading: loading, error } = useProfile();

  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    formState: pwForm,
    errorState: pwErrorState,
    apiMessage: pwApiMessage,
    isPending: isChangingPassword,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleNewPasswordConfirmChange,
    handleSubmit: handleConfirmPasswordChange,
  } = useChangePasswordForm({
    onClose: () => setIsPwModalOpen(false), // 성공 시 모달 닫기 콜백
  });

  const {
    password: deletePassword,
    apiMessage: deleteApiMessage,
    isPending: isDeletingAccount,
    handlePasswordChange: handleDeletePasswordChange,
    handleSubmit: handleConfirmWithdrawal,
  } = useDeleteAccountHandler({
    onClose: () => setIsDeleteModalOpen(false), // 성공 시 모달 닫기 콜백
  });

  // const handleGithubLink = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   alert('GitHub 계정 연동 페이지로 이동합니다.');
  // };

  if (loading)
    return (
      <MyPage.Container>
        <LoadingSpinner />
      </MyPage.Container>
    );
  if (error)
    return (
      <MyPage.Container>
        <ErrorMessage message={error.message} />
      </MyPage.Container>
    );
  if (!data) return null;

  return (
    <>
      <S.MainContainer>
        <MyPage.Title as="h2">계정 관리</MyPage.Title>
        <S.Container>
          <S.FormGroup>
            <label htmlFor="email">이메일</label>
            <S.EmailInput id="email" disabled readOnly type="email" value={data.email} />
          </S.FormGroup>

          {/* <S.FormGroup>
            <S.FormLabel>GitHub 계정</S.FormLabel>
            {data.social_provider === 'github' ? (
              <S.GithubLinked>
                <span>{data.email}</span>
                <button
                  type="button"
                  onClick={handleGithubLink}
                  aria-label={`${data.email} GitHub 계정 연동 해제`}
                >
                  연동 해제
                </button>
              </S.GithubLinked>
            ) : (
              <S.GithubLink type="button" onClick={handleGithubLink}>
                ※ GitHub 계정 로그인
              </S.GithubLink>
            )}
          </S.FormGroup> */}

          <S.FormGroup>
            <S.FormLabel>비밀번호</S.FormLabel>
            <Button type="button" onClick={() => setIsPwModalOpen(true)}>
              비밀번호 변경
            </Button>
          </S.FormGroup>
        </S.Container>
      </S.MainContainer>

      <S.DangerZone>
        <S.DangerSummary>
          <span>회원 탈퇴</span>
          <S.ArrowIcon aria-hidden="true" />
        </S.DangerSummary>
        <S.DangerContent>
          <S.DangerDescription>
            회원 탈퇴 시 계정의 모든 정보가 영구적으로 삭제되며 복구할 수 없습니다.
          </S.DangerDescription>
          <Button onClick={() => setIsDeleteModalOpen(true)}>
            회원 탈퇴하기
          </Button>
        </S.DangerContent>
      </S.DangerZone>

      <BaseModal
        isOpen={isPwModalOpen}
        onClose={() => setIsPwModalOpen(false)}
        title="비밀번호 변경"
      >
        <S.ModalFormGroup>
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <S.ModalInput
            id="currentPassword"
            type="password"
            value={pwForm.currentPassword}
            onChange={handleCurrentPasswordChange}
            disabled={isChangingPassword}
          />
        </S.ModalFormGroup>
        <S.ModalFormGroup>
          <label htmlFor="newPassword">새 비밀번호</label>
          <S.ModalInput
            id="newPassword"
            type="password"
            value={pwForm.newPassword}
            onChange={handleNewPasswordChange}
            disabled={isChangingPassword}
          />
          {pwErrorState.passwordError && (
            <S.ModalErrorMessage>{pwErrorState.passwordError}</S.ModalErrorMessage>
          )}
        </S.ModalFormGroup>
        <S.ModalFormGroup>
          <label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
          <S.ModalInput
            id="newPasswordConfirm"
            type="password"
            value={pwForm.newPasswordConfirm}
            onChange={handleNewPasswordConfirmChange}
            disabled={isChangingPassword}
          />
          {pwErrorState.passwordConfirmError && (
            <S.ModalErrorMessage>{pwErrorState.passwordConfirmError}</S.ModalErrorMessage>
          )}
        </S.ModalFormGroup>
        {pwApiMessage && (
          <S.ModalErrorMessage $type={pwApiMessage.type || 'error'}>
            {pwApiMessage.message}
          </S.ModalErrorMessage>
        )}

        <S.ModalFooter>
          <S.ModalButton onClick={() => setIsPwModalOpen(false)} disabled={isChangingPassword}>
            취소
          </S.ModalButton>
          <S.ModalButton
            $primary={true}
            onClick={handleConfirmPasswordChange}
            disabled={isChangingPassword}
          >
            {isChangingPassword ? '변경 중...' : '변경하기'}
          </S.ModalButton>
        </S.ModalFooter>
      </BaseModal>
      <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="회원 탈퇴"
      >
        {isDeletingAccount ? (
          <S.ModalLoadingWrapper>
            <LoadingSpinner />
            <p>탈퇴 처리 중입니다...</p>
          </S.ModalLoadingWrapper>
        ) : (
          <>
            <S.DangerTitle>정말로 탈퇴하시겠습니까?</S.DangerTitle>
            <S.DangerDescription>
              탈퇴 시 모든 회원 정보가 영구 삭제되며, 복구할 수 없습니다. <br />
              탈퇴를 원하시면 비밀번호를 입력해주세요.
            </S.DangerDescription>
            <S.ModalFormGroup>
              <label htmlFor="deletePassword">비밀번호 확인</label>
              <S.ModalInput
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={handleDeletePasswordChange}
                disabled={isDeletingAccount}
              />
            </S.ModalFormGroup>
            {deleteApiMessage && (
              <S.ModalErrorMessage $type={deleteApiMessage.type || 'error'}>
                {deleteApiMessage.message}
              </S.ModalErrorMessage>
            )}
          </>
        )}
        <S.ModalFooter>
          <S.ModalButton onClick={() => setIsDeleteModalOpen(false)} disabled={isDeletingAccount}>
            취소
          </S.ModalButton>
          <S.ModalButton
            $danger={true}
            onClick={handleConfirmWithdrawal}
            disabled={isDeletingAccount}
          >
            {isDeletingAccount ? '탈퇴 중...' : '탈퇴'}
          </S.ModalButton>
        </S.ModalFooter>
      </BaseModal>
    </>
  );
};

const S = {
  MainContainer: styled(MyPage.Container)`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  FormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    label {
      font-size: ${({ theme }) => theme.fontSize.md}; /* 1.4rem */
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  FormLabel: styled.span`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface};
  `,
  EmailInput: styled.input`
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray300};
  `,
  GithubLink: styled.a`
    background: none;
    border: none;
    padding: 0;
    text-align: left;

    /* 기존 <a> 스타일 적용 */
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary300};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
  GithubLinked: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    span {
      font-size: ${({ theme }) => theme.fontSize.md};
      color: ${({ theme }) => theme.colors.surface};
    }

    button {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.gray300};
      background: none;
      border: none;
      text-decoration: underline;
      cursor: pointer;
    }
  `,
  PasswordButton: styled.button`
    width: fit-content;
    padding: 1.4rem 2.4rem;
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary300};
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  `,
  DangerZone: styled.details`
    z-index: 1;
    position: relative;
    top: -0.5px;  
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-bottom-left-radius: ${({ theme }) => theme.radius.md};
    border-bottom-right-radius: ${({ theme }) => theme.radius.md};

    summary::-webkit-details-marker {
      display: none;
    }
    summary {
      list-style: none;
    }

    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    border-bottom-left-radius: ${({ theme }) => theme.radius.lg};
    border-bottom-right-radius: ${({ theme }) => theme.radius.lg};
    background: ${({ theme }) => theme.colors.white};

    &[open] {
      background: #fffafa;
    }
  `,

  DangerSummary: styled.summary`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    cursor: pointer;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.alert};

    details[open] & {
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  `,
  ArrowIcon: styled.span.attrs({
    'aria-hidden': 'true',
  })`
    &::before {
      content: '▼';
      display: inline-block;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray300};
      transition: transform 0.2s ease;

      /* details[open] 상태일 때 <summary> 내부의 화살표 회전 */
      details[open] & {
        transform: rotate(180deg);
      }
    }
  `,
  ModalFormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.6rem;

    label {
      font-size: 1.4rem;
      font-weight: 500;
    }
  `,
  ModalInput: styled.input`
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: 1.6rem;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  ModalErrorMessage: styled.p<{ $type?: 'error' | 'success' }>`
    font-size: 1.4rem;
    color: ${({ theme, $type }) =>
      $type === 'success' ? theme.colors.primary300 : theme.colors.alert};
    margin: -0.8rem 0 1.6rem 0;
  `,
  ModalFooter: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2.4rem;
  `,

  ModalButton: styled.button<{ $danger?: boolean; $primary?: boolean }>`
    padding: 1rem 1.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    cursor: pointer;

    // 기본 버튼 (취소)
    color: ${({ theme }) => theme.colors.gray400};
    background: ${({ theme }) => theme.colors.white};

    // 확인 버튼 (Primary)
    ${({ theme, $primary }) =>
      $primary &&
      `
      background: ${theme.colors.primary300};
      border-color: ${theme.colors.primary300};
      color: ${theme.colors.white};
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryDark}; // (테마에 primary400이 있다고 가정)
      }
    `}

    // 위험 버튼 (Danger)
    ${({ theme, $danger }) =>
      $danger &&
      `
      background: ${theme.colors.alert};
      border-color: ${theme.colors.alert};
      color: ${theme.colors.white};
      &:hover:not(:disabled) {
        opacity: 0.8;
      }
    `}

    &:hover:not(:disabled) {
      background: ${({ theme, $primary, $danger }) =>
        !$primary && !$danger ? theme.colors.gray100 : 'auto'};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  DangerContent: styled.div`
    padding: 2.4rem;
    padding-top: 0;

    button {
      background-color: ${({ theme }) => theme.colors.alert};

      &:hover:not(:disabled),
      &:active:not(:disabled) {
        background-color: #e22531 !important;
      }
    }
  `,

  DangerTitle: styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.alert}; // ◀ Red
    margin: 0 0 0.8rem 0;
  `,
  DangerDescription: styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray400};
    margin-bottom: 1.6rem;
  `,

  DangerButton: styled.button`
    width: fit-content;
    padding: 1.2rem 2rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.alert}; // ◀ Red
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  `,
  ModalLoadingWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
    min-height: 12rem; /* 모달 내용 최소 높이 */

    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.gray400};
    }
  `,
};

export default AccountSection;
