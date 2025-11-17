import S from '../styles/LectureBannerSection.styled';
import { getThumbnailUrl } from '../../../utils/imageUtils';
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
        src={getThumbnailUrl(thumbnail_url)}
        alt={title}
        onLoad={() => {
          setImgLoaded(true);
        }}
        style={{ display: imgLoaded ? 'block' : 'none' }}
      />
    </S.BannerWrapper>
  );
};

export default LectureBannerSection;
