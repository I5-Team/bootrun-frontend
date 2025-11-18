import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ROUTES } from './RouteConfig';
import { LoadingSpinner } from '../components/HelperComponents';
import PublicOnly from './PublicOnly';
import RequireAuth from './RequierAuth';
import RequireAdmin from './RequireAdmin';

const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const LectureDetailLayout = lazy(() => import('../layouts/LectureDetailLayout'));
const LectureRoomLayout = lazy(() => import('../layouts/LectureRoomLayout'));
const MyPageLayout = lazy(() => import('../layouts/MypageLayout'));
const ErrorLayout = lazy(() => import('../layouts/ErrorLayout'));

const LoginPage = lazy(() => import('../pages/Auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/Auth/pages/SignUpPage'));
const DashBoardPage = lazy(() => import('../pages/Admin/pages/DashBoardPage'));
const LectureManagePage = lazy(() => import('../pages/Admin/pages/LectureManagePage'));
const PaymentManagePage = lazy(() => import('../pages/Admin/pages/PaymentManagePage'));
const UserManagePage = lazy(() => import('../pages/Admin/pages/UserManagePage'));

const LectureListPage = lazy(() => import('../pages/Lecture/pages/LectureListPage'));
const LectureSearchPage = lazy(() => import('../pages/Lecture/pages/LectureSearchPage'));
const LectureDetailPage = lazy(() => import('../pages/Lecture/pages/LectureDetailPage'));
const ProfilePage = lazy(() => import('../pages/MyPage/pages/ProfilePage'));
const LecturePaymentPage = lazy(() => import('../pages/Lecture/pages/LecturePaymentPage'));
const PaymentResultPage = lazy(() => import('../pages/Lecture/pages/PaymentResultPage'));
const MyLecturePage = lazy(() => import('../pages/Lecture/pages/MyLecturePage'));
const LectureRoomPage = lazy(() => import('../pages/Lecture/pages/LectureRoomPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ReviewPage = lazy(() => import('../pages/ReviewPage'));
const OrderHistorySection = lazy(() => import('../pages/MyPage/components/OrderHistorySection'));
const AccountSection = lazy(() => import('../pages/MyPage/components/AccountSection'));

// 사용자 타입별 페이지 인증 처리 예시
/*
 * 1. 비인증 사용자: 로그인, 회원가입 페이지 (AuthLayout)
 * 2. 인증 사용자: 강의 목록, 강의 상세, 내 강의, 프로필 등 (MainLayout)
 * 3. 관리자 사용자: 관리자 대시보드, 강의 관리, 결제 관리, 사용자 관리 등 (MainLayout)
 */

export default function AppRouter() {
  return (
    <BrowserRouter basename="/bootrun-frontend">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 그룹 1: 비로그인 사용자만 접근 (로그인, 회원가입) */}
          <Route element={<PublicOnly />}>
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
            </Route>
          </Route>
          {/* 그룹 2: 일반 사용자 전용 레이아웃 (메인, 강의, 강의 상세)
          MainLayout/Header에서 인증 여부에 따라 접근 제어 처리
            */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<MainPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.REVIEW} element={<ReviewPage />} />
            <Route path={ROUTES.LECTURE_LIST} element={<LectureListPage />} />
            <Route path={ROUTES.LECTURE_LIST_SEARCH} element={<LectureSearchPage />} />
          </Route>
          <Route element={<LectureDetailLayout />}>
            <Route path={ROUTES.LECTURE_DETAIL} element={<LectureDetailPage />} />
          </Route>

          {/* 그룹 3: 인증 사용자 전용 레이아웃 (결제, 마이페이지, 강의실) */}
          <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.LECTURE_PAYMENT} element={<LecturePaymentPage />} />
              <Route path={ROUTES.LECTURE_PAYMENT_RESULT} element={<PaymentResultPage />} />
              <Route path={ROUTES.MY_LECTURES} element={<MyLecturePage />} />

              <Route path={ROUTES.MYPAGE} element={<MyPageLayout />}>
                <Route index element={<ProfilePage />} /> {/* /mypage (기본) */}
                <Route path={ROUTES.MYPAGE_ORDERS} element={<OrderHistorySection />} />{' '}
                <Route path={ROUTES.MYPAGE_ACCOUNT} element={<AccountSection />} />{' '}
              </Route>
            </Route>

            {/* 강의실은 독립적인 레이아웃 사용 */}

            <Route element={<LectureRoomLayout />}>
              <Route path={ROUTES.LECTURE_ROOM} element={<LectureRoomPage />} />
            </Route>
          </Route>

          <Route element={<RequireAuth />}>
            <Route element={<RequireAdmin />}>
              {/* 그룹 4: 관리자 전용 레이아웃 (대시보드, 강의 관리, 결제 관리, 사용자 관리) */}
              <Route element={<AdminLayout />}>
                <Route path={ROUTES.ADMIN_DASHBOARD} element={<DashBoardPage />} />
                <Route path={ROUTES.ADMIN_LECTURE_MANAGE} element={<LectureManagePage />} />
                <Route path={ROUTES.ADMIN_PAYMENT_MANAGE} element={<PaymentManagePage />} />
                <Route path={ROUTES.ADMIN_USER_MANAGE} element={<UserManagePage />} />
              </Route>
            </Route>
          </Route>

          {/* 그룹 5: 에러 페이지 */}
          <Route element={<ErrorLayout />}>
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
