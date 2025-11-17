import React from 'react';
import Instructor from '../styles/InstructorSection.styled';
import { StyledBaseSection as S } from '../styles/LectureDetailPage.styled';
import Profile from '../../../components/Profile';

import { getProfileImageUrl } from '../../../utils/imageUtils';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';

const InstructorSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data } = useLectureContext();
  const { instructor_name, instructor_bio, instructor_image, instructor_description } = data;

  return (
    <S.Section ref={ref} id="instructor">
      <S.SectionHeader>
        <S.SectionTitle>강사소개</S.SectionTitle>
        {instructor_description && (
          <S.SectionSubtitle>{instructor_description.split('.')[0]}</S.SectionSubtitle>
        )}
      </S.SectionHeader>

      <Instructor.InfoBox>
        <Profile
          size={24}
          src={getProfileImageUrl(instructor_image)}
          alt={`${instructor_name} 강사 프로필`}
        ></Profile>

        <Instructor.ContentContainer>
          <Instructor.Header>
            <Instructor.Name>{instructor_name}</Instructor.Name>
            <Instructor.SubName>{instructor_bio}</Instructor.SubName>
          </Instructor.Header>

          <Instructor.Description>{instructor_description}</Instructor.Description>
        </Instructor.ContentContainer>
      </Instructor.InfoBox>
    </S.Section>
  );
});

export default InstructorSection;
