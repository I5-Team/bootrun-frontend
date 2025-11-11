/**
 * 새로운 강의를 추가하기 위한 3단계 폼 모달
 * 기본 정보 → 커리큘럼 → 미션 순으로 입력 받아 강의 생성
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { CreateCourseRequest, Chapter, Mission, FaqItem } from '../../types/AdminCourseType';
import { Button } from '../../components/Button';

interface LectureAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCourseRequest) => void;
}

type Step = 1 | 2 | 3;

/**
 * 강의 추가 모달 (3단계)
 * Step 1: 기본 정보
 * Step 2: 커리큘럼 (챕터 + 강의)
 * Step 3: 미션
 */
const LectureAddModal: React.FC<LectureAddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    description: '',
    category_type: 'frontend',
    course_type: 'vod',
    difficulty: 'beginner',
    price_type: 'paid',
    price: 50000,
    thumbnail_url: '',
    instructor_name: '',
    instructor_bio: '',
    instructor_image: '',
    is_published: false,
  });

  // FAQ 상태 (동적 추가/삭제)
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // 커리큘럼 상태
  const [chapters, setChapters] = useState<
    Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'>[]
  >([]);

  // 미션 상태
  const [missions, setMissions] = useState<
    Omit<Mission, 'id' | 'course_id' | 'created_at' | 'updated_at'>[]
  >([]);

  // 모달 열릴 때 이전 포커스 저장 및 초기 포커스 설정
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      // 모달 컨테이너에 포커스 설정
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    } else {
      // 모달 닫힐 때 이전 포커스 복원
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // 포커스 트랩 구현
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // 모달 닫기 + 초기화
  const handleClose = useCallback(() => {
    setCurrentStep(1);
    setBasicInfo({
      title: '',
      description: '',
      category_type: 'frontend',
      course_type: 'vod',
      difficulty: 'beginner',
      price_type: 'paid',
      price: 50000,
      thumbnail_url: '',
      instructor_name: '',
      instructor_bio: '',
      instructor_image: '',
      is_published: false,
    });
    setFaqs([]);
    setChapters([]);
    setMissions([]);
    onClose();
  }, [onClose]);

  // 다음 단계
  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  }, [currentStep]);

  // 이전 단계
  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  }, [currentStep]);

  // 최종 제출
  const handleSubmit = useCallback(() => {
    const courseData: CreateCourseRequest = {
      ...basicInfo,
      faq: JSON.stringify(faqs), // FAQ 배열을 JSON 문자열로 변환
      chapters,
      missions,
    };
    onSubmit(courseData);
    handleClose();
  }, [basicInfo, faqs, chapters, missions, onSubmit, handleClose]);

  // 기본 정보 변경 핸들러
  const handleBasicInfoChange = useCallback((field: string, value: string | number | boolean) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <S.ModalContainer
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleClose();
          }
        }}
        tabIndex={-1}
      >
        <S.ModalHeader>
          <S.ModalTitle id="modal-title">새 강의 추가</S.ModalTitle>
          <S.CloseButton
            onClick={handleClose}
            aria-label="모달 닫기"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClose();
              }
            }}
          >
            ✕
          </S.CloseButton>
        </S.ModalHeader>

        <S.StepIndicator>
          <S.StepItem $active={currentStep === 1} $completed={currentStep > 1}>
            <S.StepNumber>1</S.StepNumber>
            <S.StepLabel>기본 정보</S.StepLabel>
          </S.StepItem>
          <S.StepDivider />
          <S.StepItem $active={currentStep === 2} $completed={currentStep > 2}>
            <S.StepNumber>2</S.StepNumber>
            <S.StepLabel>커리큘럼</S.StepLabel>
          </S.StepItem>
          <S.StepDivider />
          <S.StepItem $active={currentStep === 3} $completed={false}>
            <S.StepNumber>3</S.StepNumber>
            <S.StepLabel>미션</S.StepLabel>
          </S.StepItem>
        </S.StepIndicator>

        <S.ModalBody>
          {currentStep === 1 && (
            <Step1BasicInfo
              basicInfo={basicInfo}
              onChange={handleBasicInfoChange}
              faqs={faqs}
              setFaqs={setFaqs}
            />
          )}
          {currentStep === 2 && <Step2Curriculum chapters={chapters} setChapters={setChapters} />}
          {currentStep === 3 && <Step3Mission missions={missions} setMissions={setMissions} />}
        </S.ModalBody>

        <S.ModalFooter>
          {currentStep > 1 && (
            <Button variant="outline" size="md" onClick={handlePrev}>
              이전
            </Button>
          )}
          <S.Spacer />
          {currentStep < 3 ? (
            <Button size="md" onClick={handleNext}>
              다음
            </Button>
          ) : (
            <Button size="md" onClick={handleSubmit}>
              강의 추가
            </Button>
          )}
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );
};

