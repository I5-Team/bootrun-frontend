/**
 * 강의 수강 페이지 - 비디오 플레이어, 커리큘럼, Q&A 등 강의 시청 관련 기능 제공
 */
import { useState, useMemo, useRef } from 'react';
import CurriculumSidebar from './components/CurriculumSidebar';
import VideoPlayer from './components/VideoPlayer';
import MaterialsTab from './components/MaterialsTab';
import QnaTab from './components/QnaTab';
import ProgressBar from '../../components/ProgressBar';
import { useLectureRoom } from '../../contexts/LectureRoomContext';
import iconArrowLeft from '../../assets/icons/icon-arrow-left.svg';
import iconArrowRight from '../../assets/icons/icon-arrow-right.svg';
import iconArrowUp from '../../assets/icons/icon-arrow-up.svg';
import iconCloseLeft from '../../assets/icons/icon-sidebar-left.svg';
import iconCloseRight from '../../assets/icons/icon-sidebar-right.svg';
import * as S from './components/styles/LectureRoomPage.styled';

// 임시 데이터
const MOCK_DATA = {
  course: {
    id: 1,
    title: 'Blender로 두더지를 만들며 전문가에게 배우는 3D 모델링 기초',
  },
  currentChapter: {
    id: 1,
    title: 'Chapter01. Blender 기초 사용법',
  },
  currentLecture: {
    id: 3,
    title: '1. Blender 다운로드',
    video_url: 'https://www.youtube.com/watch?v=sCZMEUUMmrk',
    video_type: 'youtube' as const,
  },
  enrollment: {
    expires_at: '2027-01-01',
    is_active: true,
    progress_rate: 30,
  },
  chapters: [
    {
      id: 1,
      title: 'Chapter00. 들어가기 전',
      lectures: [
        {
          id: 1,
          title: '1. Blender 다운로드',
          duration_seconds: 700,
          is_completed: true,
          is_current: false,
          video_url: 'https://www.youtube.com/watch?v=sCZMEUUMmrk',
          video_type: 'youtube' as const,
          lecture_type: 'video' as const,
        },
        {
          id: 2,
          title: '2. Blender 기초 사용법',
          duration_seconds: 800,
          is_completed: true,
          is_current: false,
          video_url: 'https://www.youtube.com/watch?v=ksjwVp7VyqM',
          video_type: 'youtube' as const,
          lecture_type: 'video' as const,
        },
        {
          id: 3,
          title: '3. Blender 기초 사용법',
          duration_seconds: 600,
          is_completed: false,
          is_current: true,
          video_url: 'https://www.youtube.com/watch?v=eQYubCOj4Wo&t=33s',
          video_type: 'youtube' as const,
          lecture_type: 'video' as const,
        },
      ],
    },
    {
      id: 2,
      title: 'Chapter01. 두더지 만들기 실습',
      lectures: [
        {
          id: 4,
          title: '1. 두더지 골격 만들기',
          duration_seconds: 509,
          is_completed: false,
          is_current: false,
          video_url: 'https://www.youtube.com/watch?v=wMJhNjdojoA',
          video_type: 'youtube' as const,
          lecture_type: 'video' as const,
        },
        {
          id: 5,
          title: '2. 두더지 색칠하기 (텍스트 강의)',
          duration_seconds: 509,
          is_completed: false,
          is_current: false,
          lecture_type: 'text' as const,
          text_content:
            '# 두더지 색칠하기\n\n이번 강의에서는 두더지에 색상을 입히는 방법을 배워봅시다...',
        },
        {
          id: 6,
          title: '3. 두더지 퀴즈',
          duration_seconds: 509,
          is_completed: false,
          is_current: false,
          lecture_type: 'quiz' as const,
        },
        {
          id: 7,
          title: '4. Blender 기초 사용법',
          duration_seconds: 509,
          is_completed: false,
          is_current: false,
          video_url: 'https://www.youtube.com/watch?v=sCZMEUUMmrk',
          video_type: 'youtube' as const,
          lecture_type: 'video' as const,
        },
      ],
    },
  ],
};

