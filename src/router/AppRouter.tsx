import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { ROUTES } from "./RouteConfig";
import { LoadingSpinner } from '../components/HelperComponents';

const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("../pages/Auth/SignUpPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const DashBoardPage = lazy(() => import("../pages/Admin/DashBoardPage"));
const LectureManagePage = lazy(() => import("../pages/Admin/LectureManagePage"));
const PaymentManagePage = lazy(() => import("../pages/Admin/PaymentManagePage"));
const UserManagePage = lazy(() => import("../pages/Admin/UserManagePage"));
const LectureListPage = lazy(() => import("../pages/Lecture/LectureListPage"));
const LectureSearchPage = lazy(() => import ("../pages/Lecture/LectureSearchPage"));
const LectureDetailPage = lazy(() => import("../pages/Lecture/LectureDetailPage"));
const ProfilePage = lazy(() => import("../pages/MyPage/ProfilePage"));
const LecturePaymentPage = lazy(() => import("../pages/Lecture/LecturePaymentPage"));
const PaymentResultPage = lazy(() => import("../pages/Lecture/PaymentResultPage"));
const MyLecturePage = lazy(() => import("../pages/Lecture/MyLecturePage"));
const LectureRoomPage = lazy(() => import("../pages/Lecture/LectureRoomPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const ErrorLayout = lazy(() => import("../layouts/ErrorLayout"));
const MainPage = lazy(() => import("../pages/MainPage"));
const MyPageLayout = lazy(() => import("../layouts/MypageLayout"));
const OrderHistorySection = lazy(() => import("../pages/MyPage/OrderHistorySection"));
const AccountSection = lazy(() => import("../pages/MyPage/AccountSection"));


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
                {/* 비인증용 페이지 */}
                <Route element={<AuthLayout/>}>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
                    <Route path={ROUTES.SIGNUP} element={<SignUpPage/>} />
                    {/* 인증 사용자용 페이지 */}
                </Route>
                <Route element={<MainLayout/>}>
                    <Route path={ROUTES.HOME} element={<MainPage />} />

                    {/* 로그인 여부에 따라 다르게 표시되는 페이지 */}
                    <Route path={ROUTES.LECTURE_LIST} element={<LectureListPage />} />
                    <Route path={ROUTES.LECTURE_LIST_SEARCH} element={<LectureSearchPage />} />  
                    <Route path={ROUTES.LECTURE_DETAIL} element={<LectureDetailPage />} />  
                    <Route path={ROUTES.LECTURE_PAYMENT} element={<LecturePaymentPage />} />
                    <Route path={ROUTES.LECTURE_PAYMENT_RESULT} element={<PaymentResultPage />} />
                    <Route path={ROUTES.MY_LECTURES} element={<MyLecturePage />} />
                    <Route path={ROUTES.LECTURE_ROOM} element={<LectureRoomPage />} />
                    {/* <Route path={ROUTES.PROFILE} element={<ProfilePage />} /> */}

                    {/* 관리자용 페이지 개발 후에는 일바 */}
                    <Route path={ROUTES.ADMIN_DASHBOARD} element={<DashBoardPage />} />
                    <Route path={ROUTES.ADMIN_LECTURE_MANAGE} element={<LectureManagePage />} />
                    <Route path={ROUTES.ADMIN_PAYMENT_MANAGE} element={<PaymentManagePage />} />
                    <Route path={ROUTES.ADMIN_USER_MANAGE} element={<UserManagePage />} />

                    <Route path={ROUTES.MYPAGE} element={<MyPageLayout />}> {/* (ROUTES.MYPAGE = "/mypage" 라고 가정) */}
                        <Route index element={<ProfilePage />} /> {/* /mypage (기본) */}
                        <Route path={ROUTES.MYPAGE_ORDERS} element={<OrderHistorySection />} /> {/* /mypage/orders */}
                        <Route path={ROUTES.MYPAGE_ACCOUNT} element={<AccountSection />} /> {/* /mypage/account */}
                    </Route>
                </Route>
                {/* 404 페이지 */}
                <Route element={<ErrorLayout/>}>
                    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                </Route>
            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}