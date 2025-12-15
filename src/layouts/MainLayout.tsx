import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainLayout() {
    return (
        <StyledWrapper>
            <Header/>
            <StyledMainContainer>
                <Outlet />
            </StyledMainContainer>
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
    display: flex;
    flex-direction: column;
`;