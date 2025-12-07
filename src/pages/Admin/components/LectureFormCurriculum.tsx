/**
 * 강의 폼 - Step 2: 커리큘럼 관리
 */
import React, { useState } from 'react';
import type { Chapter, Lecture } from '../../../types/AdminCourseType';
import { Button } from '../../../components/Button';
import { deleteLecture, deleteChapter as deleteChapterApi } from '../../../api/adminApi';
import { formatDuration } from '../hooks/useLectureFormUtils';
import S from '../styles/LectureFormCurriculum.styled.ts';

interface LectureFormCurriculumProps {
  chapters: (Omit<Chapter, 'course_id' | 'created_at' | 'updated_at'> & { id?: number })[];
  setChapters: React.Dispatch<
    React.SetStateAction<
      (Omit<Chapter, 'course_id' | 'created_at' | 'updated_at'> & { id?: number })[]
    >
  >;
  courseId?: number | null;
  disabled?: boolean;
}

const LectureFormCurriculum: React.FC<LectureFormCurriculumProps> = ({
  chapters,
  setChapters,
  courseId,
  disabled = false,
}) => {
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number | null>(null);

  // 챕터 추가
  const handleAddChapter = () => {
    const newChapter: Omit<Chapter, 'course_id' | 'created_at' | 'updated_at'> & { id?: number } = {
      title: `챕터 ${chapters.length + 1}`,
      description: '',
      order_number: chapters.length + 1,
      lectures: [],
    };
    setChapters([...chapters, newChapter]);
  };

  // 챕터 삭제
  const handleDeleteChapter = async (chapterIndex: number) => {
    const chapter = chapters[chapterIndex];
    const confirmMessage = `[${chapter.title}] 챕터를 삭제하시겠습니까?\n\n 이 작업은 되돌릴 수 없습니다.`;
    if (!window.confirm(confirmMessage)) return;

    // 기존 챕터
    if (chapter.id && courseId) {
      try {
        await deleteChapterApi(courseId, chapter.id);
      } catch (error) {
        console.error('챕터 삭제 실패: ', error);
        alert('챕터 삭제에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    const newChapters = chapters
      .filter((_, idx) => idx !== chapterIndex)
      .map((ch, idx) => ({
        ...ch,
        order_number: idx + 1,
      }));
    setChapters(newChapters);
    alert('챕터가 성공적으로 삭제되었습니다.');
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
      order_number: chapters[chapterIndex].lectures.length + 1,
      material_url: '',
    };
    const newChapters = [...chapters];
    newChapters[chapterIndex].lectures.push(newLecture);
    setChapters(newChapters);
  };

  // 강의 영상 삭제
  const handleDeleteLecture = async (chapterIndex: number, lectureIndex: number) => {
    const lecture = chapters[chapterIndex].lectures[lectureIndex];
    const confirmMessage = `[${lecture.title}] 강의를 삭제하시겠습니까?\n\n 이 작업은 되돌릴 수 없습니다.`;
    if (!window.confirm(confirmMessage)) return;

    // 기존 강의
    if (lecture.id) {
      try {
        const chapter = chapters[chapterIndex] as Chapter;
        if (!chapter.id || !courseId) {
          alert('강의 삭제 불가: 강의 정보를 찾을 수 없습니다.');
          return;
        }
        await deleteLecture(courseId, chapter.id, lecture.id);
      } catch (error) {
        console.error('강의 삭제 실패: ', error);
        alert('강의 삭제에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    const newChapters = [...chapters];
    newChapters[chapterIndex].lectures = newChapters[chapterIndex].lectures
      .filter((_, idx) => idx !== lectureIndex)
      .map((lec, idx) => ({
        ...lec,
        order_number: idx + 1,
      }));
    setChapters(newChapters);

    alert('강의가 성공적으로 삭제되었습니다.');
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

                                  {lecture.video_url && !lecture.duration_seconds && (
                                    <S.InfoMessage>
                                      재생시간은 저장 후 자동으로 계산됩니다.
                                    </S.InfoMessage>
                                  )}
                                </S.FormGroup>
                              </S.FormRow>

                              {lecture.duration_seconds !== undefined &&
                                lecture.duration_seconds > 0 && (
                                  <S.FormRow>
                                    <S.FormGroup>
                                      <S.Label>재생시간 (자동 계산)</S.Label>
                                      <S.ReadOnlyGroup>
                                        <S.ReadOnlyValue>
                                          {formatDuration(lecture.duration_seconds)} (
                                          {lecture.duration_seconds}초)
                                        </S.ReadOnlyValue>
                                      </S.ReadOnlyGroup>
                                    </S.FormGroup>
                                  </S.FormRow>
                                )}
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

export default LectureFormCurriculum;
