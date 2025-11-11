/**
 * 강의 관리 페이지 - 강의 목록 조회, 추가, 수정, 삭제 기능 제공
 * 필터/검색, 페이지네이션, 모달을 통한 CRUD 작업 관리
 */
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import type {
  CourseApiParams,
  CourseListItem,
  CreateCourseRequest,
} from '../../types/AdminCourseType';
import { getPaginatedCourses } from '../../data/mockAdminCourseData';
import { Button } from '../../components/Button';

// 하위 컴포넌트 임포트
import LectureFilterBar from './LectureFilterBar';
import LectureTable from './LectureTable';
import Pagination from './Pagination';
import LectureAddModal from './LectureAddModal';
import LectureDetailModal from './LectureDetailModal';

export default function LectureManagePage() {
  // 1. 상태 정의
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // API 쿼리 파라미터 상태
  const [apiParams, setApiParams] = useState<CourseApiParams>({
    page: 1,
    page_size: 10,
    keyword: '',
    category_type: null,
    difficulty: null,
    is_published: null,
  });

  // API 응답의 페이지네이션 정보 상태
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // 2. 데이터 흐름 (useEffect)
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        // 목업 데이터 사용
        const response = getPaginatedCourses(apiParams.page, apiParams.page_size, {
          keyword: apiParams.keyword,
          category_type: apiParams.category_type,
          difficulty: apiParams.difficulty,
          is_published: apiParams.is_published,
        });

        setCourses(response.items);
        setPagination({
          total: response.total,
          totalPages: response.total_pages,
        });
      } catch (error) {
        console.error('강의 목록 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [apiParams]);

  // 3. 핸들러 구현

  // 필터/검색 핸들러
  const handleFilterChange = useCallback((newFilters: Partial<CourseApiParams>) => {
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

  // 강의 클릭 핸들러 (상세 보기)
  const handleCourseClick = useCallback((courseId: number) => {
    setSelectedCourseId(courseId);
    setIsDetailModalOpen(true);
  }, []);

  // 강의 추가 핸들러
  const handleAddCourse = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  // 강의 추가 제출 핸들러
  const handleAddCourseSubmit = useCallback((data: CreateCourseRequest) => {
    console.log('새 강의 데이터:', data);
    alert('강의가 추가되었습니다! (목업 데이터는 실제로 추가되지 않습니다)');
    setIsAddModalOpen(false);
    // TODO: API 호출 후 목록 갱신
  }, []);

  // 강의 수정 핸들러 (테이블 내 수정 버튼)
  const handleEditCourse = useCallback((courseId: number) => {
    setSelectedCourseId(courseId);
    setIsDetailModalOpen(true);
  }, []);

  // 강의 삭제 핸들러
  const handleDeleteCourse = useCallback((courseId: number) => {
    const confirmed = window.confirm('정말 이 강의를 삭제하시겠습니까?');
    if (confirmed) {
      console.log('강의 삭제:', courseId);
      // TODO: 삭제 API 호출 후 목록 갱신
      alert('강의가 삭제되었습니다. (목업 데이터는 실제로 삭제되지 않습니다)');
    }
  }, []);

  // 공개/비공개 토글 핸들러
  const handleTogglePublish = useCallback((courseId: number, currentStatus: boolean) => {
    console.log('공개 상태 변경:', courseId, currentStatus);
    // TODO: 공개 상태 변경 API 호출
    alert(
      `강의를 ${currentStatus ? '비공개' : '공개'}로 변경합니다. (목업 데이터는 실제로 변경되지 않습니다)`
    );
  }, []);

  // 강의 수정 제출 핸들러
  const handleUpdateCourse = useCallback((courseId: number, data: CreateCourseRequest) => {
    console.log('강의 수정 데이터:', courseId, data);
    alert('강의가 수정되었습니다! (목업 데이터는 실제로 수정되지 않습니다)');
    setIsDetailModalOpen(false);
    // TODO: API 호출 후 목록 갱신
  }, []);

  return (
    <S.PageWrapper>
      <S.PageHeader>
        <S.PageTitle>강의 관리</S.PageTitle>
        <Button size="lg" onClick={handleAddCourse} ariaLabel="새 강의 추가">
          + 새 강의 추가
        </Button>
      </S.PageHeader>

      <LectureFilterBar onFilterChange={handleFilterChange} initialFilters={apiParams} />

      {/* 테이블과 페이지네이션을 카드에 함께 표시 */}
      <S.CardBox>
        <S.TableHeader>
          <span>총 {pagination.total}개의 강의</span>
        </S.TableHeader>

        {loading ? (
          <S.LoadingContainer>로딩 중...</S.LoadingContainer>
        ) : (
          <LectureTable
            courses={courses}
            onCourseClick={handleCourseClick}
            onEditClick={handleEditCourse}
            onDeleteClick={handleDeleteCourse}
            onTogglePublish={handleTogglePublish}
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

      {/* 강의 추가 모달 */}
      <LectureAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCourseSubmit}
      />

      {/* 강의 상세/수정 모달 */}
      <LectureDetailModal
        isOpen={isDetailModalOpen}
        courseId={selectedCourseId}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCourseId(null);
        }}
        onUpdate={handleUpdateCourse}
      />
    </S.PageWrapper>
  );
}

// --- Styles (DashboardPage, UserManagePage와 일관성 유지) ---
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
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.surface};
  `,
  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  PaginationWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2.4rem;
  `,
};
