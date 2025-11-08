import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./RouteConfig";
import LoginPage from "../pages/Auth/LoginPage";
import LectureListPage from "../pages/Lecture/LectureListPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import DashBoardPage from "../pages/Admin/DashBoardPage";
import LectureManagePage from "../pages/Admin/LectureManagePage";
import PaymentManagePage from "../pages/Admin/PaymentManagePage";
import UserManagePage from "../pages/Admin/UserManagePage";
import LectureDetailPage from "../pages/Lecture/LectureDetailPage";
import ProfilePage from "../pages/MyPage/ProfilePage";
import LecturePaymentPage from "../pages/Lecture/LecturePaymentPage";
import PaymentResultPage from "../pages/Lecture/PaymentResultPage";
import MyLecturePage from "../pages/Lecture/MyLecturePage";
import LectureRoomPage from "../pages/Lecture/LectureRoomPage";
import NotFoundPage from "../pages/NotFoundPage";
import ErrorLayout from "../layouts/ErrorLayout";
import MainPage from "../pages/MainPage";
import MyPageLayout from "../layouts/MypageLayout";
import OrderHistorySection from "../pages/MyPage/OrderHistorySection";
import AccountSection from "../pages/MyPage/AccountSection";
import LectureRoomLayout from "../layouts/LectureRoomLayout";



// 사용자 타입별 페이지 인증 처리 예시
/*
* 1. 비인증 사용자: 로그인, 회원가입 페이지 (AuthLayout)
* 2. 인증 사용자: 강의 목록, 강의 상세, 내 강의, 프로필 등 (MainLayout)
* 3. 관리자 사용자: 관리자 대시보드, 강의 관리, 결제 관리, 사용자 관리 등 (MainLayout)
*/

export default function AppRouter() {
    return (
        <BrowserRouter basename="/bootrun-frontend">
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
                    <Route path={ROUTES.LECTURE_DETAIL} element={<LectureDetailPage />} />
                    <Route path={ROUTES.LECTURE_PAYMENT} element={<LecturePaymentPage />} />
                    <Route path={ROUTES.LECTURE_PAYMENT_RESULT} element={<PaymentResultPage />} />
                    <Route path={ROUTES.MY_LECTURES} element={<MyLecturePage />} />
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
                {/* LectureRoom 전용 레이아웃 */}
                <Route element={<LectureRoomLayout/>}>
                    <Route path={ROUTES.LECTURE_ROOM} element={<LectureRoomPage />} />
                </Route>
                {/* 404 페이지 */}
                <Route element={<ErrorLayout/>}>
                    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}