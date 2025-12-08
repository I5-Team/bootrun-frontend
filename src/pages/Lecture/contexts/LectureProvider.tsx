import { LectureContext } from './LectureContext';
import type { CoursesDetailItem } from '@/types/CourseType';

type LectureContextProps = {
    courseId: number;
    data: CoursesDetailItem;
    isEnrolled?: boolean;
    isLoading?: boolean;
    recruitmentStatus?: boolean;
};

export const LectureProvider = ({
    courseId,
    data,
    isEnrolled,
    isLoading,
    children,
    recruitmentStatus,
}: LectureContextProps & {
    children: React.ReactNode;
}) => (
    <LectureContext.Provider value={{ courseId, data, isEnrolled, isLoading, recruitmentStatus }}>
        {children}
    </LectureContext.Provider>
);
