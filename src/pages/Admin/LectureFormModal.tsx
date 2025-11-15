/**
 * 강의 추가/수정을 위한 3단계 폼 모달 (통합 컴포넌트)
 * mode prop으로 추가/수정 모드 구분
 * 기본 정보 → 커리큘럼 → 미션 순으로 입력 받아 강의 생성/수정
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type {
  CreateCourseRequest,
  Chapter,
  Mission,
  FaqItem,
  Lecture,
} from '../../types/AdminCourseType';
import { Button } from '../../components/Button';
import { fetchCourseDetail } from '../../api/adminApi';

interface LectureFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit'; // 추가 vs 수정 모드
  courseId?: number | null; // 수정 모드일 때만 필요
  onClose: () => void;
  onSubmit: (data: CreateCourseRequest) => void;
  onUpdate?: (courseId: number, data: CreateCourseRequest, originalChapters: Chapter[]) => void;
}

type Step = 1 | 2 | 3;

/**
 * 강의 추가/수정 모달 (3단계)
 * Step 1: 기본 정보
 * Step 2: 커리큘럼 (챕터 + 강의)
 * Step 3: 미션
 */
const LectureFormModal: React.FC<LectureFormModalProps> = ({
  isOpen,
  mode,
  courseId,
  onClose,
  onSubmit,
  onUpdate,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
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
    instructor_description: '',
    instructor_image: '',
    // 수강 관련
    access_duration_days: 365,
    max_students: 100,
    recruitment_start_date: '',
    recruitment_end_date: '',
    course_start_date: '',
    course_end_date: '',
    // 기타
    student_reviews: '[]',
    is_published: false,
  });

  // FAQ 상태 (동적 추가/삭제)
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // 커리큘럼 상태
  const [chapters, setChapters] = useState<
    Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'>[]
  >([]);

  // 원본 챕터 데이터 (수정 모드에서 변경사항 추적용)
  const [originalChapters, setOriginalChapters] = useState<Chapter[]>([]);

  // 미션 상태
  const [missions, setMissions] = useState<
    Omit<Mission, 'id' | 'course_id' | 'created_at' | 'updated_at'>[]
  >([]);

  // 모달 제목 결정
  const modalTitle = mode === 'add' ? '새 강의 추가' : '강의 수정';
  const submitButtonText = mode === 'add' ? '강의 추가' : '저장';

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

  // 수정 모드에서 강의 데이터 로드
  useEffect(() => {
    if (isOpen && mode === 'edit' && courseId) {
      console.log(`Loading course data for edit mode: ${courseId}`);
      setIsLoading(true);

      // 강의 기본 정보와 챕터 정보를 병렬로 로드
      Promise.all([
        fetchCourseDetail(courseId),
        import('../../api/adminApi')
          .then((module) => module.fetchChapters(courseId))
          .catch(() => []),
      ])
        .then(([courseData, chaptersData]) => {
          console.log('Course data loaded:', courseData);
          console.log('Chapters data loaded:', chaptersData);

          setBasicInfo({
            title: courseData.title || '',
            description: courseData.description || '',
            category_type: courseData.category_type || 'frontend',
            course_type: courseData.course_type || 'vod',
            difficulty: courseData.difficulty || 'beginner',
            price_type: courseData.price_type || 'paid',
            price: courseData.price || 0,
            thumbnail_url: courseData.thumbnail_url || '',
            instructor_name: courseData.instructor_name || '',
            instructor_bio: courseData.instructor_bio || '',
            instructor_description: courseData.instructor_description || '',
            instructor_image: courseData.instructor_image || '',
            // 수강 관련
            access_duration_days: courseData.access_duration_days || 365,
            max_students: courseData.max_students || 100,
            recruitment_start_date: courseData.recruitment_start_date
              ? courseData.recruitment_start_date.slice(0, 16)
              : '',
            recruitment_end_date: courseData.recruitment_end_date
              ? courseData.recruitment_end_date.slice(0, 16)
              : '',
            course_start_date: courseData.course_start_date
              ? courseData.course_start_date.slice(0, 16)
              : '',
            course_end_date: courseData.course_end_date
              ? courseData.course_end_date.slice(0, 16)
              : '',
            // 기타
            student_reviews: courseData.student_reviews || '[]',
            is_published: courseData.is_published || false,
          });

          // FAQ 데이터 파싱
          if (courseData.faq) {
            try {
              const parsedFaq = JSON.parse(courseData.faq);
              setFaqs(Array.isArray(parsedFaq) ? parsedFaq : []);
            } catch {
              console.warn('Failed to parse FAQ data:', courseData.faq);
              setFaqs([]);
            }
          }

          // 챕터 데이터 로드 (lectures 필드 기본값 추가)
          const chaptersWithLectures = (chaptersData || []).map((chapter) => ({
            ...chapter,
            lectures: chapter.lectures || [], // lectures가 없으면 빈 배열로 설정
          }));

          // 원본 챕터 데이터 저장 (변경사항 추적용)
          setOriginalChapters(chaptersData || []);
          setChapters(chaptersWithLectures);

          // TODO: missions 데이터 로드
          // setMissions(courseData.missions || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load course data:', error);
          alert('강의 정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
          setIsLoading(false);
        });
    }
  }, [isOpen, mode, courseId]);

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
      instructor_description: '',
      instructor_image: '',
      // 수강 관련
      access_duration_days: 365,
      max_students: 100,
      recruitment_start_date: '',
      recruitment_end_date: '',
      course_start_date: '',
      course_end_date: '',
      // 기타
      student_reviews: '[]',
      is_published: false,
    });
    setFaqs([]);
    setChapters([]);
    setOriginalChapters([]);
    setMissions([]);
    onClose();
  }, [onClose]);

  // 다음 단계
  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 3) {
        return (prev + 1) as Step;
      }
      return prev;
    });
  }, []);

  // 이전 단계
  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        return (prev - 1) as Step;
      }
      return prev;
    });
  }, []);

  // 최종 제출/수정
  const handleSubmit = useCallback(() => {
    console.log('=== 제출 시작 ===');
    console.log('basicInfo 전체:', basicInfo);
    console.log('날짜 필드:', {
      recruitment_start_date: basicInfo.recruitment_start_date,
      recruitment_end_date: basicInfo.recruitment_end_date,
      course_start_date: basicInfo.course_start_date,
      course_end_date: basicInfo.course_end_date,
    });

    // 날짜 변환 + 기본값 설정
    const toISOStringWithDefault = (dateStr: string, defaultOffsetDays: number = 0) => {
      // 빈 값 처리: 현재 날짜 기준으로 기본값 생성
      if (!dateStr || dateStr.trim() === '') {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + defaultOffsetDays);
        const isoDate = defaultDate.toISOString();
        console.log(`⚠️ 빈 날짜 감지 → 기본값 사용 (+${defaultOffsetDays}일): ${isoDate}`);
        return isoDate;
      }

      try {
        const isoDate = new Date(dateStr).toISOString();
        console.log(`✅ 날짜 변환 성공: "${dateStr}" → "${isoDate}"`);
        return isoDate;
      } catch (error) {
        console.error(`❌ 날짜 변환 실패: "${dateStr}"`, error);
        // 변환 실패 시에도 기본값 사용
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + defaultOffsetDays);
        const isoDate = defaultDate.toISOString();
        console.log(`⚠️ 변환 실패 → 기본값 사용 (+${defaultOffsetDays}일): ${isoDate}`);
        return isoDate;
      }
    };

    const courseData: CreateCourseRequest = {
      ...basicInfo,
      // 날짜 변환 (빈 값이면 기본값 사용)
      recruitment_start_date: toISOStringWithDefault(basicInfo.recruitment_start_date, 0), // 오늘
      recruitment_end_date: toISOStringWithDefault(basicInfo.recruitment_end_date, 90), // 90일 후
      course_start_date: toISOStringWithDefault(basicInfo.course_start_date, 7), // 7일 후
      course_end_date: toISOStringWithDefault(basicInfo.course_end_date, 365), // 365일 후
      // JSON 문자열 변환
      faq: JSON.stringify(faqs),
      chapters,
      missions,
    };

    console.log('=== 최종 전송 데이터 ===', courseData);

    if (mode === 'add') {
      onSubmit(courseData);
    } else if (mode === 'edit' && courseId) {
      onUpdate?.(courseId, courseData, originalChapters);
    }

    handleClose();
  }, [
    basicInfo,
    faqs,
    chapters,
    missions,
    mode,
    courseId,
    onSubmit,
    onUpdate,
    originalChapters,
    handleClose,
  ]);

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
          <S.ModalTitle id="modal-title">{modalTitle}</S.ModalTitle>
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
            <S.StepNumber $active={currentStep === 1}>1</S.StepNumber>
            <S.StepLabel>기본 정보</S.StepLabel>
          </S.StepItem>
          <S.StepDivider />
          <S.StepItem $active={currentStep === 2} $completed={currentStep > 2}>
            <S.StepNumber $active={currentStep === 2}>2</S.StepNumber>
            <S.StepLabel>커리큘럼</S.StepLabel>
          </S.StepItem>
          <S.StepDivider />
          <S.StepItem $active={currentStep === 3} $completed={false}>
            <S.StepNumber $active={currentStep === 3}>3</S.StepNumber>
            <S.StepLabel>미션</S.StepLabel>
          </S.StepItem>
        </S.StepIndicator>

        <S.ModalBody>
          {isLoading && mode === 'edit' ? (
            <S.LoadingContainer>
              <S.LoadingText>강의 정보를 불러오는 중...</S.LoadingText>
            </S.LoadingContainer>
          ) : (
            <>
              {currentStep === 1 && (
                <Step1BasicInfo
                  basicInfo={basicInfo}
                  onChange={handleBasicInfoChange}
                  faqs={faqs}
                  setFaqs={setFaqs}
                  disabled={false}
                />
              )}
              {currentStep === 2 && (
                <Step2Curriculum chapters={chapters} setChapters={setChapters} disabled={false} />
              )}
              {currentStep === 3 && (
                <Step3Mission missions={missions} setMissions={setMissions} disabled={false} />
              )}
            </>
          )}
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
              {submitButtonText}
            </Button>
          )}
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );
};

