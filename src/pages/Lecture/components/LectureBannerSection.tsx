import React from 'react';
import styled from 'styled-components';
import { useApiData } from '../../../hooks/useApiData';
import { mockBannerData } from '../../../data/mockData';
import type { BannerData } from '../../../types/LectureType';
import { LoadingSpinner, ErrorMessage } from './HelperComponents';

const LectureBannerSection: React.FC = () => {
  // 1. API가 개발되면 mockBannerData를 API 호출 함수(e.g., fetchBanner)로 교체합니다.
  const { data, loading, error } = useApiData<BannerData>(mockBannerData, 300);

  return (
    <S.BannerWrapper>
      {/* 2. 로딩 및 에러 상태 처리 */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <img alt={data.altText} src={data.imageUrl} />
      )}
    </S.BannerWrapper>
  );
};

const S = {
  BannerWrapper: styled.section`
    width: 100%;
    /* 로딩 중에도 레이아웃이 밀리지 않도록 높이를 지정합니다. */
    height: 416px; 
    border-radius: 12px;
    overflow: hidden;
    background-color: #f3f5fa; // 로딩 중 배경색
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `
};

export default LectureBannerSection;