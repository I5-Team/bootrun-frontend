/**
 * 강의 관리 페이지 - 강의 목록 조회, 추가, 수정, 삭제 기능 제공
 * 필터/검색, 페이지네이션, 모달을 통한 CRUD 작업 관리
 */
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CourseApiParams, CreateCourseRequest } from '../../types/AdminCourseType';
import {
  fetchCourses,
  createChapter,
  updateChapter,
  createLecture,
  updateLecture,
} from '../../api/adminApi';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from '../../queries/useCourseQueries';
import { Button } from '../../components/Button';

// 하위 컴포넌트 임포트
import AdminPageLayout from './AdminPageLayout';
import LectureFilterBar from './LectureFilterBar';
import LectureTable from './LectureTable';
import Pagination from '../../components/Pagination';
import LectureFormModal from './LectureFormModal'; // 통합 모달
import { AdminPageStyles as S } from './AdminPageStyles';

export default function LectureManagePage() {
  // 1. 상태 정의
  const [formModalMode, setFormModalMode] = useState<'add' | 'edit'>('add');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
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

  // React Query Mutation 훅
  const createCourseMutation = useCreateCourseMutation();
  const updateCourseMutation = useUpdateCourseMutation();
  const deleteCourseMutation = useDeleteCourseMutation();

  // 2. React Query로 강의 목록 조회 (apiParams 변경되면 자동 재호출)
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

  // 강의 추가 제출 핸들러
  const handleAddCourseSubmit = useCallback(
    async (data: CreateCourseRequest) => {
      const { chapters = [] } = data;

      // 1단계: 강의 생성 (모든 필드 명시적으로 전달)
      const courseData: CreateCourseRequest = {
        // 기본 정보
        category_type: data.category_type,
        course_type: data.course_type,
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url?.trim() || '',
        instructor_name: data.instructor_name,
        instructor_bio: data.instructor_bio,
        instructor_description: data.instructor_description,
        instructor_image: data.instructor_image?.trim() || '',
        difficulty: data.difficulty,
        price_type: data.price_type,
        price: data.price,
        // 수강 관련
        access_duration_days: data.access_duration_days,
        max_students: data.max_students,
        recruitment_start_date: data.recruitment_start_date,
        recruitment_end_date: data.recruitment_end_date,
        course_start_date: data.course_start_date,
        course_end_date: data.course_end_date,
        // 기타
        student_reviews: data.student_reviews,
        faq: data.faq,
        chapters: [],
        missions: [],
      };

      createCourseMutation.mutate(courseData, {
        onSuccess: async (courseResponse) => {
          const courseId = courseResponse.id;

          // 2단계: 챕터 및 강의 영상 순차 생성
          if (chapters && chapters.length > 0) {
            try {
              for (const chapter of chapters) {
                const chapterData = {
                  title: chapter.title,
                  description: chapter.description,
                  order_number: chapter.order_number,
                };
                // 챕터 생성
                const chapterResponse = await createChapter(courseId, chapterData);
                const chapterId = chapterResponse.data.id;

                // 강의 영상 생성
                if (chapter.lectures && chapter.lectures.length > 0) {
                  for (const lecture of chapter.lectures) {
                    const lectureData = {
                      title: lecture.title,
                      description: lecture.description,
                      video_url: lecture.video_url,
                      video_type: lecture.video_type,
                      duration_seconds: lecture.duration_seconds,
                      order_number: lecture.order_number,
                      material_url: lecture.material_url || '',
                    };
                    await createLecture(courseId, chapterId, lectureData);
                  }
                }
              }
            } catch (error) {
              console.error('챕터/강의 영상 생성 실패:', error);
              alert(
                '강의는 생성되었으나 일부 챕터 또는 강의 영상 추가에 실패했습니다. 강의 수정에서 다시 시도해주세요.'
              );
              setIsFormModalOpen(false);
              return;
            }
          }

          // 3단계: 미션 생성 (TODO: 미션 API 구현 후 추가)
          // if (missions && missions.length > 0) { ... }

          alert('강의, 챕터, 강의 영상이 모두 성공적으로 추가되었습니다!');
          setIsFormModalOpen(false);
          // 목록 새로고침 (React Query가 자동으로 invalidateQueries 처리)
        },
        onError: (error) => {
          console.error('강의 추가 실패:', error);
          alert('강의 추가에 실패했습니다. 다시 시도해주세요.');
        },
      });
    },
    [createCourseMutation]
  );

  // 강의 수정 핸들러 (테이블 내 수정 버튼)
  const handleEditCourse = useCallback((courseId: number) => {
    setSelectedCourseId(courseId);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  }, []);

  // 강의 삭제 핸들러
  const handleDeleteCourse = useCallback(
    (courseId: number) => {
      const confirmed = window.confirm('정말 이 강의를 삭제하시겠습니까?');
      if (confirmed) {
        // Mutation 실행
        deleteCourseMutation.mutate(courseId, {
          onSuccess: () => {
            alert('강의가 성공적으로 삭제되었습니다!');
            // 목록 새로고침 (React Query가 자동으로 invalidateQueries 처리)
          },
          onError: (error) => {
            console.error('강의 삭제 실패:', error);
            alert('강의 삭제에 실패했습니다. 다시 시도해주세요.');
          },
        });
      }
    },
    [deleteCourseMutation]
  );

  // 공개/비공개 토글 핸들러
  const handleTogglePublish = (courseId: number, currentStatus: boolean) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    updateCourseMutation.mutate(
      {
        courseId,
        courseData: {
          is_published: !currentStatus,
        },
      },
      {
        onSuccess: () => {
          alert('공개 상태가 변경되었습니다!');
        },
        onError: (error) => {
          console.error('공개 상태 변경 실패:', error);
          alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  // 강의 수정 제출 핸들러
  const handleUpdateCourse = useCallback(
    (courseId: number, data: CreateCourseRequest) => {
      // 모든 필드 명시적으로 전달
      const courseData = {
        // 기본 정보
        category_type: data.category_type,
        course_type: data.course_type,
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url?.trim() || '',
        instructor_name: data.instructor_name,
        instructor_bio: data.instructor_bio,
        instructor_description: data.instructor_description,
        instructor_image: data.instructor_image?.trim() || '',
        difficulty: data.difficulty,
        price_type: data.price_type,
        price: data.price,
        // 수강 관련
        access_duration_days: data.access_duration_days,
        max_students: data.max_students,
        recruitment_start_date: data.recruitment_start_date,
        recruitment_end_date: data.recruitment_end_date,
        course_start_date: data.course_start_date,
        course_end_date: data.course_end_date,
        // 기타
        student_reviews: data.student_reviews,
        faq: data.faq,
        is_published: data.is_published,
      };

      updateCourseMutation.mutate(
        { courseId, courseData },
        {
          onSuccess: async () => {
            try {
              const { chapters = [] } = data;

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              for (const chapter of chapters as any) {
                let chapterId = chapter.id;

                // 챕터 생성 또는 수정
                if (!chapter.id) {
                  // 새로운 챕터 → 생성
                  const chapterData = {
                    title: chapter.title,
                    description: chapter.description,
                    order_number: chapter.order_number,
                  };
                  const chapterResponse = await createChapter(courseId, chapterData);
                  chapterId = chapterResponse.data.id;
                } else {
                  // 기존 챕터 → 수정
                  const chapterData = {
                    title: chapter.title,
                    description: chapter.description,
                    order_number: chapter.order_number,
                  };
                  await updateChapter(courseId, chapter.id, chapterData);
                }

                // 각 챕터 내 강의 영상 처리
                if (chapter.lectures && chapter.lectures.length > 0) {
                  for (const lecture of chapter.lectures) {
                    if (!lecture.id) {
                      // 새로운 강의 영상 → 생성
                      const lectureData = {
                        title: lecture.title,
                        description: lecture.description,
                        video_url: lecture.video_url,
                        video_type: lecture.video_type,
                        duration_seconds: lecture.duration_seconds,
                        order_number: lecture.order_number,
                        material_url: lecture.material_url || '',
                      };
                      await createLecture(courseId, chapterId, lectureData);
                    } else {
                      // 기존 강의 영상 → 수정
                      const lectureData = {
                        title: lecture.title,
                        description: lecture.description,
                        video_url: lecture.video_url,
                        video_type: lecture.video_type,
                        duration_seconds: lecture.duration_seconds,
                        order_number: lecture.order_number,
                        material_url: lecture.material_url || '',
                      };
                      await updateLecture(courseId, chapterId, lecture.id, lectureData);
                    }
                  }
                }
              }
            } catch (error) {
              console.error('챕터/강의 영상 처리 실패:', error);
              alert('강의 기본정보는 수정되었으나 챕터/강의 영상 처리 중 오류가 발생했습니다.');
              setIsFormModalOpen(false);
              return;
            }

            alert('강의가 성공적으로 수정되었습니다!');
            setIsFormModalOpen(false);
            // 목록 새로고침 (React Query가 자동으로 invalidateQueries 처리)
          },
          onError: (error) => {
            console.error('강의 수정 실패:', error);
            alert('강의 수정에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    },
    [updateCourseMutation]
  );

  return (
    <AdminPageLayout
      title="강의 관리"
      rightElement={
        <Button size="lg" onClick={handleAddCourse} ariaLabel="새 강의 추가">
          + 새 강의 추가
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

      {/* 강의 추가/수정 통합 모달 */}
      <LectureFormModal
        isOpen={isFormModalOpen}
        mode={formModalMode}
        courseId={selectedCourseId}
        isSaving={updateCourseMutation.isPending || createCourseMutation.isPending}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedCourseId(null);
        }}
        onSubmit={handleAddCourseSubmit}
        onUpdate={handleUpdateCourse}
      />
    </AdminPageLayout>
  );
}
