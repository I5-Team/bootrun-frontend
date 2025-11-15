import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';
import SvgProfileImage from '../../assets/images/profile-user-default.png';
import { useProfile, useUpdateProfile, useUploadProfileImage } from '../../queries/useUserQueries';
import type { ProfileUpdatePayload } from '../../types/UserType';

const ProfilePage: React.FC = () => {
  const { data, isLoading, isError } = useProfile(); // 내 프로필 정보 조회 쿼리 훅
  console.log('ProfilePage data:', data);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadProfileImage, isPending: isUploadingImage } = useUploadProfileImage();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('none');
  const [birthdate, setBirthdate] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // 숨겨진 input 제어

  useEffect(() => {
    if (data) {
      // 프로필 데이터가 로드되면 상태 초기화
      setName(data.nickname || '');
      setGender(data.gender || 'none');
      setBirthdate(data.birth_date || '');
      setImagePreview(data.profile_image_url || null);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정하기:', { name, gender, birthdate, selectedFile });
    // TODO: 프로필 수정 API 호출
    // 1. 변경된 텍스트 정보가 있는지 확인
    const payload: ProfileUpdatePayload = {};
    if (data?.nickname !== name) payload.nickname = name;
    if (data?.gender !== gender) payload.gender = gender;
    if (data?.birth_date !== birthdate) payload.birth_date = birthdate;

    const didTextChange = Object.keys(payload).length > 0;

    // 2. 텍스트 정보가 변경되었다면, 텍스트 수정 API 호출
    if (didTextChange) {
      updateProfile(payload);
    }

    // 3. 새로운 이미지 파일이 선택되었다면, 이미지 업로드 API 호출
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      uploadProfileImage(formData);
    }

    // 4. 아무것도 변경되지 않았을 경우
    if (!didTextChange && !selectedFile) {
      alert('변경된 내용이 없습니다.');
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 클릭
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // API 전송용
      setImagePreview(URL.createObjectURL(file)); // 프리뷰용
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="프로필 정보를 불러오는 중 오류가 발생했습니다." />;
  if (!data) return null;

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Title as="h2">프로필 설정</S.Title>
      <S.Container>
        <S.ProfileContainer>
          <S.ImageWrapper>
            <S.ImagePreview>
              {imagePreview ? (
                <img src={imagePreview} alt="현재 프로필 이미지" />
              ) : (
                <img src={SvgProfileImage} alt="기본 프로필 이미지" />
              )}
            </S.ImagePreview>
            <S.ImageUploadButton
              type="button"
              onClick={handleImageUploadClick}
              aria-label="프로필 이미지 변경"
            >
              +
            </S.ImageUploadButton>
          </S.ImageWrapper>

          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
            aria-hidden="true"
          />
        </S.ProfileContainer>

        <S.FormContent>
          <S.FormGroup>
            <label htmlFor="name">이름</label>
            <S.Input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </S.FormGroup>
          <S.FormRow>
            <S.FormGroup>
              <label htmlFor="gender">성별</label>
              <S.Select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="none">선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </S.Select>
            </S.FormGroup>
            <S.FormGroup>
              <label htmlFor="birthdate">생년월일</label>

              <S.Input
                id="birthdate"
                type="date"
                name="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                aria-label="생년월일 입력"
              />
            </S.FormGroup>
          </S.FormRow>
        </S.FormContent>
      </S.Container>

      <S.SubmitButtonWrapper>
        <S.SubmitButton type="submit" disabled={isUpdating || isUploadingImage}>
          수정하기
        </S.SubmitButton>
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
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.05);
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
  ImageWrapper: styled.div`
    position: relative; /* ◀ 버튼의 기준점이 됨 */
    width: 12rem;
    height: 12rem;
  `,
  ImagePreview: styled.div`
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray100};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  ImagePlaceholder: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.gray300};
    border-radius: 50%;
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
    border: 2px solid ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.6rem;
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

    input,
    select {
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

    input[type='text'] {
      border-color: ${({ theme }) => theme.colors.primary300};
    }
  `,
  Input: styled.input`
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fontSize.md};
    min-width: auto;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &[type='text'] {
      border-color: ${({ theme }) => theme.colors.primary300};
    }
  `,
  Select: styled.select`
    height: 4.8rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fontSize.md};
    background: white;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
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

    &:hover {
      opacity: 0.9;
    }
  `,
};

export default ProfilePage;
