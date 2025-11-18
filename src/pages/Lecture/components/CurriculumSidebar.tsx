/**
 * 커리큘럼 사이드바 - 챕터/강의 목록, 완료 상태 표시
 */
import { useState } from 'react';
import IconPlay from '../../../assets/icons/icon-play.svg?react';
import IconPage from '../../../assets/icons/icon-page.svg?react';
import IconQuiz from '../../../assets/icons/icon-quiz.svg?react';
import IconDownArrow from '../../../assets/icons/icon-down.svg?react';
import IconCheckCircleActive from '../../../assets/icons/icon-check-circle-active.svg?react';
import IconCheckCircleDefault from '../../../assets/icons/icon-check-circle-default.svg?react';
import * as S from '../styles/CurriculumSidebar.styled';

interface LectureItem {
  id: number;
  title: string;
  duration_seconds: number;
  is_completed: boolean;
  is_current: boolean;
  lecture_type: 'video' | 'text' | 'quiz';
  video_url?: string;
  video_type?: 'youtube' | 'vimeo';
  text_content?: string;
}

interface ChapterItem {
  id: number;
  title: string;
  lectures: LectureItem[];
}

interface CurriculumSidebarProps {
  chapters: ChapterItem[];
  onLectureClick: (lectureId: number) => void;
}

export default function CurriculumSidebar({ chapters, onLectureClick }: CurriculumSidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]); // 첫 번째 챕터는 기본 확장

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getLectureIcon = (lectureType: 'video' | 'text' | 'quiz') => {
    switch (lectureType) {
      case 'video':
        return <IconPlay/>;
      case 'text':
        return <IconPage/>;
      case 'quiz':
        return <IconQuiz/>;
      default:
        return <IconPlay/>;
    }
  };

  return (
    <S.Container>
      {chapters.map((chapter) => {
        const isExpanded = expandedChapters.includes(chapter.id);

        return (
          <S.ChapterWrapper key={chapter.id}>
            <S.ChapterHeader
              onClick={() => toggleChapter(chapter.id)}
              aria-expanded={isExpanded}
              aria-label={`${chapter.title} ${isExpanded ? '접기' : '펼치기'}`}
            >
              <S.ChapterIcon $isExpanded={isExpanded}>
                <IconDownArrow/>
                {/* <img src={IconDownArrow} alt="" /> */}
              </S.ChapterIcon>
              <S.ChapterTitle>{chapter.title}</S.ChapterTitle>
            </S.ChapterHeader>

            {isExpanded && (
              <S.LectureList>
                {chapter.lectures.map((lecture) => (
                  <S.LectureItem
                    key={lecture.id}
                    $isCurrent={lecture.is_current}
                    onClick={() => onLectureClick(lecture.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${lecture.title}, ${formatDuration(lecture.duration_seconds)}, ${
                      lecture.is_completed ? '완료' : '미완료'
                    }`}
                  >
                    <S.LectureIconWrapper $isCurrent={lecture.is_current}>
                      {getLectureIcon(lecture.lecture_type)}
                    </S.LectureIconWrapper>
                    <S.LectureInfo>
                      <S.LectureTitle $isCurrent={lecture.is_current}>
                        {lecture.title}
                      </S.LectureTitle>
                      <S.LectureDuration>
                        {formatDuration(lecture.duration_seconds)}
                      </S.LectureDuration>
                    </S.LectureInfo>
                    <S.CompletionBadge 
                      $isCompleted={lecture.is_completed}
                      aria-label={lecture.is_completed ? '완료' : '미완료'}
                    >
                      {lecture.is_completed ? (
                        <IconCheckCircleActive/>
                      ) : (
                        <IconCheckCircleDefault/>
                      )}
                    </S.CompletionBadge>
                  </S.LectureItem>
                ))}
              </S.LectureList>
            )}
          </S.ChapterWrapper>
        );
      })}
    </S.Container>
  );
}
