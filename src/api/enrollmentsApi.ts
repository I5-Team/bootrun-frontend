import { API_URL } from "../constants/apiConfig";
import { getMockMyEnrollments } from "../data/mockMyEnrollmentsData";
import type { MyEnrollmentsApiParams, MyEnrollmentItem, EnrollmentResponse, EnrollmentDashboadItem, EnrollmentDetailItem, EnrollmentProgressResponse, EnrollmentProgressBodyData, LectureProgressResponse, LectureProgressBodyData, CourseProgressItem, LectureProgressItem } from "../types/CourseType";
import { apiClient } from "./client";
import { simulateFetch } from "./coursesApi";

/**
 * POST /enrollments
 * 수강 등록
 */
export const postEnrollments = async ( course_id: number ): Promise<EnrollmentResponse | null> => {
    try {
        const response = await apiClient.post(API_URL.ENROLLMENT.ENROLLMENTS, {
            course_id
        });
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}

/**
 * GET /enrollments/my
 * 내 수강 목록 조회
 */
export const fetchMyEnrollments = async (
    params: MyEnrollmentsApiParams,
): Promise<MyEnrollmentItem[]> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.MY_ENROLLMENTS, { params });
        if (response?.data?.data?.items) {
            console.log('[API 요청 성공]');
            return response.data.data.items;
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

/**
 * GET /enrollments/dashboard
 * 학습자 대시보드 조회 
 */
export const fetchEnrollmentDashboard = async (): Promise<EnrollmentDashboadItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.DASHBOARD);
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

/**
 * GET /enrollments/{enrollment_id}
 * 수강 상세 조회
 */
export const fetchEnrollmentDetail = async (
    enrollment_id: number,
): Promise<EnrollmentDetailItem | null> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.ENROLLMENT_DETAIL(enrollment_id));
        if(response) {
            console.log('[API 요청 성공]');
            return response.data.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

/**
 * POST /enrollments/progress
 * 학습 진행 생성
 */
export const createEnrollmentProgress = async (
    bodyData: EnrollmentProgressBodyData
): Promise<EnrollmentProgressResponse[] | null> => {
    try {
        const response = await apiClient.post(API_URL.ENROLLMENT.CREATE_PROGRESS, bodyData);
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

/**
 * PATCH /enrollments/progress/lecture/{lecture_id}
 * 학습 진행 업데이트
 */
export const updateLectureProgress = async (
    lecture_id: number,
    bodyData: LectureProgressBodyData,
): Promise<LectureProgressResponse[] | null> => {
    try {
        const response = await apiClient.patch(API_URL.ENROLLMENT.UPDATE_LECTURE_PROGRESS(lecture_id), bodyData);
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

/**
 * GET /enrollments/progress/course/{course_id}
 * 강의별 학습 진행 조회
 */
export const fetchCourseProgress = async (
    course_id: number,
): Promise<CourseProgressItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.COURSE_PROGRESS(course_id));
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

/**
 * GET /enrollments/progress/lecture/{lecture_id}
 * 강의 영상별 진행 조회
 */
export const fetchLectureProgress = async (
    lecture_id: number,
): Promise<LectureProgressItem[] | null> => {
    try {
        const response = await apiClient.get(API_URL.ENROLLMENT.LECTURE_PROGRESS(lecture_id));
        if(response) {
            console.log('[API 요청 성공]');
            return response.data;
        }
        console.log('[API 데이터 없음]');
        return null;
    } catch (err) {
        console.error('[API 요청 실패]', err);
        return null;
    }
}; 

