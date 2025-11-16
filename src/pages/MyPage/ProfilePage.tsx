import React, { useState, useEffect, useRef } from 'react';
import { LoadingSpinner, ErrorMessage } from '../../components/HelperComponents';
import SvgProfileImage from '../../assets/images/profile-user-default.png';
import {
  useDeleteProfileImage,
  useProfile,
  useUpdateProfile,
  useUploadProfileImage,
} from '../../queries/useUserQueries';
import SvgImage from "../../assets/icons/icon-image.svg?react";
import type { ProfileUpdatePayload } from '../../types/UserType';
import {
  Container,
  Form,
  FormContent,
  FormGroup,
  FormRow,
  ImagePreview,
  ImageActionButton,
  ImageWrapper,
  Input,
  ProfileContainer,
  Select,
  SubmitButton,
  SubmitButtonWrapper,
  Title,
} from './ProfilePage.styled';
import styled from 'styled-components';
import Button from '../../components/Button';
import Profile from '../../components/Profile';
import MyPage from './MyPage.styled';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfilePage: React.FC = () => {
  const { data, isLoading, isError } = useProfile(); // 내 프로필 정보 조회 쿼리 훅
  console.log('ProfilePage data:', data);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadProfileImage, isPending: isUploadingImage } = useUploadProfileImage();
  const { mutate: deleteProfileImage, isPending: isDeletingImage } = useDeleteProfileImage();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('none');
  const [birthdate, setBirthdate] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // 숨겨진 input 제어

  useEffect(() => {
    if (data) {
      // 프로필 데이터가 로드되면 상태 초기화
      setNickname(data.nickname || '');
      setGender(data.gender || 'none');
      setBirthdate(data.birth_date || '');
      const fullImageUrl = data.profile_image ? API_BASE_URL + data.profile_image : null;
      console.log('fullImageUrl:', fullImageUrl);

      if (!selectedFile) {
        setImagePreview(fullImageUrl);
      }
    }
  }, [data, selectedFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('수정하기:', { name, gender, birthdate, selectedFile });
    // TODO: 프로필 수정 API 호출
    // 1. 변경된 텍스트 정보가 있는지 확인
    const payload: ProfileUpdatePayload = {};
    if (data?.nickname !== nickname) payload.nickname = nickname;
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
      uploadProfileImage(formData, {
        onSuccess: () => {
          // 업로드 성공 시 선택된 파일 초기화
          setSelectedFile(null);
        },
      });
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
  const handleClearImage = () => {
    if (selectedFile) {
      // 1. 로컬에서 선택한 파일(blob:)을 '취소'할 때
      setSelectedFile(null);
      // 원래 서버 이미지 (있다면) 또는 기본 이미지로 되돌림
      const originalServerImage = data?.profile_image
        ? `${API_BASE_URL}${data.profile_image}`
        : null;
      setImagePreview(originalServerImage);
      if (fileInputRef.current) fileInputRef.current.value = ''; // input DOM 초기화
    } else if (data?.profile_image) {
      // 2. 서버에 저장된 이미지를 '삭제'할 때 (API 호출)
      if (window.confirm('프로필 이미지를 삭제하시겠습니까?')) {
        deleteProfileImage(undefined, {
          onSuccess: () => {
            setImagePreview(null);
            setSelectedFile(null);
          },
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="프로필 정보를 불러오는 중 오류가 발생했습니다." />;
  if (!data) return null;

  const isPending = isUpdating || isUploadingImage || isDeletingImage;

  return (
    <MyPage.Form onSubmit={handleSubmit}>
      <MyPage.Container>
        <MyPage.Title as="h2">프로필 설정</MyPage.Title>
        <S.ProfileFormContainer>
          <S.ProfileContainer>
            {imagePreview ? (
              <Profile size={14.6} src={imagePreview} alt="현재 프로필 이미지"/>
            ) : (
              <Profile size={14.6} src={SvgProfileImage}  alt="기본 프로필 이미지"/>
            )}
            {/* ⭐️ (수정) 조건부 버튼 렌더링 */}
            {imagePreview ? (
              // 1. 이미지가 있으면 (서버/로컬) -> '삭제/취소' 버튼 (X)
              <ImageActionButton
                type="button"
                onClick={handleClearImage}
                aria-label="이미지 제거"
                disabled={isPending}
                $isDelete={true}
              >
                x
              </ImageActionButton>
            ) : (
              // 2. 이미지가 없으면 -> '업로드' 버튼 (+)
              <ImageActionButton
                type="button"
                onClick={handleImageUploadClick}
                aria-label="프로필 이미지 변경"
                disabled={isPending}
                $isDelete={false}
              >
                +
              </ImageActionButton>
            )}
            {/* <S.ImageUploadButton
              type="button"
              onClick={handleImageUploadClick}
              aria-label="프로필 이미지 변경"
            >
              <SvgImage/>
            </S.ImageUploadButton> */}
  
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
              <label htmlFor="nickname">닉네임</label>
              <MyPage.Input
                id="nickname"
                type="text"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </S.FormGroup>
            <S.FormRow>
              <S.FormGroup>
                <label htmlFor="gender">성별</label>
                <MyPage.Select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="none">선택</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </MyPage.Select>
              </S.FormGroup>
              <S.FormGroup>
                <label htmlFor="birthdate">생년월일</label>
                <MyPage.Input
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
        </S.ProfileFormContainer>
      </MyPage.Container>

      <S.SubmitButtonWrapper>
        <Button 
          fullWidth
          size="md"
          type="submit"
          disabled={isPending}
        >
          수정하기
        </Button>
      </S.SubmitButtonWrapper>
    </MyPage.Form>
  );
};

// --- Styles (시안 반영, rem/theme 적용) ---
const S = {
  ProfileFormContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: clamp(2.4rem, 4vw, 5.2rem);

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,

  ProfileContainer: styled.div`
    flex-shrink: 0;
    position: relative; /* ◀ 버튼의 기준점이 됨 */
    width: 14.6rem;
    height: 14.6rem;

  `,
  ImageUploadButton: styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 4.6rem;
    height: 4.6rem;
    padding: 1.2rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray400};
    color: ${({ theme }) => theme.colors.white};

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  `,
  FormContent: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  FormRow: styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.tablet} {
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  `,
  FormGroup: styled.div`
    flex-grow: 1;
    min-width: 16.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    label {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: 700;
    }

    @media ${({ theme }) => theme.devices.mobile} {
      width: 100%;
    }
  `,
  SubmitButtonWrapper: styled.div`
    width: 24rem;
  `,
};

export default ProfilePage;
