import { useState, useCallback } from 'react';
import type { UserApiParams } from '../../../types/AdminUserType';

// 하위 컴포넌트 임포트
import AdminPageLayout from './AdminPageLayout.tsx';
import UserFilterBar from '../components/UserFilterBar';
import UserTable from '../components/UserTable';
import Pagination from '../../../components/Pagination';
import UserDetailModal from '../components/UserDetailModal';
import { useUserListQuery } from '../../../queries/useUserQueries';
import { AdminPageStyles as S } from '../styles/AdminPageStyles';

export default function UserManagePage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const isModalOpen = selectedUserId !== null;

  // API 쿼리 파라미터 상태
  const [apiParams, setApiParams] = useState<UserApiParams>({
    page: 1,
    page_size: 20,
    keyword: '',
    role: null,
    is_active: null,
  });

  // React Query를 사용한 데이터 패칭
  const { data: userData, isLoading } = useUserListQuery(apiParams);

  // 로딩 상태
  const loading = isLoading;

  // 사용자 목록
  const users = userData ? userData.items : [];
  // 페이지네이션 정보
  const pagination = {
    total: userData ? userData.total : 0,
    totalPages: userData ? userData.total_pages : 1,
  };

  // 핸들러 구현 (useCallback으로 최적화)

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

  const handleUserClick = useCallback((userId: number) => {
    console.log('선택된 사용자 ID:', userId);
    setSelectedUserId(userId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  return (
    <AdminPageLayout title="사용자 관리">
      <UserFilterBar onFilterChange={handleFilterChange} initialFilters={apiParams} />

      {/* 테이블과 페이지네이션을 카드에 함께 표시 */}
      <S.CardBox>
        <S.TableHeader>
          <span>총 {pagination.total.toLocaleString()}명의 사용자</span>
          {/* (엑셀 내보내기 버튼 등) */}
        </S.TableHeader>

        {loading ? (
          <S.LoadingContainer>로딩 중...</S.LoadingContainer>
        ) : (
          <UserTable users={users} onUserClick={handleUserClick} />
        )}

        <S.PaginationWrapper>
          <Pagination
            currentPage={apiParams.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </S.PaginationWrapper>
      </S.CardBox>

      {isModalOpen && (
        <UserDetailModal isOpen={isModalOpen} onClose={handleCloseModal} userId={selectedUserId} />
      )}
    </AdminPageLayout>
  );
}
