import { API_URL } from "../constants/apiConfig";
import type { CoursesDetailParams, CoursesDetailItem } from "../types/CourseType";
import { apiClient } from "./client";

export const fetchCoursesDetail = async (
    params: CoursesDetailParams,
): Promise<CoursesDetailItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.MY_ENROLLMENTS, { params });
        if (response?.data?.items && response.data.items.length > 0) {
            console.log('[API 요청 성공]');
            return response.data.items;
        }
        console.warn('[API 데이터 없음] mock 데이터로 대체');
        return null;
    } catch (err) {
        console.error('[API 요청 실패] mock 데이터로 대체', err);
        return null;
    }
};  