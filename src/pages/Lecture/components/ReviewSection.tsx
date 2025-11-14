import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockReviewData } from '../../../data/mockLectureData';
import type { ReviewData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents'; // 로딩/에러 컴포넌트 (별도 파일 추천)
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgStar from "../../../assets/icons/icon-star.svg?react";

type ReviewSectionProps = {
  data?: string | undefined;
}

const ReviewSection = React.forwardRef<HTMLElement, ReviewSectionProps>(({ data: reviewData }, ref) => {
  const { data, loading, error } = useApiData<ReviewData>(mockReviewData, 1200);


  return (
    <S.Section ref={ref} id="reviews">
      <S.SectionHeader>
        <S.SectionTitle>수강생 후기</S.SectionTitle>
        {data && (
        <S.SectionSubtitle>
          {data.averageRating.toFixed(1)} ({data.totalReviews}개 후기)
        </S.SectionSubtitle>
        )}
      </S.SectionHeader>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <Review.Container>
          {data.reviews.map(review => (
            <Review.Card key={review.id}>
              <Review.CardHeader>
                <Review.CardAuthor>
                  <span className="name">{review.author}</span>
                  <span className="rating"><SvgStar/>{review.rating}</span>
                </Review.CardAuthor>
                <span className="date">{review.date}</span>
              </Review.CardHeader>
              <Review.CardComent>{review.comment}</Review.CardComent>
            </Review.Card>
          ))}
        </Review.Container>
      )}
    </S.Section>
  );
});

// --- Styles ---
const Review = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  Card: styled.div`
    width: 100%;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200 };
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 2.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  CardHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .date { 
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: #8d9299; 
    }
  `,
  CardAuthor: styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    .name { 
      font-weight: 600; 
    }
    .rating { 
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      color: ${({ theme }) => theme.colors.primary300};
      font-weight: 500;
      line-height: 1;
      svg {
        position: relative;
        top: -0.5px;
        width: 1.24rem;
        height: auto;
      }
    }
  `,
  CardComent: styled.p`
    color: ${({ theme }) => theme.colors.gray400};
    line-height: 1.4;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
};

export default ReviewSection;