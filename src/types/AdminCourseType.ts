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
 * 강의 목록 아이템
 */
export interface CourseListItem {
  id: number;
  category_type: 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';
  course_type: 'vod' | 'boost_community' | 'kdc';
  title: string;
  description: string;
  thumbnail_url: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price_type: 'free' | 'paid' | 'national_support';
  price: number;
  total_duration: number; // 초 단위
  faq: string; // JSON 문자열
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // 추가 정보 (JOIN 또는 계산)
  total_chapters?: number;
  total_enrollments?: number;
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
