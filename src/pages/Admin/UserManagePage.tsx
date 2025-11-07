import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import type { UserApiParams, UserListItem } from '../../types/AdminUserType';
import { fetchUsers, activateUser, deactivateUser } from '../../api/adminApi';

// (하위 컴포넌트 임포트)
import UserFilterBar from './UserFilterBar';
import UserTable from './UserTable';
import Pagination from './Pagination';




export default function UserManagePage() {
  // 1. 상태 정의
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // API 쿼리 파라미터 상태
  const [apiParams, setApiParams] = useState<UserApiParams>({
    page: 1,
    page_size: 20,
    keyword: '',
    role: null,
    is_active: null,
  });

  // API 응답의 페이지네이션 정보 상태
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // 2. 데이터 흐름 (useEffect)
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers(apiParams);
        setUsers(response.items);
        setPagination({
          total: response.total,
          totalPages: response.total_pages,
        });
      } catch (error) {
        console.error('사용자 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [apiParams]); // apiParams가 변경될 때마다 API 재호출

  // 3. 핸들러 구현 (useCallback으로 최적화)

  // 필터/검색 핸들러
  const handleFilterChange = useCallback((newFilters: Partial<UserApiParams>) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
      page: 1, // 필터 변경 시 1페이지로 리셋
    }));
  }, []);

  // 페이지 이동 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setApiParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  }, []);

  // (전략 적용) 로컬 상태 즉시 업데이트 핸들러
  const handleActivate = useCallback(async (userId: number) => {
    try {
      await activateUser(userId);
      // API 재호출 대신, 로컬 상태 즉시 변경
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_active: true } : user,
        ),
      );
    } catch (error) { console.error('활성화 실패', error); }
  }, []);

  const handleDeactivate = useCallback(async (userId: number) => {
    try {
      await deactivateUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_active: false } : user,
        ),
      );
    } catch (error) { console.error('비활성화 실패', error); }
  }, []);

  return (
    <S.PageWrapper>
      <S.PageHeader>
        <S.PageTitle>사용자 관리</S.PageTitle>
      </S.PageHeader>

      <UserFilterBar onFilterChange={handleFilterChange} initialFilters={apiParams} />

      {/* 테이블과 페이지네이션을 카드에 함께 표시 */}
      <S.CardBox>
        <S.TableHeader>
          <span>총 {pagination.total}명의 사용자</span>
          {/* (엑셀 내보내기 버튼 등) */}
        </S.TableHeader>
        
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <UserTable
            users={users}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        )}
        
        <S.PaginationWrapper>
          <Pagination
            currentPage={apiParams.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </S.PaginationWrapper>
      </S.CardBox>
    </S.PageWrapper>
  );
}

// --- Styles (DashboardPage와 일관성 유지) ---
const S = {
  PageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 2.4rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    min-height: 100vh;
  `,
  PageHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  PageTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  CardBox: styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 2.4rem;
    box-shadow: ${({ theme }) => theme.colors.shadow};
  `,
  TableHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
  `,
  PaginationWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2.4rem;
  `,
};