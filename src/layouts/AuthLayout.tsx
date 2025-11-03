import { Outlet } from 'react-router-dom';
import DevNavigator from '../components/DevNavigator';

export default function AuthLayout() {
    return (
        <AuthWrapper>
            <AuthContainer>
            <Outlet />
            <DevNavigator/>      {/* 개발용 네비게이션 버튼 추가 */}
            </AuthContainer>
        </AuthWrapper>
    );
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            {children}
        </div>
    );
}

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ width: '400px', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
            {children}
        </div>
    );
}