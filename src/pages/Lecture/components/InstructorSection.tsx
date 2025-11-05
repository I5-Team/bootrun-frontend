import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockInstructorData } from '../../../data/mockData';
import type { Instructor } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from './HelperComponents';

const InstructorSection = React.forwardRef<HTMLElement>((_, ref) => {
  const { data, loading, error } = useApiData<Instructor>(mockInstructorData, 800);

  return (
    <S.Section ref={ref} id="instructor">
      <S.SectionHeader>
        <S.SectionTitle>강사소개</S.SectionTitle>
        <S.SectionSubtitle>
          "부트캠프 수료율 100%의 비결은 
          <span className="lineBreak">수강생을 향한 '진심'입니다."</span>
        </S.SectionSubtitle>
      </S.SectionHeader>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <S.InfoBox>
          <S.ImageContainer>
            <img src={data.imageUrl} alt={data.title} />
          </S.ImageContainer>
          <S.Content>
            <S.Header>
              <S.Title>{data.title}<S.SubName>{data.subName}</S.SubName></S.Title>
            </S.Header>
            <S.PositionList>
              {data.positions.map(pos => (
                <li key={pos.text}>
                  <S.PositionLabel $isCurrent={pos.type === 'current'}>
                    {pos.type === 'current' ? '現' : '前'}
                  </S.PositionLabel>
                  <span>{pos.text}</span>
                </li>
              ))}
            </S.PositionList>
            {data.experiences.map(exp => (
              <div key={exp.title}>
                <S.ExperienceTitle>{exp.title}</S.ExperienceTitle>
                <S.ExperienceList>
                  {exp.items.map(item => <li key={item}>{item}</li>)}
                </S.ExperienceList>
              </div>
            ))}
          </S.Content>
        </S.InfoBox>
      )}
    </S.Section>
  );
});

const S = {
  Section: styled.section`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    scroll-margin-top: 100px;`, 
  SectionHeader: styled.div`
    .lineBreak { display: block; }
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,
  SectionTitle: styled.h2`
    font-weight: 700;
    font-size: 32px;
    color: #121314;
    margin: 0;
  `,
  SectionSubtitle: styled.p`
    font-weight: 600;
    font-size: 16px;
    color: #2e6ff2;
    margin: 0;
  `,
  InfoBox: styled.div`
    display: flex;
    gap: 40px;
    background: #F3F5FA;
    border-radius: 16px;
    padding: 40px;
    width: 790px;
    box-sizing: border-box;
  `,
  ImageContainer: styled.div`
    img {
      width: 240px;
      height: 240px;
      border-radius: 50%;
      object-fit: cover;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Header: styled.div``,
  Title: styled.h4`
    font-size: 24px;
    font-weight: 700;
    color: #121314;
    margin: 0;
  `,
  SubName: styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #8D9299;
    margin-left: 8px;
  `,
  PositionList: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    li { display: flex; font-size: 16px; color: #47494D; }
  `,
  PositionLabel: styled.span<{ $isCurrent: boolean }>`
    font-weight: 500;
    color: ${({ $isCurrent }) => ($isCurrent ? '#2E6FF2' : '#8D9299')};
    width: 24px;
  `,
  ExperienceTitle: styled.h5`
    font-size: 16px;
    font-weight: 700;
    color: #121314;
    margin: 0 0 8px 0;
  `,
  ExperienceList: styled.ul`
    list-style: disc;
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    li { font-size: 16px; color: #47494D; }
  `,
};

export default InstructorSection;