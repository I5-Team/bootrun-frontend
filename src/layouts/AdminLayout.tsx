import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function AdminLayout() {
  return (
    <Wrapper>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
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
  max-width: 1840px;
  width: calc(100% - 4.8rem);
  margin: 0 auto;
  margin-bottom: 8rem;

  @media ${({ theme }) => theme.devices.tablet} {
  width: calc(100% - 3.2rem);
  }
`;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <StyledMainContainer>{children}</StyledMainContainer>;
};
