import styled from 'styled-components';
import SvgCertificate from '../../assets/icons/icon-certificate.svg?react';
import SvgQuiz from '../../assets/icons/icon-quiz.svg?react';
import SvgCalendar from '../../assets/icons/icon-calendar.svg?react';
import SvgMypage from '../../assets/icons/icon-mypage.svg?react';

const StyledSection = styled.section`
  width: 100%;
  padding: 120px 2rem;
  background: ${({ theme }) => theme.colors.white};

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
`;

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  margin-bottom: 6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    margin-bottom: 4rem;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }
`;

const StyledCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 4rem 3.2rem;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.12);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 3.2rem 2.4rem;
  }
`;

const StyledIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.4rem;

  svg {
    width: 40px;
    height: 40px;

    path {
      fill: ${({ theme }) => theme.colors.primary300};
    }
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 64px;
    height: 64px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const StyledCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 1.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

const StyledCardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray400};
  white-space: pre-line;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const coreValues = [
  {
    icon: <SvgCertificate />,
    title: '수료증 발급',
    description: `과정 이수 시 수료증 발급\n경력 증명 및 포트폴리오 활용 가능`,
  },
  {
    icon: <SvgCalendar />,
    title: '취업 지원 프로그램',
    description: '이력서 첨삭, 모의 면접, 기업 연계\n실제 취업으로 이어지는 체계적 지원',
  },
  {
    icon: <SvgQuiz />,
    title: '전문 강사진',
    description: '현업 10년 이상 경력 개발자가 직접 강의하며\n실무 노하우와 인사이트 전수',
  },
  {
    icon: <SvgMypage />,
    title: '커뮤니티 활성화',
    description: '성장과 호기심으로 가득한 동료들과 함께 성장하는 공간',
  },
];

export default function CoreValuesSection() {
  return (
    <StyledSection>
      <StyledContainer>
        <StyledSectionTitle>4가지 핵심 가치</StyledSectionTitle>
        <StyledGrid role="list">
          {coreValues.map((value, index) => (
            <StyledCard key={index} role="listitem">
              <StyledIconWrapper>{value.icon}</StyledIconWrapper>
              <StyledCardTitle>{value.title}</StyledCardTitle>
              <StyledCardDescription>{value.description}</StyledCardDescription>
            </StyledCard>
          ))}
        </StyledGrid>
      </StyledContainer>
    </StyledSection>
  );
}
