/**
 * 강의 관리 - 목업 데이터
 */
import type { CourseListItem } from '../types/AdminCourseType';

// 목업 데이터는 CourseListItem과 CourseResponse 타입 모두를 지원해야 하므로
// 두 타입의 모든 필드를 포함
export const mockCourses: (CourseListItem & Record<string, unknown>)[] = [
  {
    // CourseListItem 필드
    id: 12,
    category_name: 'frontend',
    title: '리액트 완벽 가이드 - 기초부터 실전까지',
    instructor_name: '김개발',
    difficulty: 'beginner',
    is_published: true,
    enrollment_count: 245,
    total_revenue: 12250000,
    avg_progress: 68,
    completion_rate: 42,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
    // CourseResponse 추가 필드
    category_type: 'frontend',
    course_type: 'vod',
    description:
      '리액트의 모든 것을 배우는 강의입니다. 컴포넌트, 훅, 상태관리, 라우팅까지 실무에 필요한 모든 내용을 다룹니다.',
    thumbnail_url: '/images/react-course.jpg',
    instructor_bio: '10년차 프론트엔드 개발자',
    instructor_image: '/images/instructor1.jpg',
    price_type: 'paid',
    price: 50000,
    total_duration: 36000,
    faq: JSON.stringify([
      { question: '수강 기간은 얼마나 되나요?', answer: '결제 후 2년간 무제한 수강 가능합니다.' },
      {
        question: '환불이 가능한가요?',
        answer: '구매일 7일 이내, 진도율 10% 미만일 경우 환불 가능합니다.',
      },
    ]),
  },
  {
    id: 11,
    category_name: 'backend',
    title: 'Node.js & Express 백엔드 개발',
    instructor_name: '박서버',
    difficulty: 'intermediate',
    is_published: true,
    enrollment_count: 189,
    total_revenue: 12285000,
    avg_progress: 72,
    completion_rate: 38,
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
    category_type: 'backend',
    course_type: 'vod',
    description: 'Node.js와 Express를 활용한 백엔드 API 서버 개발 완벽 가이드',
    thumbnail_url: '/images/nodejs-course.jpg',
    instructor_bio: 'Node.js 전문가, 오픈소스 컨트리뷰터',
    instructor_image: '/images/instructor2.jpg',
    price_type: 'paid',
    price: 65000,
    total_duration: 43200,
    faq: JSON.stringify([]),
  },
  {
    id: 10,
    category_name: 'ai',
    title: '파이썬으로 배우는 머신러닝 입문',
    instructor_name: '이인공',
    difficulty: 'beginner',
    is_published: true,
    enrollment_count: 312,
    total_revenue: 0,
    avg_progress: 55,
    completion_rate: 28,
    created_at: '2025-01-10T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    category_type: 'ai',
    course_type: 'boost_community',
    description: '머신러닝의 기초부터 실전 프로젝트까지, 파이썬으로 배우는 AI 입문 과정',
    thumbnail_url: '/images/ml-course.jpg',
    instructor_bio: 'AI 연구원, 머신러닝 엔지니어',
    instructor_image: '/images/instructor3.jpg',
    price_type: 'national_support',
    price: 0,
    total_duration: 54000,
    faq: JSON.stringify([]),
  },
  {
    id: 9,
    category_name: 'data_analysis',
    title: '데이터 분석을 위한 파이썬 & Pandas',
    instructor_name: '최데이터',
    difficulty: 'intermediate',
    is_published: true,
    enrollment_count: 167,
    total_revenue: 9185000,
    avg_progress: 64,
    completion_rate: 35,
    created_at: '2025-01-12T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z',
    category_type: 'data_analysis',
    course_type: 'vod',
    description: '데이터 수집, 정제, 분석, 시각화까지 실무 데이터 분석 완벽 마스터',
    thumbnail_url: '/images/pandas-course.jpg',
    instructor_bio: '데이터 사이언티스트, 빅데이터 전문가',
    instructor_image: '/images/instructor4.jpg',
    price_type: 'paid',
    price: 55000,
    total_duration: 39600,
    faq: JSON.stringify([]),
  },
  {
    id: 8,
    category_name: 'design',
    title: 'Figma 실무 UI/UX 디자인',
    instructor_name: '정디자인',
    difficulty: 'beginner',
    is_published: false,
    enrollment_count: 0,
    total_revenue: 0,
    avg_progress: 0,
    completion_rate: 0,
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-01-25T00:00:00Z',
    category_type: 'design',
    course_type: 'vod',
    description: 'Figma를 활용한 실무 중심의 UI/UX 디자인 강의',
    thumbnail_url: '/images/figma-course.jpg',
    instructor_bio: 'UI/UX 디자이너, 10년 경력',
    instructor_image: '/images/instructor5.jpg',
    price_type: 'paid',
    price: 45000,
    total_duration: 28800,
    faq: JSON.stringify([]),
  },
  {
    id: 7,
    category_name: 'frontend',
    title: 'Vue.js 3 마스터 클래스',
    instructor_name: '강뷰',
    difficulty: 'advanced',
    is_published: true,
    enrollment_count: 98,
    total_revenue: 6860000,
    avg_progress: 82,
    completion_rate: 58,
    created_at: '2025-01-18T00:00:00Z',
    updated_at: '2025-01-28T00:00:00Z',
    category_type: 'frontend',
    course_type: 'vod',
    description: 'Vue 3의 Composition API부터 Pinia 상태관리까지',
    thumbnail_url: '/images/vue-course.jpg',
    instructor_bio: 'Vue.js 코어 팀 멤버',
    instructor_image: '/images/instructor6.jpg',
    price_type: 'paid',
    price: 70000,
    total_duration: 46800,
    faq: JSON.stringify([]),
  },
  {
    id: 6,
    category_name: 'backend',
    title: 'Spring Boot 실전 프로젝트',
    instructor_name: '윤자바',
    difficulty: 'intermediate',
    is_published: true,
    enrollment_count: 134,
    total_revenue: 10720000,
    avg_progress: 70,
    completion_rate: 45,
    created_at: '2025-01-20T00:00:00Z',
    updated_at: '2025-01-30T00:00:00Z',
    category_type: 'backend',
    course_type: 'kdc',
    description: 'Spring Boot로 실전 웹 애플리케이션 개발하기',
    thumbnail_url: '/images/spring-course.jpg',
    instructor_bio: 'Java 백엔드 개발자, 아키텍트',
    instructor_image: '/images/instructor7.jpg',
    price_type: 'paid',
    price: 80000,
    total_duration: 57600,
    faq: JSON.stringify([]),
  },
  {
    id: 5,
    category_name: 'frontend',
    title: 'TypeScript 완벽 가이드',
    instructor_name: '서타입',
    difficulty: 'beginner',
    is_published: true,
    enrollment_count: 421,
    total_revenue: 0,
    avg_progress: 48,
    completion_rate: 32,
    created_at: '2025-01-22T00:00:00Z',
    updated_at: '2025-02-01T00:00:00Z',
    category_type: 'frontend',
    course_type: 'vod',
    description: '자바스크립트 개발자를 위한 TypeScript 실전 가이드',
    thumbnail_url: '/images/ts-course.jpg',
    instructor_bio: 'TypeScript 전문가',
    instructor_image: '/images/instructor8.jpg',
    price_type: 'free',
    price: 0,
    total_duration: 25200,
    faq: JSON.stringify([]),
  },
  {
    id: 4,
    category_name: 'ai',
    title: 'ChatGPT API 활용 실전 프로젝트',
    instructor_name: '김지피티',
    difficulty: 'intermediate',
    is_published: true,
    enrollment_count: 278,
    total_revenue: 16680000,
    avg_progress: 58,
    completion_rate: 40,
    created_at: '2025-01-25T00:00:00Z',
    updated_at: '2025-02-04T00:00:00Z',
    category_type: 'ai',
    course_type: 'vod',
    description: 'OpenAI API를 활용한 실무 AI 애플리케이션 개발',
    thumbnail_url: '/images/gpt-course.jpg',
    instructor_bio: 'AI 엔지니어, GPT 전문가',
    instructor_image: '/images/instructor9.jpg',
    price_type: 'paid',
    price: 60000,
    total_duration: 32400,
    faq: JSON.stringify([]),
  },
  {
    id: 3,
    category_name: 'other',
    title: 'Git & GitHub 실무 활용법',
    instructor_name: '박깃헙',
    difficulty: 'beginner',
    is_published: true,
    enrollment_count: 512,
    total_revenue: 0,
    avg_progress: 75,
    completion_rate: 62,
    created_at: '2025-01-28T00:00:00Z',
    updated_at: '2025-02-07T00:00:00Z',
    category_type: 'other',
    course_type: 'vod',
    description: '협업을 위한 Git 버전 관리 완벽 가이드',
    thumbnail_url: '/images/git-course.jpg',
    instructor_bio: 'DevOps 엔지니어',
    instructor_image: '/images/instructor10.jpg',
    price_type: 'free',
    price: 0,
    total_duration: 18000,
    faq: JSON.stringify([]),
  },
  {
    id: 2,
    category_name: 'backend',
    title: 'Docker & Kubernetes 입문',
    instructor_name: '송도커',
    difficulty: 'intermediate',
    is_published: false,
    enrollment_count: 0,
    total_revenue: 0,
    avg_progress: 0,
    completion_rate: 0,
    created_at: '2025-02-01T00:00:00Z',
    updated_at: '2025-02-10T00:00:00Z',
    category_type: 'backend',
    course_type: 'vod',
    description: '컨테이너 기반 애플리케이션 배포 및 관리',
    thumbnail_url: '/images/docker-course.jpg',
    instructor_bio: 'DevOps 전문가, 쿠버네티스 컨설턴트',
    instructor_image: '/images/instructor11.jpg',
    price_type: 'paid',
    price: 75000,
    total_duration: 50400,
    faq: JSON.stringify([]),
  },
  {
    id: 1,
    category_name: 'data_analysis',
    title: 'SQL 데이터베이스 완벽 마스터',
    instructor_name: '한디비',
    difficulty: 'beginner',
    is_published: true,
    enrollment_count: 356,
    total_revenue: 0,
    avg_progress: 52,
    completion_rate: 30,
    created_at: '2025-02-03T00:00:00Z',
    updated_at: '2025-02-12T00:00:00Z',
    category_type: 'data_analysis',
    course_type: 'boost_community',
    description: '실무에서 바로 쓰는 SQL 쿼리 작성법',
    thumbnail_url: '/images/sql-course.jpg',
    instructor_bio: 'DBA, 데이터베이스 설계 전문가',
    instructor_image: '/images/instructor12.jpg',
    price_type: 'national_support',
    price: 0,
    total_duration: 30600,
    faq: JSON.stringify([]),
  },
];

/**
 * 페이지네이션을 적용한 강의 목록 반환
 */
export const getPaginatedCourses = (
  page: number = 1,
  pageSize: number = 10,
  filters?: {
    keyword?: string | null;
    category_type?: string | null;
    difficulty?: string | null;
    is_published?: boolean | null;
  }
): {
  items: CourseListItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
} => {
  // 필터링
  let filtered = [...mockCourses];

  if (filters?.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.title.toLowerCase().includes(keyword) ||
        course.instructor_name.toLowerCase().includes(keyword)
    );
  }

  if (filters?.category_type && filters.category_type !== 'null') {
    filtered = filtered.filter((course) => course.category_type === filters.category_type);
  }

  if (filters?.difficulty && filters.difficulty !== 'null') {
    filtered = filtered.filter((course) => course.difficulty === filters.difficulty);
  }

  if (filters?.is_published !== null && filters?.is_published !== undefined) {
    filtered = filtered.filter((course) => course.is_published === filters.is_published);
  }

  // 페이지네이션
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };
};