// ========== Step 1: 기본 정보 ==========
interface Step1Props {
  basicInfo: any;
  onChange: (field: string, value: string | number | boolean) => void;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
}

const Step1BasicInfo: React.FC<Step1Props> = ({ basicInfo, onChange, faqs, setFaqs }) => {
  // FAQ 추가
  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: '', answer: '' }]);
  };

  // FAQ 삭제
  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQ 수정
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs((prev) => prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)));
  };
  return (
    <S.FormContainer>
      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="title">
            강의 제목 <S.Required>*</S.Required>
          </S.Label>
          <S.Input
            id="title"
            type="text"
            value={basicInfo.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="강의 제목을 입력하세요"
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
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="강의 설명을 입력하세요"
            rows={4}
            required
          />
        </S.FormGroup>
      </S.FormRow>

      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="instructor_name">
            강사명 <S.Required>*</S.Required>
          </S.Label>
          <S.Input
            id="instructor_name"
            type="text"
            value={basicInfo.instructor_name}
            onChange={(e) => onChange('instructor_name', e.target.value)}
            placeholder="강사명을 입력하세요"
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="instructor_bio">강사 소개</S.Label>
          <S.Input
            id="instructor_bio"
            type="text"
            value={basicInfo.instructor_bio}
            onChange={(e) => onChange('instructor_bio', e.target.value)}
            placeholder="강사 소개를 입력하세요"
          />
        </S.FormGroup>
      </S.FormRow>

      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="category_type">카테고리</S.Label>
          <S.Select
            id="category_type"
            value={basicInfo.category_type}
            onChange={(e) => onChange('category_type', e.target.value)}
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
          <S.Label htmlFor="difficulty">난이도</S.Label>
          <S.Select
            id="difficulty"
            value={basicInfo.difficulty}
            onChange={(e) => onChange('difficulty', e.target.value)}
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
            onChange={(e) => onChange('price_type', e.target.value)}
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
              onChange={(e) => onChange('price', Number(e.target.value))}
              min="0"
              step="1000"
            />
          </S.FormGroup>
        )}
      </S.FormRow>

      <S.FormRow>
        <S.FormGroup>
          <S.Label htmlFor="thumbnail_url">썸네일 URL</S.Label>
          <S.Input
            id="thumbnail_url"
            type="text"
            value={basicInfo.thumbnail_url}
            onChange={(e) => onChange('thumbnail_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </S.FormGroup>
      </S.FormRow>

      {/* FAQ 섹션 */}
      <S.FaqSection>
        <S.FaqHeader>
          <S.Label>FAQ</S.Label>
          <S.AddFaqButton type="button" onClick={handleAddFaq}>
            + FAQ 추가
          </S.AddFaqButton>
        </S.FaqHeader>

        {faqs.length === 0 ? (
          <S.EmptyFaqMessage>FAQ를 추가해주세요.</S.EmptyFaqMessage>
        ) : (
          <S.FaqList>
            {faqs.map((faq, index) => (
              <S.FaqItem key={index}>
                <S.FaqItemHeader>
                  <S.FaqItemNumber>FAQ {index + 1}</S.FaqItemNumber>
                  <S.RemoveFaqButton type="button" onClick={() => handleRemoveFaq(index)}>
                    삭제
                  </S.RemoveFaqButton>
                </S.FaqItemHeader>
                <S.FormGroup>
                  <S.Label htmlFor={`faq-question-${index}`}>질문</S.Label>
                  <S.Input
                    id={`faq-question-${index}`}
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="질문을 입력하세요"
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.Label htmlFor={`faq-answer-${index}`}>답변</S.Label>
                  <S.Textarea
                    id={`faq-answer-${index}`}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    placeholder="답변을 입력하세요"
                    rows={3}
                  />
                </S.FormGroup>
              </S.FaqItem>
            ))}
          </S.FaqList>
        )}
      </S.FaqSection>

      <S.FormRow>
        <S.CheckboxGroup>
          <S.Checkbox
            id="is_published"
            type="checkbox"
            checked={basicInfo.is_published}
            onChange={(e) => onChange('is_published', e.target.checked)}
          />
          <S.CheckboxLabel htmlFor="is_published">바로 공개</S.CheckboxLabel>
        </S.CheckboxGroup>
      </S.FormRow>
    </S.FormContainer>
  );
};

