import { createContext, useContext, useRef } from 'react';
import type { SectionRefs } from '../../types/LectureType';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useParams } from 'react-router-dom';
import { useCourseDetailQuery } from '../../queries/useCourseQueries';

// 스타일
import {
  LectureMainLayout,
  ContentWrapper,
  SectionWrapper,
} from './LectureDetailPage.styled';

// 컴포넌트
import LectureBannerSection from './components/LectureBannerSection';
import LectureHeaderSection from './components/LectureHeaderSection';
import LectureIntroSection from './components/LectureIntroSection';
import CurriculumSection from './components/CurriculumSection';
import InstructorSection from './components/InstructorSection';
import FAQSection from './components/FAQSection';
import NoticeSection from './components/NoticeSection';
import ReviewSection from './components/ReviewSection';
import { SectionTabs } from './components/SectionTabs';
import { LectureInfoBox, InfoBoxButtons } from './components/LectureInfoBox';
import { LoadingSpinner } from '../../components/HelperComponents';
import type { CoursesDetailItem } from '../../types/CourseType';
import { useIsEnrolled } from '../../hooks/useIsEnrolled';

// 함수
export const formatDate = (dateString: string): string => {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const weekDayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = weekDayNames[date.getDay()];

  return `${year}.${month}.${day}(${weekDay})`;
};

// Context & Provider
type LectureContextProps = {
  courseId: number,
  data: CoursesDetailItem,
  isEnrolled?: boolean,
}

const LectureContext = createContext<LectureContextProps | undefined>(undefined);

const LectureProvider = ({ courseId, data, isEnrolled, children }: {
  courseId: number,
  data: CoursesDetailItem,
  isEnrolled: boolean,
  children: React.ReactNode,
}) => (
  <LectureContext.Provider value={{ courseId, data, isEnrolled }}>
    {children}
  </LectureContext.Provider>
)

export const useLectureContext = () => {
  const context = useContext(LectureContext);
  if (!context) throw new Error('LectureContext를 사용하려면 LectureProvider로 감싸야 합니다.');
  return context;
}

//
export default function LectureDetailPage() {
  const { isLaptop } = useMediaQuery();
  const params = useParams<{ id: string }>();
  const courseId = Number(params.id);
  const { data: courseData, isLoading } = useCourseDetailQuery(courseId);
  const { isEnrolled } = useIsEnrolled(courseId);
  
  // 1. 스크롤을 위한 Ref 생성
  const introRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const instructorRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  // 2. Ref 객체를 SectionTabs에 전달
  const sectionRefs: SectionRefs = {
    introRef,
    reviewsRef,
    curriculumRef,
    instructorRef,
    faqRef,
  };

  return (
      <>
        {isLoading
          ? <LoadingSpinner/>
          : courseData && (
            <LectureProvider 
              courseId={courseId} data={courseData} isEnrolled={isEnrolled}>
              <LectureBannerSection/>
              <LectureMainLayout>
                {courseData && 
                  <ContentWrapper>
                    {/* 헤더 영역 (왼쪽) */}
                    <LectureHeaderSection/>
    
                    {/* 고정 사이드바 (오른쪽) */}
                    {!isLaptop && <LectureInfoBox/>}
                    {isLaptop && <InfoBoxButtons/>}
    
                    {/* 메인 콘텐츠 영역 (왼쪽) */}
                    <SectionWrapper>
                      <SectionTabs refs={sectionRefs}/>

                      <LectureIntroSection ref={introRef}/>
                      <ReviewSection ref={reviewsRef}/>
                      <CurriculumSection ref={curriculumRef}/>
                      <InstructorSection ref={instructorRef}/>
                      <FAQSection ref={faqRef}/>
                      <NoticeSection />
                    </SectionWrapper>
    
                  </ContentWrapper>
                }
              </LectureMainLayout>
            </LectureProvider>
          )
        }
      </>
  );
}
