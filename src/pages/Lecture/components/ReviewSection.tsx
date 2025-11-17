import React from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import SvgStar from "../../../assets/icons/icon-star.svg?react";
import { useLectureContext } from '../../../layouts/LectureDetailLayout';

type ReviewItem = {
  student: string,
  review: string,
  rating?: number,
  date?: string,
}

const getRandomDateString = () => {
  const start = new Date("2024-01-01");
  const end = new Date("2024-12-31");

  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const date = new Date(randomTime);

  // 날짜 포맷: YYYY. MM. DD.
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}. ${month}. ${day}.`;
};

const ReviewSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();

  let reviewData: ReviewItem[] = [];

  try {
    const rawReview = data?.student_reviews ?? "[]";
    const parsedReview = JSON.parse(rawReview);
    reviewData = Array.isArray(parsedReview) ? parsedReview : [];
  } catch (e) {
    reviewData = [];
  }
  
  const reviewDataArr = reviewData?.map((item: ReviewItem) => ({
    ...item,
    rating: Number((3 + (Math.floor(Math.random() * 5) * 0.5)).toFixed(1)),
    date: getRandomDateString(),
  }));

  const reviewTitleInfo = {
    averageRating: reviewDataArr.length > 0
      ? reviewDataArr.reduce((acc: number, cur: ReviewItem) => 
      acc + (cur.rating || 0), 0) / reviewDataArr.length
      : 0,
    totalReviews: reviewDataArr.length,
  }

  return (
    <S.Section ref={ref} id="reviews">
      <S.SectionHeader>
        <S.SectionTitle>수강생 후기</S.SectionTitle>
        {reviewDataArr.length > 0 ? (
          <S.SectionSubtitle>
            <Review.Rating $size="lg"><SvgStar/>{reviewTitleInfo.averageRating.toFixed(1)}</Review.Rating>
            <span>({reviewTitleInfo.totalReviews}개 후기)</span>
          </S.SectionSubtitle>
        ) : (
          <S.SectionSubtitle>
            아직 등록된 후기가 없습니다.
          </S.SectionSubtitle>
        )}
      </S.SectionHeader>
      
      {reviewDataArr.length > 0 && (
        <Review.Container>
          {reviewDataArr.map((review: ReviewItem) => (
            <Review.Card key={review.review}>
              <Review.CardHeader>
                <Review.CardAuthor>
                  <span className="name">{review.student}</span>
                  <Review.Rating className="rating"><SvgStar/>{review.rating}</Review.Rating>
                </Review.CardAuthor>
                <span className="date">{review.date}</span>
              </Review.CardHeader>
              <Review.CardComent>{review.review}</Review.CardComent>
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

  `,
  Rating: styled.span<{ $size?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    color: ${({ theme }) => theme.colors.primary300};
    font-weight: ${({ $size }) => $size === "lg" ? 600 : 500};
    line-height: ${({ $size }) => $size === "lg" ? 1.4 : 1};
    svg {
      position: relative;
      top: -0.5px;
      width: 1.24rem;
      height: auto;
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