import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role'); // 'admin' 또는 'student'
  return { isAuthenticated: !!token, userRole };
};

const RequireAdmin: React.FC = () => {
  const { userRole } = useAuth();

  if (userRole !== 'admin') {
    // 관리자가 아니면 메인 페이지로 리디렉션
    return <Navigate to="/" replace />;
  }

  // 관리자면, 자식 페이지(AdminLayout)를 보여줌
  return <Outlet />;
};

export default RequireAdmin;
