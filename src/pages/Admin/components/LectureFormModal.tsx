/**
 * 강의 추가/수정을 위한 3단계 폼 모달 (통합 컴포넌트)
 * 기본 정보 -> 커리큘럼 -> 미션 순으로 입력 받아 강의 생성/수정
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import S from '../styles/LectureFormModal.styled.ts';
import type {
  CreateCourseRequest,
  Chapter,
  Mission,
  FaqItem,
} from '../../../types/AdminCourseType';
import { Button } from '../../../components/Button';
import { fetchCourseDetail } from '../../../api/adminApi';
import ConfirmModal from '../../../components/ConfirmModal';
import LectureFormBasicInfo from './LectureFormBasicInfo';
import LectureFormCurriculum from './LectureFormCurriculum';
import LectureFormMission from './LectureFormMission';

interface LectureFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  courseId?: number | null; // 수정 모드일 때만 필요
  isSaving?: boolean;
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
const DEFAULT_BASIC_INFO = {
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
};

const LectureFormModal: React.FC<LectureFormModalProps> = ({
  isOpen,
  mode,
  courseId,
  isSaving = false,
  onClose,
  onSubmit,
  onUpdate,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const prevSavingRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState(DEFAULT_BASIC_INFO);

  // FAQ 상태 (동적 추가/삭제)
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  // 커리큘럼 상태
  const [chapters, setChapters] = useState<
    (Omit<Chapter, 'course_id' | 'created_at' | 'updated_at'> & { id?: number })[]
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
      setIsLoading(true);

      // 강의 기본 정보와 챕터 정보를 병렬로 로드
      Promise.all([
        fetchCourseDetail(courseId),
        import('../../../api/adminApi')
          .then((module) => module.fetchChapters(courseId))
          .catch(() => []),
      ])
        .then(([courseData, chaptersData]) => {
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

  // 저장 완료 시 모달 자동 닫기
  useEffect(() => {
    if (prevSavingRef.current && !isSaving && isOpen) {
      // handleClose 호출 (state 초기화 필요)
      setCurrentStep(1);
      setBasicInfo(DEFAULT_BASIC_INFO);
      setFaqs([]);
      setChapters([]);
      setOriginalChapters([]);
      setMissions([]);
      onClose();
    }
    prevSavingRef.current = isSaving || false;
  }, [isSaving, isOpen, onClose]);

  // 변경사항 확인 (현재는 'add' 모드일 때만 체크)
  // useMemo를 사용하여 불필요한 연산 방지
  const hasChanges = useCallback(() => {
    if (mode !== 'add') return false;

    const isBasicInfoChanged =
      JSON.stringify(basicInfo) !== JSON.stringify(DEFAULT_BASIC_INFO);
    const hasChapters = chapters.length > 0;
    const hasMissions = missions.length > 0;

    return isBasicInfoChanged || hasChapters || hasMissions;
  }, [mode, basicInfo, chapters, missions]);

  // 실제 닫기 및 초기화 함수
  const resetAndClose = useCallback(() => {
    setCurrentStep(1);
    setIsLoading(false);
    setShowExitConfirm(false);
    setBasicInfo(DEFAULT_BASIC_INFO);
    setFaqs([]);
    setChapters([]);
    setOriginalChapters([]);
    setMissions([]);
    onClose();
  }, [onClose]);

  // 닫기 요청 핸들러 (변경사항 체크)
  const handleCloseRequest = useCallback(() => {
    if (hasChanges()) {
      setShowExitConfirm(true);
    } else {
      resetAndClose();
    }
  }, [hasChanges, resetAndClose]);

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
    // 날짜 변환 + 기본값 설정
    const toISOStringWithDefault = (dateStr: string, defaultOffsetDays: number = 0) => {
      // 빈 값 처리: 현재 날짜 기준으로 기본값 생성
      if (!dateStr || dateStr.trim() === '') {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + defaultOffsetDays);
        const isoDate = defaultDate.toISOString();

        return isoDate;
      }

      try {
        const isoDate = new Date(dateStr).toISOString();

        return isoDate;
      } catch (error) {
        console.error(`날짜 변환 실패: "${dateStr}"`, error);
        // 변환 실패 시에도 기본값 사용
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + defaultOffsetDays);
        const isoDate = defaultDate.toISOString();

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

    if (mode === 'add') {
      onSubmit(courseData);
    } else if (mode === 'edit' && courseId) {
      onUpdate?.(courseId, courseData, originalChapters);
    }
  }, [basicInfo, faqs, chapters, missions, mode, courseId, onSubmit, onUpdate, originalChapters]);

  // 기본 정보 변경 핸들러
  const handleBasicInfoChange = useCallback((field: string, value: string | number | boolean) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <ConfirmationDialog
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={resetAndClose}
      />
      <S.Overlay onClick={handleCloseRequest} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <S.ModalContainer
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCloseRequest();
            }
          }}
          tabIndex={-1}
        >
          <S.ModalHeader>
            <S.ModalTitle id="modal-title">{modalTitle}</S.ModalTitle>
            <S.CloseButton
              onClick={handleCloseRequest}
              aria-label="모달 닫기"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCloseRequest();
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
            {isSaving ? (
              <S.LoadingContainer>
                <S.LoadingText>강의를 저장하는 중입니다...</S.LoadingText>
              </S.LoadingContainer>
            ) : isLoading && mode === 'edit' ? (
              <S.LoadingContainer>
                <S.LoadingText>강의 정보를 불러오는 중...</S.LoadingText>
              </S.LoadingContainer>
            ) : (
              <>
                {currentStep === 1 && (
                  <LectureFormBasicInfo
                    basicInfo={basicInfo}
                    onChange={handleBasicInfoChange}
                    faqs={faqs}
                    setFaqs={setFaqs}
                    disabled={false}
                  />
                )}
                {currentStep === 2 && (
                  <LectureFormCurriculum
                    chapters={chapters}
                    setChapters={setChapters}
                    courseId={courseId}
                    disabled={false}
                  />
                )}
                {currentStep === 3 && (
                  <LectureFormMission
                    missions={missions}
                    setMissions={setMissions}
                    disabled={false}
                  />
                )}
              </>
            )}
          </S.ModalBody>

          <S.ModalFooter>
            {currentStep > 1 && (
              <Button variant="outline" size="md" onClick={handlePrev} disabled={isSaving}>
                이전
              </Button>
            )}
            <S.Spacer />
            {currentStep < 3 ? (
              <Button size="md" onClick={handleNext} disabled={isSaving}>
                다음
              </Button>
            ) : (
              <Button size="md" onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? '저장 중...' : submitButtonText}
              </Button>
            )}
          </S.ModalFooter>
        </S.ModalContainer>
      </S.Overlay>
    </>
  );
};

// 확인 모달 분리 (가독성을 위해)
const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="작성 취소"
      message={`작성 중인 내용이 있습니다.\n정말 나가시겠습니까?`}
      subMessage="나가시면 작성된 내용이 모두 사라집니다."
      confirmText="나가기"
      cancelText="계속 작성"
      isDestructive={true}
    />
  );
};

export default LectureFormModal;
