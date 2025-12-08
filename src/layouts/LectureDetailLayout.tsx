import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LectureProvider } from '@/pages/Lecture/contexts/LectureProvider';

import { useIsEnrolled } from '../pages/Lecture/hooks/useIsEnrolled';
import { useCourseDetailQuery } from '../queries/useCourseQueries';

import { StyledMainContainer, StyledWrapper } from './MainLayout';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { ErrorMessage, LoadingSpinner } from '../components/HelperComponents';



const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ id: string }>();

  const courseId = Number(params.id);

  const { data: courseData, isLoading } = useCourseDetailQuery(courseId);

  const { isEnrolled } = useIsEnrolled(courseId);

  const recruitmentStatus = courseData?.recruitment_end_date
    ? Boolean(new Date(courseData.recruitment_end_date?.split('T')[0]) >= new Date())
    : false;

  if (isLoading) return <LoadingSpinner />;
  if (!courseData) return <ErrorMessage message="데이터를 불러올 수 없습니다." />;

  return (
    <LectureProvider
      courseId={courseId}
      data={courseData}
      isEnrolled={isEnrolled}
      isLoading={isLoading}
      recruitmentStatus={recruitmentStatus}
    >
      {children}
    </LectureProvider>
  );
};

export default function LectureDetailLayout() {
  return (
    <StyledLectureDetailWrapper>
      <Header />
      <StyledMainContainer>
        <ProviderContainer>
          <Outlet />
        </ProviderContainer>
      </StyledMainContainer>
      <Footer />
    </StyledLectureDetailWrapper>
  );
}

const StyledLectureDetailWrapper = styled(StyledWrapper)`
  @media ${({ theme }) => theme.devices.laptop} {
    padding-bottom: 8.8rem;
  }
`;
