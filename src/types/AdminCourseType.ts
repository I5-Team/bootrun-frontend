/**
 * 강의 관리 - 타입 정의
 */

// ========== FAQ 관련 ==========

/**
 * FAQ 아이템
 */
export interface FaqItem {
  question: string;
  answer: string;
}

// ========== 강의 목록 관련 ==========

/**
 * 강의 목록 아이템 (관리자용 - GET /admin/courses 응답)
 */
export interface CourseListItem {
  id: number;
  category_name: string; // 'frontend', 'backend' 등
  title: string;
  instructor_name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  is_published: boolean;
  enrollment_count: number; // 수강생 수
  total_revenue: number; // 매출
  avg_progress: number; // 평균 진행률
  completion_rate: number; // 완료율
  created_at: string;
  updated_at: string;
}

/**
 * 강의 목록 API 쿼리 파라미터
 */
export interface CourseApiParams {
  page: number;
  page_size: number;
  keyword?: string | null; // 강의명, 강사명 검색
  category_type?: string | null;
  difficulty?: string | null;
  is_published?: boolean | null;
}

/**
 * 강의 목록 API 응답
 */
export interface CourseListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: CourseListItem[];
}

// ========== 챕터 & 강의 영상 ==========

/**
 * 강의 영상 (Lecture)
 */
export interface Lecture {
  id?: number;
  chapter_id?: number;
  title: string;
  description: string;
  video_url: string;
  video_type: 'vod' | 'youtube';
  duration_seconds: number;
  order_number: number;
  material_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * 챕터 (Chapter)
 */
export interface Chapter {
  id?: number;
  course_id?: number;
  title: string;
  description: string;
  order_number: number;
  lectures: Lecture[];
  created_at?: string;
  updated_at?: string;
}

/**
 * 챕터 생성/수정 요청 데이터
 */
export interface ChapterRequest {
  title: string;
  description: string;
  order_number: number;
}

/**
 * 챕터 API 응답 데이터
 */
export interface ChapterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    course_id: number;
    title: string;
    description: string;
    order_number: number;
    total_duration: number;
    created_at: string;
    updated_at: string;
  };
}

/**
 * 강의 영상 생성/수정 요청 데이터
 */
export interface LectureRequest {
  title: string;
  description: string;
  video_url: string;
  video_type: 'vod' | 'youtube';
  duration_seconds: number;
  order_number: number;
  material_url?: string;
}

/**
 * 강의 영상 API 응답 데이터
 */
export interface LectureResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    chapter_id: number;
    title: string;
    description: string;
    video_url: string;
    video_type: 'vod' | 'youtube';
    duration_seconds: number;
    order_number: number;
    material_url?: string;
    is_completed: boolean;
    last_position: number;
    watched_seconds: number;
    created_at: string;
    updated_at: string;
  };
}

// ========== 미션 ==========

/**
 * 미션 (Mission)
 */
export interface Mission {
  id?: number;
  course_id?: number;
  title: string;
  description: string;
  mission_type: 'midterm' | 'final';
  question_type: 'multiple_choice' | 'code';
  question_data: string; // JSON 문자열
  answer_data: string; // JSON 문자열
  max_score: number;
  passing_score: number;
  max_attempts: number;
  created_at?: string;
  updated_at?: string;
}

// ========== 강의 상세 (추가/수정 시 사용) ==========

/**
 * 강의 상세 정보 (생성/수정 시 사용)
 */
export interface CourseDetail extends CourseListItem {
  chapters: Chapter[];
  missions: Mission[];
}

/**
 * 강의 생성 요청 데이터
 */
export interface CreateCourseRequest {
  // 기본 정보
  category_type: string;
  course_type: string;
  title: string;
  description: string;
  thumbnail_url: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_image: string;
  difficulty: string;
  price_type: string;
  price: number;
  faq: string;
  is_published: boolean;
  // 커리큘럼
  chapters: Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'>[];
  // 미션
  missions: Omit<Mission, 'id' | 'course_id' | 'created_at' | 'updated_at'>[];
}

/**
 * 강의 수정 요청 데이터
 */
export interface UpdateCourseRequest extends CreateCourseRequest {
  id: number;
}

/**
 * 강의 생성/수정 응답 데이터
 */
export interface CourseResponse {
  id: number;
  category_type: string;
  course_type: string;
  title: string;
  description: string;
  thumbnail_url: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_image: string;
  price_type: string;
  price: number;
  difficulty: string;
  total_duration: number;
  faq: string;
  is_published: boolean;
  enrollment_count: number;
  created_at: string;
  updated_at: string;
}
