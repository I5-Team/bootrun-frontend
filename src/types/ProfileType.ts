// 1. ProfilePage.tsx용 타입
export interface ProfileData {
  name: string;
  gender: 'male' | 'female' | 'none';
  birthdate: string; // 'YYYY-MM-DD' 또는 빈 문자열
  profileImageUrl: string;
}

// 2. OrderHistoryPage.tsx용 타입
export interface OrderItem {
  id: string;
  status: 'completed' | 'pending'; // '결제 완료' | '결제 대기'
  courseName: string;
  price: string;
  orderNumber: string;
  orderDate: string;
  paymentDate: string;
  paymentMethod: string;
  receiptUrl: string;
}
export interface OrderData {
  orders: OrderItem[];
}

// 3. AccountPage.tsx용 타입
export interface AccountData {
  email: string;
  githubEmail: string | null; // 연동된 깃헙 이메일
}