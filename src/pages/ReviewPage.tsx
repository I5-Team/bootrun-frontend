import styled from 'styled-components';
import ScrollToTopButton from '../components/ScrollToTopButton';
import SvgStar from '../assets/icons/icon-star.svg?react';
import { DEFAULT_INSTRUCTOR_IMAGE } from '../constants/apiConfig';

const StyledPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray100};
`;

const StyledHeroSection = styled.section`
  width: 100%;
  padding: 80px 2rem 60px;
  background: ${({ theme }) => theme.colors.white};
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 60px 2rem 40px;
  }
`;

const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 1.6rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.xxl};
  }
`;

const StyledSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray400};

  span {
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: 600;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.lg};
  }
`;

const StyledReviewSection = styled.section`
  width: 100%;
  padding: 60px 2rem 120px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 40px 2rem 80px;
  }
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }
`;

const StyledReviewCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 3.2rem;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.08);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2.4rem;
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 2rem;
`;

const StyledProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const StyledUserInfo = styled.div`
  flex: 1;
`;

const StyledUserName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: 0.4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const StyledCourseName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  margin-bottom: 0.8rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

const StyledRating = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const StyledStarIcon = styled(SvgStar)<{ $filled: boolean }>`
  width: 16px;
  height: 16px;

  path {
    fill: ${({ $filled, theme }) => ($filled ? theme.colors.primary300 : theme.colors.gray200)};
  }
`;

const StyledReviewText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.gray400};
  margin-bottom: 2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.md};
  }
`;

const StyledChangeLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary300};
  margin-bottom: 0.8rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

const StyledChangeText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.gray100};
  padding: 1.2rem 1.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSize.sm};
  }
`;

interface Review {
  id: number;
  name: string;
  courseName: string;
  rating: number;
  profileImage: string;
  reviewText: string;
  beforeAfter?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: '김규호',
    courseName: '프론트엔드 부트캠프',
    rating: 5,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      '실무 중심의 커리큘럼이 정말 좋았습니다. 단순히 이론만 배우는 것이 아니라 실제 프로젝트를 진행하면서 포트폴리오까지 완성할 수 있었어요. 현업 개발자 분들의 피드백도 좋았습니다.',
    beforeAfter: '비전공자에서 프론트엔드 개발자로 취업 성공!',
  },
  {
    id: 2,
    name: '신가람',
    courseName: 'Spring Boot 백엔드 과정',
    rating: 5,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      'Discord를 통한 실시간 Q&A가 정말 유용했습니다. 막히는 부분이 있을 때 바로바로 질문하고 답변받을 수 있어서 학습 속도가 빨라졌어요. 커뮤니티 분위기도 너무 좋았습니다.',
    beforeAfter: '신입 개발자에서 백엔드 전문가로 성장',
  },
  {
    id: 3,
    name: '장민경',
    courseName: 'Python 데이터 분석',
    rating: 4,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      '데이터 분석의 기초부터 실전까지 체계적으로 배울 수 있었습니다. 특히 실제 데이터를 활용한 프로젝트가 인상 깊었어요. 강사님의 설명도 이해하기 쉬웠습니다.',
    beforeAfter: '엑셀만 쓰던 직장인에서 데이터 분석가로',
  },
  {
    id: 4,
    name: '김민주',
    courseName: '풀스택 개발 부트캠프',
    rating: 5,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      '프론트엔드부터 백엔드, 배포까지 전체 과정을 경험할 수 있어서 좋았습니다. 혼자서는 엄두도 못 냈을 프로젝트를 완성했고, 자신감을 얻었어요. 취업 지원도 체계적이었습니다.',
    beforeAfter: '6개월 만에 스타트업 풀스택 개발자 취업',
  },
  {
    id: 5,
    name: '김채현',
    courseName: 'React 마스터 과정',
    rating: 5,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      'React의 기본부터 고급 패턴까지 깊이 있게 다뤄주셔서 실력이 많이 늘었습니다. 코드 리뷰를 통해 좋은 코드를 작성하는 법을 배웠고, 실무에서 바로 적용할 수 있었어요.',
    beforeAfter: 'jQuery 개발자에서 React 전문가로',
  },
  {
    id: 6,
    name: '아이오',
    courseName: 'AWS 클라우드 인프라',
    rating: 4,
    profileImage: DEFAULT_INSTRUCTOR_IMAGE,
    reviewText:
      'AWS의 다양한 서비스를 실습을 통해 배울 수 있었습니다. 이론뿐만 아니라 실제 운영 환경을 고려한 아키텍처 설계를 배워서 실무에 큰 도움이 되었어요.',
    beforeAfter: '서버 관리자에서 DevOps 엔지니어로 전환',
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <StyledRating aria-label={`평점 ${rating}점`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StyledStarIcon key={star} $filled={star <= rating} aria-hidden="true" />
      ))}
    </StyledRating>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <StyledReviewCard>
      <StyledCardHeader>
        <StyledProfileImage src={review.profileImage} alt={`${review.name} 프로필`} />
        <StyledUserInfo>
          <StyledUserName>{review.name}</StyledUserName>
          <StyledCourseName>{review.courseName}</StyledCourseName>
          <RatingStars rating={review.rating} />
        </StyledUserInfo>
      </StyledCardHeader>
      <StyledReviewText>{review.reviewText}</StyledReviewText>
      {review.beforeAfter && (
        <>
          <StyledChangeLabel>수강 후 변화</StyledChangeLabel>
          <StyledChangeText>{review.beforeAfter}</StyledChangeText>
        </>
      )}
    </StyledReviewCard>
  );
}

export default function ReviewPage() {
  return (
    <StyledPage>
      <StyledHeroSection>
        <StyledTitle>수강생 이야기</StyledTitle>
        <StyledSubtitle>
          <span>716명</span>의 수강생이 만족했습니다
        </StyledSubtitle>
      </StyledHeroSection>

      <StyledReviewSection>
        <StyledContainer>
          <StyledReviewGrid role="list">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </StyledReviewGrid>
        </StyledContainer>
      </StyledReviewSection>

      <ScrollToTopButton />
    </StyledPage>
  );
}
