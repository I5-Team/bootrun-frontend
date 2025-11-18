import S from '../styles/LectureHeaderSection.styled';
import Tag from '../../../components/Tag';
import Profile from '../../../components/Profile';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { InfoBoxContent } from './LectureInfoBox';
import { categoryLabel, courseTypeLabel, difficultyLabel } from '../../../types/CourseType';
import { formatDate } from '../pages/LectureDetailPage';
import { useLectureContext } from '../../../layouts/LectureDetailLayout';
import { getFullImageUrl } from '../../../utils/imageUtils';

const LectureHeaderSection = () => {
  const { data } = useLectureContext();

  const { isLaptop } = useMediaQuery();
  const { category_type, course_type, difficulty } = data;
  const { title, description } = data;
  const { instructor_name, instructor_bio, instructor_image } = data;
  const { recruitment_start_date, recruitment_end_date, course_start_date, course_end_date } = data;

  const tags = [
    courseTypeLabel[course_type],
    categoryLabel[category_type],
    difficultyLabel[difficulty],
  ];

  return (
    <S.HeaderWrapper>
      <h2 className="sr-only">강의 개요</h2>
      <S.LectureInfo>
        <S.TagList aria-label="강의 태그">
          {tags.map((tag, index) => (
            <li key={tag}>
              <Tag variant={index === 0 ? 'dark' : 'light'}>{tag}</Tag>
            </li>
          ))}
        </S.TagList>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.LectureInfo>

      <S.InstructorContainer>
        <S.Profile>
          <Profile size={4.6} src={getFullImageUrl(instructor_image)} alt={`${instructor_name} 강사 프로필`} />
          <S.ProfileInfo>
            <S.ProfileName>{instructor_name} 강사님</S.ProfileName>
            <S.ProfileRole>{instructor_bio}</S.ProfileRole>
          </S.ProfileInfo>
        </S.Profile>
      </S.InstructorContainer>

      {isLaptop && <InfoBoxContent />}

      <S.ScheduleContainer>
        <S.ScheduleTitle>교육 일정</S.ScheduleTitle>
        <S.ScheduleList>
          {recruitment_start_date && recruitment_end_date && (
            <S.ScheduleItem>
              <S.ScheduleLabel>모집 기간</S.ScheduleLabel>
              <dd>
                {formatDate(recruitment_start_date)} ~ {formatDate(recruitment_end_date)}
              </dd>
            </S.ScheduleItem>
          )}

          {course_start_date && course_end_date && (
            <S.ScheduleItem>
              <S.ScheduleLabel>교육 기간</S.ScheduleLabel>
              <dd>
                {formatDate(course_start_date)} ~ {formatDate(course_end_date)}
              </dd>
            </S.ScheduleItem>
          )}
        </S.ScheduleList>
      </S.ScheduleContainer>
    </S.HeaderWrapper>
  );
};

export default LectureHeaderSection;
