import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockHeaderData } from '../../../data/mockData';
import type { LectureHeaderData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from './HelperComponents';

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
          {tags.map(tag => (
            <S.Tag key={tag} $dark={tag.includes("커뮤니티")}>{tag}</S.Tag>
          ))}
        </S.TagContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.LectureInfo>
      
      <S.InstructorContainer>
        <S.Profile>
          <S.ProfileImage src={instructor.imageUrl} alt={instructor.name} />
          <S.ProfileInfo>
            <S.ProfileName>{instructor.name}</S.ProfileName>
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
    width: 790px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
  LectureInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  TagContainer: styled.div`
    display: flex;
    gap: 8px;
  `,
  Tag: styled.div<{ $dark?: boolean }>`
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    background: ${({ $dark }) => ($dark ? '#47494D' : '#DEE8FF')};
    color: ${({ $dark }) => ($dark ? '#FFFFFF' : '#2E6FF2')};
  `,
  Title: styled.h3`
    font-size: 40px;
    font-weight: 700;
    color: #121314;
    margin: 0;
  `,
  Description: styled.p`
    font-size: 16px;
    color: #47494D;
    margin: 0;
  `,
  InstructorContainer: styled.div`
    display: flex;
  `,
  Profile: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  ProfileImage: styled.img`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid #D9DBE0;
    object-fit: cover;
  `,
  ProfileInfo: styled.div``,
  ProfileName: styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #121314;
    margin: 0;
  `,
  ProfileRole: styled.p`
    font-size: 14px;
    color: #47494D;
    margin: 0;
  `,
  ScheduleContainer: styled.div`
    background: #F3F5FA;
    border-radius: 12px;
    padding: 32px;
    
    strong {
      font-size: 18px;
      font-weight: 700;
      color: #121314;
      display: block;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 12px 0 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    li {
      display: flex;
      font-size: 16px;
      font-weight: 500;
      color: #121314;
    }
  `,
  ScheduleLabel: styled.span`
    color: #8D9299;
    width: 80px;
    flex-shrink: 0;
  `,
};

export default LectureHeaderSection;