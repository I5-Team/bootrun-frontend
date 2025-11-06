import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockReviewData } from '../../../data/mockData';
import type { ReviewData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents'; // 로딩/에러 컴포넌트 (별도 파일 추천)

const ReviewSection = React.forwardRef<HTMLElement>((_, ref) => {
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
        <S.ReviewContainer>
          {data.reviews.map(review => (
            <S.ReviewCard key={review.id}>
              <S.ReviewHeader>
                <S.ReviewAuthor>
                  <span className="name">{review.author}</span>
                  <span className="rating">★ {review.rating}</span>
                </S.ReviewAuthor>
                <span className="date">{review.date}</span>
              </S.ReviewHeader>
              <S.ReviewBody>{review.comment}</S.ReviewBody>
            </S.ReviewCard>
          ))}
        </S.ReviewContainer>
      )}
    </S.Section>
  );
});

// --- Styles ---
const S = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    scroll-margin-top: 100px;
  `,
  SectionHeader: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,
  SectionTitle: styled.h2`
    font-weight: 700;
    font-size: 32px;
    color: #121314;
    margin: 0;
  `,
  SectionSubtitle: styled.p`
    font-weight: 600;
    font-size: 16px;
    color: #2e6ff2;
    margin: 0;
  `,
  ReviewContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  ReviewCard: styled.div`
    width: 100%;
    border: 1px solid #d9dbe0;
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
  `,
  ReviewHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .date { font-size: 14px; color: #8d9299; }
  `,
  ReviewAuthor: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    .name { font-weight: 600; font-size: 16px; color: #121314; }
    .rating { font-size: 14px; color: #47494D; }
  `,
  ReviewBody: styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: #47494D;
    margin: 0;
  `,
};

export default ReviewSection;