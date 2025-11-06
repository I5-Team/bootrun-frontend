import type {
  AdminStats,
  DailyStat,
  RevenueStat,
  CourseStat,
  CategoryStat,
  AdminSettings,
} from '../types/AdminType';

/**
 * /admin/dashboard/stats
 * (대시보드 상단 카드 데이터)
 */
export const mockAdminStats: AdminStats = {
  total_users: 1250,
  total_courses: 24,
  total_enrollments: 3200,
  active_enrollments: 1800,
  total_revenue: 150_000_000,
  pending_refunds: 350_000,
  today_visitors: 120, // StatsCardArea ①
  today_views: 450, // StatsCardArea ②
  today_revenue: 1_200_000, // StatsCardArea ③
};

/**
 * (차트용) 날짜 및 랜덤 데이터 생성 헬퍼
 */
const createChartData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    data.push({
      date: dateString,
      visitors: Math.floor(Math.random() * 100) + 50,
      views: Math.floor(Math.random() * 300) + 200,
      revenue: Math.floor(Math.random() * 500000) + 100000,
      enrollments: Math.floor(Math.random() * 10) + 1,
      new_users: Math.floor(Math.random() * 5) + 1, // StatsCardArea ④
      
      payment_count: Math.floor(Math.random() * 20),
      refund_amount: Math.floor(Math.random() * 50000),
      refund_count: Math.floor(Math.random() * 3),
      get net_revenue() { return this.revenue - this.refund_amount; }
    });
  }
  return data;
};

// 7일치 동적 데이터 생성
const chartData7Days = createChartData(7);

/**
 * /admin/dashboard/daily-stats
 * (ChartArea - 일별 접속, 조회, 매출 차트 데이터)
 */
export const mockDailyStats: DailyStat[] = chartData7Days.map(d => ({
  date: d.date,
  visitors: d.visitors,
  views: d.views,
  revenue: d.revenue,
  enrollments: d.enrollments,
  new_users: d.new_users,
}));

/**
 * /admin/dashboard/revenue-stats
 * (매출 상세 차트용 데이터 - 필요시 사용)
 */
export const mockRevenueStats: RevenueStat[] = chartData7Days.map(d => ({
  date: d.date,
  revenue: d.revenue,
  payment_count: d.payment_count,
  refund_amount: d.refund_amount,
  refund_count: d.refund_count,
  net_revenue: d.net_revenue,
}));

/**
 * /admin/dashboard/course-stats
 * (ProgressArea 및 TableArea용 데이터)
 */
export const mockCourseStats: CourseStat[] = [
  {
    course_id: 1,
    course_title: '견고한 파이썬 부스트 커뮤니티 1기',
    category_name: '백엔드',
    total_enrollments: 150,
    active_enrollments: 120,
    avg_progress: 75.5,
    completion_count: 80,
    completion_rate: 53.3,
    total_revenue: 15_000_000,
  },
  {
    course_id: 2,
    course_title: 'React와 TypeScript 마스터 3기',
    category_name: '프론트엔드',
    total_enrollments: 200,
    active_enrollments: 180,
    avg_progress: 42.0,
    completion_count: 50,
    completion_rate: 25.0,
    total_revenue: 20_000_000,
  },
  {
    course_id: 3,
    course_title: 'AI 모델링 입문',
    category_name: 'AI/ML',
    total_enrollments: 100,
    active_enrollments: 50,
    avg_progress: 90.1,
    completion_count: 45,
    completion_rate: 45.0,
    total_revenue: 10_000_000,
  },
];

/**
 * /admin/dashboard/category-stats
 * (ProgressArea 차트용 데이터)
 */
export const mockCategoryStats: CategoryStat[] = [
  {
    category_id: 1,
    category_name: '프론트엔드',
    course_count: 5,
    total_enrollments: 450,
    total_revenue: 45_000_000,
    avg_completion_rate: 30.5,
  },
  {
    category_id: 2,
    category_name: '백엔드',
    course_count: 8,
    total_enrollments: 550,
    total_revenue: 60_000_000,
    avg_completion_rate: 45.2,
  },
  {
    category_id: 3,
    category_name: 'AI/ML',
    course_count: 3,
    total_enrollments: 250,
    total_revenue: 25_000_000,
    avg_completion_rate: 50.0,
  },
];

/**
 * /admin/dashboard/settings
 * (설정 페이지용 데이터)
 */
export const mockAdminSettings: AdminSettings = {
  site_name: 'BootRun',
  course_price: 150000,
  enrollment_period_years: 1,
  refund_period_days: 7,
  refund_progress_limit: 10,
  passing_score_rate: 80,
};