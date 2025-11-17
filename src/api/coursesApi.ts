import { API_URL } from "../constants/apiConfig";
import { getMockCourses } from "../data/mockCourseList";
import { getMockCoursesDetails } from "../data/mockCoursesDetailData";
import type { CourseItem, CoursesApiParams, CoursesDetailItem } from "../types/CourseType";
import { apiClient } from "./client";

// 임시 목업 불러오기
export const simulateFetch = <T>(data: T, delay: number = 100): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// --- API 함수들 ---

/**
 * GET /courses
 * 강의 목록 조회
 */
export const fetchCourses = async (params: CoursesApiParams): Promise<CourseItem[]> => {
    try {
        const response = await apiClient.get(API_URL.COURSE.COURSE_LIST, {
            params
        });
        
        if (response?.data?.items) {
            console.log('[API 요청 성공]');
            return response.data.items;
        }

        console.warn('[API 데이터 없음] mock 데이터로 대체');
        const data = getMockCourses(params);
        return simulateFetch(data);

    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        const data = getMockCourses(params);
        return simulateFetch(data);
    }
};  

/**
 * GET /courses/{course_id}
 * 강의 상세 조회
 */
export const fetchCoursesDetail = async (
    course_id: number,
): Promise<CoursesDetailItem | undefined> => {
    try {
        const response = await apiClient.get(`${API_URL.COURSE.COURSE_LIST}/${course_id}`);
        if (response?.data) {
            console.log('[API 요청 성공]');
            return response.data.data;
        }
        console.warn('[API 데이터 없음] mock 데이터로 대체');
         const data = getMockCoursesDetails(course_id);
        return simulateFetch(data);
    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        const data = getMockCoursesDetails(course_id);
        return simulateFetch(data);
    }
};  