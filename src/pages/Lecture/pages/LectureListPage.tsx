import styled from 'styled-components';
import { FilterCourseList } from '../../../components/CourseList';
import FilterForm from '../../../components/FilterForm';
import { usePageMeta } from '../../../hooks/usePageMeta';

export const StyledTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 600;
  margin-top: 6rem;
  word-break: keep-all;
  line-height: 1.3;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export default function LectureListPage() {
  const filterData = [
    {
      label: '주제',
      queryName: 'category_types',
      options: [
        { label: '프론트엔드', value: 'frontend' },
        { label: '백엔드', value: 'backend' },
        { label: '데이터 분석', value: 'data_analysis' },
        { label: 'AI', value: 'ai' },
        { label: '디자인', value: 'design' },
        { label: '기타', value: 'other' },
      ],
    },
    {
      label: '유형',
      queryName: 'course_types',
      options: [
        { label: 'VOD', value: 'vod' },
        { label: '부스트 커뮤니티', value: 'boost_community' },
        { label: 'KDC', value: 'kdc' },
      ],
    },
    {
      label: '난이도',
      queryName: 'difficulties',
      options: [
        { label: '초급', value: 'beginner' },
        { label: '중급', value: 'intermediate' },
        { label: '실무', value: 'advanced' },
      ],
    },
    {
      label: '가격',
      queryName: 'price_types',
      options: [
        { label: '무료', value: 'free' },
        { label: '유료', value: 'paid' },
        { label: '국비지원', value: 'national_support' },
      ],
    },
  ];

  const metaHelmet = usePageMeta({
    title: '강의 목록 | 부트런',
    description:
      '부트런 강의목록 페이지입니다. 최신 개발 기술, 실무 프로젝트 중심 ICT 교육 강의를 검색하고 비교하며 내 커리어에 맞는 강의를 찾아보세요.',
  });

  return (
    <>
      {metaHelmet}
      <StyledTitle>어떤 강의를 찾으시나요?</StyledTitle>
      <FilterForm filterData={filterData} />
      <FilterCourseList />
    </>
  );
}
