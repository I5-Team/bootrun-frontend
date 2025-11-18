import { useMyEnrollmentQuery } from '../../../queries/useEnrollmentQueries';

// 어떠한 강의가 내 수강 목록에 있는지 체크
export const useIsEnrolled = (courseId: number) => {
  const { data: myEnrollments, isLoading } = useMyEnrollmentQuery({});

  const isEnrolled = myEnrollments ? myEnrollments.some((course) => course.id === courseId) : false;

  return { isEnrolled, isLoading };
};
