import styled from 'styled-components';
import type { CoursesDetailItem } from '../../../types/CourseType';

const LectureBannerSection = ({ data }: { data: CoursesDetailItem}) => {
  const { title, thumbnail_url } = data;

  return (
    <S.BannerWrapper>
      <h2 className="sr-only">강의 소개 배너</h2>
      {data && (
        <img alt={title} src={thumbnail_url} />
      )}
    </S.BannerWrapper>
  );
};

const S = {
  BannerWrapper: styled.section`
    width: 100%;
    /* 로딩 중에도 레이아웃이 밀리지 않도록 높이를 지정합니다. */
    height: 41.6rem; 
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray200}; // 로딩 중 배경색
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 6rem;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media ${({ theme }) => theme.devices.tablet} {
      margin-top: 2.4rem;
      aspect-ratio: 342 / 180;
      height: auto;
    }
  `
};

export default LectureBannerSection;