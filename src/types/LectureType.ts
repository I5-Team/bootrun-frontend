import { type RefObject } from 'react';

// SectionTabs가 사용할 Ref 모음
export type SectionRefs = {
  introRef: RefObject<HTMLElement>;
  reviewsRef: RefObject<HTMLElement>;
  curriculumRef: RefObject<HTMLElement>;
  instructorRef: RefObject<HTMLElement>;
  faqRef: RefObject<HTMLElement>;
};

// LectureBannerSection용 타입
export interface BannerData {
  imageUrl: string;
  altText: string;
}

// LectureHeaderSection용 타입
export interface LectureHeaderData {
  tags: string[];
  title: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    imageUrl: string;
  };
  schedule: { label: string; value: string }[];
}

// LectureInfoBox (우측 카드)용 타입
export interface CardInfo {
  label: string;
  value: string;
}

// InstructorSection용 타입
export interface Instructor {
  title: string;
  subName: string;
  imageUrl: string;
  positions: { type: 'current' | 'previous'; text: string }[];
  experiences: { title: string; items: string[] }[];
}

// FAQSection용 타입
export interface FaqItem {
  id: number;
  prefix: string;
  question: string;
  answer: string;
}
export interface FaqData {
  title: string;
  items: FaqItem[];
}

// LectureIntroSection 내부 Review용 타입
export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string; 
}
export interface ReviewData {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

// CurriculumSection용 타입
export interface Lecture {
  title: string;
  time?: string;
}
export interface Chapter {
  id: number;
  title: string;
  lectures: Lecture[];
}
export interface CurriculumData {
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

// NoticeSection용 타입
export interface NoticeData {
  title: string;
  items: string[];
}

export interface CardInfoItem {
  label: string;
  value: string;
  isClosed?: boolean; // "모집마감" 태그 표시 여부
}

export interface CardData {
  title: string;
  items: CardInfoItem[];
  price: number;
  status: 'open' | 'closed'; // 버튼 상태 ('open' -> 수강신청, 'closed' -> 마감)
}

export interface InfoBoxProps {
  cardData: {
    data: CardData | null;
    loading: boolean;
    error: Error | null;
  }
}

// 
export interface TagData {
    category_type: string,
    course_type: string,
    difficulty: string, 
}

export interface InfoData {
    title: string,
    description: string,
    price: number,
    // 수강 기한
    // 모집 인원 
    // 모집 기간
    // 교육 기간
}

export interface InstructorData {
    instructor_name: string,
    instructor_bio: string,
    instructor_image: string,
}
