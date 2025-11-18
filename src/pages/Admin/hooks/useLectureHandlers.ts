import { useCallback } from 'react';
import type { CreateCourseRequest } from '../../../types/AdminCourseType';
import { createChapter, updateChapter, createLecture, updateLecture } from '../../../api/adminApi';
import type { useLectureMutations } from './useLectureMutations';
import type { useLectureFormModal } from './useLectureFormModal';

interface LectureHandlersProps {
  mutations: ReturnType<typeof useLectureMutations>;
  modal: ReturnType<typeof useLectureFormModal>;
  courses: any[];
}

/**
 * 강의 관리 비즈니스 로직 핸들러
 */
export const useLectureHandlers = ({ mutations, modal, courses }: LectureHandlersProps) => {
  const { createCourseMutation, updateCourseMutation, deleteCourseMutation } = mutations;
  const { handleCloseModal } = modal;

  // 강의 삭제 핸들러
  const handleDeleteCourse = useCallback(
    (courseId: number) => {
      const confirmed = window.confirm('정말 이 강의를 삭제하시겠습니까?');
      if (confirmed) {
        deleteCourseMutation.mutate(courseId, {
          onSuccess: () => {
            alert('강의가 성공적으로 삭제되었습니다!');
          },
          onError: (error: unknown) => {
            console.error('강의 삭제 실패:', error);
            alert('강의 삭제에 실패했습니다. 다시 시도해주세요.');
          },
        });
      }
    },
    [deleteCourseMutation]
  );

  // 공개/비공개 토글 핸들러
  const handleTogglePublish = useCallback(
    (courseId: number, currentStatus: boolean) => {
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
          onError: (error: unknown) => {
            console.error('공개 상태 변경 실패:', error);
            alert('상태 변경에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    },
    [updateCourseMutation, courses]
  );

  // 강의 추가 제출 핸들러
  const handleAddCourseSubmit = useCallback(
    async (data: CreateCourseRequest) => {
      const { chapters = [] } = data;

      // 1단계: 강의 생성 (모든 필드 명시적으로 전달)
      const courseData: CreateCourseRequest = {
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
        access_duration_days: data.access_duration_days,
        max_students: data.max_students,
        recruitment_start_date: data.recruitment_start_date,
        recruitment_end_date: data.recruitment_end_date,
        course_start_date: data.course_start_date,
        course_end_date: data.course_end_date,
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
                const chapterResponse = await createChapter(courseId, chapterData);
                const chapterId = chapterResponse.data.id;

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
              handleCloseModal();
              return;
            }
          }

          alert('강의, 챕터, 강의 영상이 모두 성공적으로 추가되었습니다!');
          handleCloseModal();
        },
        onError: (error: unknown) => {
          console.error('강의 추가 실패:', error);
          alert('강의 추가에 실패했습니다. 다시 시도해주세요.');
        },
      });
    },
    [createCourseMutation, handleCloseModal]
  );

  // 강의 수정 제출 핸들러
  const handleUpdateCourse = useCallback(
    (courseId: number, data: CreateCourseRequest) => {
      const courseData = {
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
        access_duration_days: data.access_duration_days,
        max_students: data.max_students,
        recruitment_start_date: data.recruitment_start_date,
        recruitment_end_date: data.recruitment_end_date,
        course_start_date: data.course_start_date,
        course_end_date: data.course_end_date,
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

                if (!chapter.id) {
                  const chapterData = {
                    title: chapter.title,
                    description: chapter.description,
                    order_number: chapter.order_number,
                  };
                  const chapterResponse = await createChapter(courseId, chapterData);
                  chapterId = chapterResponse.data.id;
                } else {
                  const chapterData = {
                    title: chapter.title,
                    description: chapter.description,
                    order_number: chapter.order_number,
                  };
                  await updateChapter(courseId, chapter.id, chapterData);
                }

                if (chapter.lectures && chapter.lectures.length > 0) {
                  for (const lecture of chapter.lectures) {
                    if (!lecture.id) {
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
              handleCloseModal();
              return;
            }

            alert('강의가 성공적으로 수정되었습니다!');
            handleCloseModal();
          },
          onError: (error: unknown) => {
            console.error('강의 수정 실패:', error);
            alert('강의 수정에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    },
    [updateCourseMutation, handleCloseModal]
  );

  return {
    handleDeleteCourse,
    handleTogglePublish,
    handleAddCourseSubmit,
    handleUpdateCourse,
  };
};
