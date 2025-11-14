import { API_URL } from "../constants/apiConfig";
import { getMockMyEnrollments } from "../data/mockMyEnrollmentsData";
import type { MyEnrollmentsApiParams, MyEnrollmentItem } from "../types/CourseType";
import { apiClient } from "./client";
import { simulateFetch } from "./coursesApi";

/**
 * GET /enrollments/my
 * 강의 목록 조회
 */
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
        return simulateFetch(data);
    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        const data = getMockMyEnrollments(params);
        return simulateFetch(data);
    }
};  