import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { StyledMainContainer, StyledWrapper } from './MainLayout';
import styled from 'styled-components';

export default function LectureDetailLayout() {
    return (
        <StyledLectureDetailWrapper>
            <Header/>
            <StyledMainContainer>
                <Outlet />
            </StyledMainContainer>
            <Footer/>
        </StyledLectureDetailWrapper>
    );
}

const StyledLectureDetailWrapper = styled(StyledWrapper)`
    @media ${({ theme }) => theme.devices.laptop} {
        padding-bottom: 8.8rem;
    }
`;