// ========== Step 2: 커리큘럼 (임시 구현) ==========
interface Step2Props {
  chapters: any[];
  setChapters: React.Dispatch<React.SetStateAction<any[]>>;
}

const Step2Curriculum: React.FC<Step2Props> = ({ chapters, setChapters }) => {
  return (
    <S.PlaceholderContainer>
      <S.PlaceholderText>커리큘럼 추가 기능은 추후 구현 예정입니다.</S.PlaceholderText>
      <S.PlaceholderSubText>
        현재는 "다음" 버튼을 눌러 다음 단계로 이동할 수 있습니다.
      </S.PlaceholderSubText>
    </S.PlaceholderContainer>
  );
};

// ========== Step 3: 미션 (임시 구현) ==========
interface Step3Props {
  missions: any[];
  setMissions: React.Dispatch<React.SetStateAction<any[]>>;
}

const Step3Mission: React.FC<Step3Props> = ({ missions, setMissions }) => {
  return (
    <S.PlaceholderContainer>
      <S.PlaceholderText>미션 추가 기능은 추후 구현 예정입니다.</S.PlaceholderText>
      <S.PlaceholderSubText>
        현재는 "강의 추가" 버튼을 눌러 강의를 추가할 수 있습니다.
      </S.PlaceholderSubText>
    </S.PlaceholderContainer>
  );
};

// ========== Styles ==========
const S = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 4rem 2rem;
    overflow-y: auto;
  `,
  ModalContainer: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.md};
    width: 100%;
    max-width: 80rem;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    margin-top: 5rem;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  ModalTitle: styled.h2`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.surface};
    margin: 0;
  `,
  CloseButton: styled.button`
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  StepIndicator: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  StepItem: styled.div<{ $active: boolean; $completed: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  `,
  StepNumber: styled.div`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary300};
    color: ${({ theme }) => theme.colors.white};
  `,
  StepLabel: styled.span`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
  `,
  StepDivider: styled.div`
    width: 6rem;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.colors.gray200};
    margin: 0 1.6rem;
  `,
  ModalBody: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 2.4rem;
  `,
  ModalFooter: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    padding: 2.4rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  Spacer: styled.div`
    flex: 1;
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  FormRow: styled.div`
    display: flex;
    gap: 1.6rem;

    @media ${({ theme }) => theme.devices.tablet} {
      flex-direction: column;
    }
  `,
  FormGroup: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
  Label: styled.label`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
  `,
  Required: styled.span`
    color: ${({ theme }) => theme.colors.alert};
  `,
  Input: styled.input`
    height: 4.2rem;
    padding: 0 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  Textarea: styled.textarea`
    padding: 1.2rem 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-family: 'Pretendard', sans-serif;
    resize: vertical;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  Select: styled.select`
    height: 4.2rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    background: white;
    cursor: pointer;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }
  `,
  CheckboxGroup: styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
  Checkbox: styled.input`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  `,
  CheckboxLabel: styled.label`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    cursor: pointer;
  `,
  PlaceholderContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  `,
  PlaceholderText: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0 0 1.2rem 0;
  `,
  PlaceholderSubText: styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
    margin: 0;
  `,
  // FAQ 관련 스타일
  FaqSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.sm};
  `,
  FaqHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  AddFaqButton: styled.button`
    padding: 0.8rem 1.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary300};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary300};
    border-radius: ${({ theme }) => theme.radius.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primary300};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  EmptyFaqMessage: styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 1.4rem;
    padding: 2rem;
  `,
  FaqList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  FaqItem: styled.div`
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  FaqItemHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  `,
  FaqItemNumber: styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
  `,
  RemoveFaqButton: styled.button`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.xs};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
};

export default LectureAddModal;
