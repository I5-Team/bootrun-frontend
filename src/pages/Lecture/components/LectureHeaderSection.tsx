import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockHeaderData } from '../../../data/mockLectureData';
import type { LectureHeaderData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from '../../../components/HelperComponents';
import Tag from '../../../components/Tag';
import Profile from '../../../components/Profile';

const LectureHeaderSection: React.FC = () => {
  const { data, loading, error } = useApiData<LectureHeaderData>(mockHeaderData, 300);

  if (loading) return <S.HeaderWrapper><LoadingSpinner /></S.HeaderWrapper>;
  if (error) return <S.HeaderWrapper><ErrorMessage message={error.message} /></S.HeaderWrapper>;
  if (!data) return null;

  const { tags, title, description, instructor, schedule } = data;

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
          <Profile size={4.6} src={instructor.imageUrl} alt={`${instructor.name} 강사 프로필`} />
          <S.ProfileInfo>
            <S.ProfileName>{instructor.name} 강사님</S.ProfileName>
            <S.ProfileRole>{instructor.role}</S.ProfileRole>
          </S.ProfileInfo>
        </S.Profile>
      </S.InstructorContainer>
      
      <S.ScheduleContainer>
        <strong>교육 일정</strong>
        <ul>
          {schedule.map(item => (
            <li key={item.label}>
              <S.ScheduleLabel>{item.label}</S.ScheduleLabel>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </S.ScheduleContainer>
    </S.HeaderWrapper>
  );
};

const S = {
  HeaderWrapper: styled.section`
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
    gap: 8px;
  `,
  Title: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xxl};
    line-height: 5.6rem;
    font-weight: 700;
  `,
  Description: styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray400};
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
    li {
      display: flex;
      line-height: 2.2rem;
      font-size: 1.6rem;
      font-weight: 500;
      color: #121314;
    }
  `,
  ScheduleLabel: styled.span`
    color: ${({ theme }) => theme.colors.gray300};
    width: 8rem;
    flex-shrink: 0;
  `,
};

export default LectureHeaderSection;