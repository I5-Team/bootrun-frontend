import { API_URL } from "../constants/apiConfig";
import { getMockCourses, getMockMyEnrollments } from "../data/mockCourseList";
import type { CourseItem, CoursesApiBody, CoursesApiParams, MyEnrollmentItem, MyEnrollmentsApiParams } from "../types/CourseType";
import { apiClient } from "./client";

// 공통 API 지연 시간 (ms)
const API_DELAY = 100;

// 임시 목업
// const USE_MOCK_DATA = true;
const simulateFetch = <T>(data: T, delay: number = API_DELAY): Promise<T> => {
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
export const fetchCourses = async ({
    params, bodyData
}: { params: CoursesApiParams, bodyData: CoursesApiBody }): Promise<CourseItem[]> => {
    console.log('[params]', params);
    console.log('[bodyData]', bodyData);
    try {
        const response = await apiClient.get(API_URL.COURSE.COURSE_LIST, {
            params: params,
            data: bodyData,
        });
        
        if (response?.data?.items) {
            console.log('[API 요청 성공]');
            return response.data.items;
        }

        console.warn('[API 데이터 없음] mock 데이터로 대체');
        const data = getMockCourses(params, bodyData);
        return simulateFetch(data, API_DELAY);

    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        const data = getMockCourses(params, bodyData);
        return simulateFetch(data, API_DELAY);
    }
};  

export const fetchMyEnrollments = async (
    params: MyEnrollmentsApiParams,
): Promise<MyEnrollmentItem[]> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.MY_ENROLLMENTS, { params });
        if (response?.data?.items) {
            console.log('[API 요청 성공]');
            return response.data.items;
        }
        console.warn('[API 데이터 없음] mock 데이터로 대체');
        const data = getMockMyEnrollments(params);
        return simulateFetch(data, API_DELAY);
    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        const data = getMockMyEnrollments(params);
        return simulateFetch(data, API_DELAY);
    }
};  

