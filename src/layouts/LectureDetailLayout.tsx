import { Outlet, useParams } from 'react-router-dom';
import { createContext, useContext } from 'react';
import styled from 'styled-components';

import { useIsEnrolled } from '../hooks/useIsEnrolled';
import { useCourseDetailQuery } from '../queries/useCourseQueries';
import type { CoursesDetailItem } from '../types/CourseType';

import { StyledMainContainer, StyledWrapper } from './MainLayout';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { ErrorMessage, LoadingSpinner } from '../components/HelperComponents';

// Context & Provider
type LectureContextProps = {
  courseId: number,
  data: CoursesDetailItem,
  isEnrolled?: boolean,
  isLoading?: boolean,
}

const LectureContext = createContext<LectureContextProps | undefined>(undefined);

export const LectureProvider = ({ courseId, data, isEnrolled, isLoading, children }: LectureContextProps & {
  children: React.ReactNode,
}) => (
  <LectureContext.Provider value={{ courseId, data, isEnrolled, isLoading }}>
    {children}
  </LectureContext.Provider>
)

export const useLectureContext = () => {
  const context = useContext(LectureContext);
  if (!context) throw new Error('LectureContext를 사용하려면 LectureProvider로 감싸야 합니다.');
  return context;
}

const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ id: string }>();
  const courseId = Number(params.id);
  const { data: courseData, isLoading } = useCourseDetailQuery(courseId);
  const { isEnrolled } = useIsEnrolled(courseId);

  if (isLoading) return <LoadingSpinner />;
  if (!courseData) return <ErrorMessage message="데이터를 불러올 수 없습니다." />;
  
  return (
        <LectureProvider 
          courseId={courseId} data={courseData} isEnrolled={isEnrolled} isLoading={isLoading}>
              {children}
        </LectureProvider>
  )
}

export default function LectureDetailLayout() {


  return (
    <StyledLectureDetailWrapper>
      <Header/>
      <StyledMainContainer>
        <ProviderContainer>
          <Outlet/>
        </ProviderContainer>
      </StyledMainContainer>
      <Footer/>
      </StyledLectureDetailWrapper>
  );
}

const StyledLectureDetailWrapper = styled(StyledWrapper)`
    @media ${({ theme }) => theme.devices.laptop} {
        padding-bottom: 8.8rem;
    }
`;