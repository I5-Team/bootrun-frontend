import type { 
  BannerData, 
  LectureHeaderData,
  CardInfo, 
  CurriculumData,
  Instructor, 
  FaqData, 
  ReviewData, 
  NoticeData,
  CardData
} from '../types/LectureType';

export const mockBannerData: BannerData = {
  imageUrl: "https://picsum.photos/seed/python1/1200/800",
  altText: "견고한 파이썬 부스트 커뮤니티 1기"
};

export const mockHeaderData: LectureHeaderData = {
  tags: ["부스트 커뮤니티", "백엔드"],
  title: "견고한 파이썬 부스트 커뮤니티 1기",
  description: "실무에서 통하는 파이썬을 AI & 커뮤니티와 함께 배우고 싶은 분을 위한 단기 커뮤니티 러닝 프로그램",
  instructor: {
    name: "이호준",
    role: "위니브 CEO",
    imageUrl: "https://picsum.photos/id/237/200/200"
  },
  schedule: [
    { label: "모집 기간", value: "2025.07.01(화) ~ 2025.07.27(일)" },
    { label: "교육 기간", value: "2025.07.28(월) ~ 2025.08.27(수)" }
  ]
};

export const cardInfoData: CardInfo[] = [
  { label: '강의 유형', value: '부스트 커뮤니티' },
  { label: '난이도', value: '초급' },
];

export const mockReviewData: ReviewData = {
  averageRating: 4.8,
  totalReviews: 120,
  reviews: [
    {
      id: 1,
      author: '김*현',
      rating: 5,
      date: '2025. 10. 28.',
      comment: '강의 내용이 정말 알찼습니다. 현업에서 바로 써먹을 수 있는 팁이 많았어요!',
    },
    {
      id: 2,
      author: '이*정',
      rating: 4,
      date: '2025. 10. 25.',
      comment: '초보자에게는 조금 어려울 수 있지만, 강사님이 꼼꼼하게 알려주셔서 좋았습니다.',
    },
  ],
};

export const mockCurriculumData: CurriculumData = {
  title: "커리큘럼",
  subtitle: "4주간 진행하는 견고한 커리큘럼",
  chapters: [
    { id: 1, title: '1주차', lectures: [{title: 'Discord 커뮤니티 오리엔테이션'}, {title: 'AI 학습 도구 익히기'}, {title: '기초 문법 정리'}] },
    { id: 2, title: '2주차', lectures: [{title: '기본 자료구조'}, {title: '조건문, 반복문 로직 구성'}, {title: '중간 과제 제출'}] },
    { id: 3, title: '3주차', lectures: [{title: '함수 선언과 활용'}, {title: 'OOP 구조'}, {title: '모듈, 패키지'}] },
    { id: 4, title: '4주차', lectures: [{title: 'FastAPI 활용법'}, {title: '개인 or 팀 프로젝트'}, {title: '결과물 발표'}] },
  ]
};

export const mockInstructorData: Instructor = {
  title: '이준호',
  subName: 'Junho Lee',
  imageUrl: 'https://picsum.photos/id/237/200/200',
  positions: [
  { type: 'current', text: '테크브릿지랩 대표' },
  { type: 'current', text: '넥스트코드 교육팀 리드 강사' },
  { type: 'current', text: 'AI스터디 커뮤니티 운영진' },
  { type: 'previous', text: '데브위크 컨퍼런스 기획팀 매니저' },
  { type: 'previous', text: '소프트하우스코리아 백엔드 개발자' },
],
  experiences: [{
    title: '강의 경력',
    items: [
      "테크브릿지랩 부트캠프 메인 강사",
      "넥스트코드 아카데미 프론트엔드 과정 책임 강사",
      "AI스터디 커뮤니티 온라인 특강 진행",
      "오픈소스 컨퍼런스 '코드와 사람' 초청 강연",
      "유튜브 채널 '개발레슨' 운영",
    ],
  },],
};

export const mockFaqData: FaqData = {
  title: 'FAQ',
  items: [
    { id: 1, prefix: 'Q1.', question: '프로그래밍이 처음인데 괜찮을까요?', answer: '영상을 반복적으로 학습하며 따라오면 가능합니다. 프로그래밍 경험이 한 번이라도 있다면 더 원활하게 수업을 들을 수 있습니다. 가능하면 1 ~ 2시간 간단한 기초 강의라도 유튜브에서 보고 오시는 것을 권해드립니다.' },
    { id: 2, prefix: 'Q2.', question: '강의 시간은 어떻게 되나요?', answer: '...' },
  ],
};

export const mockNoticeData: NoticeData = {
  title: "[유의 사항]",
  items: [
    "본 프로그램은 종료가 되어도 디스코드는 지속 운영됩니다.",
    "본 프로그램은 종료가 되어도 1년간 영상 강의는 수강할 수 있습니다.",
  ]
};

export const mockCardData: CardData = {
  title: "강의 정보",
  items: [
    { label: '강의 유형', value: '부스트 커뮤니티' },
    { label: '주제', value: '백엔드' },
    { label: '난이도', value: '초급' },
    { label: '수강 기한', value: '1년' },
    { label: '모집 인원', value: '100명' },
    { label: '모집 기간', value: '~ 2025.07.27(일)', isClosed: true }, // "모집마감" 태그
    { label: '교육 기간', value: '2025.07.28(월) ~ 08.27(수)' },
  ],
  price: 150000,
  status: "closed" // "수강신청 마감" 버튼
};







