import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import DevNavigator from "../components/DevNavigator";

export default function MainLayout() {
    return (
        <LayoutWarpper>
            <MainSection>
                <Header />
                <ContentArea>
                <Outlet />
                </ContentArea>
                <DevNavigator/>      {/* 개발용 네비게이션 버튼 추가 */}
            </MainSection>
        </LayoutWarpper>
    );
}


const LayoutWarpper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {children}
        </div>
    );
}

const MainSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
        </div>
    );
}

const ContentArea = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ flex: 1, padding: '16px 24px', overflowY: 'auto' }}>
            {children}
        </div>
    );
}