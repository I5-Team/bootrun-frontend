import styled from 'styled-components';
import Tag from '../../../components/Tag';
import Profile from '../../../components/Profile';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { InfoBoxContent } from './LectureInfoBox';
import { categoryLabel, courseTypeLabel, difficultyLabel } from '../../../types/CourseType';
import { formatDate, useLectureContext } from '../LectureDetailPage';

const LectureHeaderSection = () => {
  const { data } = useLectureContext()

  const { isLaptop } = useMediaQuery();
  const { category_type, course_type, difficulty } = data;
  const { title, description } = data;
  const { instructor_name, instructor_bio, instructor_image } = data;
  const { recruitment_start_date, recruitment_end_date, course_start_date, course_end_date } = data;

  const tags = [courseTypeLabel[course_type], categoryLabel[category_type], difficultyLabel[difficulty]];
  
  return (
    <S.HeaderWrapper>
      <S.LectureInfo>
        <S.TagContainer>
          {tags.map((tag, index) => (
            <Tag key={tag} variant={index === 0 ? 'dark' : 'light'}>
              {tag}
            </Tag>
          ))}
        </S.TagContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.LectureInfo>
      
      <S.InstructorContainer>
        <S.Profile>
          <Profile size={4.6} src={instructor_image} alt={`${instructor_name} 강사 프로필`} />
          <S.ProfileInfo>
            <S.ProfileName>{instructor_name} 강사님</S.ProfileName>
            <S.ProfileRole>{instructor_bio}</S.ProfileRole>
          </S.ProfileInfo>
        </S.Profile>
      </S.InstructorContainer>

      {isLaptop && <InfoBoxContent/>}
          
      <S.ScheduleContainer>
        <strong>교육 일정</strong>
        {data && 
        <ul>
          {(recruitment_start_date && recruitment_end_date) && (
            <S.ScheduleItem>
              <S.ScheduleLabel>모집 기간</S.ScheduleLabel>
              <span>{formatDate(recruitment_start_date)} ~ {formatDate(recruitment_end_date)}</span>
            </S.ScheduleItem>
          )}

          {(course_start_date && course_end_date) && (
            <S.ScheduleItem>
              <S.ScheduleLabel>교육 기간</S.ScheduleLabel>
              <span>{formatDate(course_start_date)} ~ {formatDate(course_end_date)}</span>
            </S.ScheduleItem>
          )}

        </ul>
        }
      </S.ScheduleContainer>

    </S.HeaderWrapper>
  );
};

const S = {
  HeaderWrapper: styled.section`
    grid-area: header;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `,
  LectureInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  TagContainer: styled.div`
    display: flex;
    gap: 0.8rem;
  `,
  Title: styled.h2`
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.xxl};
    line-height: 1.4;
    font-weight: 700;

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.colors.gray400};
    word-break: keep-all;
    width: 90%;
    line-height: 1.4;
  `,
  InstructorContainer: styled.div`
    display: flex;
  `,
  Profile: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  ProfileInfo: styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 0.4rem;
  `,
  ProfileName: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 600;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.surface};
  `,
  ProfileRole: styled.p`
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray400};
  `,
  ScheduleContainer: styled.div`
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: 3.2rem;
    
    strong {
      display: block;
      line-height: 2.4rem;
      font-size: ${({ theme }) => theme.mobileFontSize.xl};
      font-weight: 700;
      color: ${({ theme }) => theme.colors.surface};
      margin-bottom: 1.2rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  `,
  ScheduleItem: styled.li`
      display: flex;
      line-height: 2.2rem;
      font-size: 1.6rem;
      font-weight: 500;
      flex-wrap: wrap;
      gap: 0.8rem 0;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  ScheduleLabel: styled.span`
    color: ${({ theme }) => theme.colors.gray300};
    width: 8rem;
    flex-shrink: 0;
  `,
};

export default LectureHeaderSection;