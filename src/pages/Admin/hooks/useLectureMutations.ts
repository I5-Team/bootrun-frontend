import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from '../../../queries/useCourseQueries';

/**
 * 강의 CRUD 뮤테이션 관리
 */
export const useLectureMutations = () => {
  // React Query Mutation 훅
  const createCourseMutation = useCreateCourseMutation();
  const updateCourseMutation: ReturnType<typeof useUpdateCourseMutation> =
    useUpdateCourseMutation();
  const deleteCourseMutation = useDeleteCourseMutation();

  return {
    createCourseMutation,
    updateCourseMutation,
    deleteCourseMutation,
  };
};
