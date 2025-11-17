import { useState, useCallback } from 'react';

/**
 * 강의 추가/수정 모달 상태 관리
 */
export const useLectureFormModal = () => {
  const [formModalMode, setFormModalMode] = useState<'add' | 'edit'>('add');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // 강의 클릭 핸들러 (상세 보기/수정)
  const handleCourseClick = useCallback((courseId: number) => {
    setSelectedCourseId(courseId);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  }, []);

  // 강의 추가 핸들러
  const handleAddCourse = useCallback(() => {
    setSelectedCourseId(null);
    setFormModalMode('add');
    setIsFormModalOpen(true);
  }, []);

  // 강의 수정 핸들러 (테이블 내 수정 버튼)
  const handleEditCourse = useCallback((courseId: number) => {
    setSelectedCourseId(courseId);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  }, []);

  // 모달 닫기
  const handleCloseModal = useCallback(() => {
    setIsFormModalOpen(false);
    setSelectedCourseId(null);
  }, []);

  return {
    formModalMode,
    isFormModalOpen,
    selectedCourseId,
    handleCourseClick,
    handleAddCourse,
    handleEditCourse,
    handleCloseModal,
  };
};
