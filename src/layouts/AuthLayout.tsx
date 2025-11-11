import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { StyledMainContainer, StyledWrapper } from './MainLayout';

export default function AuthLayout() {
    return (
        <StyledWrapper>
            <Header/>
            <StyledMainContainer>
                <Outlet />
            </StyledMainContainer>
        </StyledWrapper>
    );
}
