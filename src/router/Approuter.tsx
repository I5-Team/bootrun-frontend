import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./RouteConfig";
import LoginPage from "../pages/Auth/LoginPage";
import ButtonGallery from "../pages/ButtonGallery";
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


export default function Approuter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
                    <Route path={ROUTES.SIGNUP} element={<SignUpPage/>} />
                </Route>
                    <Route element={<MainLayout/>}>
                    <Route path={ROUTES.HOME} element={<ButtonGallery />} />
                    <Route path={ROUTES.LECTURE_LIST} element={<LectureListPage />} />  
                    <Route path={ROUTES.LECTURE_DETAIL} element={<LectureDetailPage />} />  
                    <Route path={ROUTES.LECTURE_PAYMENT} element={<LecturePaymentPage />} />
                    <Route path={ROUTES.LECTURE_PAYMENT_RESULT} element={<PaymentResultPage />} />
                    <Route path={ROUTES.MY_LECTURES} element={<MyLecturePage />} />
                    <Route path={ROUTES.LECTURE_ROOM} element={<LectureRoomPage />} />
                    <Route path={ROUTES.ADMIN_DASHBOARD} element={<DashBoardPage />} />
                    <Route path={ROUTES.ADMIN_LECTURE_MANAGE} element={<LectureManagePage />} />
                    <Route path={ROUTES.ADMIN_PAYMENT_MANAGE} element={<PaymentManagePage />} />
                    <Route path={ROUTES.ADMIN_USER_MANAGE} element={<UserManagePage />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}