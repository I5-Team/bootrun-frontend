import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockInstructorData } from '../../../data/mockLectureData';
import type { Instructor } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import { StyledBaseSection as S } from "../LectureDetailPage.styled";
import Profile from '../../../components/Profile';


const InstructorSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data, loading, error } = useApiData<Instructor>(mockInstructorData, 800);

  return (
    <S.Section ref={ref} id="instructor">
      <S.SectionHeader>
        <S.SectionTitle>강사소개</S.SectionTitle>
        <S.SectionSubtitle>
          "부트캠프 수료율 100%의 비결은 수강생을 향한 '진심'입니다."
        </S.SectionSubtitle>
      </S.SectionHeader>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <Instructor.InfoBox>
          <Profile size={24} src={data.imageUrl} alt={data.title}></Profile>

          <Instructor.ContentContainer>
            <Instructor.Header>
              <Instructor.Title>{data.title}</Instructor.Title>
              <Instructor.SubName>{data.subName}</Instructor.SubName>
            </Instructor.Header>

            <Instructor.PositionList>
              {data.positions.map(pos => (
                <li key={pos.text}>
                  <Instructor.PositionLabel $isCurrent={pos.type === 'current'}>
                    {pos.type === 'current' ? '現' : '前'}
                  </Instructor.PositionLabel>
                  <span>{pos.text}</span>
                </li>
              ))}
            </Instructor.PositionList>

            {data.experiences.map(exp => (
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
    gap: 4rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 4rem;
    width: 100%;
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
  `,
  Title: styled.p`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  `,
  SubName: styled.span`
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray300};
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
  `,
  ExperienceList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    li { 
      font-size: ${({ theme }) => theme.fontSize.md};
      color: ${({ theme }) => theme.colors.gray400};
      font-weight: 500;
    }
  `,
};

export default InstructorSection;