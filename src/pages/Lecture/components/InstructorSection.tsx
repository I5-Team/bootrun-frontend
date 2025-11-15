import React from 'react';
import styled from 'styled-components';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import Profile from '../../../components/Profile';
import type { CoursesDetailItem } from '../../../types/CourseType';
import { mockInstructorData } from "../../../data/mockLectureData";
import { getProfileImageUrl } from '../../../utils/imageUtils';

type InstructorSectionProps = {
  data: CoursesDetailItem;
}

const InstructorSection = React.forwardRef<HTMLElement, InstructorSectionProps>(({ data }, ref) => {
  const { instructor_name, instructor_bio, instructor_image } = data;
  const mockData = mockInstructorData;

  return (
    <S.Section ref={ref} id="instructor">
      <S.SectionHeader>
        <S.SectionTitle>강사소개</S.SectionTitle>
        <S.SectionSubtitle>
          "부트캠프 수료율 100%의 비결은 수강생을 향한 '진심'입니다."
        </S.SectionSubtitle>
      </S.SectionHeader>

      {data && (
        <Instructor.InfoBox>
          <Profile size={24} src={getProfileImageUrl(instructor_image)} alt={`${instructor_name} 강사 프로필`}></Profile>

          <Instructor.ContentContainer>
            <Instructor.Header>
              <Instructor.Name>{instructor_name}</Instructor.Name>
              <Instructor.SubName>{instructor_bio}</Instructor.SubName>
            </Instructor.Header>

            {/* 임시 데이터로 대체 */}
            <Instructor.PositionList>
              {mockData.positions.map(pos => (
                <li key={pos.text}>
                  <Instructor.PositionLabel $isCurrent={pos.type === 'current'}>
                    {pos.type === 'current' ? '現' : '前'}
                  </Instructor.PositionLabel>
                  <span>{pos.text}</span>
                </li>
              ))}
            </Instructor.PositionList>

            {/* 임시 데이터로 대체 */}    
            {mockData.experiences.map(exp => (
              <div key={exp.title}>
                <Instructor.ExperienceTitle>[{exp.title}]</Instructor.ExperienceTitle>
                <Instructor.ExperienceList>
                  {exp.items.map(item => <li key={item}>{item}</li>)}
                </Instructor.ExperienceList>
              </div>
            ))}
          </Instructor.ContentContainer>

        </Instructor.InfoBox>
      )}
    </S.Section>
  );
});

const Instructor = {
  InfoBox: styled.div`
    display: flex;
    justify-content: center;
    gap: 2.4rem 4rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 4rem;
    width: 100%;

    img {
      width: clamp(17rem, 30%, 24rem);
      height: clamp(17rem, 30%, 24rem);
    }

    @media ${({ theme }) => theme.devices.tablet} {
      padding: 3.2rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      gap: 0.8rem;
    }
  `,
  Name: styled.p`
    white-space: nowrap;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  `,
  SubName: styled.span`
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};

    @media ${({ theme }) => theme.devices.tablet} {
      width: 75%;
      text-align: center;
    }
  `,
  PositionList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    li { 
      display: flex; 
      color: ${({ theme }) => theme.colors.gray400}; 
      font-weight: 500;
    }
    
    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  PositionLabel: styled.span<{ $isCurrent: boolean }>`
    font-weight: 500;
    color: ${({ $isCurrent, theme }) => ($isCurrent ? theme.colors.primary300 : theme.colors.gray300)};
    width: 2.4rem;
  `,
  ExperienceTitle: styled.p`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
    margin-bottom: 0.8rem;

    @media ${({ theme }) => theme.devices.mobile} {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `,
  ExperienceList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    li { 
      font-size: ${({ theme }) => theme.fontSize.md};
      color: ${({ theme }) => theme.colors.gray400};
      font-weight: 500;

      @media ${({ theme }) => theme.devices.mobile} {
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
    }
  `,
};

export default InstructorSection;