// ========== Step 1: 기본 정보 ==========
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

interface Step1Props {
  basicInfo: BasicInfoType;
  onChange: (field: string, value: string | number | boolean) => void;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  disabled?: boolean;
}

const Step1BasicInfo: React.FC<Step1Props> = ({
  basicInfo,
  onChange,
  faqs,
  setFaqs,
  disabled = false,
}) => {
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
              onChange={(e) => onChange('title', e.target.value)}
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
              onChange={(e) => onChange('description', e.target.value)}
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
              onChange={(e) => onChange('category_type', e.target.value)}
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
              onChange={(e) => onChange('course_type', e.target.value)}
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
              onChange={(e) => onChange('difficulty', e.target.value)}
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
              onChange={(e) => onChange('price_type', e.target.value)}
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
                onChange={(e) => onChange('price', Number(e.target.value))}
                min="0"
                step="1000"
                disabled={disabled}
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
              disabled={disabled}
            />
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
              onChange={(e) => onChange('instructor_name', e.target.value)}
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
              onChange={(e) => onChange('instructor_bio', e.target.value)}
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
              onChange={(e) => onChange('instructor_description', e.target.value)}
              placeholder="강사의 경력, 전문 분야 등을 자세히 입력하세요"
              rows={4}
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="instructor_image">강사 이미지 URL</S.Label>
            <S.Input
              id="instructor_image"
              type="text"
              value={basicInfo.instructor_image}
              onChange={(e) => onChange('instructor_image', e.target.value)}
              placeholder="https://example.com/instructor.jpg (비워두면 기본 이미지)"
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>
      </S.SectionBox>

      {/* 수강 관련 섹션 */}
      <S.SectionBox>
        <S.SectionTitle>수강 설정</S.SectionTitle>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="access_duration_days">수강 기간 (일)</S.Label>
            <S.Input
              id="access_duration_days"
              type="number"
              min="1"
              value={basicInfo.access_duration_days}
              onChange={(e) => onChange('access_duration_days', parseInt(e.target.value) || 365)}
              placeholder="365"
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="max_students">최대 수강생 수</S.Label>
            <S.Input
              id="max_students"
              type="number"
              min="0"
              value={basicInfo.max_students}
              onChange={(e) => onChange('max_students', parseInt(e.target.value) || 0)}
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
              onChange={(e) => onChange('recruitment_start_date', e.target.value)}
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="recruitment_end_date">모집 종료일</S.Label>
            <S.Input
              id="recruitment_end_date"
              type="datetime-local"
              value={basicInfo.recruitment_end_date}
              onChange={(e) => onChange('recruitment_end_date', e.target.value)}
              disabled={disabled}
            />
          </S.FormGroup>
        </S.FormRow>

        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="course_start_date">강의 시작일</S.Label>
            <S.Input
              id="course_start_date"
              type="datetime-local"
              value={basicInfo.course_start_date}
              onChange={(e) => onChange('course_start_date', e.target.value)}
              disabled={disabled}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="course_end_date">강의 종료일</S.Label>
            <S.Input
              id="course_end_date"
              type="datetime-local"
              value={basicInfo.course_end_date}
              onChange={(e) => onChange('course_end_date', e.target.value)}
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
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="질문을 입력하세요"
                    disabled={disabled}
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
            onChange={(e) => onChange('is_published', e.target.checked)}
            disabled={disabled}
          />
          <S.CheckboxLabel htmlFor="is_published">바로 공개</S.CheckboxLabel>
        </S.CheckboxGroup>
      </S.FormRow>
    </S.FormContainer>
  );
};

