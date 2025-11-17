/**
 * Q&A 탭 - 질문 목록, 검색, 작성 기능 (UI만, 정렬/검색 로직 제외 버전)
 */
import { useState } from 'react';
import iconWarning from '../../../assets/icons/icon-category-FE.svg';
import iconSearch from '../../../assets/icons/icon-search.svg';
import Button from '../../../components/Button';
import * as S from '../styles/QnaTab.styled';

interface Question {
  id: number;
  userId: number;
  courseId: number;
  title: string;
  content: string;
  viewCount: number;
  isAnswered: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: number | null;
  authorName: string;
  commentCount: number;
  isCurrentLecture: boolean;
}

// ISO 문자열을 받아 초 단위를 제외한 날짜/시간 문자열로 변환하는 유틸 함수
const formatDateTimeWithoutSeconds = (isoString: string) => {
  try {
    const date = new Date(isoString);

    if (Number.isNaN(date.getTime())) {
      throw new Error('유효하지 않은 날짜 형식');
    }

    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('날짜 포맷 변환 중 오류가 발생했습니다.', error);
    return isoString;
  }
};

// 임시 데이터
const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    userId: 101,
    courseId: 201,
    title: '오픈채팅 비밀번호는 어디에서 확인할 수 있나요?',
    content: '강의실 입장 후 공지사항을 살펴봤는데 비밀번호 안내가 없습니다. 확인 방법이 있을까요?',
    viewCount: 40,
    isAnswered: false,
    isDeleted: false,
    createdAt: '2025-10-13T14:53:00+09:00',
    updatedAt: '2025-10-13T14:53:00+09:00',
    deletedAt: null,
    deletedBy: null,
    authorName: 'zl존 민joo',
    commentCount: 2,
    isCurrentLecture: true,
  },
  {
    id: 2,
    userId: 102,
    courseId: 201,
    title: 'TodoItem을 import했지만 렌더링되지 않습니다.',
    content: '따라 하고 있는데 TodoItem 컴포넌트가 화면에 나오지 않아요. 무엇을 확인해야 할까요?',
    viewCount: 153,
    isAnswered: true,
    isDeleted: false,
    createdAt: '2025-02-18T01:06:00+09:00',
    updatedAt: '2025-02-20T10:12:00+09:00',
    deletedAt: null,
    deletedBy: null,
    authorName: '최강규호',
    commentCount: 4,
    isCurrentLecture: true,
  },
  {
    id: 3,
    userId: 205,
    courseId: 198,
    title: 'Async/Await 예제에서 에러 처리는 어떻게 하나요?',
    content:
      '강의에서 소개된 예제 코드에 try/catch를 추가하면 콘솔 경고가 나오는데 어떤 방식이 맞는지 궁금합니다.',
    viewCount: 31,
    isAnswered: true,
    isDeleted: false,
    createdAt: '2025-11-03T21:49:00+09:00',
    updatedAt: '2025-11-04T09:20:00+09:00',
    deletedAt: null,
    deletedBy: null,
    authorName: '최고민경',
    commentCount: 3,
    isCurrentLecture: false,
  },
  {
    id: 4,
    userId: 333,
    courseId: 198,
    title: '학습 자료 어디서?',
    content: '교안 어디서 볼 수 있나요?',
    viewCount: 41,
    isAnswered: false,
    isDeleted: false,
    createdAt: '2025-11-02T16:20:00+09:00',
    updatedAt: '2025-11-02T16:20:00+09:00',
    deletedAt: null,
    deletedBy: null,
    authorName: '짱가람',
    commentCount: 3,
    isCurrentLecture: false,
  },
];

export default function QnaTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  // TODO: 나중에 검색/정렬 로직 붙이기
  // 지금은 UI만, 데이터는 그대로 사용
  const questionsToDisplay = MOCK_QUESTIONS;

  return (
    <S.Container>
      {!isWriting ? (
        <>
          {/* 검색 바 (UI만, 검색 기능 X) */}
          <S.SearchBar>
            <S.SearchInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="질문 검색..."
              aria-label="질문 검색"
            />
            <S.SearchIcon>
              <img src={iconSearch} alt="" />
            </S.SearchIcon>
          </S.SearchBar>

          {/* 질문 목록 */}
          <S.QuestionList>
            {questionsToDisplay.map((question) => (
              <S.QuestionCard key={question.id}>
                <S.QuestionTitle>{question.title}</S.QuestionTitle>
                <S.QuestionContent>{question.content}</S.QuestionContent>
                <S.QuestionMeta>
                  <S.Author>{question.authorName}</S.Author>
                  <S.MetaInfo>
                    <span>{formatDateTimeWithoutSeconds(question.createdAt)}</span>
                    <S.MetaSeparator>·</S.MetaSeparator>
                    <S.MetaItem>조회수 {question.viewCount}</S.MetaItem>
                    <S.MetaSeparator>·</S.MetaSeparator>
                    <S.MetaItem>댓글 {question.commentCount}</S.MetaItem>
                  </S.MetaInfo>
                </S.QuestionMeta>
              </S.QuestionCard>
            ))}
          </S.QuestionList>

          {/* 글 작성하기 버튼 */}
          <S.WriteButton onClick={() => setIsWriting(true)} aria-label="질문 작성하기">
            글 작성하기
          </S.WriteButton>
        </>
      ) : (
        <WriteForm setIsWriting={setIsWriting} />
      )}
    </S.Container>
  );
}

function WriteForm({ setIsWriting }: { setIsWriting: (value: boolean) => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('질문 작성:', { title, content });
    // TODO: API 연동
    setIsWriting(false);
  };

  const handleCancel = () => {
    setIsWriting(false);
  };

  return (
    <S.FormContainer>
      <S.FormHeader>
        <S.FormTitle>질문하기</S.FormTitle>
        <S.CloseButton onClick={handleCancel} aria-label="닫기">
          ✕
        </S.CloseButton>
      </S.FormHeader>

      <S.WarningBanner>
        <S.WarningIcon>
          <img src={iconWarning} alt="부트런 자주 묻는 질문 안내" />
        </S.WarningIcon>
        <S.WarningText>부트런 서비스 질문은 챗봇 자주 묻는 질문에서 확인해주세요.</S.WarningText>
      </S.WarningBanner>

      <S.FormSection>
        <S.Label>제목</S.Label>
        <S.TitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="질문 제목을 입력하세요"
          aria-label="질문 제목"
        />
      </S.FormSection>

      <S.FormSectionExpanded>
        <S.Label>내용</S.Label>
        <S.ContentTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="질문 내용을 입력하세요..."
          aria-label="질문 내용"
        />
      </S.FormSectionExpanded>

      <S.FormActions>
        <Button variant="outline" onClick={handleCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          확인
        </Button>
      </S.FormActions>
    </S.FormContainer>
  );
}
