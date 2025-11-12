import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import DevNavigator from '../components/DevNavigator';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function AdminLayout({ hasFooter = false }: { hasFooter?: boolean }) {
  return (
    <Wrapper>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <DevNavigator />
      {hasFooter && <Footer />}
    </Wrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledMainContainer = styled.main`
  flex: 1;
  width: calc(100% - 7rem);
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: calc(100% - 3rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 100%;
    padding: 0 1.6rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0;
  }
`;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <StyledMainContainer>{children}</StyledMainContainer>;
};
