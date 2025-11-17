/**
 * 강의 수강 페이지 - 비디오 플레이어, 커리큘럼, Q&A 등 강의 시청 관련 기능 제공
 */
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import CurriculumSidebar from './components/CurriculumSidebar';
import VideoPlayer from './components/VideoPlayer';
import MaterialsTab from './components/MaterialsTab';
import QnaTab from './components/QnaTab';
import ProgressBar from '../../components/ProgressBar';
import { SkeletonLectureRoom } from '../../components/Skeleton';
import { useLectureRoom } from '../../contexts/LectureRoomContext';
import {
  fetchLectureRoomData,
  fetchLectureProgress,
  updateLectureProgress,
  createEnrollmentProgress,
  fetchCourseProgress,
} from '../../api/enrollmentsApi';
import type { EnrollmentDetailItem } from '../../types/CourseType';
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
          material_url: 'https://example.com/material1.pdf',
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
          material_url: undefined,
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
          material_url: undefined,
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
          material_url: undefined,
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
          material_url: undefined,
        },
      ],
    },
  ],
};

export default function LectureRoomPage() {
  const { id: courseId } = useParams<{ id: string }>();
  const outletContext = useOutletContext<{
    setCurrentLectureMaterialUrl?: (url: string | null | undefined) => void;
    setCurrentLectureId?: (id: number) => void;
  }>();

  const [lectureData, setLectureData] = useState<EnrollmentDetailItem | null>(null);

  // 이어보기 위치 상태
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [progressExists, setProgressExists] = useState<boolean>(false);

  // 현재 영상 진도율 상태
  const [currentVideoProgress, setCurrentVideoProgress] = useState<number>(0);
  const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);
  const [isCurrentLectureCompleted, setIsCurrentLectureCompleted] = useState<boolean>(false);

  const {
    isLeftSidebarOpen,
    rightSidebarType,
    toggleLeftSidebar,
    toggleRightSidebar,
    closeAllSidebars,
  } = useLectureRoom();

  // 현재 재생 중인 강의 ID 상태
  const [currentLectureId, setCurrentLectureId] = useState(3);
  const centerContentRef = useRef<HTMLDivElement>(null);

  // 완료 처리 중복 방지를 위한 ref
  const isMovingToNextRef = useRef(false);

  // 전체 진행률 새로고침 함수
  const refreshCourseProgress = useCallback(async () => {
    if (!courseId) return;

    try {
      const courseProgress = await fetchCourseProgress(Number(courseId));
      console.log('[LectureRoom] 전체 진행률 조회 결과:', courseProgress);
      if (courseProgress) {
        const newProgressRate = courseProgress.progress_rate;
        console.log(`[LectureRoom] 진행률 업데이트: ${newProgressRate}%`);
        setLectureData((prev) => {
          if (!prev) return prev;
          console.log(
            '[LectureRoom] setLectureData - prev:',
            prev.progress_rate,
            '-> new:',
            newProgressRate
          );
          // 값이 실제로 변경되었을 때만 새 객체 반환
          if (prev.progress_rate === newProgressRate) {
            console.log('[LectureRoom] 진행률 변경 없음, 리렌더링 스킵');
            return prev;
          }
          return { ...prev, progress_rate: newProgressRate };
        });
      }
    } catch (err) {
      console.error('[LectureRoom] 전체 진행률 조회 실패:', err);
    }
  }, [courseId]);

  useEffect(() => {
    const loadLectureData = async () => {
      if (!courseId) {
        console.error('[LectureRoom] courseId가 없습니다:', courseId);
        return;
      }

      const courseIdNum = Number(courseId);
      if (isNaN(courseIdNum)) {
        console.error('[LectureRoom] courseId가 NaN입니다:', courseId);
        return;
      }

      try {
        console.log('[LectureRoom] 강의 데이터 로드 시작, courseId:', courseIdNum);
        const data = await fetchLectureRoomData(courseIdNum);

        if (data) {
          setLectureData(data);
          // 마지막으로 본 강의 또는 첫 번째 강의 설정
          setCurrentLectureId(
            data.last_watched_lecture_id || data.chapters?.[0]?.lectures?.[0]?.id || 1
          );

          // 초기 진행률 조회
          await refreshCourseProgress();
        }
      } catch (err) {
        console.error('강의 데이터 로드 실패:', err);
      }
    };

    loadLectureData();
  }, [courseId, refreshCourseProgress]);

  // 현재 강의 정보 찾기 (API 데이터 사용)
  const currentLectureInfo = useMemo(() => {
    const chaptersToUse = lectureData?.chapters || MOCK_DATA.chapters;

    for (const chapter of chaptersToUse) {
      if (!chapter.lectures) continue;
      const lecture = chapter.lectures.find((lec) => lec.id === currentLectureId);
      if (lecture) {
        return {
          lecture,
          chapter,
        };
      }
    }
    return null;
  }, [currentLectureId, lectureData]);

  // is_current 업데이트된 chapters 데이터
  const updatedChapters = useMemo(() => {
    const chaptersToUse = lectureData?.chapters || MOCK_DATA.chapters;

    return chaptersToUse.map((chapter) => ({
      ...chapter,
      lectures: (chapter.lectures || []).map((lecture) => ({
        ...lecture,
        is_current: lecture.id === currentLectureId,
      })),
    }));
  }, [currentLectureId, lectureData]);

  const handleLectureClick = (lectureId: number) => {
    setCurrentLectureId(lectureId);
  };

  // 현재 강의의 자료 URL과 강의 ID를 Layout context에 업데이트
  useEffect(() => {
    if (currentLectureInfo && outletContext?.setCurrentLectureMaterialUrl) {
      console.log('[LectureRoom] 자료 URL 업데이트:', currentLectureInfo.lecture.material_url);
      outletContext.setCurrentLectureMaterialUrl(currentLectureInfo.lecture.material_url);
    }
    if (outletContext?.setCurrentLectureId) {
      outletContext.setCurrentLectureId(currentLectureId);
    }
  }, [currentLectureId, currentLectureInfo, outletContext]);

  // 강의 영상별 진행 정보 조회 (이어보기)
  useEffect(() => {
    const loadLectureProgress = async () => {
      if (!currentLectureId) return;

      // 새 강의로 바뀌면 완료 플래그 리셋
      isMovingToNextRef.current = false;

      try {
        const progressData = await fetchLectureProgress(currentLectureId);
        if (progressData) {
          const progress = progressData;
          setLastPosition(progress.last_position || 0);
          setProgressExists(true);

          // 완료된 강의는 항상 100%, 미완료는 저장된 진도율로 초기화
          const lectureInfo = currentLectureInfo;
          if (lectureInfo && lectureInfo.lecture.duration_seconds) {
            const duration = lectureInfo.lecture.duration_seconds;

            // 완료된 강의라면 100% 고정
            if (progress.is_completed) {
              setCurrentVideoProgress(100);
              setIsCurrentLectureCompleted(true);
            } else {
              // 미완료 강의는 저장된 진도율 사용
              setCurrentVideoProgress(progress.completion_rate || 0);
              setIsCurrentLectureCompleted(false);
            }

            setCurrentVideoDuration(duration);
          }
        } else {
          setLastPosition(0);
          setProgressExists(false);
          // 진행 정보가 없으면 0%로 초기화
          setCurrentVideoProgress(0);
          setIsCurrentLectureCompleted(false);
        }
      } catch (err) {
        console.error('진행 정보 조회 실패:', err);
        setLastPosition(0);
        setProgressExists(false);
        setCurrentVideoProgress(0);
        setIsCurrentLectureCompleted(false);
      }
    };

    loadLectureProgress();
  }, [currentLectureId, currentLectureInfo]);

  // 진행률 저장 (10초마다 자동 호출됨)
  const handleVideoProgress = useCallback(
    async (playedSeconds: number, totalSeconds: number) => {
      if (!currentLectureId) return;

      const completionRate = totalSeconds > 0 ? (playedSeconds / totalSeconds) * 100 : 0;
      const isCompleted = completionRate >= 95; // 95% 이상 시청 시 완료 처리 (서버 기준)

      // 완료된 강의면 진도율 업데이트 하지 않음 (100% 유지)
      if (!isCurrentLectureCompleted) {
        setCurrentVideoProgress(completionRate);
        setCurrentVideoDuration(totalSeconds);
      }

      console.log(
        `[LectureRoom] 진행률 저장 시도: 강의 ID ${currentLectureId}, ${Math.floor(playedSeconds)}초, 완료율 ${completionRate.toFixed(1)}%`
      );

      try {
        if (progressExists) {
          // 기존 진행 정보 업데이트 (is_completed는 서버가 자동 처리)
          const result = await updateLectureProgress(currentLectureId, {
            watched_seconds: Math.floor(playedSeconds),
            last_position: Math.floor(playedSeconds),
          });
          console.log('[LectureRoom] 진행률 업데이트 성공:', result);
        } else {
          // 새로운 진행 정보 생성 (is_completed는 서버가 자동 처리)
          const result = await createEnrollmentProgress({
            lecture_id: currentLectureId,
            watched_seconds: Math.floor(playedSeconds),
            last_position: Math.floor(playedSeconds),
          });
          console.log('[LectureRoom] 진행률 생성 성공:', result);
          setProgressExists(true);
        }

        // 전체 진행률 새로고침 (매번)
        await refreshCourseProgress();

        // 95% 이상 시청 시 다음 강의로 자동 이동 (중복 방지)
        if (isCompleted && !isMovingToNextRef.current) {
          isMovingToNextRef.current = true;
          console.log('[LectureRoom] 강의 완료! 다음 강의로 이동합니다.');

          const chaptersToUse = lectureData?.chapters || [];
          const allLectures: Array<{ id: number }> = [];
          chaptersToUse.forEach((chapter) => {
            if (chapter.lectures) {
              chapter.lectures.forEach((lecture) => {
                allLectures.push({ id: lecture.id });
              });
            }
          });

          const currentIndex = allLectures.findIndex((lec) => lec.id === currentLectureId);
          if (currentIndex >= 0 && currentIndex < allLectures.length - 1) {
            setTimeout(() => {
              setCurrentLectureId(allLectures[currentIndex + 1].id);
              scrollToTop();
              isMovingToNextRef.current = false; // 다음 강의로 이동 후 리셋
            }, 2000); // 2초 후 다음 강의로 이동
          } else {
            console.log('[LectureRoom] 마지막 강의입니다.');
            isMovingToNextRef.current = false;
          }
        }
      } catch (err) {
        console.error('[LectureRoom] 진행률 저장 실패:', err);
      }
    },
    [
      currentLectureId,
      progressExists,
      refreshCourseProgress,
      lectureData,
      isCurrentLectureCompleted,
    ]
  );

  // 강의 완료 처리 (실제 완료는 서버가 자동으로 95% 기준으로 처리)
  const handleVideoEnded = useCallback(async () => {
    if (!currentLectureId) return;

    try {
      // 영상 끝 위치 저장 (is_completed는 서버가 자동 처리)
      if (progressExists) {
        await updateLectureProgress(currentLectureId, {
          watched_seconds: Math.floor(currentVideoDuration),
          last_position: Math.floor(currentVideoDuration),
        });
      } else {
        await createEnrollmentProgress({
          lecture_id: currentLectureId,
          watched_seconds: Math.floor(currentVideoDuration),
          last_position: Math.floor(currentVideoDuration),
        });
      }

      // 전체 진행률 새로고침
      await refreshCourseProgress();

      // 다음 강의로 자동 이동
      const allLectures = getAllLectures();
      const currentIndex = allLectures.findIndex((lec) => lec.id === currentLectureId);
      if (currentIndex >= 0 && currentIndex < allLectures.length - 1) {
        setTimeout(() => {
          setCurrentLectureId(allLectures[currentIndex + 1].id);
          scrollToTop();
        }, 1000); // 1초 후 다음 강의로 이동
      }
    } catch (err) {
      console.error('완료 처리 실패:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLectureId, progressExists, refreshCourseProgress, lectureData]);

  // 화면 맨 위로 부드럽게 스크롤
  const scrollToTop = () => {
    centerContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 모든 강의를 순서대로 정렬한 배열 생성
  const getAllLectures = () => {
    const chaptersToUse = lectureData?.chapters || MOCK_DATA.chapters;
    const allLectures: Array<{ id: number; chapterId: number }> = [];

    chaptersToUse.forEach((chapter) => {
      if (chapter.lectures) {
        chapter.lectures.forEach((lecture) => {
          allLectures.push({ id: lecture.id, chapterId: chapter.id });
        });
      }
    });

    return allLectures;
  };

  // 현재 강의 인덱스 찾기
  const getCurrentLectureIndex = () => {
    const allLectures = getAllLectures();
    return allLectures.findIndex((lec) => lec.id === currentLectureId);
  };

  // 이전 강의로 이동
  const handlePreviousLecture = useCallback(() => {
    const allLectures = getAllLectures();
    const currentIndex = getCurrentLectureIndex();

    if (currentIndex > 0) {
      setCurrentLectureId(allLectures[currentIndex - 1].id);
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLectureId, lectureData]);

  // 다음 강의로 이동
  const handleNextLecture = useCallback(() => {
    const allLectures = getAllLectures();
    const currentIndex = getCurrentLectureIndex();

    if (currentIndex < allLectures.length - 1) {
      setCurrentLectureId(allLectures[currentIndex + 1].id);
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLectureId, lectureData]);

  // 현재 강의가 첫 번째/마지막 강의인지 확인
  const isFirstLecture = getCurrentLectureIndex() === 0;
  const isLastLecture = () => {
    const allLectures = getAllLectures();
    return getCurrentLectureIndex() === allLectures.length - 1;
  };

  // 디버깅용 로그
  console.log('[LectureRoom] 현재 ProgressBar에 전달되는 값:', currentVideoProgress);

  // 로딩 상태: lectureData가 없으면 스켈레톤 UI 표시
  if (!lectureData) {
    return <SkeletonLectureRoom />;
  }

  return (
    <S.PageContainer>
      {/* 진행률 바 - 현재 영상 진도율 표시 */}
      <ProgressBar variant="lecture" value={currentVideoProgress} max={100} />

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
            <CurriculumSidebar
              chapters={
                updatedChapters as unknown as Parameters<typeof CurriculumSidebar>[0]['chapters']
              }
              onLectureClick={handleLectureClick}
            />
          </S.SidebarContent>
        </S.LeftSidebar>

        {/* 중앙 비디오 플레이어 영역 */}
        <S.CenterContent ref={centerContentRef}>
          {/* 브레드크럼 */}
          {currentLectureInfo && (
            <S.BreadcrumbBar $compact={isLeftSidebarOpen || !!rightSidebarType}>
              {/* 양쪽 사이드바가 모두 열렸을 때는 강의 제목만 표시 */}
              {!(isLeftSidebarOpen && rightSidebarType) && (
                <>
                  <S.BreadcrumbItem $active>
                    {lectureData?.title || MOCK_DATA.course.title}
                  </S.BreadcrumbItem>
                  <S.BreadcrumbSeparator>&gt;</S.BreadcrumbSeparator>
                  <S.BreadcrumbItem>{currentLectureInfo.chapter.title}</S.BreadcrumbItem>
                  <S.BreadcrumbSeparator>&gt;</S.BreadcrumbSeparator>
                </>
              )}
              <S.BreadcrumbItem $bold>{currentLectureInfo.lecture.title}</S.BreadcrumbItem>
            </S.BreadcrumbBar>
          )}
          <S.ContentArea>
            {currentLectureInfo && currentLectureInfo.lecture.video_url && (
              <S.VideoPlayerWrapper>
                <VideoPlayer
                  url={currentLectureInfo.lecture.video_url || ''}
                  videoType={currentLectureInfo.lecture.video_type || 'youtube'}
                  lastPosition={lastPosition}
                  onProgress={handleVideoProgress}
                  onEnded={handleVideoEnded}
                />
              </S.VideoPlayerWrapper>
            )}
          </S.ContentArea>

          {/* 하단 네비게이션 */}
          <S.BottomNavigation>
            <S.NavButtonGroup>
              <S.NavButton
                $variant="outline"
                aria-label="이전 강의"
                onClick={handlePreviousLecture}
                disabled={isFirstLecture}
                title={isFirstLecture ? '이전 강의가 없습니다' : '이전 강의로 이동'}
              >
                <img src={iconArrowLeft} alt="" />
              </S.NavButton>
              <S.NavButton
                $variant="primary"
                aria-label="다음 강의"
                onClick={handleNextLecture}
                disabled={isLastLecture()}
                title={isLastLecture() ? '다음 강의가 없습니다' : '다음 강의로 이동'}
              >
                <span>다음 강의</span>
                <img src={iconArrowRight} alt="" />
              </S.NavButton>
            </S.NavButtonGroup>
            <S.ScrollTopButton aria-label="맨 위로" onClick={scrollToTop} title="맨 위로 이동">
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
            {rightSidebarType === 'materials' && (
              <MaterialsTab materialUrl={currentLectureInfo?.lecture.material_url} />
            )}
            {rightSidebarType === 'qna' && <QnaTab />}
          </S.SidebarContent>
        </S.RightSidebar>
      </S.MainContent>

      {/* 모바일 배경 딤 */}
      {(isLeftSidebarOpen || rightSidebarType) && (
        <S.MobileDimBackground onClick={closeAllSidebars} />
      )}
    </S.PageContainer>
  );
}
