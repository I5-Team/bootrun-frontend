import type { MyEnrollmentItem, MyEnrollmentsApiParams } from "../types/CourseType";

// [GET] /enrollments/my
export const mockMyEnrollments: MyEnrollmentItem[] = [
    {
      "id": 1001,
      "title": "파이썬으로 배우는 데이터 분석 입문",
      "thumbnail_url": "https://picsum.photos/seed/python1/600/400",
      "category_type": "data_analysis",
      "course_type": "vod",
      "difficulty": "beginner",
      "instructor_name": "김현수",
      "total_lectures": 20,
      "completed_lectures": 5,
      "progress_rate": 25,
      "enrollment_status": 'available',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2025-10-08T07:39:11Z",
      "expires_at": "2026-04-08T07:39:11Z",
      "last_watched_chapter": "Chapter 2: 데이터 가공",
      "last_watched_lecture": "데이터프레임 필터링",
      "last_watched_at": "2025-11-10T10:00:00Z"
    },
    {
      "id": 1002,
      "title": "React로 만드는 반응형 웹사이트",
      "thumbnail_url": "https://picsum.photos/seed/react1/600/400",
      "category_type": "frontend",
      "course_type": "boost_community",
      "difficulty": "intermediate",
      "instructor_name": "박영희",
      "total_lectures": 35,
      "completed_lectures": 28,
      "progress_rate": 80,
      "enrollment_status": 'available',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2025-09-20T07:39:11Z",
      "expires_at": "2026-03-20T07:39:11Z",
      "last_watched_chapter": "Chapter 7: 상태 관리",
      "last_watched_lecture": "Redux Toolkit 적용",
      "last_watched_at": "2025-11-13T15:30:00Z"
    },
    {
      "id": 1003,
      "title": "Node.js와 Express로 배우는 백엔드 API",
      "thumbnail_url": "https://picsum.photos/seed/node1/600/400",
      "category_type": "backend",
      "course_type": "kdc",
      "difficulty": "intermediate",
      "instructor_name": "이재민",
      "total_lectures": 30,
      "completed_lectures": 0,
      "progress_rate": 0,
      "enrollment_status": 'available',
      "learning_status": 'not_started', // 임의 설정
      "enrolled_at": "2025-10-01T07:39:11Z",
      "expires_at": "2026-04-01T07:39:11Z",
      "last_watched_chapter": null,
      "last_watched_lecture": null,
      "last_watched_at": null
    },
    {
      "id": 1004,
      "title": "HTML/CSS로 배우는 웹 디자인 기초",
      "thumbnail_url": "https://picsum.photos/seed/htmlcss/600/400",
      "category_type": "data_analysis",
      "course_type": "vod",
      "difficulty": "beginner",
      "instructor_name": "최은지",
      "total_lectures": 18,
      "completed_lectures": 0,
      "progress_rate": 0,
      "enrollment_status": 'available',
      "learning_status": 'not_started', // 임의 설정
      "enrolled_at": "2025-10-15T07:39:11Z",
      "expires_at": "2026-04-15T07:39:11Z",
      "last_watched_chapter": null,
      "last_watched_lecture": null,
      "last_watched_at": null
    },
    {
      "id": 1005,
      "title": "TypeScript로 안전한 코드 작성하기",
      "thumbnail_url": "https://picsum.photos/seed/typescript/600/400",
      "category_type": "other",
      "course_type": "boost_community",
      "difficulty": "advanced",
      "instructor_name": "강태우",
      "total_lectures": 25,
      "completed_lectures": 24,
      "progress_rate": 95,
      "enrollment_status": 'expired',
      "learning_status": 'in_progress', // 임의 설정 (진행 중 만료)
      "enrolled_at": "2025-08-08T07:39:11Z",
      "expires_at": "2025-11-10T07:39:11Z",
      "last_watched_chapter": "Chapter 5: 모듈과 네임스페이스",
      "last_watched_lecture": "import/export 심화",
      "last_watched_at": "2025-11-11T09:00:00Z"
    },
    {
      "id": 1006,
      "title": "Next.js로 만드는 블로그 서비스",
      "thumbnail_url": "https://picsum.photos/seed/next1/600/400",
      "category_type": "frontend",
      "course_type": "kdc",
      "difficulty": "intermediate",
      "instructor_name": "김현수",
      "total_lectures": 40,
      "completed_lectures": 40,
      "progress_rate": 100,
      "enrollment_status": 'available',
      "learning_status": 'completed', // 임의 설정
      "enrolled_at": "2025-09-18T07:39:11Z",
      "expires_at": "2026-03-18T07:39:11Z",
      "last_watched_chapter": "Chapter 10: 배포 및 최적화",
      "last_watched_lecture": "Final Lecture",
      "last_watched_at": "2025-10-25T11:00:00Z"
    },
    {
      "id": 1007,
      "title": "디자인 시스템 구축하기",
      "thumbnail_url": "https://picsum.photos/seed/designsys/600/400",
      "category_type": "design",
      "course_type": "vod",
      "difficulty": "advanced",
      "instructor_name": "최은지",
      "total_lectures": 22,
      "completed_lectures": 22,
      "progress_rate": 100,
      "enrollment_status": 'available',
      "learning_status": 'completed', // 임의 설정
      "enrolled_at": "2025-08-25T07:39:11Z",
      "expires_at": "2026-02-25T07:39:11Z",
      "last_watched_chapter": "Chapter 5: 유지보수 전략",
      "last_watched_lecture": "수료",
      "last_watched_at": "2025-11-01T14:00:00Z"
    },
    {
      "id": 1008,
      "title": "Firebase로 배우는 서버리스 개발",
      "thumbnail_url": "https://picsum.photos/seed/firebase/600/400",
      "category_type": "backend",
      "course_type": "boost_community",
      "difficulty": "intermediate",
      "instructor_name": "이재민",
      "total_lectures": 32,
      "completed_lectures": 28,
      "progress_rate": 88,
      "enrollment_status": 'available',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2025-09-05T07:39:11Z",
      "expires_at": "2026-03-05T07:39:11Z",
      "last_watched_chapter": "Chapter 8: 보안 및 인증",
      "last_watched_lecture": "Custom Token 생성",
      "last_watched_at": "2025-11-14T08:00:00Z"
    },
    {
      "id": 1009,
      "title": "JavaScript 기본기 완전 정복",
      "thumbnail_url": "https://picsum.photos/seed/jsbasic/600/400",
      "category_type": "data_analysis",
      "course_type": "kdc",
      "difficulty": "beginner",
      "instructor_name": "박영희",
      "total_lectures": 28,
      "completed_lectures": 1,
      "progress_rate": 5,
      "enrollment_status": 'available',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2025-10-20T07:39:11Z",
      "expires_at": "2026-04-20T07:39:11Z",
      "last_watched_chapter": "Chapter 1: 기본 문법",
      "last_watched_lecture": "변수와 데이터 타입",
      "last_watched_at": "2025-11-05T19:00:00Z"
    },
    {
      "id": 1010,
      "title": "Git과 GitHub로 협업하기",
      "thumbnail_url": "https://picsum.photos/seed/git1/600/400",
      "category_type": "other",
      "course_type": "vod",
      "difficulty": "beginner",
      "instructor_name": "강태우",
      "total_lectures": 15,
      "completed_lectures": 6,
      "progress_rate": 40,
      "enrollment_status": 'available',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2025-10-03T07:39:11Z",
      "expires_at": "2026-04-03T07:39:11Z",
      "last_watched_chapter": "Chapter 3: 브랜치 전략",
      "last_watched_lecture": "Git Flow 이해하기",
      "last_watched_at": "2025-11-12T17:00:00Z"
    },
    // 만료된 강의 예시
    {
      "id": 1011,
      "title": "만료된 RDB 강좌",
      "thumbnail_url": "https://picsum.photos/seed/expired_db/600/400",
      "category_type": "backend",
      "course_type": "vod",
      "difficulty": "intermediate",
      "instructor_name": "김현수",
      "total_lectures": 20,
      "completed_lectures": 10,
      "progress_rate": 50,
      "enrollment_status": 'expired',
      "learning_status": 'in_progress', // 임의 설정
      "enrolled_at": "2024-11-01T07:39:11Z",
      "expires_at": "2025-11-01T07:39:11Z",
      "last_watched_chapter": "Chapter 3: JOIN",
      "last_watched_lecture": "INNER JOIN 심화",
      "last_watched_at": "2025-10-30T10:00:00Z"
    }
];

export const getMockMyEnrollments = (
  params: MyEnrollmentsApiParams = {},
): MyEnrollmentItem[] => {
  let filteredData = [...mockMyEnrollments];

  const filtered = filteredData.filter(item => {
    if (params.learning_status && item.learning_status !== params.learning_status) return false;
    if (params.enrollment_status && item.enrollment_status !== params.enrollment_status) return false;
    if (params.course_type && item.course_type !== params.course_type) return false;
    if (params.category_type && item.category_type !== params.category_type) return false;
    if (params.difficulty && item.difficulty !== params.difficulty) return false;
    return true;
  });

  const page = params.page || 1;
  const pageSize = params.page_size || 10;

  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  
  return filtered.slice(start, end);
};