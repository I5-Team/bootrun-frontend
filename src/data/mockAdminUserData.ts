import type { UserListResponse, UserListItem, UserApiParams } from '../types/AdminUserType';

const users: UserListItem[] = Array.from({ length: 55 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@bootrun.com`,
  nickname: `User${i + 1}`,
   // 관리자인지 일반 사용자인지 역할 별로 이름 지정
  role: i % 10 === 0 ? 'admin' : 'user',
  is_active: i % 7 !== 0,
  total_enrollments: i % 5,
  total_payments: (i % 5) * 150000,
  total_spent: (i % 5) * 150000,
  created_at: '2025-10-01T10:00:00.000Z',
  last_login: '2025-11-05T14:30:00.000Z',
}));

export const mockUserListResponse: UserListResponse = {
  total: users.length,
  page: 1,
  page_size: 20,
  total_pages: Math.ceil(users.length / 20),
  items: users.slice(0, 20), // 1페이지 분량
};

// (필터링/페이지네이션을 시뮬레이션하는 로직)
export const getMockUsers = (params: UserApiParams): UserListResponse => {
  let filteredUsers = users;

  if (params.keyword) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.email.includes(params.keyword!) ||
        user.nickname.includes(params.keyword!),
    );
  }
  if (params.role) {
    filteredUsers = filteredUsers.filter((user) => user.role === params.role);
  }
  if (params.is_active !== null && params.is_active !== undefined) {
    filteredUsers = filteredUsers.filter(
      (user) => user.is_active === params.is_active,
    );
  }

  const total = filteredUsers.length;
  const total_pages = Math.ceil(total / params.page_size);
  const startIndex = (params.page - 1) * params.page_size;
  const endIndex = startIndex + params.page_size;

  return {
    total,
    page: params.page,
    page_size: params.page_size,
    total_pages,
    items: filteredUsers.slice(startIndex, endIndex),
  };
};