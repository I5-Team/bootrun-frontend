import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApiData } from '../../hooks/useApiData';
import { mockProfileData } from '../../data/mockMyPageData';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';


const ProfilePage: React.FC = () => {
  const { data, loading, error } = useApiData(mockProfileData, 500);
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState('none');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name);
      setGender(data.gender);
      setBirthdate(data.birthdate);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("수정하기:", { name, gender, birthdate });
    // TODO: 프로필 수정 API 호출
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Title>프로필 설정</S.Title>
      <S.Container>
        <S.ProfileContainer>
          <S.ImagePreview>
            <img src={data.profileImageUrl} alt="프로필" />
            <S.ImageUploadButton type="button">
              {/* <CameraIcon /> */} 📷
            </S.ImageUploadButton>
          </S.ImagePreview>
        </S.ProfileContainer>
        
        <S.FormContent>
          <S.FormGroup>
            <label htmlFor="name">이름</label>
            <input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </S.FormGroup>
          <S.FormRow>
            <S.FormGroup>
              <label htmlFor="gender">성별</label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="none">선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </S.FormGroup>
            <S.FormGroup>
              <label htmlFor="birthdate">생년월일</label>

        <S.Input
          id="start-date-filter"
          type="date"
          name="start_date"
          value={birthdate}
          onChange={
            (e) => setBirthdate(e.target.value)
          }
          aria-label="시작일 필터"
        />
            </S.FormGroup>
          </S.FormRow>
        </S.FormContent>
      </S.Container>
      
      <S.SubmitButtonWrapper>
        <S.SubmitButton type="submit">수정하기</S.SubmitButton>
      </S.SubmitButtonWrapper>
    </S.Form>
  );
};

// --- Styles (시안 반영, rem/theme 적용) ---
const S = {
  Form: styled.form`
    width: 100%;
    max-width: 72rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.lg}; /* 1.2rem */
    box-shadow: 0 0.4rem 1.2rem rgba(0,0,0,0.05);
  `,
  Title: styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    padding: 2.4rem;
    margin: 0;
  `,
  Container: styled.div`
    display: flex;
    gap: 3.2rem;
    padding: 2.4rem;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  `,
  ProfileContainer: styled.div`
    flex-shrink: 0;
  `,
  ImagePreview: styled.div`
    position: relative;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray100};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    img { ... }
  `,
  ImageUploadButton: styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray400};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  FormContent: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  FormRow: styled.div`
    display: flex;
    gap: 2rem;
  `,
  FormGroup: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    label {
      font-size: ${({ theme }) => theme.fontSize.sm}; /* 1.4rem */
      font-weight: 500;
    }
    
    input, select {
      height: 4.8rem;
      padding: 0 1.6rem;
      border: 1px solid ${({ theme }) => theme.colors.gray200};
      border-radius: ${({ theme }) => theme.radius.md}; /* 0.8rem */
      font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary300};
        outline: none;
      }
    }
    
    input[type="text"] {
      border-color: ${({ theme }) => theme.colors.primary300};
    }
  `,
  Input: styled.input`
    height: 4.2rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    min-width: 20rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  DateInputWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    
    input {
      width: 100%;
      padding-right: 4rem;
    }
    
    svg, span { /* (임시 span) */
      position: absolute;
      right: 1.2rem;
      color: ${({ theme }) => theme.colors.gray300};
    }
  `,
  SubmitButtonWrapper: styled.div`
    padding: 2.4rem;
    display: flex;
    justify-content: flex-end;
  `,
  SubmitButton: styled.button`
    padding: 1.4rem 2.4rem;
    font-size: ${({ theme }) => theme.fontSize.md}; /* 1.6rem */
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary300};
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    cursor: pointer;
    
    &:hover { opacity: 0.9; }
  `,
};

export default ProfilePage;
