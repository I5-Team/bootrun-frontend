import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * 로그인이 필요한 페이지를 위한 "관문" 컴포넌트
 */
const RequireAuth: React.FC = () => {
  const token = localStorage.getItem('accessToken');
  console.log('RequireAuth - accessToken:', token);
  const location = useLocation();
  console.log('RequireAuth - current location:', location);

  if (!token) {
    // 1. 토큰이 없으면, 로그인 페이지로 리디렉션
    // (로그인 후, 원래 가려던 이 페이지(location)로 다시 돌아오도록 state 전달)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 토큰이 있으면, 자식 페이지(Outlet)를 그대로 보여줌
  return <Outlet />;
};

export default RequireAuth;
