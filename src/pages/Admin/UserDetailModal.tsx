// src/components/admin/UserDetailModal.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseModal from '../../components/BaseModal';
import { fetchUserDetail } from '../../api/adminApi';
import type { UserDetail } from '../../types/AdminUserType';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 1. 모달이 열리거나 userId가 바뀔 때마다 데이터 새로고침
  useEffect(() => {
    if (isOpen && userId) {
      const loadDetail = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchUserDetail(userId);
          console.log('Fetched user detail:', data);
          setDetail(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
      loadDetail();
    }
  }, [isOpen, userId]);

  // 2. 모달이 닫힐 때 데이터 초기화 (선택 사항)
  const handleClose = () => {
    onClose();
    setDetail(null);
  };



  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="사용자 상세 정보"
      
      // 4. "footer" prop에 커스텀 버튼들(ReactNode)을 주입
      footer={
        <>
          <S.Button onClick={handleClose}>닫기</S.Button>

        </>
      }
    >
      {/* 5. "children" prop에 본문 내용을 주입 */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message="정보를 불러올 수 없습니다." />}
      {detail && (
        <S.DetailGrid>
           
          <dt>이메일</dt> <dd>{detail.email}</dd>
          <dt>닉네임</dt> <dd>{detail.nickname}</dd>
          <dt>가입일</dt> <dd>{new Date(detail.created_at).toLocaleString()}</dd>
          <dt>최근 접속</dt> <dd>{new Date(detail.last_login).toLocaleString()}</dd>
          <dt>총 수강</dt> <dd>{detail.total_enrollments}건</dd>
          <dt>총 결제액</dt> <dd>{detail.total_spent.toLocaleString()}원</dd>
           <dt>
            상태
            </dt>
            <dd>
                <S.StatusBadge $active={detail.is_active}>
                    {detail.is_active ? '활성' : '비활성'}
                  </S.StatusBadge>
            </dd>
        </S.DetailGrid>
      )}
    </BaseModal>
  );
};

// --- Styles ---
const S = {
  DetailGrid: styled.dl`
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.2rem;
    font-size: 1.4rem;
    
    dt {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray300};
    }
    dd {
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  Button: styled.button<{ $danger?: boolean }>`
    padding: 1rem 1.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme, $danger }) => 
      $danger ? theme.colors.alert : theme.colors.primary300};
    color: ${({ theme, $danger }) => 
      $danger ? theme.colors.alert : theme.colors.primary300};
    background: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `,
  ActionButton: styled.button<{ $danger?: boolean }>`
    padding: 0.6rem 1rem;
    font-size: 1.3rem;
    font-weight: 500;
    border: 1px solid ${({ theme, $danger }) =>
      $danger ? theme.colors.alert : theme.colors.gray200};
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.alert : theme.colors.gray400};
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.sm};
    cursor: pointer;
    
    &:hover {
      background: ${({ theme, $danger }) =>
        $danger ? 'rgba(255, 52, 64, 0.05)' : theme.colors.gray100};
    }
  `,
  StatusBadge: styled.span<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 500;
    
    // 상태 표시 점(dot)
    &::before {
      content: '';
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: ${({ theme, $active }) =>
        $active ? '#22C55E' : theme.colors.gray300}; // (임시) 녹색
    }
    
    color: ${({ theme, $active }) =>
      $active ? theme.colors.surface : theme.colors.gray300};
  `,
};


export default UserDetailModal;