import type { ProfileData, OrderData, AccountData } from '../types/ProfileType';

// 1. ProfilePage용 목업 데이터
export const mockProfileData: ProfileData = {
  name: "지상 최강 개발자",
  gender: "male",
  birthdate: "", // 초기값 없음
  profileImageUrl: "/images/profile/profile-user-default.png" // (컨벤션에 맞춘 경로)
};

// 2. OrderHistoryPage용 목업 데이터
export const mockOrderData: OrderData = {
  orders: [
    { 
      id: "1", 
      status: 'completed', 
      courseName: "견고한 파이썬 부스트 커뮤니티 1기 (디스코드 커뮤니티)", 
      price: "200,000원",
      orderNumber: "UT0017164m01012506121444071527",
      orderDate: "2025.06.12(목) 14:44",
      paymentDate: "2025.06.12(목) 14:44",
      paymentMethod: "신용카드",
      receiptUrl: "#"
    },
    { 
      id: "2", 
      status: 'pending', 
      courseName: "견고한 파이썬 부스트 커뮤니티 1기 (디스코드 커뮤니티)", 
      price: "200,000원",
      orderNumber: "UT0017164m01012506121444071527",
      orderDate: "2025.06.12(목) 14:44",
      paymentDate: "2025.06.12(목) 14:44",
      paymentMethod: "신용카드",
      receiptUrl: "#"
    },
  ]
};

// 3. AccountPage용 목업 데이터
export const mockAccountData: AccountData = {
  email: "paul-lab@naver.com",
  githubEmail: null // null이면 "GitHub 계정 로그인" 링크 표시
};

