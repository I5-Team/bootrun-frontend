export type CourseType = 'boost_community' | 'vod' | 'kdc';

export type CategoryType = 'frontend' | 'backend' | 'data_analysis' | 'ai' | 'design' | 'other';

export type PriceType = 'free' | 'paid' | 'national_support';
 
export type DifficultyType = "beginner" | "intermediate" | "advanced";

// [GET] /courses
export interface CoursesApiParams {
  category_id?: number;
  keyword?: string,
  is_published?: boolean,
  page?: number,
  page_size?: number,
}

export interface CoursesApiBody {
  category_types?: CategoryType[],
  course_types?: CourseType[],
  difficulties?: DifficultyType[],
  price_types?: PriceType[],
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
  enrollment_count: number,
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