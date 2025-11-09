/**
 * 강의실 관련 타입 정의
 */

export interface Course {
  id: number;
  title: string;
  instructor_name: string;
  thumbnail_url: string;
}

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  description: string;
  order_number: number;
}

export interface Lecture {
  id: number;
  chapter_id: number;
  title: string;
  description: string;
  video_url: string;
  video_type: 'vod' | 'youtube';
  duration_seconds: number;
  order_number: number;
}

export interface Progress {
  id: number;
  user_id: number;
  lecture_id: number;
  watched_seconds: number;
  last_position: number;
  is_completed: boolean;
  last_watched_at: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  expires_at: string;
  is_active: boolean;
  progress_rate: number;
}

export interface CourseQuestion {
  id: number;
  user_id: number;
  course_id: number;
  title: string;
  content: string;
  view_count: number;
  is_answered: boolean;
  created_at: string;
  updated_at: string;
  author_name: string;
  comment_count: number;
  like_count: number;
  tags: string[];
}

export interface Comment {
  id: number;
  question_id: number;
  user_id: number;
  content: string;
  is_instructor_answer: boolean;
  created_at: string;
  updated_at: string;
  author_name: string;
}