// ========== Step 2: 커리큘럼 ==========
interface Step2Props {
  chapters: Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'>[];
  setChapters: React.Dispatch<
    React.SetStateAction<Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'>[]>
  >;
  disabled?: boolean;
}

const Step2Curriculum: React.FC<Step2Props> = ({ chapters, setChapters, disabled = false }) => {
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number | null>(null);

  // 챕터 추가
  const handleAddChapter = () => {
    const newChapter: Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at'> = {
      title: `챕터 ${chapters.length + 1}`,
      description: '',
      order_number: chapters.length + 1,
      lectures: [],
    };
    setChapters([...chapters, newChapter]);
  };

  // 챕터 삭제
  const handleDeleteChapter = (index: number) => {
    if (window.confirm('정말 이 챕터를 삭제하시겠습니까?')) {
      const newChapters = chapters.filter((_, i) => i !== index);
      const reorderedChapters = newChapters.map((ch, i) => ({ ...ch, order_number: i + 1 }));
      setChapters(reorderedChapters);
      setExpandedChapterIndex(null);
    }
  };

  // 챕터 수정
  const handleUpdateChapter = (
    index: number,
    field: keyof Omit<Chapter, 'id' | 'course_id' | 'created_at' | 'updated_at' | 'lectures'>,
    value: string | number
  ) => {
    const newChapters = [...chapters];
    newChapters[index] = { ...newChapters[index], [field]: value };
    setChapters(newChapters);
  };

  // 강의 영상 추가
  const handleAddLecture = (chapterIndex: number) => {
    const newLecture: Omit<Lecture, 'id' | 'chapter_id' | 'created_at' | 'updated_at'> = {
      title: `강의 ${chapters[chapterIndex].lectures.length + 1}`,
      description: '',
      video_url: '',
      video_type: 'youtube',
      duration_seconds: 0,
      order_number: chapters[chapterIndex].lectures.length + 1,
      material_url: '',
    };
    const newChapters = [...chapters];
    newChapters[chapterIndex].lectures.push(newLecture);
    setChapters(newChapters);
  };

  // 강의 영상 삭제
  const handleDeleteLecture = (chapterIndex: number, lectureIndex: number) => {
    if (window.confirm('정말 이 강의 영상을 삭제하시겠습니까?')) {
      const newChapters = [...chapters];
      newChapters[chapterIndex].lectures = newChapters[chapterIndex].lectures.filter(
        (_, i) => i !== lectureIndex
      );
      newChapters[chapterIndex].lectures = newChapters[chapterIndex].lectures.map((lec, i) => ({
        ...lec,
        order_number: i + 1,
      }));
      setChapters(newChapters);
    }
  };

  // 강의 영상 수정
  const handleUpdateLecture = (
    chapterIndex: number,
    lectureIndex: number,
    field: keyof Omit<Lecture, 'id' | 'chapter_id' | 'created_at' | 'updated_at'>,
    value: string | number
  ) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].lectures[lectureIndex] = {
      ...newChapters[chapterIndex].lectures[lectureIndex],
      [field]: value,
    };
    setChapters(newChapters);
  };

  // 아코디언 토글
  const toggleChapter = (index: number) => {
    setExpandedChapterIndex(expandedChapterIndex === index ? null : index);
  };

  return (
    <S.CurriculumContainer>
      <S.AccordionHeader>
        <h3>커리큘럼 관리</h3>
        {!disabled && (
          <Button size="md" onClick={handleAddChapter}>
            + 챕터 추가
          </Button>
        )}
      </S.AccordionHeader>

      {chapters.length === 0 ? (
        <S.EmptyMessage>챕터가 없습니다. 챕터를 추가해주세요.</S.EmptyMessage>
      ) : (
        <S.AccordionList>
          {chapters.map((chapter, chapterIndex) => (
            <S.AccordionCard key={chapterIndex}>
              {/* 챕터 헤더 */}
              <S.AccordionCardHeader onClick={() => toggleChapter(chapterIndex)}>
                <S.AccordionTitleRow>
                  <S.AccordionNumber>챕터 {chapter.order_number}</S.AccordionNumber>
                  <S.AccordionTitle>{chapter.title || '(제목 없음)'}</S.AccordionTitle>
                  <S.LectureCount>{chapter.lectures.length}개 강의</S.LectureCount>
                  <S.ExpandIcon $expanded={expandedChapterIndex === chapterIndex}>▼</S.ExpandIcon>
                </S.AccordionTitleRow>
              </S.AccordionCardHeader>

              {/* 챕터 상세 (아코디언) */}
              {expandedChapterIndex === chapterIndex && (
                <S.AccordionContent>
                  {/* 챕터 정보 수정 */}
                  <S.AccordionEditSection>
                    <S.FormGroup>
                      <S.Label>챕터 제목</S.Label>
                      <S.Input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => handleUpdateChapter(chapterIndex, 'title', e.target.value)}
                        disabled={disabled}
                        placeholder="챕터 제목을 입력하세요"
                      />
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>챕터 설명</S.Label>
                      <S.Textarea
                        value={chapter.description}
                        onChange={(e) =>
                          handleUpdateChapter(chapterIndex, 'description', e.target.value)
                        }
                        disabled={disabled}
                        placeholder="챕터 설명을 입력하세요"
                        rows={3}
                      />
                    </S.FormGroup>
                    {!disabled && (
                      <S.DeleteChapterButton onClick={() => handleDeleteChapter(chapterIndex)}>
                        챕터 삭제
                      </S.DeleteChapterButton>
                    )}
                  </S.AccordionEditSection>

                  {/* 강의 영상 목록 */}
                  <S.LectureSection>
                    <S.LectureSectionHeader>
                      <h4>강의 영상</h4>
                      {!disabled && (
                        <Button size="sm" onClick={() => handleAddLecture(chapterIndex)}>
                          + 강의 추가
                        </Button>
                      )}
                    </S.LectureSectionHeader>

                    {chapter.lectures.length === 0 ? (
                      <S.EmptyMessage>강의 영상이 없습니다.</S.EmptyMessage>
                    ) : (
                      <S.LectureList>
                        {chapter.lectures.map((lecture, lectureIndex) => (
                          <S.LectureItem key={lectureIndex}>
                            <S.LectureHeader>
                              <span>강의 {lecture.order_number}</span>
                              {!disabled && (
                                <S.DeleteButton
                                  onClick={() => handleDeleteLecture(chapterIndex, lectureIndex)}
                                >
                                  삭제
                                </S.DeleteButton>
                              )}
                            </S.LectureHeader>

                            <S.LectureForm>
                              <S.FormRow>
                                <S.FormGroup>
                                  <S.Label>강의 제목</S.Label>
                                  <S.Input
                                    type="text"
                                    value={lecture.title}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    disabled={disabled}
                                    placeholder="강의 제목"
                                  />
                                </S.FormGroup>
                              </S.FormRow>

                              <S.FormRow>
                                <S.FormGroup>
                                  <S.Label>강의 설명</S.Label>
                                  <S.Textarea
                                    value={lecture.description}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'description',
                                        e.target.value
                                      )
                                    }
                                    disabled={disabled}
                                    placeholder="강의 설명"
                                    rows={2}
                                  />
                                </S.FormGroup>
                              </S.FormRow>

                              <S.FormRow>
                                <S.FormGroup>
                                  <S.Label>영상 URL</S.Label>
                                  <S.Input
                                    type="text"
                                    value={lecture.video_url}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'video_url',
                                        e.target.value
                                      )
                                    }
                                    disabled={disabled}
                                    placeholder="https://youtube.com/watch?v=..."
                                  />
                                </S.FormGroup>
                                <S.FormGroup>
                                  <S.Label>영상 유형</S.Label>
                                  <S.Select
                                    value={lecture.video_type}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'video_type',
                                        e.target.value
                                      )
                                    }
                                    disabled={disabled}
                                  >
                                    <option value="youtube">YouTube</option>
                                    <option value="vod">VOD</option>
                                  </S.Select>
                                </S.FormGroup>
                              </S.FormRow>

                              <S.FormRow>
                                <S.FormGroup>
                                  <S.Label>재생 시간 (초)</S.Label>
                                  <S.Input
                                    type="number"
                                    value={lecture.duration_seconds}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'duration_seconds',
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    disabled={disabled}
                                    placeholder="600"
                                    min="0"
                                  />
                                </S.FormGroup>
                                <S.FormGroup>
                                  <S.Label>학습 자료 URL (선택)</S.Label>
                                  <S.Input
                                    type="text"
                                    value={lecture.material_url || ''}
                                    onChange={(e) =>
                                      handleUpdateLecture(
                                        chapterIndex,
                                        lectureIndex,
                                        'material_url',
                                        e.target.value
                                      )
                                    }
                                    disabled={disabled}
                                    placeholder="https://example.com/materials/lecture.pdf"
                                  />
                                </S.FormGroup>
                              </S.FormRow>
                            </S.LectureForm>
                          </S.LectureItem>
                        ))}
                      </S.LectureList>
                    )}
                  </S.LectureSection>
                </S.AccordionContent>
              )}
            </S.AccordionCard>
          ))}
        </S.AccordionList>
      )}
    </S.CurriculumContainer>
  );
};

