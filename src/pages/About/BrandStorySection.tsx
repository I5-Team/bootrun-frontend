import styled from 'styled-components';
import logoSymbol from '../../assets/logos/logo-symbol.svg';
import SvgCheckCircle from '../../assets/icons/icon-check-circle-active.svg?react';
import SvgHeart from '../../assets/icons/icon-heart.svg?react';
import SvgStar from '../../assets/icons/icon-star.svg?react';

const StyledSection = styled.section`
  width: 100%;
  padding: 120px 2rem;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.white},
    ${({ theme }) => theme.colors.gray100}
  );

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 80px 2rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 60px 2rem;
  }
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 8rem;
  align-items: center;

  @media ${({ theme }) => theme.devices.laptop} {
    gap: 6rem;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.devices.tablet} {
    order: 2;
  }
`;

const StyledLogo = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;

  @media ${({ theme }) => theme.devices.tablet} {
    max-width: 200px;
  }
`;

const StyledContent = styled.div`
  @media ${({ theme }) => theme.devices.tablet} {
    order: 1;
  }
`;

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    margin-bottom: 3rem;
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
`;

const StyledIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${({ theme }) => theme.colors.primary300};
    }
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StyledTextContent = styled.div`
  flex: 1;
`;

const StyledItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 0.8rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

const StyledItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray400};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const brandStories = [
  {
    icon: <SvgCheckCircle />,
    title: '실무 중심 커리큘럼',
    description: '현업에서 바로 사용하는 최신 기술 스택과 실제 프로젝트 경험을 제공합니다.',
  },
  {
    icon: <SvgHeart />,
    title: '커뮤니티 기반 학습',
    description: 'Discord를 통한 실시간 Q&A, 스터디 그룹, 함께 성장하는 학습 문화를 만들어갑니다.',
  },
  {
    icon: <SvgStar />,
    title: '실전 프로젝트',
    description: '단순 예제가 아닌 실무 수준의 프로젝트로 취업에 필요한 포트폴리오를 완성합니다.',
  },
];

export default function BrandStorySection() {
  return (
    <StyledSection>
      <StyledContainer>
        <StyledLogoWrapper>
          <StyledLogo src={logoSymbol} alt="BootRun Logo" />
        </StyledLogoWrapper>
        <StyledContent>
          <StyledSectionTitle>왜 부트런인가?</StyledSectionTitle>
          <StyledList>
            {brandStories.map((story, index) => (
              <StyledListItem key={index}>
                <StyledIconWrapper aria-hidden="true">{story.icon}</StyledIconWrapper>
                <StyledTextContent>
                  <StyledItemTitle>{story.title}</StyledItemTitle>
                  <StyledItemDescription>{story.description}</StyledItemDescription>
                </StyledTextContent>
              </StyledListItem>
            ))}
          </StyledList>
        </StyledContent>
      </StyledContainer>
    </StyledSection>
  );
}
