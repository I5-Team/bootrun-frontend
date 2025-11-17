import React, { useState } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import BaseModal from '../../../components/BaseModal';
import { useDeleteAccountHandler } from '../../../hooks/useDeleteAccountHandler';
import { useChangePasswordForm } from '../../../hooks/useChangePasswordForm';
import { useProfile } from '../../../queries/useUserQueries';
import Button from '../../../components/Button';
import { Header, Title } from '../styles/ProfilePage.styled';
import {
  Container,
  ArrowIcon,
  DangerContent,
  DangerDescription,
  DangerSummary,
  DangerTitle,
  DangerZone,
  EmailInput,
  FormLabel,
  ModalButton,
  ModalErrorMessage,
  ModalFooter,
  ModalFormGroup,
  ModalInput,
  ModalLoadingWrapper,
  FormGroup,
} from '../styles/AccountSection.styled';

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
      <Container>
        <LoadingSpinner />
      </Container>
    );
  if (error)
    return (
      <Container>
        <ErrorMessage message={error.message} />
      </Container>
    );
  if (!data) return null;

  return (
    <>
      <Container>
        <Header>
          <Title as="h2">계정 관리</Title>
        </Header>
          <FormGroup>
            <label htmlFor="email">이메일</label>
            <EmailInput id="email" disabled readOnly type="email" value={data.email} />
          </FormGroup>

          {/* <FormGroup>
            <FormLabel>GitHub 계정</FormLabel>
            {data.social_provider === 'github' ? (
              <GithubLinked>
                <span>{data.email}</span>
                <button
                  type="button"
                  onClick={handleGithubLink}
                  aria-label={`${data.email} GitHub 계정 연동 해제`}
                >
                  연동 해제
                </button>
              </GithubLinked>
            ) : (
              <GithubLink type="button" onClick={handleGithubLink}>
                ※ GitHub 계정 로그인
              </GithubLink>
            )}
          </FormGroup> */}

          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <Button type="button" onClick={() => setIsPwModalOpen(true)}>
              비밀번호 변경
            </Button>
          </FormGroup>
      </Container>

      <DangerZone>
        <DangerSummary>
          <span>회원 탈퇴</span>
          <ArrowIcon aria-hidden="true" />
        </DangerSummary>
        <DangerContent>
          <DangerDescription>
            회원 탈퇴 시 계정의 모든 정보가 영구적으로 삭제되며 복구할 수 없습니다.
          </DangerDescription>
          <Button onClick={() => setIsDeleteModalOpen(true)}>회원 탈퇴하기</Button>
        </DangerContent>
      </DangerZone>

      <BaseModal
        isOpen={isPwModalOpen}
        onClose={() => setIsPwModalOpen(false)}
        title="비밀번호 변경"
      >
        <ModalFormGroup>
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <ModalInput
            id="currentPassword"
            type="password"
            value={pwForm.currentPassword}
            onChange={handleCurrentPasswordChange}
            disabled={isChangingPassword}
          />
        </ModalFormGroup>
        <ModalFormGroup>
          <label htmlFor="newPassword">새 비밀번호</label>
          <ModalInput
            id="newPassword"
            type="password"
            value={pwForm.newPassword}
            onChange={handleNewPasswordChange}
            disabled={isChangingPassword}
          />
          {pwErrorState.passwordError && (
            <ModalErrorMessage>{pwErrorState.passwordError}</ModalErrorMessage>
          )}
        </ModalFormGroup>
        <ModalFormGroup>
          <label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
          <ModalInput
            id="newPasswordConfirm"
            type="password"
            value={pwForm.newPasswordConfirm}
            onChange={handleNewPasswordConfirmChange}
            disabled={isChangingPassword}
          />
          {pwErrorState.passwordConfirmError && (
            <ModalErrorMessage>{pwErrorState.passwordConfirmError}</ModalErrorMessage>
          )}
        </ModalFormGroup>
        {pwApiMessage && (
          <ModalErrorMessage $type={pwApiMessage.type || 'error'}>
            {pwApiMessage.message}
          </ModalErrorMessage>
        )}

        <ModalFooter>
          <ModalButton onClick={() => setIsPwModalOpen(false)} disabled={isChangingPassword}>
            취소
          </ModalButton>
          <ModalButton
            $primary={true}
            onClick={handleConfirmPasswordChange}
            disabled={isChangingPassword}
          >
            {isChangingPassword ? '변경 중...' : '변경하기'}
          </ModalButton>
        </ModalFooter>
      </BaseModal>
      <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="회원 탈퇴"
      >
        {isDeletingAccount ? (
          <ModalLoadingWrapper>
            <LoadingSpinner />
            <p>탈퇴 처리 중입니다...</p>
          </ModalLoadingWrapper>
        ) : (
          <>
            <DangerTitle>정말로 탈퇴하시겠습니까?</DangerTitle>
            <DangerDescription>
              탈퇴 시 모든 회원 정보가 영구 삭제되며, 복구할 수 없습니다. <br />
              탈퇴를 원하시면 비밀번호를 입력해주세요.
            </DangerDescription>
            <ModalFormGroup>
              <label htmlFor="deletePassword">비밀번호 확인</label>
              <ModalInput
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={handleDeletePasswordChange}
                disabled={isDeletingAccount}
              />
            </ModalFormGroup>
            {deleteApiMessage && (
              <ModalErrorMessage $type={deleteApiMessage.type || 'error'}>
                {deleteApiMessage.message}
              </ModalErrorMessage>
            )}
          </>
        )}
        <ModalFooter>
          <ModalButton onClick={() => setIsDeleteModalOpen(false)} disabled={isDeletingAccount}>
            취소
          </ModalButton>
          <ModalButton
            $danger={true}
            onClick={handleConfirmWithdrawal}
            disabled={isDeletingAccount}
          >
            {isDeletingAccount ? '탈퇴 중...' : '탈퇴'}
          </ModalButton>
        </ModalFooter>
      </BaseModal>
    </>
  );
};

export default AccountSection;
