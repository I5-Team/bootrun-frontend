import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 100%;
  padding: 120px 2rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.white};

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
  text-align: center;
  margin-bottom: 6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
    margin-bottom: 4rem;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;

  @media ${({ theme }) => theme.devices.laptop} {
    gap: 3rem;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 3.2rem;
  }
`;

const StyledStatItem = styled.div`
  text-align: center;
`;

const StyledNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary200};
  margin-bottom: 1.2rem;
  line-height: 1.2;

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xl};
  }
`;

const StyledLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.gray200};
  font-weight: 500;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

const statistics: Statistic[] = [
  { value: 1234, suffix: '+', label: '누적 수강생' },
  { value: 456, suffix: '+', label: '전체 강의' },
  { value: 98, suffix: '%', label: '수강생 만족도' },
  { value: 24, suffix: '분', label: '평균 질문 응답 시간' },
];

function useCountUp(end: number, duration: number = 2000, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuad(progress));

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
}

function StatCounter({ stat }: { stat: Statistic }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(stat.value, 2000, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <StyledStatItem ref={ref}>
      <StyledNumber>
        {count.toLocaleString()}
        {stat.suffix}
      </StyledNumber>
      <StyledLabel>{stat.label}</StyledLabel>
    </StyledStatItem>
  );
}

export default function StatisticsSection() {
  return (
    <StyledSection>
      <StyledContainer>
        <StyledSectionTitle>숫자로 보는 부트런</StyledSectionTitle>
        <StyledGrid role="list">
          {statistics.map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </StyledGrid>
      </StyledContainer>
    </StyledSection>
  );
}
