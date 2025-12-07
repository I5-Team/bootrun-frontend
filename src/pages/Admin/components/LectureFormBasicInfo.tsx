/**
 * 강의 폼 - Step 1: 기본 정보
 */
import React, { useState } from 'react';
import type { FaqItem } from '../../../types/AdminCourseType';
import { uploadImage, validateImage } from '../../../api/storageApi';
import S from '../styles/LectureFormBasicInfo.styled.ts';

interface BasicInfoType {
  title: string;
  description: string;
  category_type: string;
  course_type: string;
  difficulty: string;
  price_type: string;
  price: number;
  thumbnail_url: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_description: string;
  instructor_image: string;
  // 수강 관련
  access_duration_days: number;
  max_students: number;
  recruitment_start_date: string;
  recruitment_end_date: string;
  course_start_date: string;
  course_end_date: string;
  // 기타
  student_reviews: string;
  is_published: boolean;
}

interface LectureFormBasicInfoProps {
  basicInfo: BasicInfoType;
  onChange: (field: string, value: string | number | boolean) => void;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  disabled?: boolean;
}

const LectureFormBasicInfo: React.FC<LectureFormBasicInfoProps> = ({
  basicInfo,
  onChange,
  faqs,
  setFaqs,
  disabled = false,
}) => {
  // 썸네일 이미지 업로드
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;
    try {
      setIsUploadingThumbnail(true);
      const url = await uploadImage(file);
      onChange('thumbnail_url', url);
      alert('강의 썸네일 이미지 업로드가 완료되었습니다!');
    } catch (error) {
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      console.error('이미지 업로드 실패: ', error);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // 강사 이미지 업로드
  const [isUploadingInstructorImage, setIsUploadingInstructorImage] = useState(false);

  const handleInstructorImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;
    try {
      setIsUploadingInstructorImage(true);
      const url = await uploadImage(file);
      onChange('instructor_image', url);
      alert('강사 이미지 업로드가 완료되었습니다!');
    } catch (error) {
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      console.error('이미지 업로드 실패: ', error);
    } finally {
      setIsUploadingInstructorImage(false);
    }
  };

  // FAQ 추가
  const handleAddFaq = (): void => {
    setFaqs((prev) => [...prev, { question: '', answer: '' }]);
  };

  // FAQ 삭제
  const handleRemoveFaq = (index: number): void => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQ 수정
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string): void => {
    setFaqs((prev) => prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)));
  };

  return (
    <S.FormContainer>
      {/* 강의 정보 섹션 */}
      <S.SectionBox>
        <S.SectionTitle>강의 정보</S.SectionTitle>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="title">
              강의 제목 <S.Required>*</S.Required>
            </S.Label>
            <S.Input
              id="title"
              type="text"
              value={basicInfo.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('title', event.target.value)
              }
              placeholder="강의 제목을 입력하세요"
              disabled={disabled}
              required
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="description">
              강의 설명 <S.Required>*</S.Required>
            </S.Label>
            <S.Textarea
              id="description"
              value={basicInfo.description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange('description', event.target.value)
              }
              placeholder="강의 설명을 입력하세요"
              rows={4}
              disabled={disabled}
              required
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="category_type">카테고리</S.Label>
            <S.Select
              id="category_type"
              value={basicInfo.category_type}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                onChange('category_type', event.target.value)
              }
              disabled={disabled}
            >
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="data_analysis">데이터 분석</option>
              <option value="ai">AI</option>
              <option value="design">디자인</option>
              <option value="other">기타</option>
            </S.Select>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="course_type">강의 유형</S.Label>
            <S.Select
              id="course_type"
              value={basicInfo.course_type}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                onChange('course_type', event.target.value)
              }
              disabled={disabled}
            >
              <option value="vod">온디맨드 (VOD)</option>
              <option value="boost_community">부스트커뮤니티</option>
              <option value="kdc">국비지원 (KDC)</option>
            </S.Select>
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="difficulty">난이도</S.Label>
            <S.Select
              id="difficulty"
              value={basicInfo.difficulty}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                onChange('difficulty', event.target.value)
              }
              disabled={disabled}
            >
              <option value="beginner">초급</option>
              <option value="intermediate">중급</option>
              <option value="advanced">고급</option>
            </S.Select>
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="price_type">가격 유형</S.Label>
            <S.Select
              id="price_type"
              value={basicInfo.price_type}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                onChange('price_type', event.target.value)
              }
              disabled={disabled}
            >
              <option value="free">무료</option>
              <option value="paid">유료</option>
              <option value="national_support">국비지원</option>
            </S.Select>
          </S.FormGroup>

          {basicInfo.price_type === 'paid' && (
            <S.FormGroup>
              <S.Label htmlFor="price">가격 (원)</S.Label>
              <S.Input
                id="price"
                type="number"
                value={basicInfo.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onChange('price', Number(event.target.value))
                }
                min="0"
                step="1000"
                disabled={disabled}
              />
            </S.FormGroup>
          )}
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="thumbnail_url">
              썸네일 이미지
              <S.LabelDescription>* 최대 10MB, JPEG, PNG, GIF, WEBP 형식 지원</S.LabelDescription>
            </S.Label>

            <S.FileInput
              id="thumbnail_url"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleThumbnailUpload}
              disabled={isUploadingThumbnail}
            />
            {isUploadingThumbnail && <S.LoadingText>이미지를 업로드 중입니다...</S.LoadingText>}
            {basicInfo.thumbnail_url && !isUploadingThumbnail && (
              <S.PreviewContainer>
                <S.PreviewImage src={basicInfo.thumbnail_url} alt="썸네일 미리보기" />
                <S.SuccessText>✓ 업로드 완료</S.SuccessText>
              </S.PreviewContainer>
            )}
          </S.FormGroup>
        </S.FormRow>
      </S.SectionBox>

      {/* 강사 정보 섹션 */}
      <S.SectionBox>
        <S.SectionTitle>강사 정보</S.SectionTitle>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="instructor_name">
              강사명 <S.Required>*</S.Required>
            </S.Label>
            <S.Input
              id="instructor_name"
              type="text"
              value={basicInfo.instructor_name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('instructor_name', event.target.value)
              }
              placeholder="강사명을 입력하세요"
              disabled={disabled}
              required
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="instructor_bio">강사 소개 (짧은 설명)</S.Label>
            <S.Input
              id="instructor_bio"
              type="text"
              value={basicInfo.instructor_bio}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('instructor_bio', event.target.value)
              }
              placeholder="예: 10년차 프론트엔드 개발자"
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="instructor_description">강사 상세 설명</S.Label>
            <S.Textarea
              id="instructor_description"
              value={basicInfo.instructor_description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange('instructor_description', event.target.value)
              }
              placeholder="강사의 경력, 전문 분야 등을 자세히 입력하세요"
              rows={4}
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="instructor_image">
              강사 프로필 이미지
              <S.LabelDescription>* 최대 10MB, JPEG, PNG, GIF, WEBP 형식 지원</S.LabelDescription>
            </S.Label>

            <S.FileInput
              id="instructor_image"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleInstructorImageUpload}
              disabled={isUploadingInstructorImage}
            />
            {isUploadingInstructorImage && (
              <S.LoadingText>이미지를 업로드 중입니다...</S.LoadingText>
            )}
            {basicInfo.instructor_image && !isUploadingInstructorImage && (
              <S.PreviewContainer>
                <S.PreviewImage
                  src={basicInfo.instructor_image}
                  alt="강사 프로필 이미지 미리보기"
                />
                <S.SuccessText>✓ 업로드 완료</S.SuccessText>
              </S.PreviewContainer>
            )}
          </S.FormGroup>
        </S.FormRow>
      </S.SectionBox>

      {/* 수강 관련 섹션 */}
      <S.SectionBox>
        <S.SectionTitle>수강 설정</S.SectionTitle>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="access_duration_days">수강 기한 (일)</S.Label>
            <S.Input
              id="access_duration_days"
              type="number"
              min="1"
              value={basicInfo.access_duration_days}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('access_duration_days', parseInt(event.target.value) || 365)
              }
              placeholder="365"
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="max_students">모집 인원</S.Label>
            <S.Input
              id="max_students"
              type="number"
              min="0"
              value={basicInfo.max_students}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('max_students', parseInt(event.target.value) || 0)
              }
              placeholder="0 = 무제한"
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="recruitment_start_date">모집 시작일</S.Label>
            <S.Input
              id="recruitment_start_date"
              type="datetime-local"
              value={basicInfo.recruitment_start_date}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('recruitment_start_date', event.target.value)
              }
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="recruitment_end_date">모집 종료일</S.Label>
            <S.Input
              id="recruitment_end_date"
              type="datetime-local"
              value={basicInfo.recruitment_end_date}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('recruitment_end_date', event.target.value)
              }
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="course_start_date">교육 시작일</S.Label>
            <S.Input
              id="course_start_date"
              type="datetime-local"
              value={basicInfo.course_start_date}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('course_start_date', event.target.value)
              }
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="course_end_date">교육 종료일</S.Label>
            <S.Input
              id="course_end_date"
              type="datetime-local"
              value={basicInfo.course_end_date}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChange('course_end_date', event.target.value)
              }
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>
      </S.SectionBox>

      {/* FAQ 섹션 */}
      <S.SectionBox>
        <S.SectionTitle>FAQ</S.SectionTitle>
        <S.FaqHeader>
          <div />
          {!disabled && (
            <S.AddFaqButton type="button" onClick={handleAddFaq}>
              + FAQ 추가
            </S.AddFaqButton>
          )}
        </S.FaqHeader>

        {faqs.length === 0 ? (
          <S.EmptyFaqMessage>FAQ를 추가해주세요.</S.EmptyFaqMessage>
        ) : (
          <S.FaqList>
            {faqs.map((faq, index) => (
              <S.FaqItem key={index}>
                <S.FaqItemHeader>
                  <S.FaqItemNumber>FAQ {index + 1}</S.FaqItemNumber>
                  {!disabled && (
                    <S.RemoveFaqButton type="button" onClick={() => handleRemoveFaq(index)}>
                      삭제
                    </S.RemoveFaqButton>
                  )}
                </S.FaqItemHeader>
                <S.FormGroup>
                  <S.Label htmlFor={`faq-question-${index}`}>질문</S.Label>
                  <S.Input
                    id={`faq-question-${index}`}
                    type="text"
                    value={faq.question}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleFaqChange(index, 'question', event.target.value)
                    }
                    placeholder="질문을 입력하세요"
                    disabled={disabled}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label htmlFor={`faq-answer-${index}`}>답변</S.Label>
                  <S.Textarea
                    id={`faq-answer-${index}`}
                    value={faq.answer}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleFaqChange(index, 'answer', event.target.value)
                    }
                    placeholder="답변을 입력하세요"
                    rows={3}
                    disabled={disabled}
                  />
                </S.FormGroup>
              </S.FaqItem>
            ))}
          </S.FaqList>
        )}
      </S.SectionBox>

      {/* 공개 여부 */}
      <S.FormRow>
        <S.CheckboxGroup>
          <S.Checkbox
            id="is_published"
            type="checkbox"
            checked={basicInfo.is_published}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange('is_published', event.target.checked)
            }
            disabled={disabled}
          />
          <S.CheckboxLabel htmlFor="is_published">바로 공개</S.CheckboxLabel>
        </S.CheckboxGroup>
      </S.FormRow>
    </S.FormContainer>
  );
};

export default LectureFormBasicInfo;