// ========== Step 3: 미션 (임시 구현) ==========
interface Step3Props {
  missions: Mission[];
  setMissions: React.Dispatch<React.SetStateAction<Mission[]>>;
  disabled?: boolean;
}

const Step3Mission: React.FC<Step3Props> = ({ disabled = false }) => {
  return (
    <S.PlaceholderContainer>
      <S.PlaceholderText>미션 추가 기능은 추후 구현 예정입니다.</S.PlaceholderText>
      <S.PlaceholderSubText>
        현재는 "{disabled ? '조회' : '강의 추가'}" 기능을 사용할 수 있습니다.
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
  StepNumber: styled.div<{ $active: boolean }>`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary300 : theme.colors.gray200};
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
  // ========== 섹션 분리 스타일 ==========
  SectionBox: styled.div`
    padding: 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  SectionTitle: styled.h3`
    margin: 0 0 0.8rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
    display: flex;
    align-items: center;
    gap: 0.8rem;
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
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
    }
  `,
  Textarea: styled.textarea`
    padding: 1.2rem 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    font-family: 'Pretendard', sans-serif;
    resize: vertical;
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
    }
  `,
  Select: styled.select`
    height: 4.2rem;
    padding: 0 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 1.4rem;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary300};
      outline: none;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray400};
      cursor: not-allowed;
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
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.xs};
    background-color: ${({ theme }) => theme.colors.white};
    accent-color: ${({ theme }) => theme.colors.primary300};

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary300};
      border-color: ${({ theme }) => theme.colors.primary300};
    }

    &:checked::after {
      content: '✓';
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
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
  LoadingContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
  `,
  LoadingText: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};
    margin: 0;
  `,
  // FAQ 관련 스타일
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
  // 챕터 관련 스타일
  CurriculumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
  AccordionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  AccordionList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  AccordionCard: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.white};
    overflow: hidden;
  `,
  AccordionCardHeader: styled.div`
    padding: 1.6rem 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
  `,
  AccordionTitleRow: styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  AccordionNumber: styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary300};
  `,
  AccordionTitle: styled.span`
    flex: 1;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.surface};
  `,
  LectureCount: styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray300};
  `,
  ExpandIcon: styled.span<{ $expanded: boolean }>`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray300};
    transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
    transition: transform 0.3s ease;
  `,
  AccordionContent: styled.div`
    padding: 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  AccordionEditSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.radius.md};
  `,
  DeleteChapterButton: styled.button`
    align-self: flex-start;
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
  LectureSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  LectureSectionHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  LectureList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
  LectureItem: styled.div`
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: ${({ theme }) => theme.radius.sm};
  `,
  LectureHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    span {
      font-size: 1.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.surface};
    }
  `,
  DeleteButton: styled.button`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.alert};
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.alert};
    border-radius: ${({ theme }) => theme.radius.xs};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 52, 64, 0.05);
    }
  `,
  LectureForm: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  EmptyMessage: styled.p`
    padding: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: 1.4rem;
  `,
};

export default LectureFormModal;
