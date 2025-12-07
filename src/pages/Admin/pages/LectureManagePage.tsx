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

import { useLectureFilters } from '../hooks/useLectureFilters';
import { useLectureFormModal } from '../hooks/useLectureFormModal';
import { useLectureMutations } from '../hooks/useLectureMutations';
import { useLectureHandlers } from '../hooks/useLectureHandlers';

export default function LectureManagePage() {
  const { apiParams, handleFilterChange, handlePageChange } = useLectureFilters();
  const modal = useLectureFormModal();
  const mutations = useLectureMutations();

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['courses', apiParams],
    queryFn: () => fetchCourses(apiParams),
    staleTime: 0,
  });

  const courses = coursesData?.items ?? [];
  const pagination = {
    total: coursesData?.total ?? 0,
    totalPages: coursesData?.total_pages ?? 1,
  };

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
