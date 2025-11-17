/**
 * 강의 관리 페이지
 */
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../../../api/adminApi';
import { Button } from '../../../components/Button';
import SvgPlug from '../../../assets/icons/icon-plus.svg?react';

// 컴포넌트 임포트
import AdminPageLayout from './AdminPageLayout';
import LectureFilterBar from '../components/LectureFilterBar';
import LectureTable from '../components/LectureTable';
import Pagination from '../../../components/Pagination';
import LectureFormModal from '../components/LectureFormModal'; // 통합 모달
import { AdminPageStyles as S } from '../styles/AdminPageStyles';

// 커스텀 훅 임포트
import { useLectureFilters } from '../hooks/useLectureFilters';
import { useLectureFormModal } from '../hooks/useLectureFormModal';
import { useLectureMutations } from '../hooks/useLectureMutations';
import { useLectureHandlers } from '../hooks/useLectureHandlers';

export default function LectureManagePage() {
  // 커스텀 훅 사용
  const { apiParams, handleFilterChange, handlePageChange } = useLectureFilters();
  const modal = useLectureFormModal();
  const mutations = useLectureMutations();

  // React Query로 강의 목록 조회 (apiParams 변경되면 자동 재호출)
  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['courses', apiParams], // apiParams 변경 시 자동으로 새로 fetch
    queryFn: () => fetchCourses(apiParams),
    staleTime: 0, // invalidateQueries 실행 시 즉시 갱신
  });

  // 편의상 변수명 단순화
  const courses = coursesData?.items ?? [];
  const pagination = {
    total: coursesData?.total ?? 0,
    totalPages: coursesData?.total_pages ?? 1,
  };

  // 비즈니스 로직 핸들러
  const { handleDeleteCourse, handleTogglePublish, handleAddCourseSubmit, handleUpdateCourse } =
    useLectureHandlers({
      mutations,
      modal,
      courses,
    });

  return (
    <AdminPageLayout
      title="강의 관리"
      rightElement={
        <Button onClick={modal.handleAddCourse} iconSvg={<SvgPlug />}>
          새 강의 추가
        </Button>
      }
    >
      <LectureFilterBar onFilterChange={handleFilterChange} initialFilters={apiParams} />

      {/* 테이블과 페이지네이션을 카드에 함께 표시 */}
      <S.CardBox>
        <S.TableHeader>
          <span>총 {pagination.total}개의 강의</span>
        </S.TableHeader>

        {isLoading ? (
          <S.LoadingContainer>로딩 중...</S.LoadingContainer>
        ) : (
          <LectureTable
            courses={courses}
            totalCount={pagination.total}
            currentPage={apiParams.page}
            pageSize={apiParams.page_size}
            onCourseClick={modal.handleCourseClick}
            onEditClick={modal.handleEditCourse}
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

      {/* 강의 추가/수정 통합 모달 */}
      <LectureFormModal
        isOpen={modal.isFormModalOpen}
        mode={modal.formModalMode}
        courseId={modal.selectedCourseId}
        isSaving={
          mutations.updateCourseMutation.isPending || mutations.createCourseMutation.isPending
        }
        onClose={modal.handleCloseModal}
        onSubmit={handleAddCourseSubmit}
        onUpdate={handleUpdateCourse}
      />
    </AdminPageLayout>
  );
}
