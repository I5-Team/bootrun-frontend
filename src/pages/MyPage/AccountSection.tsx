import React, { useState } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../hooks/useApiData';
import { mockProfileData } from '../../data/mockMyPageData';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';
import BaseModal from '../../components/BaseModal';

const AccountSection: React.FC = () => {
  const { data, loading, error } = useApiData(mockProfileData, 400);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handlePasswordReset = () => {
    alert('비밀번호 재설정 메일을 발송합니다.');
  };

  const handleGithubLink = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('GitHub 계정 연동 페이지로 이동합니다.');
  };

  const openWithdrawalModal = () => setIsModalOpen(true);
  const closeWithdrawalModal = () => {
    if (isDeleting) return;
    setIsModalOpen(false);
  };

  const handleConfirmWithdrawal = async () => {
    const isConfirmed = window.confirm('정말로 탈퇴하시겠습니까?\n이 작업은 되돌릴 수 없습니다.');

    if (isConfirmed) {
      try {
        // "탈퇴 진행중" 로딩 시작
        setIsDeleting(true);

        //  TODO: 실제 회원 탈퇴 API 호출 (e.g., useDeleteAccount 훅)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // if (apiError) throw new Error("API 실패");

        // "탈퇴 완료" alert
        alert('회원 탈퇴가 완료되었습니다.');
        setIsDeleting(false);
        closeWithdrawalModal();
        //  TODO: 탈퇴 후 처리 (예: 로그아웃, 메인 페이지 이동 등)
        window.location.href = '/';
      } catch (error) {
        console.error('회원 탈퇴 중 오류 발생:', error);
        setIsDeleting(false);
        alert('탈퇴 처리 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading)
    return (
      <S.PageWrapper>
        <LoadingSpinner />
      </S.PageWrapper>
    );
  if (error)
    return (
      <S.PageWrapper>
        <ErrorMessage message={error.message} />
      </S.PageWrapper>
    );
  if (!data) return null;

  return (
    <>
      <S.PageWrapper>
        <S.Title as="h2">계정 관리</S.Title>
        <S.Container>
          <S.FormGroup>
            <label htmlFor="email">이메일</label>
            <S.EmailInput id="email" disabled readOnly type="email" value={data.email} />
          </S.FormGroup>

          <S.FormGroup>
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
                * GitHub 계정 로그인
              </S.GithubLink>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <S.FormLabel>비밀번호</S.FormLabel>
            <S.PasswordButton type="button" onClick={handlePasswordReset}>
              비밀번호 재설정
            </S.PasswordButton>
          </S.FormGroup>
        </S.Container>
        <S.DangerZone>
          <S.DangerSummary>
            <span>회원 탈퇴</span>
            <S.ArrowIcon aria-hidden="true" />
          </S.DangerSummary>
          <S.DangerContent>
            <S.DangerDescription>
              회원 탈퇴 시 계정의 모든 정보가 영구적으로 삭제되며 복구할 수 없습니다.
            </S.DangerDescription>
            <S.DangerButton type="button" onClick={openWithdrawalModal}>
              회원 탈퇴하기
            </S.DangerButton>
          </S.DangerContent>
        </S.DangerZone>
      </S.PageWrapper>
      <BaseModal
        isOpen={isModalOpen}
        onClose={closeWithdrawalModal}
        title="회원 탈퇴"
        children={
          isDeleting ? (
            // "탈퇴 진행중" 로딩 스피너 표시
            <S.ModalLoadingWrapper>
              <LoadingSpinner />
              <p>탈퇴 처리 중입니다. 잠시만 기다려주세요...</p>
            </S.ModalLoadingWrapper>
          ) : (
            // "탈퇴하시겠습니까?" (1차 확인)
            <p>
              정말로 탈퇴하시겠습니까?
              <br />
              모든 학습 기록 및 프로필 정보가 영구적으로 삭제됩니다.
            </p>
          )
        }
        footer={
          <>
            <S.ModalButton onClick={closeWithdrawalModal} disabled={isDeleting}>
              취소
            </S.ModalButton>
            <S.ModalButton
              $danger={true}
              onClick={handleConfirmWithdrawal} // 2차 확인(alert) 호출
              disabled={isDeleting}
            >
              {isDeleting ? '탈퇴 진행중...' : '탈퇴'}
            </S.ModalButton>
          </>
        }
      />
    </>
  );
};

const S = {
  PageWrapper: styled.div`
    width: 100%;
    max-width: 72rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.lg}; /* 1.2rem */
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
  `,
  Title: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg}; /* 2.4rem */
    font-weight: 700;
    padding: 2.4rem;
    margin: 0;
  `,
  Container: styled.div`
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  FormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    label {
      font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
      font-weight: 500;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  FormLabel: styled.span`
    font-size: ${({ theme }) => theme.fontSize.sm};
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
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.alert};

    details[open] & {
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

  DangerContent: styled.div`
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
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

  ModalButton: styled.button<{ $danger?: boolean }>`
    padding: 1rem 1.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid
      ${({ theme, $danger }) => ($danger ? theme.colors.alert : theme.colors.gray200)};
    color: ${({ theme, $danger }) => ($danger ? theme.colors.alert : theme.colors.gray400)};
    background: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray100};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
};

export default AccountSection;
