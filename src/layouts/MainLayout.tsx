import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import DevNavigator from '../components/DevNavigator';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainLayout() {
    return (
        <StyledWrapper>
            <Header/>
            <StyledMainContainer>
                <Outlet />
            </StyledMainContainer>
            {/* 개발용 네비게이션 버튼 추가 */}
            <DevNavigator/>      
            <Footer/>
        </StyledWrapper>
    );
}

export const StyledWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

export const StyledMainContainer = styled.main`
    flex: 1;
    max-width: ${({ theme }) => theme.breakpoints.desktop};
    width: calc(100% - 3.2rem);
    margin: 0 auto;
`;

// const Wrapper = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <StyledWrapper>
//             {children}
//         </StyledWrapper>
//     );
// }

// const MainContainer = ({ children }: { children: React.ReactNode }) => {
//     return (
//        <StyledMainContainer>
//             {children}
//         </StyledMainContainer>
//     );
// }