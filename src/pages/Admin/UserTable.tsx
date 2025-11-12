import React from 'react';
import styled from 'styled-components';
import type { UserListItem } from '../../types/AdminUserType';

// 부모 컴포넌트(UserManagePage)로부터 받을 Props 타입 정의
interface UserTableProps {
  users: UserListItem[];
  // (추후) 사용자 상세 보기 모달을 위한 핸들러
  onUserClick: (userId: number) => void;
  onActivate?: (userId: number) => void;
  onDeactivate?: (userId: number) => void;
}

/**
 * 날짜 포맷팅 (e.g., "YYYY-MM-DD HH:mm")
 */
const formatDateTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    console.error('Invalid date string:', dateString, e);
    return 'N/A';
  }
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
}) => {
  return (
    <S.TableWrapper>
      <S.StyledTable role="table" aria-label="사용자 목록">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">이메일</th>
            <th scope="col">닉네임</th>
            <th scope="col">역할</th>
            <th scope="col">상태</th>
            <th scope="col">가입일</th>
            <th scope="col">최근 접속</th>
            <th scope="col">수강 횟수</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} role="status" aria-live="polite">
                검색된 사용자가 없습니다.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onUserClick(user.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${user.nickname} 사용자 상세보기`}
                style={{ cursor: 'pointer' }}
              >
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.nickname}</td>
                <td>{user.role === 'admin' ? '관리자' : '수강생'}</td>
                <td>
                  <S.StatusBadge $active={user.is_active}>
                    {user.is_active ? '활성' : '비활성'}
                  </S.StatusBadge>
                </td>
                <td>{formatDateTime(user.created_at)}</td>
                <td>{formatDateTime(user.last_login)}</td>
                <td>{user.total_enrollments}회</td>
              </tr>
            ))
          )}
        </tbody>
      </S.StyledTable>
    </S.TableWrapper>
  );
};

// --- Styles ---
const S = {
  TableWrapper: styled.div`
    width: 100%;
    overflow-x: auto; // 테이블이 넓을 경우 가로 스크롤
  `,
  StyledTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.4rem;
    th,
    td {
      padding: 1.6rem 1.2rem;
      text-align: left;
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
      white-space: nowrap; // 셀 내용이 줄바꿈되지 않도록
    }
    th {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray300};
      background: ${({ theme }) => theme.colors.white};
    }
    td {
      color: ${({ theme }) => theme.colors.surface};
      vertical-align: middle;
    }
    tbody tr:hover {
      background: ${({ theme }) => theme.colors.gray100};
    }
    tbody tr:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary300};
      outline-offset: -2px;
      background: ${({ theme }) => theme.colors.gray100};
    }
    tbody td[colSpan] {
      text-align: center;
      padding: 6rem;
      color: ${({ theme }) => theme.colors.gray300};
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
};

export default UserTable;