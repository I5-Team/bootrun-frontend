export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type DifficultyType = "beginner" | "intermediate" | "advanced";

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
  faq: string,
  is_published: boolean,
  enrollment_count?: number,
  created_at: string,
  updated_at: string,
}

// [GET] /courses/{course_id}
export type CoursesDetailItem = CourseItem & {
  chapters?: ChapterItem[] | null,
  is_enrolled?: boolean,
  my_progress?: number | null,
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

// [GET] /enrollments/my
export interface MyEnrollmentsApiParams {
  category_id?: number,
  difficulty?: DifficultyType,
  is_active?: boolean,
  page?: number,
  page_size?: number;
}

export type MyEnrollmentItem = {
  id: number,
  user_id: number,
  course_id: number,
  course_type: CourseType, // Swagger에 없음
  course_title: string,
  course_thumbnail: string,
  category_name: CategoryType,
  difficulty: DifficultyType,
  enrolled_at: string,
  expires_at: string,
  is_active: boolean,
  progress_rate: number,
  days_until_expiry: number,
  total_lectures: number,
  completed_lectures: number
}
