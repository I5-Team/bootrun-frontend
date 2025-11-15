import type { AccountData, OrderData } from '../types/ProfileType';
import type { UserProfile } from '../types/UserType';

// 1. ProfilePage용 목업 데이터
export const mockProfileData: UserProfile = {
  id: 1,
  email: 'paul-lab@naver.com',
  nickname: '견고한파이썬',
  gender: 'male',
  birth_date: '1990-05-15',
  role: 'user',
  is_active: true,
  is_email_verified: true,
  created_at: '2023-01-10T12:34:56Z',
  updated_at: '2023-06-20T08:22:33Z',
  last_login: '2024-06-15T14:11:00Z',
  social_provider: 'google',
  total_study_time: 1250, // in hours
  enrollment_expires_at: '2025-12-31T23:59:59Z',
  profile_image: '',
};

// // 2. OrderHistoryPage용 목업 데이터
export const mockOrderData: OrderData = {
  orders: [
    {
      id: '1',
      status: 'completed',
      courseName: '견고한 파이썬 부스트 커뮤니티 1기 (디스코드 커뮤니티)',
      price: '200,000원',
      orderNumber: 'UT0017164m01012506121444071527',
      orderDate: '2025.06.12(목) 14:44',
      paymentDate: '2025.06.12(목) 14:44',
      paymentMethod: '신용카드',
      receiptUrl: '#',
    },
    {
      id: '2',
      status: 'pending',
      courseName: '견고한 파이썬 부스트 커뮤니티 1기 (디스코드 커뮤니티)',
      price: '200,000원',
      orderNumber: 'UT0017164m01012506121444071527',
      orderDate: '2025.06.12(목) 14:44',
      paymentDate: '2025.06.12(목) 14:44',
      paymentMethod: '신용카드',
      receiptUrl: '#',
    },
  ],
};

// // 3. AccountPage용 목업 데이터
export const mockAccountData: AccountData = {
  email: 'paul-lab@naver.com',
  githubEmail: null, // null이면 "GitHub 계정 로그인" 링크 표시
};
