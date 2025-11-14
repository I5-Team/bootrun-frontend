export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type DifficultyType = "beginner" | "intermediate" | "advanced";

export type EnrollmentState = 'None' | 'available' | 'expired';

export type LearningState = 'None' | 'not_started' | 'in_progress' | 'completed';

// 타입별 라벨
export const courseTypeLabel : Record<CourseType, string> = {
    boost_community : '부스트 커뮤니티',
    vod : 'VOD',
    kdc : 'KDC', 
}

export const categoryLabel : Record<CategoryType, string> = {
    frontend : '프론트엔드',
    backend : '백엔드',
    data_analysis : '데이터 분석', 
    ai: 'AI',
    design: '디자인', 
    other: '기타',
}

export const difficultyLabel : Record<DifficultyType, string> = {
    beginner : '초급',
    intermediate : '중급',
    advanced : '실무', 
}


// [GET] /courses
export interface CoursesApiParams {
  category_id?: number | null;
  keyword?: string | null,
  is_published?: boolean | null,
  page?: number,
  page_size?: number,
  category_types?: CategoryType[] | null,
  course_types?: CourseType[] | null,
  difficulties?: DifficultyType[] | null,
  price_types?: PriceType[] | null,
}

export type CourseItem = {
  id: number,
  category_type: CategoryType,
  course_type: CourseType,
  title: string,
  description: string,
  thumbnail_url: string,
  instructor_name: string,
  instructor_bio: string,
  instructor_image: string,
  price_type: PriceType,
  price: number,
  difficulty: DifficultyType,
  total_duration: number,
  student_reviews?: string,
  faq?: string,
  is_published: boolean,
  enrollment_count?: number,
  created_at: string,
  updated_at: string,
}

// [GET] /courses/{course_id}
export type CoursesDetailItem = CourseItem & {
  instructor_description?: string,
  access_duration_days?: number,
  max_students?: number,
  recruitment_start_date?: string,
  recruitment_end_date?: string,
  course_start_date?: string,
  course_end_date?: string,
  is_enrolled?: boolean,
  my_progress?: number | null,
  chapters?: ChapterItem[] | null,
}

export type ChapterItem = {
  id: number,
  course_id: number,
  title: string,
  description: string | null,
  order_number: number,
  total_duration?: number,
  lectures?: LectureItem[],
}

export type LectureItem = {
  id: number
  chapter_id: number
  title: string
  description: string | null,
  video_url: string
  video_type: 'vod' | 'youtube',
  duration_seconds: number,
  order_number: number,
  material_url?: string | null,
  is_completed?: boolean | null,
  last_position?: number | null,
  watched_seconds?: number | null,
  created_at: string,
  updated_at: string,
}

// [POST] /enrollments
export type EnrollmentResponse = { 
  id: number,
  user_id: number,
  course_id: number,
  course_title: string,
  course_thumbnail: string,
  category_name: string,
  difficulty: DifficultyType,
  enrolled_at: string,
  expires_at: string,
  is_active: boolean,
  progress_rate: number,
  days_until_expiry: number,
  total_lectures: number,
  completed_lectures: number,
}

// [GET] /enrollments/my
export interface MyEnrollmentsApiParams {
  enrollment_status?: EnrollmentState | null,
  learning_status?: LearningState | null,
  course_type?: CourseType | null,
  category_type?: CategoryType | null,
  difficulty?: DifficultyType | null,
  page?: number,
  page_size?: number,
}

export type MyEnrollmentItem = {
  id: number,
  title: string,
  thumbnail_url: string,
  course_type: CourseType
  category_type: CategoryType
  difficulty: DifficultyType
  instructor_name: string,
  total_lectures: number,
  completed_lectures: number,
  progress_rate: number,
  enrollment_status: EnrollmentState,
  learning_status: LearningState,
  enrolled_at: string,
  expires_at?: string | null,
  last_watched_chapter?: string | null,
  last_watched_lecture?: string | null,
  last_watched_at?: string | null,
}

// [GET] /enrollments/dashboard
export type EnrollmentDashboadItem = {
    total_enrollments: number,
    active_enrollments: number,
    completed_courses: number,
    total_study_time: number,
    avg_progress_rate: number,
    recent_activities?: Array<{[key: string]: any}>,
    upcoming_expiries?: Array<{[key: string]: any}>,
}

// GET /enrollments/{enrollment_id}
export type EnrollmentDetailItem = {
    id: number,
    category_type: CategoryType,
    course_type: CourseType,
    title: string,
    description: string,
    thumbnail_url: string,
    instructor_name: string,
    instructor_bio: string,
    instructor_description?: string,
    instructor_image: string,
    price_type: PriceType,
    price: number,
    difficulty: DifficultyType,
    total_duration: number,
    enrollment_status: EnrollmentState,
    learning_status: LearningState,
    enrolled_at: string,
    expires_at?: string,
    total_lectures: number,
    completed_lectures: number,
    progress_rate: number,
    last_watched_chapter_id?: number,
    last_watched_lecture_id?: number,
    last_watched_at?: string,
    chapters?: ChapterItem[],
    created_at: string,
    updated_at: string
}

// POST /enrollments/progress
export interface EnrollmentProgressBodyData {
  lecture_id: number,
  watched_seconds: number,
  last_position: number,
  is_completed?: boolean,
}

export type EnrollmentProgressResponse = {
    id: number,
    user_id: number,
    lecture_id: number,
    lecture_title: string,
    watched_seconds: number,
    last_position: number,
    is_completed: boolean,
    completion_rate: number,
    last_watched_at: string,
    completed_at: string
}

// PATCH /enrollments/progress/lecture/{lecture_id}
export interface LectureProgressBodyData {
  watched_seconds: number,
  last_position: number,
  is_completed?: boolean,
}

export type LectureProgressResponse = {
    id: number,
    user_id: number,
    lecture_id: number,
    lecture_title: string,
    watched_seconds: number,
    last_position: number,
    is_completed: boolean,
    completion_rate: number,
    last_watched_at: string,
    completed_at: string
}

// GET /enrollments/progress/course/{course_id}
export type CourseProgressItem = {
  course_id: number,
  course_title: string,
  total_duration: number,
  watched_duration: number,
  progress_rate: number,
  total_lectures: number,
  completed_lectures: number,
  last_watched_at: string | null,
  chapters?: ChapterItem[],
}

// GET /enrollments/progress/lecture/{lecture_id}
export type LectureProgressItem = {
    id: number,
    user_id: number,
    lecture_id: number,
    lecture_title: string,
    watched_seconds: number,
    last_position: number,
    is_completed: boolean,
    completion_rate: number,
    last_watched_at: string,
    completed_at: string | null,
}