import React from 'react';
import Intro from '../styles/LectureIntroSection.styled';
import { StyledBaseSection as S } from '../styles/LectureDetailPage.styled';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';

const LectureIntroSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  return (
    <Intro.Section ref={ref} id="description">
      <S.SectionTitle className="sr-only">강의 소개</S.SectionTitle>

      <Intro.Title>{data.title}</Intro.Title>
      <Intro.Desc>{data.description}</Intro.Desc>
    </Intro.Section>
  );
});

export default LectureIntroSection;