export default function LectureRoomPage() {
  const { isLeftSidebarOpen, rightSidebarType, toggleLeftSidebar, toggleRightSidebar } =
    useLectureRoom();

  // 현재 재생 중인 강의 ID 상태
  const [currentLectureId, setCurrentLectureId] = useState(3);
  const centerContentRef = useRef<HTMLDivElement>(null);

  // 현재 강의 정보 찾기
  const currentLectureInfo = useMemo(() => {
    for (const chapter of MOCK_DATA.chapters) {
      const lecture = chapter.lectures.find((lec) => lec.id === currentLectureId);
      if (lecture) {
        return {
          lecture,
          chapter,
        };
      }
    }
    return null;
  }, [currentLectureId]);

  // is_current 업데이트된 chapters 데이터
  const updatedChapters = useMemo(() => {
    return MOCK_DATA.chapters.map((chapter) => ({
      ...chapter,
      lectures: chapter.lectures.map((lecture) => ({
        ...lecture,
        is_current: lecture.id === currentLectureId,
      })),
    }));
  }, [currentLectureId]);

  const handleLectureClick = (lectureId: number) => {
    setCurrentLectureId(lectureId);
  };

  const handleVideoProgress = (playedSeconds: number) => {
    console.log('재생 진행:', playedSeconds);
    // TODO: 진행률 저장 로직 구현
  };

  const handleVideoEnded = () => {
    console.log('재생 완료');
    // TODO: 완료 처리 및 다음 강의 자동 재생 로직 구현
  };

  return (
    <S.PageContainer>
      {/* 진행률 바 */}
      <ProgressBar variant="lecture" value={MOCK_DATA.enrollment.progress_rate} />

      {/* 메인 컨텐츠 영역 */}
      <S.MainContent>
        {/* 좌측 커리큘럼 사이드바 */}
        <S.LeftSidebar $isOpen={isLeftSidebarOpen}>
          <S.SidebarHeader>
            <S.SidebarTitle>커리큘럼</S.SidebarTitle>
            <S.CloseButton
              onClick={toggleLeftSidebar}
              aria-label={isLeftSidebarOpen ? '커리큘럼 닫기' : '커리큘럼 열기'}
            >
              <img
                src={iconCloseLeft}
                alt=""
                style={{ transform: isLeftSidebarOpen ? 'none' : 'rotate(180deg)' }}
              />
            </S.CloseButton>
          </S.SidebarHeader>
          <S.SidebarContent>
            <CurriculumSidebar chapters={updatedChapters} onLectureClick={handleLectureClick} />
          </S.SidebarContent>
        </S.LeftSidebar>

        {/* 중앙 비디오 플레이어 영역 */}
        <S.CenterContent ref={centerContentRef}>
          {/* 브레드크럼 */}
          {currentLectureInfo && (
            <S.BreadcrumbBar>
              <S.BreadcrumbItem $active>{MOCK_DATA.course.title}</S.BreadcrumbItem>
              <S.BreadcrumbSeparator>&gt;</S.BreadcrumbSeparator>
              <S.BreadcrumbItem>{currentLectureInfo.chapter.title}</S.BreadcrumbItem>
              <S.BreadcrumbSeparator>&gt;</S.BreadcrumbSeparator>
              <S.BreadcrumbItem $bold>{currentLectureInfo.lecture.title}</S.BreadcrumbItem>
            </S.BreadcrumbBar>
          )}
          <S.ContentArea>
            {currentLectureInfo && currentLectureInfo.lecture.lecture_type === 'video' && (
              <S.VideoPlayerWrapper>
                <VideoPlayer
                  url={currentLectureInfo.lecture.video_url}
                  videoType={currentLectureInfo.lecture.video_type}
                  lastPosition={0}
                  onProgress={handleVideoProgress}
                  onEnded={handleVideoEnded}
                />
              </S.VideoPlayerWrapper>
            )}
            {currentLectureInfo && currentLectureInfo.lecture.lecture_type === 'text' && (
              <S.TextContentWrapper>
                <S.TextContent>{currentLectureInfo.lecture.text_content}</S.TextContent>
              </S.TextContentWrapper>
            )}
            {currentLectureInfo && currentLectureInfo.lecture.lecture_type === 'quiz' && (
              <S.QuizContentWrapper>
                <S.QuizPlaceholder>퀴즈 콘텐츠 영역</S.QuizPlaceholder>
              </S.QuizContentWrapper>
            )}
          </S.ContentArea>

          {/* 하단 네비게이션 */}
          <S.BottomNavigation>
            <S.NavButtonGroup>
              <S.NavButton $variant="outline" aria-label="이전 강의">
                <img src={iconArrowLeft} alt="" />
              </S.NavButton>
              <S.NavButton $variant="primary" aria-label="다음 강의">
                <span>다음 강의</span>
                <img src={iconArrowRight} alt="" style={{ filter: 'brightness(0) invert(1)' }} />
              </S.NavButton>
            </S.NavButtonGroup>
            <S.ScrollTopButton
              aria-label="맨 위로"
              onClick={() => centerContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={iconArrowUp} alt="" />
            </S.ScrollTopButton>
          </S.BottomNavigation>
        </S.CenterContent>

        {/* 우측 사이드바 */}
        <S.RightSidebar $isOpen={!!rightSidebarType}>
          <S.SidebarHeader>
            <S.CloseButton onClick={() => toggleRightSidebar(null)} aria-label="사이드바 닫기">
              <img src={iconCloseRight} alt="" />
            </S.CloseButton>
            <S.SidebarTitle>
              {rightSidebarType === 'materials' ? '자료 다운로드' : 'Q&A'}
            </S.SidebarTitle>
          </S.SidebarHeader>
          <S.SidebarContent>
            {rightSidebarType === 'materials' && <MaterialsTab />}
            {rightSidebarType === 'qna' && <QnaTab />}
          </S.SidebarContent>
        </S.RightSidebar>
      </S.MainContent>

      {/* 모바일 배경 딤 */}
      {(isLeftSidebarOpen || rightSidebarType) && (
        <S.MobileDimBackground
          onClick={() => {
            toggleLeftSidebar();
            toggleRightSidebar(null);
          }}
        />
      )}
    </S.PageContainer>
  );
}
