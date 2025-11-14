import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * "로그인하지 않은" 사용자만 접근해야 하는 페이지(로그인, 회원가입)를 위한 컴포넌트
 */
const PublicOnly: React.FC = () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    // 1. 토큰이 있으면, 메인 페이지로 리디렉션
    return <Navigate to="/" replace />;
  }

  // 2. 토큰이 없으면, 로그인/회원가입 페이지를 그대로 보여줌
  return <Outlet />;
};

export default PublicOnly;
