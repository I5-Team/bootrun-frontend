import React, { useState, useEffect, useCallback } from 'react';
import { UserFilterBarStyles as S } from '../styles/UserFilterBar.styled';
import type { UserApiParams } from '../../../types/AdminUserType';

// 부모 컴포넌트(UserManagePage)로부터 받을 Props 타입 정의
interface UserFilterBarProps {
  /** 현재 적용된 필터 값 (부모로부터 받음) */
  initialFilters: UserApiParams;
  /** 필터 변경 및 검색 실행 시 호출될 함수 */
  onFilterChange: (newFilters: Partial<UserApiParams>) => void;
}

const UserFilterBar: React.FC<UserFilterBarProps> = ({ initialFilters, onFilterChange }) => {
  // 1. 컴포넌트 내부에서 사용할 필터 상태 (props와 분리)
  const [filters, setFilters] = useState(initialFilters);

  // 2. 부모의 'initialFilters'가 (필터 초기화 등으로) 변경되면 내부 상태도 동기화
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // 3. input, select 변경 시 내부 상태만 업데이트
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // 'is_active'는 boolean 또는 null로 변환
    let finalValue: string | boolean | null = value;
    if (name === 'is_active') {
      finalValue = value === 'null' ? null : value === 'true';
    }

    setFilters((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  // 4. "검색" 버튼 클릭 시, 부모(UserManagePage)에게 변경 사항 전송
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // 'page: 1'로 리셋하는 로직은 부모(handleFilterChange)가 담당
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
          placeholder="이메일, 닉네임 검색"
          value={filters.keyword || ''}
          onChange={handleChange}
        />
      </S.FilterGroup>
      <S.FilterGroup>
        <label htmlFor="role-filter">역할</label>
        <S.Select
          id="role-filter"
          name="role"
          value={filters.role || 'null'}
          onChange={handleChange}
        >
          <option value="null">전체</option>
          <option value="user">수강생</option>
          <option value="admin">관리자</option>
        </S.Select>
      </S.FilterGroup>
      <S.FilterGroup>
        <label htmlFor="status-filter">상태</label>
        <S.Select
          id="status-filter"
          name="is_active"
          value={String(filters.is_active)} // 'true', 'false', 'null'
          onChange={handleChange}
        >
          <option value="null">전체</option>
          <option value="true">활성</option>
          <option value="false">비활성</option>
        </S.Select>
      </S.FilterGroup>
      <S.SubmitButton type="submit">검색</S.SubmitButton>
    </S.CardBox>
  );
};

export default UserFilterBar;
