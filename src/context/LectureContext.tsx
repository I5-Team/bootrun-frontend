import { createContext, useContext } from 'react';
import type { CoursesDetailItem } from '../types/CourseType';

// Context & Provider
type LectureContextProps = {
    courseId: number;
    data: CoursesDetailItem;
    isEnrolled?: boolean;
    isLoading?: boolean;
    recruitmentStatus?: boolean;
};

export const LectureContext = createContext<LectureContextProps | undefined>(undefined);


export const useLectureContext = () => {
    const context = useContext(LectureContext);
    if (!context) throw new Error('LectureContext를 사용하려면 LectureProvider로 감싸야 합니다.');
    return context;
};
