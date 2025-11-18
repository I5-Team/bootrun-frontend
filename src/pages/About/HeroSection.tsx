import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/RouteConfig';
import Button from '../../components/Button';
import logo from '../../assets/logos/logo-typo.svg';
import ogImage from '../../assets/images/OG-noText.jpg';

const StyledHeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${ogImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media ${({ theme }) => theme.devices.tablet} {
    height: 400px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    height: 350px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(18, 19, 20, 0.7);
  }
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  max-width: 800px;
  padding: 0 2rem;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 3.2rem;
  filter: brightness(0) invert(1);

  @media ${({ theme }) => theme.devices.mobile} {
    width: 160px;
    margin-bottom: 2.4rem;
  }
`;

const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  margin-bottom: 1.6rem;
  line-height: 1.4;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
    margin-bottom: 1.2rem;
  }
`;

const StyledDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  margin-bottom: 3.2rem;
  color: ${({ theme }) => theme.colors.primary100};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
    margin-bottom: 2.4rem;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HeroSection() {
  return (
    <StyledHeroSection aria-label="부트런 소개">
      <StyledContent>
        <StyledLogo src={logo} alt="BootRun" />
        <StyledTitle>실무로 달려가는 당신의 ICT 학습 파트너</StyledTitle>
        <StyledDescription>
          부트런은 현업 개발자와 함께하는 실무 중심 ICT 교육 플랫폼입니다.
          <br />
          단순히 강의를 듣는 것을 넘어, 커뮤니티와 함께 성장하며
          <br />
          실전 프로젝트를 통해 포트폴리오까지 완성합니다.
        </StyledDescription>
        <StyledButtonWrapper>
          <Link to={ROUTES.LECTURE_LIST}>
            <Button size="lg">강의 둘러보기</Button>
          </Link>
        </StyledButtonWrapper>
      </StyledContent>
    </StyledHeroSection>
  );
}
