import styled from 'styled-components';

import { getFullImageUrl } from '../../../utils/imageUtils';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';
import { useState } from 'react';
import { SkeletonImage } from '../../../components/Skeleton';

const LectureBannerSection = () => {
  const { data } = useLectureContext();
  const { title, thumbnail_url } = data;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <S.BannerWrapper>
      <h2 className="sr-only">강의 소개 배너</h2>

      {!imgLoaded && <SkeletonImage />}
      <img
        src={getFullImageUrl(thumbnail_url)}
        alt={title}
        onLoad={() => {
          setImgLoaded(true);
        }}
        style={{ display: imgLoaded ? 'block' : 'none' }}
      />
    </S.BannerWrapper>
  );
};

const S = {
  BannerWrapper: styled.section`
    position: relative;
    width: 100%;
    height: 41.6rem;
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray200};
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
  `,
};

export default LectureBannerSection;
