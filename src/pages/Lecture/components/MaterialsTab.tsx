/**
 * 자료 탭 - 강의 자료 다운로드 페이지 안내
 */
import * as S from '../styles/MaterialsTab.styled';

interface MaterialsTabProps {
  materialUrl?: string | null;
}

export default function MaterialsTab({ materialUrl }: MaterialsTabProps) {
  const handleNavigateToMaterials = () => {
    if (materialUrl?.trim()) {
      // 새 탭에서 자료 열기
      window.open(materialUrl, '_blank');
    }
  };

  // 자료가 없는 경우
  if (!materialUrl?.trim()) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.InfoBanner $empty>
            <S.InfoIcon>📁</S.InfoIcon>
            <S.InfoText>현재 강의에서 제공하는 자료가 없습니다.</S.InfoText>
          </S.InfoBanner>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.InfoBanner>
          <S.InfoIcon>📁</S.InfoIcon>
          <S.InfoText>강의 자료를 확인하고 다운로드할 수 있습니다.</S.InfoText>
        </S.InfoBanner>
        <S.Description>
          강의에서 제공하는 PDF, 이미지, 예제 코드 등의 <br /> 자료를 확인할 수 있습니다.
        </S.Description>
      </S.ContentWrapper>
      <S.NavigateButton onClick={handleNavigateToMaterials} aria-label="자료 페이지로 이동">
        자료 페이지로 이동
        <S.Arrow>→</S.Arrow>
      </S.NavigateButton>
    </S.Container>
  );
}
