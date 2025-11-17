import React, { useState, useEffect, useCallback } from 'react';
import S from '../styles/LectureFilterBar.styled';
import type { CourseApiParams } from '../../../types/AdminCourseType';

interface LectureFilterBarProps {
  // 현재 적용된 필터 값 (부모로부터 받음)
  initialFilters: CourseApiParams;
  // 필터 변경 및 검색 실행 시 호출될 함수
  onFilterChange: (newFilters: Partial<CourseApiParams>) => void;
}

const LectureFilterBar: React.FC<LectureFilterBarProps> = ({ initialFilters, onFilterChange }) => {
  // 1. 컴포넌트 내부에서 사용할 필터 상태 (props와 분리)
  const [filters, setFilters] = useState(initialFilters);

  // 2. 부모의 'initialFilters'가 변경되면 내부 상태도 동기화
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // 3. input, select 변경 시 내부 상태만 업데이트
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 'null' 문자열을 실제 null로 변환
    let finalValue: string | boolean | null = value;

    // 'null' 문자열 → null로 변환
    if (value === 'null') {
      finalValue = null;
    }
    // 'is_published'는 boolean으로 변환
    else if (name === 'is_published') {
      finalValue = value === 'true';
    }

    setFilters((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  // 4. "검색" 버튼 클릭 시, 부모(LectureManagePage)에게 변경 사항 전송
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFilterChange(filters);
    },
    [filters, onFilterChange]
  );

  return (
    <S.CardBox as="form" onSubmit={handleSubmit}>
      <S.FilterGroup>
        <label htmlFor="keyword-filter">검색</label>
        <S.Input
          id="keyword-filter"
          type="text"
          name="keyword"
          placeholder="강의명, 강사명 검색"
          value={filters.keyword || ''}
          onChange={handleChange}
        />
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="category-filter">카테고리</label>
        <S.Select
          id="category-filter"
          name="category_type"
          value={filters.category_type || 'null'}
          onChange={handleChange}
        >
          <option value="null">전체</option>
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
          <option value="data_analysis">데이터 분석</option>
          <option value="ai">AI</option>
          <option value="design">디자인</option>
          <option value="other">기타</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="difficulty-filter">난이도</label>
        <S.Select
          id="difficulty-filter"
          name="difficulty"
          value={filters.difficulty || 'null'}
          onChange={handleChange}
        >
          <option value="null">전체</option>
          <option value="beginner">초급</option>
          <option value="intermediate">중급</option>
          <option value="advanced">고급</option>
        </S.Select>
      </S.FilterGroup>

      <S.FilterGroup>
        <label htmlFor="publish-filter">공개 여부</label>
        <S.Select
          id="publish-filter"
          name="is_published"
          value={String(filters.is_published)}
          onChange={handleChange}
        >
          <option value="null">전체</option>
          <option value="true">공개</option>
          <option value="false">비공개</option>
        </S.Select>
      </S.FilterGroup>

      <S.SubmitButton type="submit">검색</S.SubmitButton>
    </S.CardBox>
  );
};

export default LectureFilterBar;
